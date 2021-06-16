import React, {useState} from 'react'
import {Input, PageHeader, Button} from "antd";
import "./Auth.css";
import * as firebase from "firebase/app";
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {authenticated} from "../redux/actions/Auth";
import FirebaseService from "../services/FirebaseService";

function Auth() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [successAuth, setIsSuccessAuth] = useState(true)
    const [loginBtn, setLoginBtn] = useState(false)
    const style = {
        width: 200,
        marginBottom: 10,
        borderColor: successAuth ? null : 'red'
    }

    const login = () => {
        setLoginBtn(true)
        setTimeout(() => {
            FirebaseService.signInEmailRequest(userEmail, userPassword).then(() => {
                setIsSuccessAuth(auth.isAuthenticated)
                if (auth.isAuthenticated) {
                    dispatch(authenticated(true));
                } else {
                    setLoginBtn(false)
                }
            })
        }, 700)
    }

    return (
        <div>
            <div className="auth-container">
                <div className="auth-content">
                    <Input onChange={(e) => setUserEmail(e.target.value)} prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Почта"
                           style={style}/>
                    <Input onChange={(e) => setUserPassword(e.target.value)} type="password" placeholder="Пароль" style={style}/>
                    <Button loading={loginBtn} onClick={() => login()} type="primary">Войти</Button>
                </div>
            </div>
        </div>

    );
}

export default Auth;
