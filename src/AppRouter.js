import React from 'react';
import Home from './components/Home/Home';
import About from './components/About/About';
import {Switch, Route} from 'react-router-dom';
import Results from "./components/Results/Results";

const AppRouter =  () => (
    <Switch>
        <Route path='/about' component={About}/>
        <Route path='/results' component={Results}/>
        <Route path='/' component={Home}/>
    </Switch>
);

export default AppRouter;
