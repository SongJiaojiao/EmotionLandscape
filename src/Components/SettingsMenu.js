import React, { useRef, useEffect } from 'react';
import { SignOutButton } from '@clerk/clerk-react';

const SettingsMenu = ({ actions, closeMenu }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            closeMenu();
          }
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [closeMenu]);
    


    return (
        <div className="menuOverlayContainer" ref={menuRef}>

            <div className="settings-dropdown">
                {actions.map((action, index) => (
                    <div className="menu-item-small" key={index} onClick={action.onClick} >
                        {action.label === 'Sign out' ? (
                            <SignOutButton className='removeClerkStyling'>{action.label}</SignOutButton>
                        ) : action.label
                        }
                    </div>

                ))}

            </div>

        </div>
    );
};

export default SettingsMenu;
