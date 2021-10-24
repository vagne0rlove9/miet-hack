import React from 'react';
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TypeCard from '../TypeCard/TypeCard';

import './Home.css';

const Home = () => {
    const history = useHistory();

    const clickCardHandler = type => {
        history.push(`/${type}`);
    }

    return (
        <>
            <Typography
                variant="h3"
                gutterBottom
                component="div"
                style={{ margin: 16, textAlign: 'center' }}
            >
                Онлайн-сервис для работы с PDF
            </Typography>
            <Typography
                variant="body1"
                gutterBottom
                component="div"
                style={{
                    marginBottom: 48,
                    textAlign: 'center',
                    color: '#79797A',
                    fontSize: 16,
                    fontWeight: 100
                }}
            >
                Универсальный онлайн-сервис для редактирования ПДФ файлов, поможет решить все проблемы
            </Typography>
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
                        img="images/pdfAdd.jpg"
                        clickHandler={() => clickCardHandler("union")}
                    />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <TypeCard
                        name="Разделить PDF"
                        img="images/pdfSplit.jpg"
                        clickHandler={() => clickCardHandler("split")}
                    />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <TypeCard
                        name="Удалить страницы из PDF"
                        img="images/pdfDelete.jpg"
                        clickHandler={() => clickCardHandler("delete")}
                    />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <TypeCard
                        name="Повернуть PDF"
                        img="images/pdfRotate.jpg"
                        clickHandler={() => clickCardHandler("rotate")}
                    />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <TypeCard
                        name="PDF в изображения"
                        img="images/pdfImages.png"
                        clickHandler={() => clickCardHandler("archive")}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Home;
