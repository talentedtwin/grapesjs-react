import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {
    RegisterLink,
    LoginLink,
    LogoutLink
  } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa6";

export default async function Navigation(){

    const {isAuthenticated} = getKindeServerSession();
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return (
        !(await isAuthenticated()) ? (
            <div>
                {/* <LoginLink className="btn btn-ghost sign-in-btn">Sign in</LoginLink> */}
    
                {/* This is the newly added link for our new sign-in page */}
                <Button>
                <Link href="/">
                    Sign in custom
                </Link>
                </Button>
                {/* This is the newly added link for our new sign-in page */}
                <Button>
                <RegisterLink className="">Sign up</RegisterLink>
                </Button>
            </div>
        ) : (
            <div className="flex items-center justify-evenly">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            {user?.picture ? (
                                <AvatarImage
                                    className="avatar"
                                    src={user?.picture}
                                    alt="user profile avatar"
                                    referrerPolicy="no-referrer"
                                    width={42}
                                    height={42}
                                />
                            ) : (
                                <div className="border-gray-600"><FaUser/></div>
                            )}
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-slate-50">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <p className="text-heading-2">
                                    {user?.given_name} {user?.family_name}
                                </p>  
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button variant="outline">
                                    <LogoutLink className="text-subtle">Log out</LogoutLink>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                     </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    )
}