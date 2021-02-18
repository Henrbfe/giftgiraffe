import React, {useEffect, useState} from 'react';
import firebase from '../../firebase.config'
import Styling from './giftspage.module.css';
import GiftInputPopUp from '../../components/giftInputPopUp/giftInputPopUp.js';
import UserAnimalButton from '../../components/userAnimalButton/userAnimalButton';

export default function Giftspage({ userAnimalIcons }) {

    const [userAnimals, setUserAnimals] = useState([])

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('/animals')
        .onSnapshot( snapshot => {
            const newUserAnimals = snapshot.docs.map( doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            setUserAnimals(newUserAnimals)
        })
        return () => unsubscribe()
    }, [])

    return (
        <div className={Styling.Root}>
            {userAnimals.map( (userAnimal, index) => (
                <UserAnimalButton key={index} userAnimal={userAnimal} userAnimalIcons={userAnimalIcons}/>
            ))}
        </div>
    );
}
