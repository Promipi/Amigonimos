import React from 'react';
import Tips from './Tips';
import Friends from './Friends';
import Footer from './Footer';

const RightSide = ({logged}) =>{
    logged = true;
    return(
        <div className="container-other">
            {
                !logged && (
                    <div style={{width:"100%",height:"100%"}}>
                        <Tips />
                        <Footer id="footer"/>
                    </div>
                )
            }
            {
                logged && (
                    <div style={{width:"100%",height:"100%"}}>
                        <Friends />
                        <hr></hr>
                        <Tips />
                        <Footer id="footer"/>
                    </div>
                )
            }
        </div>
    )
}

export default RightSide;