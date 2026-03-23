import React, { useEffect, useState } from 'react';

/* ===== FORMAT DATE IN LOCAL TIME (NOT UTC) ===== */

const formatLocalDateTime = (date) => {
  if (!date) return '';

  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/* ===== COMPONENT ===== */

const BookingEditor = ({
  Id,
  Subject,
  StartTime,
  EndTime,
  InstructorId,
  LearnerId,
  instructors = [],
  learners = [],
  scheduleRef
}) => {

  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [learner, setLearner] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  /* ===== LOAD EVENT DATA INTO FORM ===== */

  useEffect(() => {

    setTitle(Subject || 'Booking');
    setInstructor(InstructorId || '');
    setLearner(LearnerId || '');

    setStart(formatLocalDateTime(StartTime));
    setEnd(formatLocalDateTime(EndTime));

  }, [Id, Subject, InstructorId, LearnerId, StartTime, EndTime]);

  /* ===== RENDER ===== */

  return (
    <div className="p-6 w-[420px] space-y-5">

      {/* TITLE */}
      <div>
        <label className="block text-sm mb-1">Title</label>
        <input
          name="Subject"
          className="e-field w-full border rounded-lg px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* INSTRUCTOR */}
      <div>
        <label className="block text-sm mb-1">Instructor</label>

        <select
          name="InstructorId"
          className="e-field w-full border rounded-lg px-3 py-2"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        >
          <option value="">Select Instructor</option>

          {instructors.map((i) => (
            <option key={i._id} value={i._id}>
              {i.name}
            </option>
          ))}
        </select>
      </div>

      {/* LEARNER */}
      <div>
        <label className="block text-sm mb-1">Learner</label>

        <select
          name="LearnerId"
          className="e-field w-full border rounded-lg px-3 py-2"
          value={learner}
          onChange={(e) => setLearner(e.target.value)}
        >
          <option value="">Select Learner</option>

          {learners.map((l) => (
            <option key={l._id} value={l._id}>
              {l.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* START TIME */}
      <div>
        <label className="block text-sm mb-1">Start Time</label>

        <input
          type="datetime-local"
          name="StartTime"
          className="e-field w-full border rounded-lg px-3 py-2"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>

      {/* END TIME */}
      <div>
        <label className="block text-sm mb-1">End Time</label>

        <input
          type="datetime-local"
          name="EndTime"
          className="e-field w-full border rounded-lg px-3 py-2"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

    </div>
  );
};

export default BookingEditor;