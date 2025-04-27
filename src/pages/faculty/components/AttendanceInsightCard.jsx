import { Card, CardHeader, CardTitle, CardContent } from "C:/smart-college-app/smart-college-app/frontend/src/components/ui/card.jsx";


const AttendanceInsightCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Attendance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 flex items-center justify-center text-muted-foreground">
          [Graph Coming Soon...]
        </div>
      </CardContent>
    </Card>
  )
}

export default AttendanceInsightCard
