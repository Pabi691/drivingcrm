import React, { useEffect, useState } from 'react';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject
} from '@syncfusion/ej2-react-schedule';
import { useStateContext } from '../contexts/ContextProvider';

const MasterBookingCalendar = () => {
  const { GetAllBookings } = useStateContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      const res = await GetAllBookings();

      const formatted = res.map((b) => {
        const dateOnly = b.booking_date.split('T')[0];

        return {
          Id: b._id,
          Subject: 'Lesson',
          StartTime: new Date(`${dateOnly}T${b.start_time}`),
          EndTime: new Date(`${dateOnly}T${b.end_time}`),
          IsAllDay: false
        };
      });

      setEvents(formatted);
    };

    loadBookings();
  }, [GetAllBookings]);

  // 🔐 Allow VIEW popup only
  const popupOpen = (args) => {
    if (args.type === 'Editor') {
      args.cancel = true; // ❌ block edit form
    }
  };

  return (
    <div className="bg-white rounded-xl">
      <ScheduleComponent
        height="650px"
        selectedDate={new Date()}
        eventSettings={{ dataSource: events }}
        popupOpen={popupOpen}
        readOnly={false}   // 🚨 MUST be false
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>

        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default MasterBookingCalendar;
