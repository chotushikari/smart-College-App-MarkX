import { Card, CardHeader, CardTitle, CardContent } from "C:/smart-college-app/smart-college-app/frontend/src/components/ui/card.jsx";


const TodayScheduleCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🗓️ Today's Classes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>09:00 AM - BTech CSE - Data Structures</li>
          <li>11:00 AM - BSc IT - DBMS</li>
          <li>02:00 PM - BCA - OS Lab</li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default TodayScheduleCard
