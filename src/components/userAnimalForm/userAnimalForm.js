import React, { useState } from 'react'
import Styling from './userAnimalForm.module.css'
import firebase from '../../firebase.config'
import Select from 'react-select'


export default function UserAnimalForm({ userAnimalIcons }) {

    const [userAnimalInfo, setUserAnimalInfo] = useState({
        displayName: '',
        iconIndex: 0,
        userID: firebase.auth().currentUser.uid
    })

    const iconOptions = []

    userAnimalIcons.forEach( (icon, index) => (
        iconOptions.push({
            value: index,
            label: <img src={icon} alt={index} className={Styling.Icon}/>
        })
    ))

    const infoChanged = ( name, value) => {
        setUserAnimalInfo( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const submitUserAnimal = event => {
        event.preventDefault()
        firebase.firestore().collection('/animals')
        .add(userAnimalInfo)
        .then( response => {
            console.log(response)
            setUserAnimalInfo({
                displayName: '',
                iconIndex: 0,
                userID: firebase.auth().currentUser.uid
            })
        })
    }

    return (
        <div className={Styling.Root}>
            <form className={Styling.Form}>
                <span className={Styling.Header}>Create user animal</span>
                <input
                    className={Styling.Input}
                    name='displayName'
                    value={userAnimalInfo.displayName}
                    placeholder='Displayname'
                    onChange={e => { infoChanged( e.target.name, e.target.value )}}
                    />
                <label className={Styling.SelectLabel}>Choose an icon
                    <Select
                        className={Styling.Select}
                        name='icons'
                        options={iconOptions}
                        onChange={e => { infoChanged( 'iconIndex', e.value)}} />
                </label>
                <button onClick={submitUserAnimal} className={Styling.Button}>
                    Submit
                </button>
            </form>
        </div>
    )
}