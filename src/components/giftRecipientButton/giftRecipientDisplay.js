import React, {useState, useEffect} from 'react';
import GiftRecipientButtonStyling from "./giftRecipientDisplay.module.css";
import GiftCard from '../giftCard/giftCard';
import { Typography } from '@material-ui/core'
import DropDownIcon from '../../pictures/expand-icon.png';

export default function GiftRecipientDisplay({recipient}) {
    
    const displayGifts = () => {
        recipient.gifts.map((gift) => (
            <GiftCard gift={gift} />
        ))
    }

    return (
        <div>
            <h2>{recipient.name}</h2>
            {displayGifts}
        </div>
    );
}
