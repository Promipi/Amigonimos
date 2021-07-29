import {TipsContext} from '../Context/TipsContext';
import React, {useContext} from 'react';
import Loader from './Loader';
import Tip from './Tip';

const MostVotedTips = () =>{
    const {mostVotedTips} = useContext(TipsContext);
    
    return(
        <div className="tips">
            <div className="title">
                <h2><i className="fas fa-angle-right"></i> Most Voted Tips</h2>
            </div>
            <ul className="tips-container">
            {mostVotedTips.length ? mostVotedTips.map((tip,i)=>(
                <Tip tip={tip} key={i}/>
            )):
            (
                <Loader />
            )}
            </ul>
        </div>
    )
}

export default MostVotedTips;