import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

import EditDev from './components/DevForm/EditDev';

function App() {
  const [devs, setDevs] = useState([]);
  const [editing, setEditing] = useState(false)
  
  const [currentDev, setCurrentDev] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, [])
  
  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    
    setDevs([...devs, response.data]);
  }
  
  async function updateDev(id, updatedDev) {
    setEditing(false)
    
    const response = await api.put(`/devs/${id}`, updatedDev)

    setDevs(devs.map(dev => (dev._id === id ? response.data : dev)))
  }

  const editForm = dev => {
    setEditing(true)

    setCurrentDev(dev)
  }

  async function deleteDev(dev, index) {
    await api.delete(`/devs/${dev._id}`)
    const devsCopy = Array.from(devs);
    devsCopy.splice(index, 1);
    
    setDevs(devsCopy)
  }

  return (
    <div id="app">
      {editing ? (
        <aside>
          <strong>Atualizar</strong>
          <EditDev 
            editing={editing}
            setEditing={setEditing}
            currentDev={currentDev}
            updateDev={updateDev}
          />
        </aside>
      ) : (
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
        </aside>
      )}

      <main>
        <ul>
          {devs.map((dev, index) => (
            <DevItem key={dev._id} dev={dev} onUpdate={() => editForm(dev)} onDelete={() => deleteDev(dev, index)} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
