import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const sampleData = [
  { name: 'Week 1', Math: 92, Physics: 85, CS: 88 },
  { name: 'Week 2', Math: 88, Physics: 80, CS: 90 },
  { name: 'Week 3', Math: 85, Physics: 78, CS: 87 },
  { name: 'Week 4', Math: 91, Physics: 83, CS: 92 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">📊 Attendance Insights</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sampleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis domain={[70, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Math" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="Physics" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="CS" stroke="#ff7300" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
