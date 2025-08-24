import React, { useEffect, useState } from 'react'
import '../App.css'
import { SidebarData } from './SidebarData'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa';

function Sidebar({setIsLoggedIn}) {
    const navigator=useNavigate();
    const location=useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const[subnav, setSubnav]=useState({});

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubnav = (index) => {
        setSubnav(prev => ({ ...prev, [index]: !prev[index] }));
    };

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

  return (
    <div>
      <div className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </div>

      {isOpen && (
        <div className="Sidebar">
          <ul className="SidebarList">
            {SidebarData.map((val, key) => (
              <>
                <li
                  key={key}
                  className="row"
                  id={window.location.pathname === val.link ? 'active' : ''}
                  onClick={() => {
                    if (val.subNav) {
                      toggleSubnav(key);
                    } else {
                      navigator(val.link);
                    }
                  }}
                >
                <div className="row-content">
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
                </div>
                    {val.subNav && (subnav[key] ? val.iconOpened : val.iconClosed)}
                
               
                </li>

                {val.subNav && subnav[key] && (
                  <ul className="SubMenu">
                    {val.subNav.map((sub, subIndex) => (
                      <li
                        key={subIndex}
                        className="subRow"
                        onClick={() => navigator(sub.link)}
                      >
                        <div id="title">{sub.title}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sidebar