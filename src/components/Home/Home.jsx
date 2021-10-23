import React from 'react';
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TypeCard from '../TypeCard/TypeCard';

import './Home.css';

const Home = () => {
    const history = useHistory();

    const clickCardHandler = type => {
        history.push(`/${type}`);
    }

    return (
        <Grid

            justifyContent="center"
            alignItems="center"
            container
            spacing={2}
            columns={{ xs: 4, sm: 12, md: 16 }}
        >
            <Grid item xs={2} sm={4} md={4}>
                <TypeCard
                    name="Объединить PDF"
                    clickHandler={() => clickCardHandler("union")}
                />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
                <TypeCard
                    name="Разделить PDF"
                    clickHandler={() => clickCardHandler("split")}
                />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
                <TypeCard
                    name="Удалить страницы из PDF"
                    clickHandler={() => clickCardHandler("delete")}
                />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
                <TypeCard
                    name="Повернуть PDF"
                    clickHandler={() => clickCardHandler("rotate")}
                />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
                <TypeCard
                    name="PDF в изображения"
                    clickHandler={() => clickCardHandler("archive")}
                />
            </Grid>
        </Grid>
    )
}

export default Home;
