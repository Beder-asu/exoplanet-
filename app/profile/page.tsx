import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-2">Profile</h1>
            <p className="text-slate-400">Manage your account and saved data</p>
          </div>

          <Card className="bg-slate-900 border-slate-800 max-w-2xl mx-auto">
            <CardContent className="p-16 text-center">
              <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-slate-500" />
              </div>
              <p className="text-slate-400 mb-6">Access your saved classifications and upload history</p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Sign In</Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-blue-600 text-blue-400 hover:bg-blue-600/10 px-8"
                >
                  Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
