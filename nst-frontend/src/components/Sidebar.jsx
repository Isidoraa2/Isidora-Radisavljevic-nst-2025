import React, { useEffect, useState } from 'react'
import '../App.css'
import { SidebarData } from './SidebarData'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa';

function Sidebar({setIsLoggedIn}) {
    const navigator=useNavigate();
    const location=useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

  return (
    <div>
        <div className="hamburger" onClick={toggleSidebar}>
            <FaBars />
        </div>
        {isOpen && <div className='Sidebar'>
         <ul className='SidebarList'>
            {SidebarData.map((val, key)=>{
                return(
                    <li key={key}
                    className='row'
                    id={window.location.pathname ==val.link ? 'active': ''}
                    onClick={()=>{navigator(val.link);}}>
                        <div id="icon">{val.icon}</div>
                        <div id="title">{val.title}</div>
                    </li>
                )
            })}
        </ul> </div>}
        
    </div>
  )
}

export default Sidebar