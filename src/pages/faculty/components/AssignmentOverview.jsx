import { Card, CardHeader, CardTitle, CardContent } from "C:/smart-college-app/smart-college-app/frontend/src/components/ui/card.jsx";


const AssignmentOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📚 Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-1">
          <li>💾 Upload DSA Assignment</li>
          <li>✅ 20/30 students submitted DBMS</li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default AssignmentOverview
