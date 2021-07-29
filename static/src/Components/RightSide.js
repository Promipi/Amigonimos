import React from 'react';
import MostVotedTips from './MostVotedTips';
import Friends from './Friends';
import RandomTip from './RandomTip';
import TipsContextProvider from '../Context/TipsContext';

const RightSide = ({user}) =>{
    let work = true;
    return(
        <div className="container-other">
            {
                work && (
                    <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <h2>Work In Progress</h2>
                    </div>
                )
            }
            {
                !work && (
                    <div style={{width:"100%",height:"100%"}}>
                        {user && (
                            <Friends />
                        )}
                        <TipsContextProvider>
                            <MostVotedTips />
                            <RandomTip />
                        </TipsContextProvider>
                    </div>
                )
            }
        </div>
    )
}

export default RightSide;