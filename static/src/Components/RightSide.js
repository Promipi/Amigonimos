import React from 'react';
import Tips from './Tips';
import Friends from './Friends';
import Footer from './Footer';

const RightSide = ({logged}) =>{
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
                !logged && !work &&(
                    <div style={{width:"100%",height:"100%"}}>
                        <Tips />
                        <Footer id="footer"/>
                    </div>
                )
            }
            {
                logged && !work &&(
                    <div style={{width:"100%",height:"100%"}}>
                        <Friends />
                        <Tips />
                        <Footer id="footer"/>
                    </div>
                )
            }
        </div>
    )
}

export default RightSide;