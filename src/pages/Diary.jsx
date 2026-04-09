import React, { useEffect, useState } from 'react';
import { Header, Stacked, Pie } from '../components';
import { lessonsData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import MasterBookingCalendar from './MasterBookingCalender';

const Diary = () => {
    const { currentColor, GetAllBookings } = useStateContext();
    const [Bookings, setBookings] = useState([])

    async function FetchBookings() {
        try {

            const res = await GetAllBookings();
            console.log('response', res)
            setBookings(res)
        } catch (error) {
            console.log('error', error)
        }
    }

    const completed = Bookings.filter(l => l.status?.toLowerCase() === 'completed').length;
    const cancelled = Bookings.filter(l => l.status?.toLowerCase() === 'cancelled').length;
    const scheduled = Bookings.filter(l => {
        const s = l.status?.toLowerCase();
        return s === 'pending' || s === 'scheduled' || (!s && l.booking_date);
    }).length;
    const totalLessons = scheduled + completed + cancelled;

    useEffect(() => {
        FetchBookings()
    }, [])

    // Data for Pie Chart
    const pieData = [
        { x: 'Scheduled', y: scheduled, text: scheduled > 0 ? `${scheduled}` : '' },
        { x: 'Completed', y: completed, text: completed > 0 ? `${completed}` : '' },
        { x: 'Cancelled', y: cancelled, text: cancelled > 0 ? `${cancelled}` : '' },
    ];

    return (
        <div className="mt-10 m-2 md:m-6">

            <div className="bg-white rounded-2xl p-4 mb-6">
                <Header title="School Diary (All Bookings)" />
                <MasterBookingCalendar />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard title="Total Bookings" value={totalLessons} color={currentColor} />
                <StatCard title="Scheduled" value={scheduled} color="#3b82f6" />
                <StatCard title="Completed" value={completed} color="#22c55e" />
                <StatCard title="Cancelled" value={cancelled} color="#ef4444" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Booking Status Overview</h3>
                    <Pie
                        id="lesson-status"
                        data={pieData}
                    />
                </div>

                <div className="bg-white rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Instructor Load</h3>
                    <Stacked />
                </div>
            </div>
        </div>
    );
};

export default Diary;

const StatCard = ({ title, value, color }) => (
    <div className="bg-white rounded-xl p-5 shadow">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold mt-1" style={{ color }}>
            {value}
        </p>
    </div>
);
