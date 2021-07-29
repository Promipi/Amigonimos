import React from 'react';
import useTip from '../Hooks/useTip'

export const TipsContext = React.createContext({});

const TipsContextProvider = ({children}) =>{
    const [mostVotedTips,randomTips] = useTip();
    
    return(
        <TipsContext.Provider value={{mostVotedTips,randomTips}}>
            {children}
        </TipsContext.Provider>
    )
}

export default TipsContextProvider;