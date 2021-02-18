import React from 'react';
import firebase from '../../firebase.config'
import { useHistory } from 'react-router-dom'
import Styling from './settingspage.module.css'

export default function Settingspage() {

    let history = useHistory()

    const logOut = () => {
        firebase.auth().signOut().then(() => {
            console.log('User signed out.')
            console.log(firebase.auth().currentUser)
            history.push('/')
        })
        .catch( error => {
            console.log(error)
        })
    }

    return (
        <div className={Styling.Root}>
            <div className={Styling.HeaderBox}>
                <span className={Styling.Header}>Settings</span>
            </div>
            <button onClick={logOut} className={Styling.Button}>Log out</button>
        </div>
    );
}