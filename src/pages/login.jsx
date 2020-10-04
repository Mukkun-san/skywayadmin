import React, { useState } from "react";
import style from "./styles/login.module.css";
import fetch from "node-fetch";
import { connect } from "react-redux";
import { setAuthState } from "../store/actions";
import Alert from "../components/alert/alert";

//Images
let loginImage = require("../assets/login_image.jpg");

let Login = ({ authState, setAuthState }) => {

    //States
    let [emailId, setEmailId] = useState("");
    let [password, setPassword] = useState("");
    let [rememberMe, setRememberMe] = useState("");
    let [alert, setAlert] = useState({
        show: false,
        msg: "",
    });

    //Functions
    let loginAdmin = async () => {
        try {
            let requiredData = {
                username: emailId,
                password: password,
            };
            let res = await fetch(
                "https://skyway-server.herokuapp.com//api/v1/auth/adminAuth",
                {
                    method: "POST",
                    body: JSON.stringify(requiredData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("res:", res)

            let data = await res.json();

            console.log("data:", data);

            //If authentication is successful
            if (data.result === true) {
                if (rememberMe) {
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("authState", true);
                    setAuthState(true);
                } else {
                    setAuthState(true);
                }
                //window.location.reload()
            } else {
                setAlert({
                    show: true,
                    msg: "Please provide correct email and password."
                })
            }


        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={style.loginPage}>
            <div className={style.centerCard}>
                <div className="row">
                    <div className={`col-md-6 ${style.imageSide}`}>
                        <img
                            src={loginImage}
                            alt="login"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className={`col-md-6 ${style.contentSide}`}>
                        <h3>Login to skyway</h3>
                        <form>
                            <Alert show={alert.show} msg={alert.msg} />
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={(event) =>
                                        setEmailId(event.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </div>
                            <div className="form-check">
                                <input
                                    onChange={() => setRememberMe(!rememberMe)}
                                    type="checkbox"
                                    className="form-check-input"
                                />
                                <label className="form-check-label mb-3">
                                    Keep me signed in
                                </label>
                            </div>

                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    loginAdmin();
                                }}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

function mapProps(state) {
    return {
        authState: state.main.authState,
    };
}

function mapActions(dispatch) {
    return {
        setAuthState(auth_state) {
            dispatch(setAuthState(auth_state));
        },
    };
}

export default connect(mapProps, mapActions)(Login);
