import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';

import './NavBar.css';

const NavBar = () => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [lang, setLang] = useState('Русский');
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
        setLang(event.target.innerText);
    };

    return (
        <div className="navbar">
            <div className="navbar__logo" onClick={() => history.push('/')}>
                <img className="navbar__logo-img" src="images/logo.png" alt="logo" />
                <div className="navbar__logo-line" />
                <div>
                    <div className="navbar__logo-text navbar__logo-text--name">PDFлаб</div>
                    <div className="navbar__logo-text navbar__logo-text--desc">Простые решения для сложных проблем</div>
                </div>
            </div>
            <div className="navbar__lang" >
                <LanguageIcon
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className="navbar__lang-icon"
                />
                {lang}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Русский</MenuItem>
                    <MenuItem onClick={handleClose}>English</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default NavBar;
