import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setTrainer } from '../store/slices/trainer.slice'
import { useNavigate } from 'react-router-dom'
import './styles/homePage.css'

const HomePage = () => {
  const handleFocus = () => {
    textInput.current.placeholder = ''
  };

  const handleBlur = () => {
    textInput.current.placeholder = 'Your Name...'
  }

  const dispatch = useDispatch()

  const navigate = useNavigate()
  
  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setTrainer(textInput.current.value.trim()))
    textInput.current.value = ''
    navigate('/pokedex')
  }

  return (
    <div className='homepage__container'>
      <h1 className='homepage__name'>
          <img className='homepage__image' src="../../../src/assets/pokedex-logo.png" alt="pokedex image" />
      </h1>
      <br />
      <h2 className='homepage__saludo'>Hi trainer! <span>👋🏼</span></h2>
      <p className='homepage__mensaje'>To start give me your name. <span className='homepage__pencil'>🖋️</span> </p>
      <br />
      <form className='homepage__submit' onSubmit={handleSubmit}>
        <input className='homepage__input' placeholder='Your Name...' ref={textInput} type="text" onFocus={handleFocus} onBlur={handleBlur}/>
        <button className='homepage__btn'>Start</button>
      </form>
    </div>
  )
}

export default HomePage

