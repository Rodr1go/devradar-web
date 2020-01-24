import React, { useState, useEffect } from 'react';

function EditDev(props) {
  const [dev, setDev] = useState(props.currentDev)
  
  useEffect(() => {
    setDev(props.currentDev)
  }, [props])

  function handleInputChange(event) {
    const { name, value } = event.target;

    setDev({...dev, [name]: value});
  }

  return (
    <form onSubmit={event => {
      event.preventDefault()

      props.updateDev(dev._id, dev)
    }}>

     <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={dev.github_username}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={dev.techs}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={dev.location.coordinates[1]} 
            onChange={handleInputChange}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={dev.location.coordinates[0]}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button className="btn-update">Atualizar</button>
      <button className="btn-cancel" onClick={() => props.setEditing(false)}>Cancelar</button>

    </form>
  )
}

export default EditDev;