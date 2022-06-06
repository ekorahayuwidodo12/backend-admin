import React, { useEffect, useState } from 'react'
import { Gap, Link } from '../../components';
import './detailBlog.scss';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

const DetailTour = (props) => {
  const [data, setData] = useState({})
  useEffect(() => {
    const id = props.match.params.id;
    Axios.get(`http://localhost:4000/v1/pesona-malang/tour/${id}`)
    .then(res => {
      setData(res.data.data)
    })
    .catch(err => {
      console.log('error: ', err);
    })
  })
  const history = useHistory();
    return (
    <div>
      <Gap height={20} />
       <div className='container'>
       <div className='card' style={{width: "50%"}}>
        <img className="card-img-top" height={200} src={`http://localhost:4000/${data.image}`} alt='thumb' />
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text">Category: {data.category}</p>
          <p className="card-text">Address: {data.address}</p>
          <p className="card-text">Operational Hour: {data.operationalHour}</p>
          <p className="card-text">Ticket: {data.ticket}</p>
          <p className="card-text">Description:</p>
          <p className="card-text">{data.description}</p>
        </div>
      </div>
     </div>
     <Gap height={20} />
     <Link title='Kembali' onClick={() => history.push('/')} />
     <Gap height={20} />
    </div>
    )
}

export default withRouter(DetailTour);