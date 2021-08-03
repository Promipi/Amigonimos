import React from 'react';
import useColor from '../Hooks/useColor';
import {useUser} from '../Hooks/useUser'

export const UserContext = React.createContext();

const UserContextProvider = ({children}) =>{
    const [user,token,isLoading,Login,LogOut,Register] = useUser();
    const [color,setColor] = useColor();

    return(
        <UserContext.Provider value={{user,token,isLoading,Login,LogOut,Register,color,setColor}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;