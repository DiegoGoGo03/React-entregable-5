import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import './styles/pokeInfo.css'
import PokeHeader from '../components/shared/PokeHeader'

const PokeInfo = () => {

  const [pokemon, getPokemon] = useFetch()

  const { id } = useParams()

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    getPokemon(url)
  }, [])

  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/pokedex')
  }

  return (
    <div>
      <button className="pokeinfo__back-button" onClick={handleBackClick}>
        Back to Pokedex
      </button>
      <section className='pokeinfo'>
        <figure className='pokeinfo__img'>
          <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon image" />
        </figure>
        <div className='pokeinfo__details'>
          <h1 className='pokeinfo__name'>{pokemon?.name}</h1>
          <div className='pokeinfo__types'>
            {pokemon?.types.map(typeInfo => (
              <span className={`pokeinfo__type ${typeInfo.type.name}`} key={typeInfo.type.name}>
                {typeInfo.type.name}
              </span>
            ))}
          </div>
          <ul className='pokeinfo__stats'>
            {pokemon?.stats.map(stat => (
              <li className='pokeinfo__stats-item' key={stat.stat.url}>
                <span>{stat.stat.name}</span>
                <span>{stat.base_stat}/250</span>
                <div className='outbar'>
                  <div className='inbar' style={{ width: `${stat.base_stat / 2.5}%` }}></div>
                </div>
              </li>
            ))}
          </ul>
          <div className='pokeinfo__movements'>
            <h2>Movements</h2>
            <ul className='pokeinfo__movements-list'>
              {pokemon?.moves.map(move => (
                <li key={move.move.url} className='pokeinfo__movements-item'>{move.move.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>


  )
}

export default PokeInfo