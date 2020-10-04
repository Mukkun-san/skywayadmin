import React from "react";
import style from "./sidebar.module.css";
import { NavLink } from "react-router-dom";

//Icons
let homeIcon = require("../../assets/home.svg");
let menuIcon = require("../../assets/box.svg");
let emailIcon = require("../../assets/email.png");

const Sidebar = () => {
    return (
        <div>
            <div className={style.sidebar}>
                <div className={style.brand}>skyway admin</div>
                <div className={style.tileContainer}>
                    <NavLink to={'/admin'} activeClassName={style.active}>
                        <div className={style.tile}>
                            <img
                                width={25}
                                height={25}
                                src={homeIcon}
                                alt="home icon"
                            />
                            Home
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/packages'} activeClassName={style.active}>
                        <div className={style.tile}>
                            <img
                                width={25}
                                height={25}
                                src={menuIcon}
                                alt="home icon"
                            />
                        Packages
                    </div>
                    </NavLink>
                    <NavLink to={'/admin/emails'}>

                        <div className={style.tile}>
                            <img
                                width={25}
                                height={25}
                                src={emailIcon}
                                alt="home icon"
                            />
                            Mailing List
                    </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
