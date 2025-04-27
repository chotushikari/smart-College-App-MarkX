import { Card, CardHeader, CardTitle, CardContent } from "C:/smart-college-app/smart-college-app/frontend/src/components/ui/card.jsx";


const AnnouncementList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📢 Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-1">
          <li>📌 DBMS assignment due Friday</li>
          <li>📌 Class moved to Room 201 tomorrow</li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default AnnouncementList
