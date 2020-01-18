import React, { useEffect, useState } from 'react';
//components
import DevBoard from './components/DevBoard';
import Form from './components/form';
//Services
import api from './services/http';
//Styles
import './Global.css';
import './App.css';


function App() {

  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleDevAdd(data) {
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }
  return (
    <div id="app">
      <aside>
        <Form onSubmit={handleDevAdd} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => <DevBoard key={dev._id} devInfo={dev} />)}
        </ul>
      </main>
    </div>
  );
}

export default App;
