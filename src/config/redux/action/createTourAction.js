import Axios from "axios"

export const setForm = (formType, formValue) => {
    return {type: 'SET_FORM_DATA', formType, formValue}
}

export const setImgPreview = (payload) => {
    return {type: 'SET_IMG_PREVIEW', payload}
}

export const postToAPI = (form) => {
    const data = new FormData();
    data.append('name', form.name);
    data.append('category', form.category);
    data.append('address', form.address);
    data.append('operationalHour', form.operationalHour);
    data.append('ticket', form.ticket);
    data.append('description', form.description);
    data.append('image', form.image);

    Axios.post('http://localhost:4000/v1/pesona-malang/tour', data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      alert(`post success: ${res}`);
    })
    .catch(err => {
      alert(`err:  ${err}`);
    })
}

export const updateToAPI = (form, id) => {
    const data = new FormData();
    data.append('name', form.name);
    data.append('category', form.category);
    data.append('address', form.address);
    data.append('operationalHour', form.operationalHour);
    data.append('ticket', form.ticket);
    data.append('description', form.description);
    data.append('image', form.image);

    Axios.put(`http://localhost:4000/v1/pesona-malang/tour/${id}`, data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      alert('update success: ', res);
    })
    .catch(err => {
      alert(`err:  ${err}`);
    })
}