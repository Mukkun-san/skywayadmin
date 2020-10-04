import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Login from './pages/login';
import { setAuthState } from './store/actions'
import fetch from 'node-fetch'
import Loading from './components/loading/loading';


let Auth = ({ children, authState, setAuthState }) => {

    let [refreshingAuth, setRefreshingAuth] = useState(true)

    let verifyAuthToken = async (token) => {
        try {
            let res = await fetch(`https://skyway-server.herokuapp.com//api/v1/auth/adminVerifyToken/${token}`)
            let data = await res.json()
            console.log(data)
            return data.result;
        } catch (err) {
            console.log(err);
            return false
        }
    }

    useEffect(() => {
        let localAuth = localStorage.getItem('authState')
        let token = localStorage.getItem('jwt')

        if (token !== '' && token !== null && localAuth !== "false") {
            verifyAuthToken(token).then(res => {
                setRefreshingAuth(false)
                setAuthState(res)
            })
        } else {
            setRefreshingAuth(false)
            setAuthState(false)
        }

    }, [])

    if (authState !== true) {
        return (
            <Loading show={refreshingAuth}>
                <Login />
            </Loading>
        )
    } else {
        return (
            <Loading show={refreshingAuth}>
                <React.Fragment>
                    {children}
                </React.Fragment>
            </Loading>
        )
    }
}

function mapProps(state) {
    return {
        authState: state.main.authState
    }
}

function mapActions(dispatch) {
    return {
        setAuthState(auth_state) {
            dispatch(setAuthState(auth_state));
        }
    }
}

export default connect(mapProps, mapActions)(Auth);
