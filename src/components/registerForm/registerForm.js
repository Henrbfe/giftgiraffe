import React, { useState } from 'react'
import Styling from './registerForm.module.css'
import firebase from '../../firebase.config'
import { useHistory} from 'react-router-dom'

export default function RegisterFrom({ changeUser }) {

    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: ''
    })

    let history = useHistory()

    const inputValueChange = event => {
        const { name, value } = event.target
        setUserInfo( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const registerUser = event =>  {
        event.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then((userCredential) => {
                console.log(userCredential)
                setUserInfo({
                    username: '',
                    email: '',
                    password: ''
                })
                changeUser(firebase.auth().currentUser)
                history.push('/Home')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <form className={Styling.Form}>
            <span className={Styling.Header}>Register</span>
            <input
                className={Styling.Input}
                type='text'
                name='username'
                placeholder='Username'
                value={userInfo.username}
                onChange={inputValueChange} />
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
            <button className={Styling.Button} onClick={registerUser}>
                Register
            </button>
        </form>
    )
}