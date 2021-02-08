import React from 'react'
import GiftInputPopUp from '../../components/giftInputPopUp/giftInputPopUp';
import Wishlist from '../../components/wishlist/wishlist';
import Styling from './wishlistpage.module.css'

export default function Wishlistpage() {


    return (
        <div>
            <GiftInputPopUp />
            <Wishlist />
        </div>
    );
}