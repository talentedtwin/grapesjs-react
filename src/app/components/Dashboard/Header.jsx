import Navigation from "./Navigation";
import { Input } from "@/components/ui/input";

export default function Header(){
    return (
        <header className="flex w-full border-b border-gray-500 p-4 items-center justify-between">
            <div className="w-11/12 mx-auto flex items-center justify-between">
                <div>Logo</div>
                <div className="w-5/12 mx-auto"><Input type="text" placeholder="Search" /></div>
                <Navigation/>
            </div>
        </header>
    )
}