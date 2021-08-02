import React from 'react';
import Loader from './Loader';
import Tip from './Tip';
import useTip from '../Hooks/useTip';
import PageNav from './PageNav';
import {useParams} from 'react-router-dom'

const Tips = ({fullHeight}) =>{
    const {page} = useParams()
    const [tips,pages,loading] = useTip(page ? page : 1,10);

    return(
        <div className={`tips ${fullHeight ? 'full' : ''} ${loading ? 'loading' : ''}`}>
            <div className="title">
                <h2><i className="fas fa-angle-right"></i> All Tips</h2>
            </div>
            <ul>
            {tips.length || !loading ? tips.map((tip,i)=>(
                <Tip tip={tip} key={i} post={true}/>
            )):
            (
                <Loader />
            )}
            {
                !loading && (
                    <PageNav pages={pages} to="tips"/>
                )
            }
            </ul>
        </div>
    )
}

export default Tips;