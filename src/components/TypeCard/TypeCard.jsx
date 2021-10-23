import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './TypeCard.css';

const TypeCard = ({ name, clickHandler }) => {
    return (
        <Card className="type-card" onClick={clickHandler}>
            <CardContent className="type-card__content">
                <img src="icon.png" alt="" className="type-card__content-img" />
                <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                    { name }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default TypeCard;
