import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import usePostAndPut from "@/hooks/usePostAndPut"
import axios from "axios"
import { useState } from "react"
import SpinnerLoader from "./SpinLoader"

interface User {
  email: string;
  password: string;
}


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const defaultUserData: User = {
    email: "",
    password: "",
  };
  const post = usePostAndPut(axios.post);
  const navigate = useNavigate();

  const [userData, setUserData] = useState<User>(defaultUserData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userData);
    const res = await post.callApi("auth/log-in", userData, true, false, true);
    console.log(res)
    if (res) {
      localStorage.setItem("token", res?.data?.data)
      navigate("/user/home");
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-gray-500 dark:text-gray-400">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required
                  onChange={handleInputChange}

                />
              </div>
              <Button type="submit" className="w-full">
                {post.loading ?
                  <div className="flex items-center justify-center gap-3" >
                    <span>
                      Please wait
                    </span>
                    <SpinnerLoader color="white" size="10" />
                  </div> :
                  "Login"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{""}
                <Link to="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-gray-100 md:block dark:bg-gray-800">
            {/* <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            /> */}
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-gray-500 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-gray-900 dark:text-gray-400 dark:hover:[&_a]:text-gray-50">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{""}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
