import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function JoinClassTabs() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Join with Code</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        {/* <JoinClassForm user={{ user_id: user.user?.uid }} /> */}
      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
