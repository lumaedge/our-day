import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin — Our Day",
  description: "Craft the experience.",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
      {children}
    </div>
  )
}
