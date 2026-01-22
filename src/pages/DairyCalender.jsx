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

const DiaryCalendar = () => {
  const { GetAllBookings } = useStateContext();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    let mounted = true;

    const loadBookings = async () => {
      try {
        const res = await GetAllBookings();
        if (!mounted) return;

        const formatted = res.map((b) => {
          const dateOnly = b.booking_date.split('T')[0];

          return {
            Id: b._id,
            Subject: `${b.pupil_id?.full_name} • ${b.instructor_id?.name}`,
            StartTime: new Date(`${dateOnly}T${b.start_time}`),
            EndTime: new Date(`${dateOnly}T${b.end_time}`),
            IsAllDay: false
          };
        });

        setEvents(formatted);
      } catch (err) {
        console.error('Diary calendar error:', err);
      }
    };

    loadBookings();

    return () => {
      mounted = false;
    };
  }, [GetAllBookings]);

  /* ❌ Disable all interactions */
  const disablePopup = (args) => {
    args.cancel = true;
  };

  return (
    <div className="bg-white rounded-2xl p-4">
      <ScheduleComponent
        height="650px"
        selectedDate={selectedDate}
        eventSettings={{ dataSource: events }}
        popupOpen={disablePopup}
        readonly={true}      // 🔥 important
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

export default DiaryCalendar;
