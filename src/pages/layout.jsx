import React, { useEffect } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import style from './styles/layout.module.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './homepage/homepage';
import Packages from './packages/packages';
import Emails from './emails/emails';
import { connect } from 'react-redux';
import { setPackageDetail } from '../store/actions'

let DashboardLayout = ({ setPackageDetail }) => {
    let fetchPackagesData = async () => {
        try {
            let res = await fetch('https://skyway-server.herokuapp.com/api/v1/packages/getAllPackages')
            let data = await res.json()
            return data
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPackagesData().then(res => {
            setPackageDetail(res)
            console.log(res)
        })
    }, [])

    return (
        <div className={style.layout}>
            <BrowserRouter>
                <Sidebar />
                <br />
                <h2 class="mx-auto"><a href="https://skywaytour.netlify.app/">Visit https://skywaytour.netlify.app</a></h2>
                <Switch>
                    <Route exact path='/admin' component={Homepage} />
                    <Route exact path='/admin/packages' component={Packages} />
                    <Route exact path='/admin/emails' component={Emails} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

function mapProp(state) {
    return {

    }
}

function mapActions(dispatch) {
    return {
        setPackageDetail(details) {
            dispatch(setPackageDetail(details))
        }
    }
}

export default connect(mapProp, mapActions)(DashboardLayout);
