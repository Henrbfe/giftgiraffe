import React from 'react'
import Styling from './userAnimalInfo.module.css'


export default function UserAnimalInfo({ userAnimal, userAnimalIcons }) {

    return (
        <div className={Styling.Root}>
            <span className={Styling.Header}>Welcome {userAnimal.displayName}</span>
            <div className={Styling.IconContainer}>
                <img
                    className={Styling.Icon}
                    src={userAnimalIcons[userAnimal.iconIndex]}
                    alt='animal' />
            </div>
        </div>
    )

}