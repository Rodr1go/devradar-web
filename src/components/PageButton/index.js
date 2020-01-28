import React from 'react';
import './styles.css';

export default function PageButton({ children, funcPage, lock }) {
  return (
    <button className="btn-pages" disabled={lock} onClick={funcPage}>
      {children}
    </button>
  );
}