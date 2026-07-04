"use client"

import { useState } from "react"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)

  if (!authenticated) return <AdminLogin onAuthenticated={() => setAuthenticated(true)} />

  return <AdminDashboard />
}
