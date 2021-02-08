import React, {useEffect, useState} from 'react';
import Styling from './giftInputPopUp.module.css';
import firebase from '../../firebase.config'


export default function GiftInputPopUp() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageAsFile, setImageAsFile] = useState('')
    const [showPopUp, setShowPopUp] = useState(true)

    const closePopUp = (event) => {
        event.preventDefault()
        setShowPopUp(false)
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
                .collection('gifts')
                .add({
                    title,
                    description,
                    imageUrl: firebaseUrl
                })
                .then(() => {
                    setTitle('')
                    setDescription('')
                    setImageAsFile('')
                })
            })
        })
    }

    return (
        <div className={Styling.Root} hidden={!showPopUp}>
            <form className={Styling.Form}>
                <button className={Styling.CloseButton} onClick={closePopUp}>
                    x
                </button>
                <span className={Styling.Header}>Add new gift</span>
                <label className={Styling.Input}>
                    Title:
                    <input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)}/>
                </label>
                <label className={Styling.Input}>
                    Description: 
                    <input type="text" value={description} onChange={e => setDescription(e.currentTarget.value)}/>
                </label>
                <label className={Styling.Input}>
                    Bilde: 
                    <input type="file" onChange={handleImageAsFile}/>
                </label>
                <button className={Styling.SubmitButton} onClick={submitGift}>
                    Submit
                </button>
            </form>
        </div>
    )

}
