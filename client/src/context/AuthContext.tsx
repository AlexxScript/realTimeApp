import { Dispatch, SetStateAction, createContext } from "react";

interface UserState {
    authenticated:boolean,
    userN:string
    role:string
}

interface AuthContextType {
    user:UserState,
    setUser:Dispatch<SetStateAction<UserState>>
}

const defaultUserState: UserState = {
    authenticated:false,
    userN:'',
    role:''
}

export const AuthContext = createContext<AuthContextType>({
    user:defaultUserState,
    setUser:() => {}
});