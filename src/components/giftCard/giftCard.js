import React from 'react';
import Styling from './giftCard.module.css';

export default function GiftCard({gift, dragRef, provDragProps, provHandleProps}) {

    return(
        <div
            className={Styling.Root}
            ref={dragRef}
            provDragProps
            provHandleProps>
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
    );
}