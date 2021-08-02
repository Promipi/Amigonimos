import React from 'react';
import useTips from '../Hooks/useTips'

export const TipsContext = React.createContext({});

const TipsContextProvider = ({children}) =>{
    const [mostVotedTips,randomTips] = useTips();
    
    return(
        <TipsContext.Provider value={{mostVotedTips,randomTips}}>
            {children}
        </TipsContext.Provider>
    )
}

export default TipsContextProvider;