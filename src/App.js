import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

import PageButton from './components/PageButton';

import EditDev from './components/DevForm/EditDev';

function App() {
  const [devs, setDevs] = useState([]);
  const [editing, setEditing] = useState(false)
  
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  
  const [currentDev, setCurrentDev] = useState(null)

  
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs', {
        params: { page }
      });
      
      if (response.data.count <= 4) {
        setPage(1);
      }
      
      setTotalPages(Math.ceil(response.data.count / 4, 1))
      setDevs(response.data.devs);
    }
    loadDevs();
  }, [page])
   
  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    
    setDevs([...devs, response.data.devs]);
  }
  
  async function updateDev(id, updatedDev) {
    setEditing(false)
    
    const response = await api.put(`/devs/${id}`, updatedDev)

    setDevs(devs.map(dev => (dev._id === id ? response.data.devs : dev)))
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

        <div className="pagination">
          <PageButton lock={page < 2} funcPage={() => setPage(page - 1)}>
            <i className="material-icons">keyboard_arrow_left</i>
          </PageButton>
          
          <PageButton
            lock={page === totalPages}
            funcPage={() => setPage(page + 1)}
          >
            <i className="material-icons">keyboard_arrow_right</i>
          </PageButton>
        </div>
      </main>
    </div>
  );
}

export default App;
