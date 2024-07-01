import React, { useEffect, useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import './styles/pokeSelect.css'

const PokeSelect = ({setTypeFilter}) => {
  
  const [types, getTypes] = useFetch()

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/type'
    getTypes(url)
  }, [])

  const valueSelect = useRef()

  const handleChange = () => {
    setTypeFilter(valueSelect.current.value)
  }

  return (
    <select className='pokeselect__options' onChange={handleChange} ref={valueSelect}>
      <option value="">All pokemos</option>
      {
        types?.results.map(type => (
          <option key={type.url} value={type.url}>
            {type.name}
          </option>
        ))
      }
    </select>
  )
}

export default PokeSelect
