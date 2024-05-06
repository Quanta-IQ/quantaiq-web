"use client"
import React from 'react'; 
import {SidebarContext} from "@/providers/SidebarProvider";
import { AuthContext } from '@/providers/AuthProvider';

const CollapseLayout = ({ children } : any) => {
    const {collapsed, setCollapsed}: any = SidebarContext();
    const {user}:any = AuthContext();

    
    if (user.isLogin) return (
        <div className={`flex flex-col ${collapsed ?  'pl-16 ' : 'pl-44'}  `}>
            {children}
        </div>
    );
    if (!user.isLogin) return (
        <div className={`flex flex-col `}>
            {children}
        </div>
    );
};

export default CollapseLayout;
