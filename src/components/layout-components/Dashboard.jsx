import React, {useEffect, useState} from 'react'
import './Dashboard.css';
import {Button, Space, Spin, Table, Tag} from 'antd';
import {Link} from "react-router-dom";
import FirebaseService from "../../services/FirebaseService";
import {authenticated} from "../../redux/actions/Auth";
import {useDispatch} from "react-redux";
import {Select} from 'antd';
import {data1} from "../../data/data1";
import {data2} from "../../data/data2";
import {data3} from "../../data/data3";
import img1 from "../../data/Снимок1.PNG";
import img2 from "../../data/Снимок2.PNG";
import img3 from "../../data/Снимок3.PNG";


const {Column, ColumnGroup} = Table;
const {Option} = Select;

function Dashboard() {
    const prognose1 = [{month: 37, analysis: 3, prognose: 109}, {month: 38, analysis: 6, prognose: 106}, {month: 39, analysis: 9, prognose:104}]
    const prognose2 = [{month: 37,  analysis: 4, prognose: 95}, {month: 38,  analysis: 7, prognose: 92}, {month: 39,  analysis: 11, prognose:90}]
    const prognose3 = [{month: 37,  analysis: 5, prognose: 93}, {month: 38,  analysis: 10, prognose: 91}, {month: 39,  analysis: 16, prognose:89}]


    const dispatch = useDispatch();
    const [state, setState] = useState(data1);
    const [statePrognose, setStatePrognose] = useState([]);
    const [stateNum, setStateNum] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [test, setTest] = useState(false);

    function handleChange(value) {
        setTest(false)
        setLoading2(true)
        setTimeout(() => {
            setLoading2(false)
        }, 2000)

        if (value === 'data1') {
            setState(data1)

            setStateNum(1)
        }
        if (value === 'data2') {

            setState(data2)
            setStateNum(2)
        }
        if (value === 'data3') {

            setState(data3)
            setStateNum(3)
        }
    }

    function cirk () {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setTest(true)
            if (stateNum === 1) {
                setStatePrognose(prognose1)
            }
            if (stateNum === 2) {
                setStatePrognose(prognose2)
            }
            if (stateNum === 3) {
                setStatePrognose(prognose3)
            }
        }, 2000)

    }

    function callback(key) {
        console.log(key);
    }

    const columns = [
        {
            title: 'Месяц',
            dataIndex: 'month',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: "Товар " + stateNum,
            dataIndex: 'product',
            key: 'age',
        },
    ];

    return (
        <div style={{position: 'relative'}}>
            <div className={"tablesContainer"}>
                <div className={"firstTable"}>
                    <Table bordered pagination={false} columns={columns} dataSource={state}/>
                </div>
                <div className={"secondTable"}>
                    <Table loading={isLoading} bordered pagination={false} dataSource={statePrognose}>
                        <ColumnGroup title="Прогноз">
                            <Column width={100} title="Месяц" dataIndex="month" key="month"/>
                            <Column width={100} title={`Товар ${stateNum}`} dataIndex="prognose" key="key"/>
                            <ColumnGroup width={200} dataIndex="analysis" title="Оценка приемлемости прогноза"/>
                        </ColumnGroup>
                    </Table>
                </div>
                <div style={{display: 'block'}}>
                    <Select defaultValue="data1" style={{width: '100%'}} onChange={handleChange}>
                        <Option value="data1">Товар 1</Option>
                        <Option value="data2">Товар 2</Option>
                        <Option value="data3">Товар 3</Option>
                    </Select>
                    <Button style={{width: '100%', marginTop: 10}} onClick={() => {cirk()}}>Рассчитать</Button>
                </div>
                <div className={"img"}>
                    { isLoading && <Spin size="large" />}
                    {test && stateNum === 1 && <img src={img1}/>}
                    {test && stateNum === 2 && <img src={img2}/>}
                    {test && stateNum === 3 && <img src={img3}/>}
                </div>
            </div>
            <div className="header-btn-container">
                <Link to="/">
                    <Button onClick={() => FirebaseService.signOutRequest().then(() => {
                        window.location.href = '/';
                        localStorage.clear();
                        dispatch(authenticated(false))
                    })}>Выйти</Button>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
