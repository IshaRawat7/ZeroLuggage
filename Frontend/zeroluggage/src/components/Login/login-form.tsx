"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, User, Phone} from "lucide-react"
import  Img1 from "@/public/lugg.png"

export function LoginForm() {
  const [value, setValue] = useState("login")

  // Controlled Inputs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoginOtpSent, setIsLoginOtpSent] = useState(false)
  const [isSignupOtpSent, setIsSignupOtpSent] = useState(false)

  const router = useRouter()
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api`

  // Password validation regex
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/

  // LOGIN HANDLERS
  const handleLogin = async () => {
    if (!email || !password) return toast.error("Enter email and password")
    if (!strongPassword.test(password)) {
      return toast.error(
        "Password must be 8-16 characters, include uppercase, lowercase, number & special character"
      )
    }
    try {
      const res = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message || "Login failed")

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      toast.success("Login successful 🎉")
      router.push("/dasboard")
    } catch (err) {
      console.error(err)
      toast.error("Login failed")
    }
  }

  const sendLoginOtp = async () => {
    if (!email) return toast.error("Enter email first")
    try {
      const res = await fetch(`${API}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message || "Failed to send OTP")
      setIsLoginOtpSent(true)
      toast.success("OTP sent to your email 🎉")
    } catch (err) {
      console.error(err)
      toast.error("Failed to send OTP")
    }
  }

  const verifyLoginOtp = async () => {
    if (!otp) return toast.error("Enter OTP")
    try {
      const res = await fetch(`${API}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message || "OTP verification failed")

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      toast.success("Login successful 🎉")
      router.push("/dasboard")
    } catch (err) {
      console.error(err)
      toast.error("OTP verification failed")
    }
  }

  // SIGNUP HANDLERS
  const sendSignupOtp = async () => {
    if (!name || !email || !password || !phone) return toast.error("Fill all fields")
    if (!strongPassword.test(password)) {
      return toast.error(
        "Password must be 8-16 characters, include uppercase, lowercase, number & special character"
      )
    }
    try {
      const res = await fetch(`${API}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password, phone }),
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message || "Failed to send OTP")
      setIsSignupOtpSent(true)
      toast.success("OTP sent to your email 🎉")
    } catch (err) {
      console.error(err)
      toast.error("Failed to send OTP")
    }
  }

  const verifySignupOtp = async () => {
    if (!otp) return toast.error("Enter OTP")
    try {
      const res = await fetch(`${API}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message || "OTP verification failed")
      localStorage.setItem("user", JSON.stringify(data.user))
      toast.success("Signup successful 🎉")
      router.push("/dasboard")
    } catch (err) {
      console.error(err)
      toast.error("OTP verification failed")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-md mx-auto"
    >
     <motion.div
  className="flex items-center gap-2"
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  {/* Replacing black circle with animated logo image */}
  <motion.img
    src={Img1.src} // Next.js Image can also be used, but for animation, <img> is simpler
    alt="Logo"
    className="w-8 h-8 rounded-full"
    animate={{ rotate: [0, 360] }}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
  />
  <span className="text-xl font-semibold tracking-tight text-primary">ZeroLuggage</span>
</motion.div>


      <Tabs value={value} onValueChange={setValue} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 gap-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <TabsTrigger
              value="login"
              className="w-full data-[state=active]:bg-sky-600 data-[state=active]:text-white transition-all duration-300"
            >
              Login
            </TabsTrigger>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <TabsTrigger
              value="signup"
              className="w-full data-[state=active]:bg-sky-600 data-[state=active]:text-white transition-all duration-300"
            >
              Sign Up
            </TabsTrigger>
          </motion.div>
        </TabsList>

        {/* LOGIN TAB */}
        <TabsContent value="login" className="space-y-5 pt-4">
          <AnimatePresence mode="wait">
            {!isLoginOtpSent ? (
              <motion.div key="login-form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-5">
                {/* Email */}
                <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Label>Email</Label>
                  <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-10 transition-all duration-200 focus:ring-2 focus:ring-sky-400"
                    />
                  </motion.div>
                </motion.div>

                {/* Password */}
                <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Label>Password</Label>
                  <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-10 transition-all duration-200 focus:ring-2 focus:ring-sky-400"
                    />
                  </motion.div>
                  <span className="text-xs text-muted-foreground block mt-1">
                    Password must be 8-16 characters, include uppercase, lowercase, number & special character
                  </span>
                </motion.div>

                {/* Buttons */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                 <Button
  onClick={sendLoginOtp}
  disabled={isLoginOtpSent} 
  className="w-full bg-sky-400 text-white h-12 hover:bg-sky-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
>
  Login with OTP
</Button>

                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="login-otp" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-5">
                <Label>Enter OTP</Label>
                <Input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="h-12 text-center text-2xl tracking-widest focus:ring-2 focus:ring-sky-400" />
                <Button onClick={verifyLoginOtp} className="w-full bg-sky-600 text-white h-12 hover:bg-sky-700 transition-all duration-300">Verify OTP</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        {/* SIGNUP TAB */}
       <TabsContent value="signup" className="space-y-5 pt-4">
  <AnimatePresence mode="wait">
    {!isSignupOtpSent ? (
      <motion.div
        key="signup-form"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        className="space-y-5"
      >
        {/* Name */}
        <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Label>Name</Label>
          <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 pl-10 transition-all duration-200 focus:ring-2 focus:ring-sky-400"
            />
          </motion.div>
        </motion.div>

        {/* Email */}
        <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Label>Email</Label>
          <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-10 transition-all duration-200 focus:ring-2 focus:ring-sky-400"
            />
          </motion.div>
        </motion.div>

        {/* Password */}
        <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Label>Password</Label>
          <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 pl-10 transition-all duration-200 focus:ring-2 focus:ring-sky-400"
            />
          </motion.div>
          <span className="text-xs text-muted-foreground block mt-1">
            Password must be 8-16 characters, include uppercase, lowercase, number & special character
          </span>
        </motion.div>

        {/* Phone */}
        <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Label>Phone</Label>
          <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 pl-10 transition-all duration-200 focus:ring-2 focus:ring-sky-400"
            />
          </motion.div>
        </motion.div>

        {/* Send OTP */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Button
  onClick={sendSignupOtp}
  disabled={isSignupOtpSent} 
  className="w-full bg-sky-600 text-white h-12 hover:bg-sky-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
>
  Send OTP
</Button>

        </motion.div>
      </motion.div>
    ) : (
      <motion.div
        key="signup-otp"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        className="space-y-5"
      >
        <Label>Enter OTP</Label>
        <Input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="h-12 text-center text-2xl tracking-widest focus:ring-2 focus:ring-sky-400"
        />
        <Button
          onClick={verifySignupOtp}
          className="w-full bg-sky-600 text-white h-12 hover:bg-sky-700 transition-all duration-300"
        >
          Verify OTP
        </Button>
      </motion.div>
    )}
  </AnimatePresence>
</TabsContent>

      </Tabs>
    </motion.div>
  )
}
