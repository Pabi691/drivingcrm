import React, { useEffect, useRef, useState } from 'react';
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
    Inject
} from '@syncfusion/ej2-react-schedule';

import { useStateContext } from '../contexts/ContextProvider';
import EditorTemplate from '../components/templates/EditorTemplate';

/* ================= TIME HELPERS ================= */

const toDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        '0'
    )}-${String(d.getDate()).padStart(2, '0')}`;
};

const toTime = (date) => {
    const d = new Date(date);
    return `${String(d.getHours()).padStart(2, '0')}:${String(
        d.getMinutes()
    ).padStart(2, '0')}`;
};

/* ================= COMPONENT ================= */

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

    const loadBookings = async () => {
        try {
            const res = await GetAllBookings();

            const formatted = res.map((b) => {
                const dateOnly = b.booking_date.split('T')[0];
                const status = b.status?.toLowerCase();

                return {
                    Id: b._id,
                    Subject: b.title || 'Booking',
                    title: b.title || 'Booking',
                    StartTime: new Date(`${dateOnly}T${b.start_time}`),
                    EndTime: new Date(`${dateOnly}T${b.end_time}`),
                    InstructorId: b.instructor_id?._id,
                    PupilId: b.pupil_id?._id,
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
        loadBookings();
    }, [GetAllBookings]);

    /* ================= SAVE BOOKINGS ================= */

    const onActionBegin = async (args) => {
        if (
            args.requestType === 'eventCreate' ||
            args.requestType === 'eventChange'
        ) {
            const data = Array.isArray(args.data) ? args.data[0] : args.data;

            if (!data.StartTime || !data.EndTime) {
                args.cancel = true;
                return;
            }

            const payload = {
                title: data.Subject || 'Booking',
                booking_date: toDate(data.StartTime),
                start_time: toTime(data.StartTime),
                end_time: toTime(data.EndTime),
                instructor_id: data.InstructorId,
                pupil_id: data.PupilId
            };

            try {
                if (args.requestType === 'eventCreate') {
                    await CreateBooking(payload);
                    toast.success('Booking Added');
                } else if (args.requestType === 'eventChange') {
                    await UpdateBooking(data.Id || data._id, payload);
                    toast.success('Booking Updated');
                }

                // Prevent immediate UI change to wait for reload
                args.cancel = true;
                if (scheduleRef.current) {
                    scheduleRef.current.closeEditor();
                }
                
                // Refresh data
                await loadBookings();

            } catch (err) {
                console.error(err);
                args.cancel = true;
            }
        }
    };

    /* ================= POPUP OPEN ================= */

    const onPopupOpen = (args) => {
        if (args.type === 'QuickInfo') {
            args.cancel = true;
        }
    };

    /* ================= COLOR BOOKINGS ================= */

    const onEventRendered = (args) => {
        const status = args.data.Status;

        if (status === 'completed') {
            args.element.style.setProperty(
                'background-color',
                '#16a34a',
                'important'
            );
        }

        if (status === 'cancelled') {
            args.element.style.setProperty(
                'background-color',
                '#dc2626',
                'important'
            );
            args.element.style.opacity = '0.6';
            args.element.style.textDecoration = 'line-through';
        }

        if (!status || (status !== 'completed' && status !== 'cancelled')) {
            args.element.style.setProperty(
                'background-color',
                '#2563eb',
                'important'
            );
        }
    };

    /* ================= RENDER ================= */

    return (
        <ScheduleComponent
            ref={scheduleRef}
            height="650px"
            selectedDate={new Date()}
            timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
            eventSettings={{ dataSource: events }}
            editorTemplate={EditorTemplate}
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