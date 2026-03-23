import React, { useEffect, useRef, useState } from 'react';
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
import BookingEditor from '../components/templates/BookingEditor';

const MasterBookingCalendar = () => {
  const scheduleRef = useRef(null);

  const {
    GetAllBookings,
    CreateBooking,
    UpdateBooking,
    instructors,
    learners
  } = useStateContext();

  const [events, setEvents] = useState([]);

  /* ================= LOAD BOOKINGS ================= */

  useEffect(() => {
    let mounted = true;

    const loadBookings = async () => {
      const res = await GetAllBookings();
      if (!mounted) return;

      const formatted = res.map((b) => {
        const dateOnly = b.booking_date.split('T')[0];
        const status = b.status?.toLowerCase(); // normalize

        return {
          Id: b._id,
          Subject: 'Booking',
          StartTime: new Date(`${dateOnly}T${b.start_time}`),
          EndTime: new Date(`${dateOnly}T${b.end_time}`),
          InstructorId: b.instructor_id?._id,
          LearnerId:b.pupil_id?._id,
          
          IsAllDay: false
        };
      });

      setEvents(formatted);
    };

    loadBookings();
    return () => (mounted = false);
  }, [GetAllBookings]);

  /* ================= SAVE TO API ================= */

  const onActionBegin = async (args) => {
    if (
      args.requestType !== 'eventCreate' &&
      args.requestType !== 'eventChange'
    ) {
      return;
    }

    const data = Array.isArray(args.data)
      ? args.data[0]
      : args.data;

    if (!data.StartTime || !data.EndTime) {
      console.error('Missing time data', data);
      args.cancel = true;
      return;
    }

    const payload = {
      booking_date: data.StartTime.toISOString().split('T')[0],
      start_time: data.StartTime.toTimeString().slice(0, 5),
      end_time: data.EndTime.toTimeString().slice(0, 5),
      instructor_id: data.InstructorId,
      pupil_id: data.LearnerId
    };

    try {
      if (args.requestType === 'eventCreate') {
        const created = await CreateBooking(payload);
        data.Id = created._id;
      }

      if (args.requestType === 'eventChange') {
        await UpdateBooking(data.Id, payload);
      }
    } catch (err) {
      console.error(err);
      args.cancel = true;
    }
  };

  /* ================= DISABLE QUICK POPUP ================= */

  const onPopupOpen = (args) => {
    if (args.type === 'QuickInfo') {
      args.cancel = true;
    }
  };

  /* ================= COLOR RENDERING ================= */

  const onEventRendered = (args) => {
    const status = args.data.Status;

    if (status === "completed") {
      args.element.style.setProperty(
        "background-color",
        "#16a34a",
        "important"
      );
    }

    if (status === "cancelled") {
      args.element.style.setProperty(
        "background-color",
        "#dc2626",
        "important"
      );
      args.element.style.opacity = "0.6";
      args.element.style.textDecoration = "line-through";
    }

    if (!status || (status !== "completed" && status !== "cancelled")) {
      args.element.style.setProperty(
        "background-color",
        "#2563eb",
        "important"
      );
    }
  };

  /* ================= RENDER ================= */

  return (
    <ScheduleComponent
      ref={scheduleRef}
      height="650px"
      selectedDate={new Date()}
      eventSettings={{ dataSource: events }}
      editorTemplate={(props) => (
        <BookingEditor
          {...props}
          instructors={instructors}
          learners={learners}
          scheduleRef={scheduleRef}
        />
      )}
      popupOpen={onPopupOpen}
      actionBegin={onActionBegin}
      eventRendered={onEventRendered}
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
  );
};

export default MasterBookingCalendar;