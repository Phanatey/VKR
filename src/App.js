import 'antd/dist/antd.css';
import './App.css';
import React, {useEffect, useState} from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import Loading from "./components/shared-components/Loading";
import {Switch, Route, Redirect} from "react-router-dom";
import Dashboard from "./components/layout-components/Dashboard";
import {config} from './config';
import {FirebaseAuthProvider} from "@react-firebase/auth";
import {useDispatch, useSelector} from 'react-redux';
import './auth/FirebaseAuth'
import {authenticated} from "./redux/actions/Auth";

function App() {
    const [, setIsAuthenticated] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                dispatch(authenticated(true));
                setIsAuthenticated(true)
                setIsFetching(false)
                console.log('User is signed in.')// User is signed in.
            } else {
                setIsAuthenticated(false)
                setIsFetching(false)
                console.log('No user is signed in.') // No user is signed in.
            }
        });
    }, [])

    const FetchedApp = () => {
        if (!isFetching) {
            return (
                <FirebaseAuthProvider firebase={firebase} {...config}>
                    <div className="app-container">
                        {auth.isAuthenticated ?
                            <Switch>
                                <Route exact path="/">
                                    <Dashboard/>
                                </Route>
                                <Redirect to="/"/>
                            </Switch> :
                            <Switch>
                                <Route exact path="/auth">
                                    <Auth/>
                                </Route>
                                <Redirect to="/auth"/>
                            </Switch>
                        }
                    </div>
                </FirebaseAuthProvider>
            );
        } else {
            return <Loading cover="content"/>;
        }
    };
    return <FetchedApp/>;
}

export default App;
