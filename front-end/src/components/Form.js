import './form.css'
import axios from 'axios'
import { useState } from 'react'
import React from 'react'
const Form = () => {
  const [link, setLink] = useState('')
  const [links, setLinks] = useState([])
  const handleChange = (e) => {
    setLink(e.target.value)
  }
  const sendData = async (mainUrl) => {
    try {
      let res = await axios.post(
        'https://git.heroku.com/intense-retreat-08312.git',
        { mainUrl }
      )
      let data1 = res.data.dataArr
      setLinks(data1)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!link) return
    sendData(link)
    // setLink('')
  }

  return (
    <div>
      <form className='link-form'>
        <div className='input-block'>
          <label htmlFor='link'>
            <h3 className='form-title'>Add Your Link</h3>
          </label>
          <section className='input-section'>
            <input
              type='text'
              name='link'
              value={link}
              placeholder='www...'
              className='form-input'
              onChange={handleChange}
            />
            <span className='material-symbols-outlined icon'>recycling</span>
          </section>
        </div>
        <button type='submit' className='btn' onClick={handleSubmit}>
          get your link
        </button>
      </form>

      <div>
        {links.map((link) => {
          return (
            <div className='results' key={link._id}>
              <section className='main-url'>
                <h1 className='result-header'>Main Url</h1>
                <h6 className='result-body white'>{link.mainUrl}</h6>
              </section>
              <section className='short-url'>
                <h1 className='result-header'>Short Url</h1>

                <a
                  href={`https://git.heroku.com/intense-retreat-08312.git/${link.shortUrl}`}
                >
                  {link.shortUrl}
                </a>
              </section>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Form
