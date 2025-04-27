import { Card, CardHeader, CardTitle, CardContent } from "C:/smart-college-app/smart-college-app/frontend/src/components/ui/card.jsx";


const QuickAttendanceCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>✅ Mark Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Start Swipe Mode
        </button>
        <p className="text-xs text-muted-foreground mt-2">or tap to manually mark attendance</p>
      </CardContent>
    </Card>
  )
}

export default QuickAttendanceCard
