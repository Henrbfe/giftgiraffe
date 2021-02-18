import React, { useState } from 'react'
import Styling from './loginForm.module.css'
import firebase from '../../firebase.config'
import { useHistory } from 'react-router-dom'

export default function LoginForm({ changeUser }) {

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    let history = useHistory()

    const handleLogin = event => {
        event.preventDefault()
        firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
            .then( userCredential => {
                console.log(userCredential)
                setUserInfo({
                    email: '',
                    password: ''
                })
                changeUser(firebase.auth().currentUser)
                history.push('/Home')
            })
            .catch( error => {
                console.log(error)
            })
    }

    const inputValueChange = event => {
        const { name, value } = event.target
        setUserInfo( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <form className={Styling.Form}>
            <span className={Styling.Header}>Login</span>
            <input
                className={Styling.Input}
                type='text'
                name='email'
                placeholder='Email'
                value={userInfo.email}
                onChange={inputValueChange} />
            <input
                className={Styling.Input}
                type='text'
                name='password'
                placeholder='Password'
                value={userInfo.password}
                onChange={inputValueChange} />
            <button
                className={Styling.Button}
                onClick={handleLogin}
                >
                    Log in
                </button>
        </form>
    )
}