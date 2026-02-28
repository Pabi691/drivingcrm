import { useStateContext } from '../../contexts/ContextProvider';

const EditorTemplate = (props) => {
  const { learners, instructors } = useStateContext();
  console.log('leansrs',learners)

  const isEditMode = !!props.Id;

  const formatDateTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="event-editor-card">

      <h3>{isEditMode ? 'Edit Booking' : 'New Booking'}</h3>

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
          disabled={!isEditMode}  // locked only during create
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
          defaultValue={props.PupilId || ''}
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
          <b>Start:</b> {formatDateTime(props.StartTime)}
        </div>

        <div>
          <b>End:</b> {formatDateTime(props.EndTime)}
        </div>
      </div>

      {/* Hidden fields for Syncfusion */}
      <input
        type="hidden"
        name="StartTime"
        className="e-field"
        defaultValue={props.StartTime}
      />

      <input
        type="hidden"
        name="EndTime"
        className="e-field"
        defaultValue={props.EndTime}
      />
    </div>
  );
};

export default EditorTemplate;
