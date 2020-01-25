import React from 'react';
import './styles.css';

function DevItem({ dev, onUpdate, onDelete }) {

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(',')}</span>
        </div>
      </header> 
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no github</a>
      <button className="btn-edit" onClick={onUpdate}>
        <i className="material-icons">
         edit 
        </i>
      </button>
      <button className="btn-delete" onClick={onDelete}>
        <i className="material-icons">
          delete
        </i>
      </button> 
    </li>
  )
}

export default DevItem;