import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { lessonsData } from '../data/dummy';

const LessonProfilePage = () => {
  const { id } = useParams();

  const lesson = lessonsData.find(
    (l) => l.LessonID === Number(id)
  );

  if (!lesson) {
    return <Navigate to="/lessons" replace />;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      <button
        type="button"
        onClick={() => window.history.back()}
        className="text-sm text-gray-600 hover:underline"
      >
        ← Back to Lessons
      </button>

      {/* HEADER */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Lesson #{lesson.LessonID}</h1>
          <p className="text-gray-500 text-sm">
            {lesson.LessonDate} · {lesson.StartTime} – {lesson.EndTime}
          </p>
        </div>

        <StatusBadge status={lesson.Status} />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* LESSON DETAILS */}
          <Card title="Lesson Details">
            <Info label="Duration" value={lesson.Duration} />
            <Info label="Type" value={lesson.Type} />
            <Info label="Location" value={lesson.Location} />
            <Info label="Vehicle" value={lesson.Vehicle} />
          </Card>

          {/* NOTES */}
          <Card title="Instructor Notes">
            <p className="text-sm text-gray-700">
              {lesson.Notes || 'No notes added yet.'}
            </p>
          </Card>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* LEARNER */}
          <ProfileMini
            title="Learner"
            name={lesson.LearnerName}
            image={lesson.LearnerImage}
            link={`/learners/${lesson.LearnerID}`}
          />

          {/* INSTRUCTOR */}
          <ProfileMini
            title="Instructor"
            name={lesson.Instructor}
            image={lesson.InstructorImage}
            link={`/instructors/${lesson.InstructorID}`}
          />

        </div>
      </div>
    </div>
  );
};

export default LessonProfilePage;

/* ---------- SMALL COMPONENTS ---------- */

const Card = ({ title, children }) => (
  <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow space-y-4">
    <h3 className="font-semibold">{title}</h3>
    {children}
  </div>
);

const Info = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Scheduled: 'bg-blue-100 text-blue-700',
    Completed: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <span className={`px-4 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

const ProfileMini = ({ title, name, image, link }) => (
  <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
    <p className="text-xs text-gray-500 mb-2">{title}</p>

    <Link to={link} className="flex items-center gap-3 hover:underline">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <p className="font-medium">{name}</p>
    </Link>
  </div>
);
