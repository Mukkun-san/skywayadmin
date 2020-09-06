import React from 'react';
import style from './loading.module.css'

let loadingAnimationImg = require('../../assets/loading_animation.svg');

let Loading = ({children , show}) => {
    if(show){
        return (
            <div className={style.loading}>
                <img width={100} height={100} src={loadingAnimationImg} alt="loading animation"/>
            </div>
        )
    }else{
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }
}

export default Loading;


