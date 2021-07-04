import React from 'react';
import {useUser} from '../Hooks/useUser'

export const UserContext = React.createContext();

const UserContextProvider = ({children}) =>{
    const [user,isLoading] = useUser().usuario;

    return(
        <UserContext.Provider value={{user,isLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;