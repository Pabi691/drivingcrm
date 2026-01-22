import { useStateContext } from '../../contexts/ContextProvider';

const EditorTemplate = (props) => {
  const { learners, instructors } = useStateContext();

  const formatDateTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="event-editor-card">
      <h3 className="editor-title">New Booking</h3>

      {/* Title */}
      <div className="field">
        <label>Title</label>
        <input
          type="text"
          name="Subject"
          className="e-field input"
          defaultValue={props.Subject || 'Booking'}
        />
      </div>

      {/* Instructor */}
      <div className="field">
        <label>Instructor</label>
        <select
          name="InstructorId"
          className="e-field input"
          defaultValue={props.InstructorId || ''}
          disabled={!!props.InstructorId}
        >
          <option value="">Select Instructor</option>
          {instructors?.map((i) => (
            <option key={i._id} value={i._id}>
              {i.name}
            </option>
          ))}
        </select>
      </div>

      {/* Pupil */}
      <div className="field">
        <label>Pupil</label>
        <select
          name="PupilId"
          className="e-field input"
          defaultValue={props?.PupilId || ''}
        >
          <option value="">Select Pupil</option>
          {learners?.map((l) => (
            <option key={l._id} value={l._id}>
              {l.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* Time Display */}
      <div className="time-box">
        <div>
          <span className="time-label">Start</span>
          <span className="time-value">
            {formatDateTime(props.StartTime)}
          </span>
        </div>

        <div>
          <span className="time-label">End</span>
          <span className="time-value">
            {formatDateTime(props.EndTime)}
          </span>
        </div>
      </div>

      {/* 🔒 Hidden fields to preserve values */}
      <input
        type="hidden"
        name="StartTime"
        className="e-field"
        value={props.StartTime}
      />
      <input
        type="hidden"
        name="EndTime"
        className="e-field"
        value={props.EndTime}
      />
    </div>
  );
};

export default EditorTemplate;
