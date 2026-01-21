import { useStateContext } from '../../contexts/ContextProvider';

const toDate = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().slice(0, 10);
};

const toTime = (date) => {
  if (!date) return '';
  return new Date(date).toTimeString().slice(0, 5);
};

const EditorTemplate = (props) => {
  // ✅ Hooks must be here
  const { learners, instructors } = useStateContext();
  console.log('lesdfsdarners',learners)

  return (
    <table className="custom-event-editor" style={{ width: '100%' }}>
      <tbody>

        {/* Title */}
        <tr>
          <td className="e-textlabel">Title</td>
          <td colSpan={4}>
            <input
              type="text"
              name="Subject"
              className="e-field e-input"
              defaultValue={props.Subject || 'Booking'}
            />
          </td>
        </tr>

        {/* Instructor */}
      <tr>
  <td className="e-textlabel">Instructor</td>
  <td colSpan={4}>
    <div className="e-input-group">
      <select
        name="InstructorId"
        className="e-field e-input"
        defaultValue={props.InstructorId || ''}
      >
        <option value="">Select Instructor</option>
        {instructors.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
    </div>
  </td>
</tr>


        {/* Pupil */}
      <tr>
  <td className="e-textlabel">Pupil</td>
  <td colSpan={8}>
    <div className="e-input-group">
      <select
        name="PupilId"
        className="e-field e-input"
        defaultValue={props.PupilId || ''}
      >
        <option value="">Select Pupil</option>
        {learners.map((l) => (
          <option key={l._id} value={l._id}>
            {l.full_name}
          </option>
        ))}
      </select>
    </div>
  </td>
</tr>


        {/* Date */}
        <tr>
          <td className="e-textlabel">Date</td>
          <td colSpan={4}>
            <input
              type="date"
              className="e-input"
              defaultValue={toDate(props.StartTime)}
              readOnly
            />
          </td>
        </tr>

        {/* Start Time */}
        <tr>
          <td className="e-textlabel">Start Time</td>
          <td colSpan={4}>
            <input
              type="time"
              className="e-input"
              defaultValue={toTime(props.StartTime)}
            />
          </td>
        </tr>

        {/* End Time */}
        <tr>
          <td className="e-textlabel">End Time</td>
          <td colSpan={4}>
            <input
              type="time"
              className="e-input"
              defaultValue={toTime(props.EndTime)}
            />
          </td>
        </tr>

      </tbody>
    </table>
  );
};

export default EditorTemplate;
