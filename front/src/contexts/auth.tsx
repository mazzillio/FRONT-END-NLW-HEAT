import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


type AuthProvider={
    children:ReactNode
}
type User={
    id:string
    name:string
    login:string
    avatar_url:string
}
type AuthContextData={
    user:User | null
    singInUrl:string
    signOut:()=>void
}

type AuthResponse={
    token:string
    user:{
        id:string
        avatar_url:string
        name:string
        login:string
    }
}

export const AuhtContex = createContext({} as AuthContextData)

export function AuthProvider(props:AuthProvider)
{
    const [user,setUser]=useState<User | null>(null)

    const singInUrl=`https://github.com/login/oauth/authorize?scope=user&client_id=29d372300bcbadbfa9db`

    const singIn=async(code:string)=>{
        const resp=await api.post<AuthResponse>('authenticate',{
            code
        })
        const {token,user}=resp.data

        localStorage.setItem('token',token)

        api.defaults.headers.common.authorization =`Bearer ${token}`

        setUser(user)
    }

    useEffect(()=>{
        const url=window.location.href
        const hasGit=url.includes('?code=')

        if(hasGit)
        {
            const [urlCode,gitCode]=url.split('?code=')
            window.history.pushState({},'',urlCode)
            singIn(gitCode)

        }
    },[])

    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){

            api.defaults.headers.common.authorization =`Bearer ${token}`
            api.get<User>('profile').then(resp=>{
               setUser(resp.data)
            })
        }
    },[])


    function signOut(){
        setUser(null)
        localStorage.removeItem('token')
    }

    return <AuhtContex.Provider value={ {singInUrl,user,signOut} }>
                {props.children}
    </AuhtContex.Provider>
}