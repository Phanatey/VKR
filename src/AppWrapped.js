import React from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import store from "./redux/store";
import App from "./App";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function AppWrapped() {
    return (
        <Provider store={store}>
            <Router history={history}>
              <App/>
            </Router>
        </Provider>
    );
}

export default AppWrapped;
