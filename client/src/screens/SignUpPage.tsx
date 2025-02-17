import NavBar from "@/components/NavBar"
import { SignUpForm } from "@/components/signup-form"


const SignUpPage = () => {
    return (
        <div className="w-full h-full" >
            <NavBar/>
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}

export default SignUpPage