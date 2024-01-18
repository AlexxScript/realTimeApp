import { Dispatch, SetStateAction, createContext } from "react";

interface UserState {
    authenticated:boolean
    email:string
    role:string
    idSchool:any
}

interface AuthContextType {
    user:UserState,
    setUser:Dispatch<SetStateAction<UserState>>
}

const defaultUserState: UserState = {
    authenticated:false,
    email:'',
    role:'',
    idSchool:null
}

export const AuthContext = createContext<AuthContextType>({
    user:defaultUserState,
    setUser:() => {}
});