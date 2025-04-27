import { Card, CardHeader, CardTitle, CardContent } from "C:/smart-college-app/smart-college-app/frontend/src/components/ui/card.jsx";


const WelcomeBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome back, Professor!</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">Here’s a quick overview of your day 📚</CardContent>
    </Card>
  )
}

export default WelcomeBanner
