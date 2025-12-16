"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Facebook, Chrome } from "lucide-react";
import { toast } from "react-toastify";

export function LoginForm() {
  const [value, setValue] = useState("login");

  // Controlled Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");   // for login
  const [name, setName] = useState("");           // for signup
  const [phone, setPhone] = useState("");         // for signup

  // Router
  const router = useRouter();

  // Backend URL
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;


  // LOGIN Handler ------------------------------------
 const handleLogin = async () => {
  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Invalid email or password");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.success("Login successful 🎉");

    router.push("/dasboard");
  } catch (err) {
    console.error(err);
    toast.error("Login failed. Please try again.");
  }
};



  // SIGNUP Handler -----------------------------------
 // SIGNUP Handler -----------------------------------
const handleSignup = async () => {
  // ------------------ Password Validation ------------------
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!strongPassword.test(password)) {
    toast.error(
      "Password must be at least 8 characters and include uppercase, lowercase, number & special character"
    );
    return;
  }

  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Signup failed");
      return;
    }

    toast.success("Account created successfully 🎉");

    router.push("/dashboard"); // fix typo from "dasboard"
  } catch (err) {
    console.error(err);
    toast.error("Signup failed. Please try again.");
  }
};


  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-full bg-primary" aria-hidden />
        <span className="text-xl font-semibold tracking-tight text-primary">
          ZeroLuggage
        </span>
      </div>

      <Tabs value={value} onValueChange={setValue} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 gap-2">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        {/* LOGIN TAB ------------------------------------------------------ */}
        <TabsContent value="login" className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Input
                type="email"
                className="h-12"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="pointer-events-none text-sky-600 absolute right-3 top-1/2 size-4 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              className="h-12"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-xs text-gray-500 mt-1">
    Minimum 8 chars, include uppercase, lowercase, number & special character
  </div>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-sky-600 text-white h-12 hover:opacity-95"
          >
            Login
          </Button>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <Separator />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator />
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-center gap-2 h-12">
              <Chrome className="size-6 text-sky-600" />
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full justify-center gap-2 h-12">
              <Facebook className="size-6 text-sky-600" />
              Sign in with Facebook
            </Button>
          </div>
        </TabsContent>

        {/* SIGNUP TAB ------------------------------------------------------ */}
        <TabsContent value="signup" className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              type="text"
              className="h-12"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              className="h-12"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              className="h-12"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              type="tel"
              className="h-12"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Button
            onClick={handleSignup}
            className="w-full bg-sky-600 text-white h-12 hover:opacity-95"
          >
            Create Account
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
