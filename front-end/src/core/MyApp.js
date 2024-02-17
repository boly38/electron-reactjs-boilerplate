// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import './MyApp.css';
import {Component} from "react";
import Api from "../services/Api";
import {isSet} from "../services/util";

import {Navbar} from 'react-bootstrap'

const THREE_SECONDS = 3000;
export default class MyApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: null,
            showMenu: false,
            isApiBackendReady: false,
            queryInProgress: false,
            lastUpdate: null,
            aboutResponse: null
        }
    }

    componentDidMount() {
        if (isSet(window.electronAPI)) {
            window.electronAPI.onUpdateBackendUrl((backendUrl) => {
                console.log("electronAPI::onUpdateBackendUrl;" + backendUrl);
                Api.setBaseUrl(backendUrl);
                this.setState({"isApiBackendReady": true}, () => this.refreshState());
            })
        } else {
            const backendUrl = process.env.CB_DEV_BACKEND_URL || "http://localhost:3000";
            console.warn(`electronAPI::onUpdateBackendUrl not defined, backendUrl:${backendUrl}`);// DEV mode
            Api.setBaseUrl(backendUrl);
            this.setState({"isApiBackendReady": true}, () => this.refreshState());
        }
    }
    refreshState() {
        const component = this;
        const {isApiBackendReady, queryInProgress, aboutResponse} = this.state;
        if (aboutResponse !== null) {
            return;
        }
        if (!isApiBackendReady || queryInProgress) {// don't call backend api when not ready or already querying
            setInterval(() => this.refreshState(), THREE_SECONDS);
            return;
        }
        component.setState({"queryInProgress": true}, () => {
            Api.about()
                .then(response => this.setState({"queryInProgress": false, "aboutResponse": response}))
                .catch(errorMessage => this.setState({"queryInProgress": false, errorMessage}));
        })

    }
    render() {
        const {
            errorMessage, isApiBackendReady,
            aboutResponse
        } = this.state;
        if (!isApiBackendReady) {
            return (<div className="myApp">
                backend api not ready
                {errorMessage && (<><br/>{errorMessage}</>)}
            </div>);
        }
        return (<>
            <div className="myApp">
                <Navbar expand="lg" className="bg-body-tertiary cbBar">
                    <Navbar>
                        <Navbar.Brand href="#home">
                            boly38/electron-reactjs-boilerplate
                        </Navbar.Brand>
                    </Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                </Navbar>
                <div id="cMainContent">
                    ReactJS Boilerplate<br/>
                    isApiBackendReady : {isApiBackendReady ? "yes" : "no"}<br/>
                    {aboutResponse && (<><br/>About : <pre>{JSON.stringify(aboutResponse, null, 4)}</pre><br/></>)}
                    Tip: shift+ctrl+i will open Chromium DEV tools.<br/>
                </div>
            </div>
        </>);
    }

}

