import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
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

/* ---------- UTIL ---------- */

const toDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const toTime = (date) => {
  const d = new Date(date);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};
/* ---------- COMPONENT ---------- */

const Scheduler = ({ instructorId }) => {
  const { GetBooking, createBooking, UpdateBooking } = useStateContext();

  const scheduleRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  /* ---------- FETCH BOOKINGS ---------- */

  const fetchBookings = async () => {
    try {
      const res = await GetBooking(instructorId);

      const formatted = res.map((b) => {
        const dateOnly = b.booking_date.split('T')[0];
        const status = b.status?.toLowerCase(); // normalize

        return {
          Id: b._id,
          Subject: b.title,
          StartTime: new Date(`${dateOnly}T${b.start_time}`),
          EndTime: new Date(`${dateOnly}T${b.end_time}`),
          InstructorId: b.instructor_id?._id,
          PupilId: b.pupil_id?._id,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          Status: status,
          IsAllDay: false
        };
      });

      setEvents(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (instructorId) fetchBookings();
  }, [instructorId, GetBooking]);

  /* ---------- DATE PICKER ---------- */

  const onDateChange = (args) => {
    setSelectedDate(args.value);

    if (scheduleRef.current) {
      scheduleRef.current.selectedDate = args.value;
      scheduleRef.current.dataBind();
    }
  };

  /* ---------- POPUP OPEN ---------- */

  const onPopupOpen = (args) => {
    if (args.type === 'Editor') {
      if (!args.data.Id && instructorId) {
        args.data.InstructorId = instructorId;
        args.data.Subject = 'Booking';

        setTimeout(() => {
          const instructorField =
            args.element.querySelector('[name="InstructorId"]');

          if (instructorField) {
            instructorField.value = instructorId;
          }
        }, 0);
      }
    }
  };
  /* ---------- DRAG ---------- */

  const onDragStart = (args) => {
    args.navigation.enable = true;
  };

  /* ---------- COLOR RENDERING ---------- */

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

  /* ---------- CREATE / UPDATE ---------- */

  const onActionBegin = async (args) => {
    if (
      args.requestType === 'eventCreate' ||
      args.requestType === 'eventChange'
    ) {
      const data = Array.isArray(args.data)
        ? args.data[0]
        : args.data;

      const body = {
        pupil_id: data.PupilId,
        instructor_id: data.InstructorId,
        booking_date: toDate(data.StartTime),
        start_time: toTime(data.StartTime),
        end_time: toTime(data.EndTime),
        title: data.Subject
      };

      try {
        if (args.requestType === 'eventCreate') {
          await createBooking(body);
          toast.success('Booking Added');
        } else if (args.requestType === 'eventChange') {
          await UpdateBooking(data.Id || data._id, body);
          toast.success('Booking Updated');
        }

        args.cancel = true;
        if (scheduleRef.current) {
          scheduleRef.current.closeEditor();
        }

        await fetchBookings();

      } catch (err) {
        console.error(err);
        args.cancel = true;
      }
    }
  };

  /* ---------- RENDER ---------- */

  return (
    <div className="m-2 p-2 md:p-4 bg-white rounded-2xl">
      <ScheduleComponent
        height="650px"
        ref={scheduleRef}
        selectedDate={selectedDate}
        eventSettings={{ dataSource: events }}
        editorTemplate={EditorTemplate}
        popupOpen={onPopupOpen}
        actionBegin={onActionBegin}
        dragStart={onDragStart}
        timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}

        eventRendered={onEventRendered}   // ✅ Added
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
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

      <DatePickerComponent
        value={selectedDate}
        showClearButton={false}
        placeholder="Current Date"
        floatLabelType="Always"
        change={onDateChange}
      />
    </div>
  );
};

export default Scheduler;