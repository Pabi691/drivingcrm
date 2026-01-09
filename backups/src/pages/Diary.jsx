import React from 'react';
import { Header, Stacked, Pie } from '../components';
import Scheduler from './Calendar';
import { lessonsData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Diary = () => {
  const { currentColor } = useStateContext();

  const totalLessons = lessonsData.length;
  const completed = lessonsData.filter(l => l.Status === 'Completed').length;
  const cancelled = lessonsData.filter(l => l.Status === 'Cancelled').length;
  const scheduled = lessonsData.filter(l => l.Status === 'Scheduled').length;

  return (
    <div className="mt-10 m-2 md:m-6">

      {/* Scheduler */}
      <div className="bg-white rounded-2xl p-4 mb-6">
        <Header title="Lesson Scheduler" />
        <Scheduler />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Lessons" value={totalLessons} color={currentColor} />
        <StatCard title="Scheduled" value={scheduled} color="#3b82f6" />
        <StatCard title="Completed" value={completed} color="#22c55e" />
        <StatCard title="Cancelled" value={cancelled} color="#ef4444" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Lesson Status Overview</h3>
          <Pie
            id="lesson-status"
            data={[
              { x: 'Scheduled', y: scheduled },
              { x: 'Completed', y: completed },
              { x: 'Cancelled', y: cancelled },
            ]}
          />
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Instructor Load</h3>
          <Stacked />
        </div>
      </div>

      {/* Upcoming Lessons */}
      <div className="bg-white rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Upcoming Lessons</h3>
        <div className="space-y-3">
          {lessonsData
            .filter(l => l.Status === 'Scheduled')
            .slice(0, 5)
            .map(lesson => (
              <div key={lesson.LessonID} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{lesson.LearnerName}</p>
                  <p className="text-sm text-gray-500">
                    {lesson.LessonDate} • {lesson.StartTime} – {lesson.EndTime}
                  </p>
                </div>
                <span className="text-sm text-blue-600">{lesson.InstructorName}</span>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default Diary;

/* KPI Card */
const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-xl p-5 shadow">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-semibold mt-1" style={{ color }}>
      {value}
    </p>
  </div>
);
