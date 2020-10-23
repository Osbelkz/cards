import React from 'react';
import './App.css';
import Main from './Main/Main';
import {useDispatch} from "react-redux";

const App = () => {

    const dispatch = useDispatch()

    return (
        <div className="App">
            <Main />
        </div>
    );
}

export default App;
