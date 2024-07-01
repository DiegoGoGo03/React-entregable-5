import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useFetch from '../hooks/useFetch'
import PokeCard from '../components/pokedex/PokeCard'
import PokeSelect from '../components/pokedex/PokeSelect'
import './styles/pokedex.css'

const Pokedex = () => {
  
  const trainer = useSelector((store) => store.trainer)
  const [inputValue, setInputValue] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const [paginaActual, setPaginaActual] = useState(1)
  const pokemonsPorPagina = 10

  const [pokemons, getPokemons, getType] = useFetch()

  useEffect(() => {
    if (typeFilter) {
      getType(typeFilter)
    } else {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=100'
      getPokemons(url)
    }
    
  }, [typeFilter])

  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    setInputValue(textInput.current.value.trim().toLowerCase())
    textInput.current.value = ''
    setPaginaActual(1)
  }

  const cbFilter = (poke) => {
    return poke.name.includes(inputValue)
  }
  
  const pokemonsFiltrados = pokemons?.results.filter(cbFilter) || []
  const indexOfLastPokemon = paginaActual * pokemonsPorPagina
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPorPagina
  const currentPokemons = pokemonsFiltrados.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const totalPages = Math.ceil(pokemonsFiltrados.length / pokemonsPorPagina);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className='pokedex'>
      <h3 className='pokedex__wave'><span>Welcome {trainer}, </span>You could find your favorite pokemon here, let's go!</h3>
      <div className='pokedex__filters'>
        <form onSubmit={handleSubmit}>
          <input ref={textInput} type="text" />
          <button>Search</button>
        </form>
        <PokeSelect setTypeFilter={setTypeFilter} />
      </div>
      <div className='pokedex__container'>
        {currentPokemons.map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>
      <div className='pokedex__pagination'>
        {[...Array(totalPages).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => handleClick(number + 1)}
            className={paginaActual === number + 1 ? 'active' : ''}
          >
            {number + 1}
          </button>
        ))}
      </div>
      <br />
    </div>
  );
};

export default Pokedex;