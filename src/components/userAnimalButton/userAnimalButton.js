import React from 'react'
import { useHistory } from 'react-router-dom'
import Styling from './userAnimalButton.module.css'


export default function UserAnimalButton({ userAnimal, userAnimalIcons }) {

    let history = useHistory()

    const goToRecipientPage = () =>  {
        history.push(`/gifts/${userAnimal.displayName}`)
    }

    return (
        <button className={Styling.Button} onClick={goToRecipientPage}>
            <img className={Styling.Icon} src={userAnimalIcons[userAnimal.iconIndex]} alt='animal' />
            <div className={Styling.Namebox}>
                {userAnimal.displayName}
            </div>
        </button>
    )
}
