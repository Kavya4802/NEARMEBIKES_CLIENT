import React from 'react';
import './Components.css';

const DropDown = ({ onLogout }) => {
    const handleLogout = () => {
        // Call the onLogout function passed as a prop
        onLogout();
    };

    return (
        <div className='flex flex-col dropDownProfile'>
            <ul className='flex flex-col gap-4'>
                {/* You can add more items to the dropdown if needed */}
                {/* <li style={{listStyle:"none"}}>Profile</li> */}
                <li style={{ listStyle: 'none', cursor: 'pointer' }} onClick={handleLogout}>
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default DropDown;