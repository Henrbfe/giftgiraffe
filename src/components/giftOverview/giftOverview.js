import React, { useState } from 'react'
import Styling from './giftOverview.module.css'
import GiftCard from '../giftCard/giftCard'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'


export default function GiftOverview({ initalGifts }) {

    const [gifts, setGifts] = useState(initalGifts)

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        
        return result;
      };

    function onDragEnd(result) {
        if (!result.destination) {
          return;
        }
    
        if (result.destination.index === result.source.index) {
          return;
        }
    
        const gifts1 = reorder(
          gifts,
          result.source.index,
          result.destination.index
        );
    
        setGifts(gifts1);
      }

    const GiftList = React.memo(function GiftList({ gifts }) {
        return gifts.map((gift, index) => (
            <GiftCard gift={gift} index={index} key={gift.title} />
            ))
        })

    return (
        <div className={Styling.Root}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="giftList">
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <GiftList gifts={gifts} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
