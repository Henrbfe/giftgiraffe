import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import GiftCard from '../giftCard/giftCard'
import firebase from '../../firebase.config'
import Styling from './wishlist.module.css'

export default function Wishlist() {

    const [gifts, setGifts] = useState([])

    useEffect(() => {
        const unsubscribe =
        firebase.firestore().collection('gifts')
        .onSnapshot((snapshot) => {
            const newGifts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setGifts(newGifts)
        })
        return () => unsubscribe()
    }, [])

    return (
        <div className={Styling.Root}>
            <DragDropContext onDropEnd={result => console.log(result)}>
                <Droppable droppableId={"1"}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={Styling.Droppable}>
                                {gifts.map((gift, index) => {
                                    return (
                                        <Draggable
                                            key={gift.title}
                                            draggableId={gift.title}
                                            index={index}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <GiftCard
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        styl={{
                                                            userSelect: 'none',
                                                            ...provided.draggableProps.style
                                                        }}
                                                    />
                                                )
                                            }}
                                        </Draggable>
                                    )
                                })}
                            </div>
                        )
                    }}
                </Droppable>
            </DragDropContext>
        </div>
    )
}