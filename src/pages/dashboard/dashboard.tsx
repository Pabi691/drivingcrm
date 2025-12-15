import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage({ user, onLogout }: any) {
  const stats = [
    {
      title: "Total Instructors",
      value: "12",
      color: "bg-blue-500",
    },
    {
      title: "Total Learners",
      value: "85",
      color: "bg-green-500",
    },
    {
      title: "Active Lessons",
      value: "34",
      color: "bg-purple-500",
    },
    {
      title: "Pending Enquiries",
      value: "5",
      color: "bg-red-500",
    },
  ];

  const lineData = [
    { name: "Mon", lessons: 20 },
    { name: "Tue", lessons: 35 },
    { name: "Wed", lessons: 30 },
    { name: "Thu", lessons: 45 },
    { name: "Fri", lessons: 25 },
  ];

  const barData = [
    { name: "Instructors", count: 12 },
    { name: "Learners", count: 85 },
    { name: "Lessons", count: 34 },
  ];

  const pieData = [
    { name: "Completed", value: 65 },
    { name: "Pending", value: 35 },
  ];

  const COLORS = ["#4ade80", "#fb923c"];

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-full ${item.color} mb-4`}></div>

            <h3 className="text-lg text-black font-semibold">{item.title}</h3>
            <p className="text-3xl text-gray-900 font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg col-span-2">
          <h3 className="text-xl text-gray-900 font-semibold mb-4">Weekly Lessons Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="lessons" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl text-gray-900 font-semibold mb-4">Lesson Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg col-span-3">
          <h3 className="text-xl text-gray-900 font-semibold mb-4">User & Lesson Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
