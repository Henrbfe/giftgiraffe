import React from 'react';
import Styling from './giftCard.module.css';
import { Draggable } from 'react-beautiful-dnd'

export default function GiftCard({gift, index}) {

    return(
        <Draggable draggableId={gift.title} index={index}>
            {provided => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={Styling.Root}>
                <span className={Styling.Header}>
                    {gift.title}
                </span>
                <img 
                    className={Styling.Image}
                    src={gift.imageUrl}
                    alt="Gift"/>
                <button className={Styling.Button}>
                    Edit
                </button>
            </div>
            )}
        </Draggable>
    );
}