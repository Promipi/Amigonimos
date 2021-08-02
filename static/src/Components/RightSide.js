import React from 'react';
import MostVotedTips from './MostVotedTips';
import Friends from './Friends';
import RandomTip from './RandomTip';
import TipsContextProvider from '../Context/TipsContext';

const RightSide = ({user}) =>{
    let work = true;
    return(
        <div className="container-other">
            <div style={{width:"100%",height:"100%"}}>
                {user && !work && (
                    <Friends />
                )}
                <TipsContextProvider>
                    <MostVotedTips />
                    <RandomTip />
                </TipsContextProvider>
            </div>
        </div>
    )
}

export default RightSide;