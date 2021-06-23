import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import useForm from '../../hooks/useForm'
import { getSinglePlace, editPlace } from '../../lib/api'

function PlaceEdit() {
  const history = useHistory()
  const { placeId } = useParams()
  const { formData, formErrors, handleChange, setFormErrors, setFormData } = useForm({
    name: '',
    area: '',
    address: '',
    postcode: '',
    description: '',
    categories: '',
    image: '',
    rating: '',
    lat: '',
    long: '',
  })
  
  React.useEffect(() => {
    const getData = async () => {
      try { 
        const res = await getSinglePlace(placeId)
        setFormData(res.data)
        console.log(res.data)
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message)
          setFormErrors(error.response.data.message)
        }
      }
    } 
    getData()
  }, [placeId, setFormData, setFormErrors])


  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const { data } = await editPlace(placeId, formData)
      history.push(`/places/${data._id}`)
    } catch (error) {
      setFormErrors(error.response.data.message)
    }
  }

  console.log(formData)

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form 
            className="column is-half is-offset-one-quarter box"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Name*</label>
              <div className="control">
                <input
                  className={`input ${formErrors.name ?
                    'is-danger' : '' }`}
                  placeholder='Name Of Place'
                  name='name'
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              {formErrors.name && <p className="help is-danger">
                {formErrors.name}
              </p>}
            </div>
            <div className="field">
              <label className="label">Description*</label>
              <div className="control">
                <input 
                  className={`textarea input ${formErrors.description ? 
                    'is-danger' : '' }`}
                  placeholder='Description'
                  name='description'
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>
              {formErrors.description && <p className="help is-danger">
                {formErrors.description}
              </p>}
            </div>
            <div className="field">
              <label className="label">Rating*</label>
              <div className="control">
                <input 
                  className={`input ${formErrors.rating ? 
                    'is-danger' : '' }`}
                  placeholder='Rating'
                  name='rating'
                  onChange={handleChange}
                  value={formData.rating}
                />
              </div>
              {formErrors.rating && <p className="help is-danger">
                {formErrors.rating}
              </p>}
            </div>
            <div className="field">
              <label className="label">Address*</label>
              <div className="control">
                <input 
                  className={`input ${formErrors.address ? 
                    'is-danger' : '' }`}
                  placeholder='Address'
                  name='address'
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>
              {formErrors.address && <p className="help is-danger">
                {formErrors.address}
              </p>}
            </div>
            <div className="field">
              <label className="label">Postcode*</label>
              <div className="control">
                <input 
                  className={`input ${formErrors.postcode ? 
                    'is-danger' : '' }`}
                  placeholder='Postcode'
                  name='postcode'
                  onChange={handleChange}
                  value={formData.postcode}
                />
              </div>
              {formErrors.postcode && <p className="help is-danger">
                {formErrors.postcode}
              </p>}
            </div>
            <div className="field">
              <label className="label">Area*</label>
              <div className="control">
                <input 
                  className={`input ${formErrors.area ? 
                    'is-danger' : '' }`}
                  placeholder='Area'
                  name='area'
                  onChange={handleChange}
                  value={formData.area}
                />
              </div>
              {formErrors.area && <p className="help is-danger">
                {formErrors.area}
              </p>}
            </div>
            <div className="field">
              <label className="label">Image*</label>
              <div className="control">
                <input 
                  className={`input ${formErrors.image ? 
                    'is-danger' : '' }`}
                  placeholder='Image Url'
                  name='image'
                  onChange={handleChange}
                  value={formData.image}
                />
              </div>
              {formErrors.image && <p className="help is-danger">
                {formErrors.image}
              </p>}
            </div>
            <div className="field">
              <button type='submit' className="button is-dark is-fullwidth">
                Edit Your Place!
              </button> 
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PlaceEdit

