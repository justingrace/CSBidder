import React from 'react';
import Page from "../Page/Page";
import AppRouter from "../../AppRouter";
import Navbar from '../Navbar/Navbar';

const Layer = () => {
    return (
        <Page>
            <Navbar />
            <AppRouter/>
        </Page>
    );
}

export default Layer;
