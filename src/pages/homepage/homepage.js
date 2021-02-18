import React, { useEffect, useState } from "react";
import UserAnimalForm from "../../components/userAnimalForm/userAnimalForm";
import UserAnimalInfo from "../../components/userAnimalInfo/userAnimalInfo";
import firebase from '../../firebase.config'

export default function Homepage({ userAnimalIcons }) {

    const [userAnimal, setUserAnimal] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe =firebase.firestore().collection('/animals')
        .where('userID', '==', firebase.auth().currentUser.uid)
        .limit(1)
        .onSnapshot( snapshot => {
            if (snapshot.docs[0]) {
                setUserAnimal({
                    ...snapshot.docs[0].data()
                })
            }
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const display = () => {
        if (userAnimal) {
            return (
                <UserAnimalInfo userAnimal={userAnimal} userAnimalIcons={userAnimalIcons} />
            )
        }
        else {
            return (
                <UserAnimalForm userAnimalIcons={userAnimalIcons} />
            )
        }
    }

    return (
        <div>
            {isLoading
            ? <span>Loading...</span>
            : display()}
        </div>
    );
}
