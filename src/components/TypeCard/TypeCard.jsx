import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './TypeCard.css';

const TypeCard = ({ name, clickHandler, img }) => {
    return (
        <Card className="type-card" onClick={clickHandler} >
            <CardContent className="type-card__content" style={{padding: 10}}>
                <img src={img} alt="" className="type-card__content-img" />
                <Typography sx={{ fontSize: 18, margin: 0 }} color="text.primary" gutterBottom>
                    { name }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default TypeCard;
