import React, { useState } from 'react'
import Styling from './loginpage.module.css'
import LoginForm from '../../components/loginForm/loginForm'
import RegisterFrom from '../../components/registerForm/registerForm'

export default function Loginpage({ changeUser }) {

    const [isUserRegistered, setIsUserRegistered] = useState(true)

    const toggleIsUserRegistered = () => {
        setIsUserRegistered(!isUserRegistered)
    }

    if (isUserRegistered) {
        return (
            <div className={Styling.Root}>
                <LoginForm changeUser={changeUser}/>
                <button onClick={toggleIsUserRegistered} className={Styling.Button}>
                    Don't have a user yet?
                </button>
        </div>
        )
    }

    else {
        return (
            <div className={Styling.Root}>
                <RegisterFrom changeUser={changeUser}/>
                <button onClick={toggleIsUserRegistered} className={Styling.Button}>
                    Already have a user?
                </button>
            </div>
        )
    }
}