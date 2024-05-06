"use client"
import React from 'react'; 
import {SidebarContext} from "@/providers/SidebarProvider";
import { AuthContext } from '@/providers/AuthProvider';

const CollapseLayout = ({ children } : any) => {
    const {collapsed, setCollapsed}: any = SidebarContext();
    const {user}:any = AuthContext();

    
    return (
        <div className={`flex flex-col ${collapsed ?  'pl-16 ' : 'pl-44'} ${user ? 'pl-0' : ''} `}>
            {children}
        </div>
    );
};

export default CollapseLayout;
