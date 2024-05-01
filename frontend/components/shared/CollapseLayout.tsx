"use client"
import React from 'react'; 
import {SidebarContext} from "@/providers/SidebarProvider";

const CollapseLayout = ({ children } : any) => {
    const {collapsed, setCollapsed}: any = SidebarContext();

    return (
        <div className={`flex flex-col ${collapsed ?  'pl-24 ' : 'pl-48'} `}>
            {children}
        </div>
    );
};

export default CollapseLayout;
