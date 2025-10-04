import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-2">About Project</h1>
            <p className="text-slate-400">
              Not just a solution, a <span className="text-blue-400">better future</span>
            </p>
          </div>

          {/* How We Made It Possible */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">How We Made It Possible?</CardTitle>
              <CardDescription className="text-slate-400">
                Showcasing how our approach turned the problem into a solution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-800 rounded-lg p-6 space-y-3">
                <p className="text-slate-300 leading-relaxed">
                  Manual discovery of exoplanets is slow and limited. AI makes it possible to analyze massive NASA
                  datasets and unlock new worlds.
                </p>
                <p className="text-slate-300 font-semibold mt-4">
                  So, how can we build a solution that makes this possible?
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="text-slate-300">
                    • Used Random Forest, Decision Tree & XGBoost models for{" "}
                    <span className="text-blue-400">Recall</span>
                  </li>
                  <li className="text-slate-300">• Trained on multiple NASA open-source datasets</li>
                  <li className="text-slate-300">
                    • Allowed users to <span className="text-blue-400">upload and process</span> their own datasets
                  </li>
                  <li className="text-slate-300">
                    • Added a <span className="text-blue-400">comparison mode</span> with NASA data, switchable anytime
                  </li>
                  <li className="text-slate-300">
                    • Enabled automatic preprocessing and visualization of uploaded{" "}
                    <span className="text-blue-400">light curves</span>
                  </li>
                  <li className="text-slate-300">• Displayed clear performance metrics for each model</li>
                  <li className="text-slate-300">
                    • Built user profiles to save and <span className="text-blue-400">access past uploads</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* From Idea to Impact */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">From Idea to Impact</CardTitle>
              <CardDescription className="text-slate-400">
                A complete walkthrough of the project from scratch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-800 rounded-lg overflow-hidden">
                <iframe
                  src="https://drive.google.com/file/d/1BKKfnZqquv1HljSb3kksOMMO7DvSJ1Gr/preview"
                  className="w-full h-[480px]"
                  allow="autoplay"
                  title="Project Timeline Video"
                />
              </div>
            </CardContent>
          </Card>

          {/* Ready to Explore */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Ready to Explore?</CardTitle>
              <CardDescription className="text-slate-400">
                Your journey into discovering new worlds starts here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-800 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-white mb-4">Unlock the Universe</h3>
                <ul className="space-y-2 mb-6">
                  <li className="text-slate-300">• Discover new worlds beyond our solar system</li>
                  <li className="text-slate-300">• Turn massive space data into simple insights</li>
                  <li className="text-slate-300">• Experience how AI changes the way we explore the universe</li>
                  <li className="text-slate-300">• From curiosity to real discovery — in just a few clicks</li>
                  <li className="text-slate-300">• The next big finding could start with you</li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6">
                  Let&apos;s Change the World
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
