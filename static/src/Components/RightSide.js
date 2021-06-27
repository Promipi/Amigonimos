import React from 'react';
import Tips from './Tips';
import Friends from './Friends';

const RightSide = ({logged}) =>{
    logged = true;
    return(
        <div className="container-other">
            {
                !logged && (
                    <Tips />
                )
            }
            {
                logged && (
                    <div style={{width:"100%",height:"100%"}}>
                        <Friends />
                        <hr></hr>
                        <Tips />
                    </div>
                )
            }
        </div>
    )
}

export default RightSide;