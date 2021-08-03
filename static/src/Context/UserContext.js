import React from 'react';
import useColor from '../Hooks/useColor';
import {useUser} from '../Hooks/useUser'

export const UserContext = React.createContext();

const UserContextProvider = ({children}) =>{
    const [user,token,isLoading,Login,LogOut,Register] = useUser();
    const [color,setColor,colorText] = useColor();

    return(
        <UserContext.Provider value={{user,token,isLoading,Login,LogOut,Register,color,setColor,colorText}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;