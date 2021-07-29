import axios from 'axios';
import React, {useContext} from 'react'
import Loader from './Loader';
import {TipsContext} from '../Context/TipsContext'
import Tip from './Tip';

const RandomTip = () => {
    const {randomTips} = useContext(TipsContext);

    return (
        <div className="tips">
            <div className="title">
                <h2><i className="fas fa-angle-right"></i> Random Tips</h2>
            </div>
            <ul className="tips-container">
            {randomTips.length ? randomTips.map((tip,i)=>(
                <Tip tip={tip} key={i}/>
            )):
            (
                <Loader />
            )}
            </ul>
        </div>
    )
}

export default RandomTip
