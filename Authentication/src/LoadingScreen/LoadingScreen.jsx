import React from 'react';
import styles from './LoadingScreen.module.css';

import loader from '../assets/firebaseload.gif';

const LoadingScreen = () => {
    return (
        <div className={styles.loaderContainer}>
            <img src={loader} alt="firebase" className={styles.loading}></img>
        </div>
    )
}

export default LoadingScreen;
