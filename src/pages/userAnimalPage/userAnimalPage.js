import React, { useEffect, useState } from 'react'
import Styling from './userAnimalPage.module.css'
import firebase from '../../firebase.config'
import GiftOverview from '../../components/giftOverview/giftOverview'
import GiftInputPopUp from '../../components/giftInputPopUp/giftInputPopUp'
import { useParams } from 'react-router-dom'


export default function UserAnimalPage() {

    const [gifts, setGifts] = useState([])
    const [userAnimal, setUserAnimal] = useState()
    const [showPopUp, setShowPopUp] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const { displayName } = useParams()

    useEffect(() => {
        let unsubscribe
        firebase.firestore().collection('/animals')
        .where('displayName', '==', displayName)
        .limit(1)
        .get()
        .then( snapshot => {
            console.log(snapshot.docs[0].data())
            setUserAnimal( snapshot.docs[0].data())
            unsubscribe = firebase.firestore().collection('/gifts')
                .where('creator', '!=', snapshot.docs[0].data().userID)
                .where('receiver', '==', snapshot.docs[0].data().userID)
                .onSnapshot( snapshot => {
                    setIsLoading(true)
                    console.log(snapshot)
                    setGifts( snapshot.docs.map( doc => ({
                        id: doc.id,
                        ...doc.data()
                    })))
                    setIsLoading(false)
                })
        })
        return () => unsubscribe()
    }, [displayName])

    const togglePopUp = () => {
        setShowPopUp(!showPopUp)
    }

    const createNewGift = event => {
        event.preventDefault()
        togglePopUp()
    }

    useEffect(() => {
        console.log(`Updated gifts in userAnimalPage: ${gifts}`)
    }, [gifts])

    useEffect(() => {
        console.log(`isLoading userAnimalPage: ${isLoading}`)
    }, [isLoading])

    if (isLoading) {
        return (
            <span>Loading...</span>
        )
    }
    else {
        return (
            <div>
                <GiftInputPopUp hidden={!showPopUp} togglePopUp={togglePopUp} receiver={userAnimal.userID}/>
                <div className={Styling.Root}>
                    <span className={Styling.Header}>{userAnimal.displayName}s gifts</span>
                    <button className={Styling.Button} onClick={createNewGift}>+</button>
                </div>
                <GiftOverview initalGifts={gifts} />
            </div>
        )
    }
}
