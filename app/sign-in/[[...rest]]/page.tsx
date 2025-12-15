import { SignIn } from "@clerk/nextjs";

export default function SignINPage(){
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">

        <SignIn 
            routing="path"
            path="/sign-in"
            afterSignInUrl="/dashboard"
            />
        </div>
    )
}