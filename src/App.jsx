
import { useEffect, useRef } from 'react'
import './App.css'
import UseFetch from './Hooks/UseFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentsCard from './components/ResidentsCard'
import { useState } from 'react'

function App() {
  
  const [inputValue, setInputValue] = useState(getRandomNumber(126))

  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [ location, getLocation, hasError ] = UseFetch(url)

  useEffect(() => {
    getLocation()
  }, [inputValue])

   const  inputSearch = useRef()

   const handleSubmit = e => {
      e.preventDefault()
      setInputValue(inputSearch.current.value.trim())
   }

  return (
    
    <div className='portada'>
      <h1 className='title__one'>Rick and Morty App</h1>
      <article><img src="src/components/image/Untitled.png" alt="" /></article>
      <form onSubmit={handleSubmit}>
        <input id= 'input'ref={inputSearch} type="text" placeholder='Write a number' />
        <button id='buscar'>Buscar</button>
      </form>
      {
        hasError
        ? <h2>🙌 Please choose a number from 1 to 126🤔</h2>
        : (
           <>
            <LocationInfo
             location = {location}
            />
      <div>
            {
        
          location?.residents.map(url => (
            <ResidentsCard
            key={url}
            url= {url}
            />
          ))
        }
         </div>
         </>
           )
           }
       </div>
      )
    }

export default App
