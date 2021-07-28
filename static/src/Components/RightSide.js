import React from 'react';
import MostVotedTips from './MostVotedTips';
import Friends from './Friends';

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
                !user && !work &&(
                    <div style={{width:"100%",height:"100%"}}>
                        <MostVotedTips />
                    </div>
                )
            }
            {
                user && !work &&(
                    <div style={{width:"100%",height:"100%"}}>
                        <Friends />
                        <MostVotedTips />
                    </div>
                )
            }
        </div>
    )
}

export default RightSide;