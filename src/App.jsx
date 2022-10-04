
import  axios  from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandonNumber'

function App() {

  const [location, setLocation] = useState()
  const [searchInput, setSearchInput] = useState("")
  const [suggestedList, setSuggestedList] = useState()
  const [hasError, setHasError] = useState(false)
  

  useEffect(() => {
    
    let id = getRandomNumber()
    if(searchInput){
      id = searchInput  
    }
    const URL = `https://rickandmortyapi.com/api/location/${id}`
  
    axios.get(URL)
    .then(res => {
    setLocation(res.data)
    setHasError(false)})
    .catch(err => setHasError(true))
   
  }, [searchInput])
  

  const handlerSubmit = (e) => {
    e.preventDefault()
    setSearchInput(e.target.idLocation.value)
  }
 
  const handlerChange = (e) => {


    if(e.target.value === ""){
      return setSuggestedList()
    }

    const URL = `https://rickandmortyapi.com/api/location?name=${e.target.value}`

    axios.get(URL)
    .then(res => setSuggestedList(res.data.results))
    .catch(err => console.log(err))
  }

  
  return (
    <div className="App">

      <header className="header">
      <h1 className="title">Rick And Morty</h1>
      <form onSubmit={handlerSubmit}>
        <input className="search_input" id="idLocation" placeholder="Please enter a text" autocomplete="off"
        type="text" 
        onChange={handlerChange}
        />
       

          <FilterList  suggestedList={suggestedList} setSearchInput={setSearchInput} />

      </form>

      </header>
      {
        hasError ?
        <ErrorScreen />
          :
          <>
          <LocationInfo location={location}  />
         <div className="card-container">
           {
             location?.residents.map(url => (
               <CardResident 
               key={url}
               url={url}
   
               />
             ))
           }
         </div></>
         
      }
     
    </div>
  )
}

export default App
