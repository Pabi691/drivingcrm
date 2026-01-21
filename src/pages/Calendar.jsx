import React, { useState, useEffect } from 'react';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useStateContext } from '../contexts/ContextProvider';
import EditorTemplate from '../components/templates/EditorTemplate';

const toDate = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().slice(0, 10);
};

const toTime = (date) => {
  if (!date) return '';
  return new Date(date).toTimeString().slice(0, 5);
};
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = ({ instructorId }) => {
  const { GetBooking ,createBooking} = useStateContext();
  const [scheduleObj, setScheduleObj] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  /* ================= HELPER FUNCTIONS ================= */

  const toDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().slice(0, 10);
  };

  const toTime = (date) => {
    if (!date) return '';
    return new Date(date).toTimeString().slice(0, 5);
  };

  /* ================= FETCH EXISTING BOOKINGS ================= */
 const fetchBookings = async () => {
      try {
        const res = await GetBooking(instructorId);
        console.log('Bookings:', res);

        if (!res || res.length === 0) {
          setEvents([]);
          return;
        }

        const formattedEvents = res.map((booking) => {
          const dateOnly = booking.booking_date.split('T')[0];
          const start = new Date(`${dateOnly}T${booking.start_time}:00`);
          const end = new Date(`${dateOnly}T${booking.end_time}:00`);

          return {
            Id: booking._id,
            Subject: 'Booking',
            StartTime: start,
            EndTime: end,
            IsAllDay: false
          };
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setEvents([]);
      }
    };
  useEffect(() => {
    if (!instructorId) return;

   fetchBookings()

    fetchBookings();
  }, [instructorId, GetBooking]);

  /* ================= DATE PICKER ================= */

  const change = (args) => {
    setSelectedDate(args.value);
    if (scheduleObj) {
      scheduleObj.selectedDate = args.value;
      scheduleObj.dataBind();
    }
  };

  /* ================= DRAG ================= */

  const onDragStart = (arg) => {
    arg.navigation.enable = true;
  };

  /* ================= SAVE / UPDATE ================= */

  const onActionBegin = async (args) => {
    if (
      args.requestType === 'eventCreate' ||
      args.requestType === 'eventChange'
    ) {
      const data = Array.isArray(args.data) ? args.data[0] : args.data;

      const body = {
        pupil_id: '696f3be082912426d00c6f97',
        instructor_id: instructorId,
        booking_date: toDate(data.StartTime),
        start_time: toTime(data.StartTime),
        end_time: toTime(data.EndTime)
      };

      console.log('API BODY:', body);

      // 👉 Call your API here-
       const res=await createBooking(body);
       console.log('response to create',res);
       fetchBookings()

      // ❌ Uncomment if backend is source of truth
      // args.cancel = true;
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="m-2 p-2 md:p-4 bg-white rounded-2xl">
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={selectedDate}
        eventSettings={{ dataSource: events }}
        editorTemplate={EditorTemplate}
        actionBegin={onActionBegin}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => (
            <ViewDirective key={item} option={item} />
          ))}
        </ViewsDirective>

        <Inject
          services={[
            Day,
            Week,
            WorkWeek,
            Month,
            Agenda,
            Resize,
            DragAndDrop
          ]}
        />
      </ScheduleComponent>

      <PropertyPane>
        <table style={{ width: '100%', background: 'white' }}>
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  value={selectedDate}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Scheduler;
