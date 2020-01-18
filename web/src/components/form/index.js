import React, {useState, useEffect} from 'react';
import './styles.css';

function Sidebar({onSubmit}){
  
  const [ latitude, setLatitude] = useState('')
  const [ longitude, setLongitude] = useState('')
  const [ github_username, setGithubUsername] = useState('')
  const [ techs, setTechs] = useState('')
  
  useEffect(()=>{
    
    navigator.geolocation.getCurrentPosition(
        (geolocation)=>{
          const {latitude, longitude} = geolocation.coords;
            setLatitude(latitude)
            setLongitude(longitude)
        },
        (error)=>{
            console.log(error)
        },
        {
            timeout: 3000                
        }
    )
  }, [])


  async function handleSubmit(e){
    e.preventDefault()
    await onSubmit({
      github_username, 
      techs, 
      latitude, 
      longitude
    })

    setGithubUsername('')
    setTechs('')
  }

  return (
      <>
      <strong>Cadastrar</strong>
      <form onSubmit={handleSubmit}>

        <div className="inputBlock">

          <label htmlFor="github_username">Usuário do Github</label>
          <input 
          name="github_username" 
          id="github_username" 
          required 
          value={github_username}
          onChange={e=>setGithubUsername(e.target.value)}/>

        </div>

        <div className="inputBlock">

          <label htmlFor="techs">Tecnologias</label>
          <input 
          name="techs" 
          id="techs" 
          required 
          value={techs}
          onChange={e=>setTechs(e.target.value)}/>

        </div>

        <div className="groupInput">

          <div className="inputBlock">
            <label htmlFor="latitude">latitude</label>
            <input 
              name="latitude" 
              id="latitude" 
              required 
              value={latitude} 
              type="number"
              onChange={e=>setLatitude(e.target.value)}
              />
          </div>

          <div className="inputBlock">
            <label htmlFor="longitude">Longitude</label>
            <input 
              name="longitude" 
              id="longitude" 
              required 
              value={longitude} 
              type="number"
              onChange={e=>setLongitude(e.target.value)}
              />
          </div>
        </div>
        <button type="submit"> Salvar </button>
      </form>
    </>
  )
}

export default Sidebar