import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SignOutButton } from '@clerk/clerk-react';

const navOptions = [
  {
    text: 'Home',
    value: '/'
  },
  {
    text: 'Memories',
    value: '/memories'
  },
  {
    text: 'Analysis',
    value: '/analysis'
  }
]

export default function NavigationTab() {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(() => sessionStorage.getItem('currentTab') || 'Home');


  useEffect(() => {
    const path = location.pathname;
    const currentNavOption = navOptions.find(option => option.value === path);
    setCurrentTab(currentNavOption.text);
    sessionStorage.setItem('currentTab', currentNavOption.text);
  }, [location]);


  const updateCurrentTab = (selectedValue) => {
    setCurrentTab(selectedValue)
    sessionStorage.setItem('currentTab', selectedValue)

  }
  return (
    <div className='container' style={{ marginBottom: '16px' }}>
      <div className='navBar'>
        <div className="toggle-container">
          {navOptions.map(option => (
            <Link
              key={option.value}
              to={option.value}
              onClick={() => updateCurrentTab(option.text)}
            >
              <button
                className={`button-medium-secondary ${option.text === currentTab ? 'selected' : ''}`}
              >
                {option.text}
              </button></Link>
          ))}

        </div>
        <div className='signout-container'>
          <SignOutButton className="button-small-subtle" />
        </div>
      </div>

    </div >
  );
}

