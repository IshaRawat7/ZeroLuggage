"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Facebook, Chrome } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [value, setValue] = useState("login")

  return (
    <div className="space-y-6">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-full bg-primary" aria-hidden />
        <span className="text-xl font-semibold tracking-tight text-primary">ZeroLuggage</span>
      </div>

      <Tabs value={value} onValueChange={setValue} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 gap-2">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-primary-foreground"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-primary-foreground"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="identifier" className="sr-only ">
              Email or Phone Number
            </Label>
            <div className="relative">
              <Input
                id="identifier"
                type="text"
                className="h-12"
                placeholder="Email or Phone Number"
                aria-label="Email or Phone Number"
              />
              <Mail className="pointer-events-none text-sky-600 absolute right-3 top-1/2 size-4 -translate-y-1/2 " />
            </div>
          </div>

          <Button type="button" className="w-full bg-sky-600 hover:bg-ksy-600 text-primary-foreground hover:opacity-95 h-12">
            <Link href="/">Send OTP</Link>
          </Button>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <Separator />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator />
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-center gap-2 bg-transparent h-12">
              <Chrome className="size-6 text-sky-600" />
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full justify-center gap-2 bg-transparent h-12">
              <Facebook className="size-6 text-sky-600" />
              Sign in with Facebook
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="signup" className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only ">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Email" aria-label="Email" className="h-12"/>
            
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="sr-only h-12">
              Phone
            </Label>
            <div className="relative">
              <Input id="phone" type="tel" placeholder="Phone Number" aria-label="Phone Number" className="h-12" />
              <Phone className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2  text-sky-600" />
            </div>
          </div>
          <Button type="button" className="w-full  hover:opacity-95 h-12 bg-sky-600 text-white hover:bg-sky-600 hover:text-white">
            <Link href="/">Create Accounts</Link>
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
