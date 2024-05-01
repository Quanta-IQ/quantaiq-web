"use client";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const Context = createContext({});

const SidebarProvider = ({children}:any) =>{
    

    const initialState = false
    const initialNone = null
    const [collapsed, setCollapsed] = useState(initialState);
    const [params, setParams] = useState(null)
    

    
    return (
        <Context.Provider value={{collapsed,setCollapsed, params, setParams}}>
            { children}
        </Context.Provider>
    )
}


export const SidebarContext = () => useContext(Context);
export default SidebarProvider;