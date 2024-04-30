"use client";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const Context = createContext({});

const SidebarProvider = ({children}:any) =>{
   
    const initialState = false
    const [collapsed, setCollapsed] = useState(initialState);


    console.log("Collapsed State ",collapsed)

    return (
        <Context.Provider value={{collapsed,setCollapsed}}>
            { children}
        </Context.Provider>
    )
}


export const SidebarContext = () => useContext(Context);
export default SidebarProvider;