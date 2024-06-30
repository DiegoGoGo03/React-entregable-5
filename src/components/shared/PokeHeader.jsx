import React from 'react'
import './styles/pokeHeader.css'
import pokedexLogo from '../assets/pokedex-logo.png';

const PokeHeader = () => {
  return (
    <div className='pokeheader'>
      <div className='pokeheader__red'>
        <figure className='pokeheader__img'>
          <img src={pokedexLogo} alt="pokedex image" />
        </figure>
      </div>
      <div className='pokeheader__black'>
        <div className='pokeheader__outcircle'>
          <div className='pokeheader__incircle'></div>
        </div>
      </div>
    </div>
  )
}

export default PokeHeader
