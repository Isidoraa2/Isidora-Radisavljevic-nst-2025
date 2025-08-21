import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h4 className="sidebar-title">Meni</h4>
      <ul className="sidebar-list">
        <li>
          <span>Dobavljač</span>
          <ul>
            <li><Link to="/dodaj-dobavljaca">Dodaj dobavljača</Link></li>
            <li><Link to="/dobavljaci">Prikaži sve dobavljače</Link></li>
            <li><Link to="/prikaz-dobavljaca/1">Pronađi dobavljača</Link></li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}