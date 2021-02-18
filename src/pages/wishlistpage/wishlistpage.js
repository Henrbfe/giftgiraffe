import React, { useState } from 'react'
import firebase from '../../firebase.config'
import GiftInputPopUp from '../../components/giftInputPopUp/giftInputPopUp';
import Wishlist from '../../components/wishlist/wishlist';
import Styling from './wishlistpage.module.css'

export default function Wishlistpage() {

    const [showPopUp, setShowPopUp] = useState(false)

    const togglePopUp = () => {
        setShowPopUp(!showPopUp)
    }

    const createNewGift = event => {
        event.preventDefault()
        togglePopUp()
    }

    return (
        <div>
            <GiftInputPopUp
                hidden={!showPopUp}
                togglePopUp={togglePopUp}
                receiver={firebase.auth().currentUser.uid}/>
            <div className={Styling.Root}>
                <span className={Styling.Header}>My Wishlist</span>
                <button className={Styling.Button} onClick={createNewGift}>+</button>
            </div>
            <Wishlist />
        </div>
    );
}