import { Card, CardHeader, CardTitle, CardContent } from "C:/smart-college-app/smart-college-app/frontend/src/components/ui/card.jsx";


const StudentOverviewCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🎓 Your Students</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          View attendance, performance & insights →
        </p>
      </CardContent>
    </Card>
  )
}

export default StudentOverviewCard
