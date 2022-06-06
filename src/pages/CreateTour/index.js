import React, { useEffect, useState } from 'react'
import { Button, Gap, Input, Upload, Link } from '../../components'
import TextArea from '../../components/atoms/textarea'
import './createBlog.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postToAPI, setForm, setImgPreview, updateToAPI } from '../../config/redux/action';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

const CreateTour = (props) => {
  const {form, imgPreview} = useSelector(state => state.createBlogReducer);
  const {name, category, address, operationalHour, ticket, description} = form;
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    if(id) {
      setIsUpdate(true)
      Axios.get(`http://localhost:4000/v1/pesona-malang/tour/${id}`)
      .then(res => {
        const data = res.data.data;
        dispatch(setForm('name', data.name))
        dispatch(setForm('category', data.category));
        dispatch(setForm('address', data.address));
        dispatch(setForm('operationalHour', data.operationalHour));
        dispatch(setForm('ticket', data.ticket));
        dispatch(setForm('description', data.description));
        dispatch(setImgPreview(`http://localhost:4000/${data.image}`));
      })
      .catch(err => {
        console.log('error:', err);
      })
    }
  }, [dispatch, props])

  const onSubmit = () => {
    const id = props.match.params.id;
    if(isUpdate) {
      updateToAPI(form, id);
    } else {
      postToAPI(form)
    }
  }

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    dispatch(setForm('image', file))
    dispatch(setImgPreview(URL.createObjectURL(file)))
  }
  return (
    <div>
      <Gap height={20} />
      <div className='container blog-post card'>
        <p className='title'>{isUpdate ? 'Update': 'Tour New'} Tour</p>
        <Input label='Name' value={name} onChange={(e) => dispatch(setForm('name', e.target.value))} />
        <Input label='Category' value={category} onChange={(e) => dispatch(setForm('category', e.target.value))} />
        <Input label='Address' value={address} onChange={(e) => dispatch(setForm('address', e.target.value))} />
        <Input label='Operational Hour' value={operationalHour} onChange={(e) => dispatch(setForm('operationalHour', e.target.value))} />
        <Input label='Ticket' value={ticket} onChange={(e) => dispatch(setForm('ticket', e.target.value))} />
        <Upload onChange={(e) => onImageUpload(e)} img={imgPreview} />
        <TextArea label='Description' value={description} onChange={(e) => dispatch(setForm('description', e.target.value))} />
        <Gap height={20} />
        <div className='button-action'>
          <Button title={isUpdate ? 'Update' : 'Simpan'} onClick={onSubmit} />
        </div>
        <Gap height={20} />
      </div>
      <Gap height={20} />
      <Link title='Kembali' onClick={() => history.push('/')} />
      <Gap height={20} />
    </div>
    
  )
}

export default withRouter(CreateTour);
