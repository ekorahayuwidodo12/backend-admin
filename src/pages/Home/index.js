import React, { useEffect, useState } from 'react';
import { Gap, TourItem } from '../../components';
import './home.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDataBlog } from '../../config/redux/action';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Axios from 'axios';

const Home = () => {
  const [counter] = useState(1);
  const {dataBlog} = useSelector(state => state.homeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataBlog(counter))
  }, [counter, dispatch])
  const history = useHistory();

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Apakah anda yakin akan menghapus post ini?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            Axios.delete(`http://localhost:4000/v1/pesona-malang/tour/${id}`)
            .then(res => {
              console.log('success delete: ', res.data);
              dispatch(setDataBlog(counter))
            })
            .catch(err => {
              console.log('error: ', err)
            })
          }
        },
        {
          label: 'No',
          onClick: () => console.log('user tidak setuju')
        }
      ]
    });
  }

  return (
    <div className='container'>
      <Gap height={20} />
      <button className='btn btn-success' onClick={() => history.push('/tour-blog')}>Create New Tour</button> 
      <Gap height={20} />
      <div className='table-responsive'>
      <table className="table text-center">
        <thead class="table-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
          {dataBlog.map(blog => {
            return (
              <TourItem 
                key={blog._id}
                image={`http://localhost:4000/${blog.image}`}
                name={blog.name}
                category={blog.category}
                address={blog.address}
                operationalHour={blog.operationalHour}
                ticket={blog.ticket}
                description={blog.description}
                date={blog.createdAt}
                body={blog.body}
                _id={blog._id}
                onDelete={confirmDelete} 
              />
            )
          })}
        </table>
      </div>
      <Gap height={20} />
    </div>
  )
}

export default Home;
