import React from 'react';

const Tips = () =>{
    return(
        <div className="tips">
            <div className="title">
                <h2>Tips&Tricks</h2>
            </div>
            <ul className="tips-container">
            <li className="tip">
                    <div className="title-tip">
                        <h3>Consejo 1</h3>
                    </div>
                    <div className="likes-tip">
                        <p>10</p>
                        <i className="fas fa-heart"></i>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Tips;