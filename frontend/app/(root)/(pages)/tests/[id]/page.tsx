import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";
import TestModule from "@/components/course/test/test-module";


export default function Page({params} : {params: {id: string}}) {
  return (
    <div className="pl-4">
      <TestModule
      testID={params.id} />
    </div>
  );
}
