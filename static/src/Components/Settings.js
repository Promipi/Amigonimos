import React, { useState } from 'react'
import Switch from 'react-input-switch';
import '../styles/settings.scss';

const Settings = ({publicHelps,setPublicHelps}) => {
    return (
        <form className="form-setting">
            <div className="form-group">
                <h3>Public helps</h3>
                <Switch value={publicHelps} onChange={setPublicHelps} style={{width:"52px",height:"32px"}}/>
            </div>
        </form>
    )
}

export default Settings;