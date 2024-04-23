"use client"
import Link from "next/link";
import gititLogo from "../logo/logo"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

import { AuthContext } from "@/providers/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
export default function NavBar(){
    const auth = getAuth();
    const {user}:any = AuthContext();
    const router = useRouter();
    const logout = async () => {
        try {
          signOut(auth)
        } catch (error) {
          
        } finally {
          router.push("/")

        }
      };
    
return ( <>
      <div className="navbar ">
            <nav className="navbar-container">
                 <div className="md:pb-2 w-full mt-2 pb-2 flex flex-row items-center gap-2">
                      <Image src="/assets/atomic.png" className="w-8 h-auto"  alt="logo" width={100} height={100} />
                      <p className="text-xl font-bold text-black">
                        quantaIQ
                      </p>
                 </div>

                 <div className="ml-auto pt-2 max-md:pt-4">
                      {
                        !user.isLogin &&(
                            <>
                                <Button className="primary-button h-8 max-md:h-8">
                                      <Link href="/sign-in" >
                                            Sign In
                                      </Link>
                                </Button>
                            </>
                        )
                      }
                      {user.isLogin && (
                            <>
                                 <Button className="primary-button h-8 max-md:h-8" onClick={logout}>
                                            Sign Out
                                 </Button>
                            </>
                      )}
                 </div>

            </nav>
      </div>
 </>)
}