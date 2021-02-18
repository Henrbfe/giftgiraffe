import React, { useState, useEffect } from 'react'
import firebase from '../../firebase.config'
import GiftOverview from '../giftOverview/giftOverview'

export default function Wishlist() {

    const [gifts, setGifts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe =
        firebase.firestore().collection('/gifts')
        .where('creator', '==', firebase.auth().currentUser.uid)
        .where('receiver', '==', firebase.auth().currentUser.uid)
        .onSnapshot((snapshot) => {
            setIsLoading(true)
            const newGifts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setGifts(newGifts)
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
    }, [isLoading])

    useEffect(() => {
        console.log(`Updated gifts: ${gifts}`)
    }, [gifts])

    if (isLoading) {
        return (
            <span>Loading...</span>
        )
    }
    else {
        return (
            <GiftOverview initalGifts={gifts} />
        )
    }
}