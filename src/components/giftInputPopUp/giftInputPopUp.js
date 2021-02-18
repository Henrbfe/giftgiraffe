import React, { useState } from 'react';
import Styling from './giftInputPopUp.module.css';
import firebase from '../../firebase.config'


export default function GiftInputPopUp({ hidden, togglePopUp, receiver }) {

    const [imageAsFile, setImageAsFile] = useState('')

    const [giftInfo, setGiftInfo] = useState({
        title: '',
        description: '',
        price: 0,
    })

    console.log(`Receiver: ${receiver}`)


    const closePopUp = (event) => {
        event.preventDefault()
        togglePopUp()
    }

    const handleValueChange = event => {
        event.preventDefault()
        const { name, value } = event.target
        setGiftInfo( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleImageAsFile = (event) => {
        const image = event.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const submitGift = (event) => {
        event.preventDefault()
        if(imageAsFile === '' ) {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        }
        const uploadTask = firebase.storage().ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        uploadTask.on('state_changed',
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
        }, () => {
            firebase.storage().ref('images').child(imageAsFile.name).getDownloadURL()
            .then(firebaseUrl => {
                firebase
                .firestore()
                .collection('/gifts')
                .add({
                    title: giftInfo.title,
                    description: giftInfo.description,
                    price: giftInfo.price,
                    imageUrl: firebaseUrl,
                    creator: firebase.auth().currentUser.uid,
                    receiver: receiver
                })
                .then(() => {
                    setGiftInfo({
                        title: '',
                        description: '',
                        price: 0,
                    })
                    setImageAsFile('')
                    togglePopUp()
                })
            })
        })
    }

    return (
        <div className={Styling.Root} hidden={hidden}>
            <button className={Styling.CloseButton} onClick={closePopUp}>
                    x
            </button>
            <form className={Styling.Form}>
                <span className={Styling.Header}>Add new gift</span>
                <input
                    className={Styling.Input}
                    placeholder='Title'
                    type="text"
                    name='title'
                    value={giftInfo.title}
                    onChange={handleValueChange}/>
                <input
                    className={Styling.Input}
                    placeholder='Description'
                    type="text"
                    name='description'
                    value={giftInfo.description}
                    onChange={handleValueChange}/>
                <input
                    className={Styling.Input}
                    placeholder='Price'
                    type="number"
                    name='price'
                    value={giftInfo.price}
                    onChange={handleValueChange}/>
                <input
                    className={Styling.Input}
                    type="file"
                    onChange={handleImageAsFile}/>
                <button className={Styling.SubmitButton} onClick={submitGift}>
                    Submit
                </button>
            </form>
        </div>
    )
}
