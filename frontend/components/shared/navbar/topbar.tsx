"use client"
import Link from "next/link";
import gititLogo from "../logo/logo"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ModeToggle} from "@/components/shared/mode-toggle";
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
      {!user.isLogin && <div className="navbar ">
            <nav className="navbar-container">
                 <div className="md:pb-2 w-full mt-2 pb-2 flex flex-row items-center gap-2">
                      <Image src="/assets/atomic.png" className="w-8 h-auto block dark:hidden"  alt="logo" width={100} height={100} />
                      <Image src="/assets/atomic-white.png" className="w-8 h-auto hidden dark:block"  alt="logo" width={100} height={100} />
                      <p className="text-xl font-bold text-black dark:text-white">
                        quantaIQ
                      </p>
                 </div>
                  <div className="flex flex-row justify-end gap-2 items-center">
                        <ModeToggle />
                  <div className="ml-auto  ">
                              
                        {
                              !user.isLogin &&(
                              <>
                              <Link href="/sign-in" >
                                    <Button className="primary-button h-8 max-md:h-8">
                                                Sign In
                                    </Button>
                                    </Link>
                              </>
                              )
                        }
                  </div>
                  </div>
                 

            </nav>
      </div>}
 </>)
}