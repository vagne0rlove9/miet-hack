import React from 'react';
import NavBar from '../NavBar/NavBar';

import './Layout.css';

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <div className="main-container">
                {children}
            </div>
        </>
    )
}

export default Layout;
