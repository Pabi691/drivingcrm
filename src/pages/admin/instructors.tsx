import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface Instructor {
  id: number;
  name: string;
  email: string;
  phone: string;
  availability: {
    workingDays: string[]; // e.g., ["Monday", "Tuesday", ...]
    workingHours: { start: string; end: string }; // e.g., { start: "09:00", end: "17:00" }
    daysOff: string[]; // e.g., ["2023-12-25"]
  };
  holidays: { start: string; end: string; reason: string }[]; // Array of holiday periods
  sickLeaves: { start: string; end: string; reason: string }[]; // Array of sick leave periods
  passRates: number; // e.g., 85 (percentage)
  adiBadgeExpiry: string; // Date string, e.g., "2024-12-31"
  pdiLicenseExpiry: string; // Date string, e.g., "2024-12-31"
  zone: number; // 1-4
  performanceStats: {
    totalLessons: number;
    completedLessons: number;
    averageRating: number;
  };
  // Additional fields for enquiries allocation, but since this is instructor management, perhaps link to enquiries separately
}

export default function InstructorsPage({ user, onLogout }: any) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Instructor | null>(null);
  const [viewDetails, setViewDetails] = useState<Instructor | null>(null); // For viewing detailed stats

  // Dummy Data - Expanded with all possible options
  const [instructors, setInstructors] = useState<Instructor[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      availability: {
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        workingHours: { start: "09:00", end: "17:00" },
        daysOff: ["2023-12-25"],
      },
      holidays: [{ start: "2023-07-01", end: "2023-07-07", reason: "Vacation" }],
      sickLeaves: [],
      passRates: 90,
      adiBadgeExpiry: "2024-12-31",
      pdiLicenseExpiry: "2024-12-31",
      zone: 1,
      performanceStats: { totalLessons: 100, completedLessons: 95, averageRating: 4.5 },
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      phone: "9123456789",
      availability: {
        workingDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        workingHours: { start: "10:00", end: "18:00" },
        daysOff: [],
      },
      holidays: [],
      sickLeaves: [{ start: "2023-11-01", end: "2023-11-03", reason: "Flu" }],
      passRates: 85,
      adiBadgeExpiry: "2024-06-30",
      pdiLicenseExpiry: "2024-06-30",
      zone: 2,
      performanceStats: { totalLessons: 80, completedLessons: 75, averageRating: 4.2 },
    },
    {
      id: 3,
      name: "Michael Lee",
      email: "michael@example.com",
      phone: "9988776655",
      availability: {
        workingDays: ["Monday", "Wednesday", "Friday"],
        workingHours: { start: "08:00", end: "16:00" },
        daysOff: ["2023-12-24", "2023-12-25"],
      },
      holidays: [{ start: "2023-08-15", end: "2023-08-20", reason: "Holiday" }],
      sickLeaves: [],
      passRates: 95,
      adiBadgeExpiry: "2025-01-15",
      pdiLicenseExpiry: "2025-01-15",
      zone: 3,
      performanceStats: { totalLessons: 120, completedLessons: 118, averageRating: 4.8 },
    },
  ]);

  const filtered = instructors.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.zone.toString().includes(search)
  );

  const handleDelete = (id: number) => {
    setInstructors(instructors.filter((i) => i.id !== id));
  };

  const handleSave = () => {
    if (!editItem) return;

    if (editItem.id === 0) {
      // Add new
      setInstructors([
        ...instructors,
        { ...editItem, id: Date.now() }
      ]);
    } else {
      // Update
      setInstructors(
        instructors.map((i) => (i.id === editItem.id ? editItem : i))
      );
    }

    setEditItem(null);
    setShowModal(false);
  };

  const openAdd = () => {
    setEditItem({
      id: 0,
      name: "",
      email: "",
      phone: "",
      availability: {
        workingDays: [],
        workingHours: { start: "", end: "" },
        daysOff: [],
      },
      holidays: [],
      sickLeaves: [],
      passRates: 0,
      adiBadgeExpiry: "",
      pdiLicenseExpiry: "",
      zone: 1,
      performanceStats: { totalLessons: 0, completedLessons: 0, averageRating: 0 },
    });
    setShowModal(true);
  };

  const openEdit = (item: Instructor) => {
    setEditItem(item);
    setShowModal(true);
  };

  const openViewDetails = (item: Instructor) => {
    setViewDetails(item);
  };

  const closeViewDetails = () => {
    setViewDetails(null);
  };

  // Helper to update nested availability
  const updateAvailability = (field: string, value: any) => {
    if (!editItem) return;
    setEditItem({
      ...editItem,
      availability: { ...editItem.availability, [field]: value },
    });
  };

  // Helper to add holiday/sick leave
  const addHoliday = () => {
    if (!editItem) return;
    setEditItem({
      ...editItem,
      holidays: [...editItem.holidays, { start: "", end: "", reason: "" }],
    });
  };

  const updateHoliday = (index: number, field: string, value: string) => {
    if (!editItem) return;
    const updated = editItem.holidays.map((h, i) =>
      i === index ? { ...h, [field]: value } : h
    );
    setEditItem({ ...editItem, holidays: updated });
  };

  const removeHoliday = (index: number) => {
    if (!editItem) return;
    setEditItem({
      ...editItem,
      holidays: editItem.holidays.filter((_, i) => i !== index),
    });
  };

  const addSickLeave = () => {
    if (!editItem) return;
    setEditItem({
      ...editItem,
      sickLeaves: [...editItem.sickLeaves, { start: "", end: "", reason: "" }],
    });
  };

  const updateSickLeave = (index: number, field: string, value: string) => {
    if (!editItem) return;
    const updated = editItem.sickLeaves.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    );
    setEditItem({ ...editItem, sickLeaves: updated });
  };

  const removeSickLeave = (index: number) => {
    if (!editItem) return;
    setEditItem({
      ...editItem,
      sickLeaves: editItem.sickLeaves.filter((_, i) => i !== index),
    });
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Instructors Management</h2>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          + Add Instructor
        </button>
      </div>

      {/* Search */}
      <input
        placeholder="Search by name, email, or zone..."
        className="w-full border rounded-lg px-4 py-2 mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-auto bg-white shadow rounded-xl">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Zone</th>
              <th className="p-3 text-left">Pass Rates (%)</th>
              <th className="p-3 text-left">ADI Badge Expiry</th>
              <th className="p-3 text-left">PDI License Expiry</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-gray-800">{item.id}</td>
                <td className="p-3 font-medium text-gray-800">{item.name}</td>
                <td className="p-3 text-gray-800">{item.email}</td>
                <td className="p-3 text-gray-800">{item.phone}</td>
                <td className="p-3 text-gray-800">{item.zone}</td>
                <td className="p-3 text-gray-800">{item.passRates}%</td>
                <td className="p-3 text-gray-800">{item.adiBadgeExpiry}</td>
                <td className="p-3 text-gray-800">{item.pdiLicenseExpiry}</td>
                <td className="p-3 text-center space-x-3">
                  <button
                    onClick={() => openViewDetails(item)}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {/* <span>View Details</span> */}
                  </button>
                  <button
                    onClick={() => openEdit(item)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {/* <span>Edit</span> */}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {/* <span>Delete</span> */}
                  </button>
                </td>

              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  No instructors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {viewDetails && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 w-[600px] rounded-xl shadow-xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Instructor Details: {viewDetails.name}
            </h3>
            <div className="space-y-4 text-gray-800">
              <p><strong>Availability:</strong> Days: {viewDetails.availability.workingDays.join(", ")}, Hours: {viewDetails.availability.workingHours.start} - {viewDetails.availability.workingHours.end}, Days Off: {viewDetails.availability.daysOff.join(", ")}</p>
              <p><strong>Holidays:</strong> {viewDetails.holidays.map(h => `${h.start} to ${h.end} (${h.reason})`).join(", ") || "None"}</p>
              <p><strong>Sick Leaves:</strong> {viewDetails.sickLeaves.map(s => `${s.start} to ${s.end} (${s.reason})`).join(", ") || "None"}</p>
              <p><strong>Performance Stats:</strong> Total Lessons: {viewDetails.performanceStats.totalLessons}, Completed: {viewDetails.performanceStats.completedLessons}, Avg Rating: {viewDetails.performanceStats.averageRating}</p>
              {/* Add more as needed, e.g., live view of lesson diaries could be a chart here */}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeViewDetails}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Add Modal */}
      {showModal && editItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 w-[800px] rounded-xl shadow-xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {editItem.id === 0 ? "Add Instructor" : "Edit Instructor"}
            </h3>

            <div className="space-y-4">
              <input
                className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300"
                placeholder="Full Name"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
              />

              <input
                className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300"
                placeholder="Email"
                value={editItem.email}
                onChange={(e) =>
                  setEditItem({ ...editItem, email: e.target.value })
                }
              />

              <input
                className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300"
                placeholder="Phone"
                value={editItem.phone}
                onChange={(e) =>
                  setEditItem({ ...editItem, phone: e.target.value })
                }
              />

              <select
                className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300"
                value={editItem.zone}
                onChange={(e) => setEditItem({ ...editItem, zone: Number(e.target.value) })}
              >
                <option value={1}>Zone 1</option>
                <option value={2}>Zone 2</option>
                <option value={3}>Zone 3</option>
                <option value={4}>Zone 4</option>
              </select>

              <input
                type="number"
                className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300"
                placeholder="Pass Rates (%)"
                value={editItem.passRates}
                onChange={(e) => setEditItem({ ...editItem, passRates: Number(e.target.value) })}
              />

              <input
                type="date"
                className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300"
                placeholder="ADI Badge Expiry"
                value={editItem.adiBadgeExpiry}
                onChange={(e) => setEditItem({ ...editItem, adiBadgeExpiry: e.target.value })}
              />

              <input
                type="date"
                className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300"
                placeholder="PDI License Expiry"
                value={editItem.pdiLicenseExpiry}
                onChange={(e) => setEditItem({ ...editItem, pdiLicenseExpiry: e.target.value })}
              />

              {/* Availability */}
              <div>
                <label className="block font-medium">Working Days (comma-separated):</label>
                <input
                  className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300"
                  placeholder="e.g., Monday,Tuesday"
                  value={editItem.availability.workingDays.join(",")}
                  onChange={(e) => updateAvailability("workingDays", e.target.value.split(",").map(s => s.trim()))}
                />
              </div>

              <div className="flex space-x-2">
                <input
                  className="flex-1 border px-3 py-2 rounded text-gray-800 border-gray-300"
                  placeholder="Start Time (e.g., 09:00)"
                  value={editItem.availability.workingHours.start}
                  onChange={(e) => updateAvailability("workingHours", { ...editItem.availability.workingHours, start: e.target.value })}
                />
                <input
                  className="flex-1 border px-3 py-2 rounded text-gray-800 border-gray-300"
                  placeholder="End Time (e.g., 17:00)"
                  value={editItem.availability.workingHours.end}
                  onChange={(e) => updateAvailability("workingHours", { ...editItem.availability.workingHours, end: e.target.value })}
                />
              </div>

              <input
                className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300"
                placeholder="Days Off (comma-separated dates)"
                value={editItem.availability.daysOff.join(",")}
                onChange={(e) => updateAvailability("daysOff", e.target.value.split(",").map(s => s.trim()))}
              />

              {/* Holidays */}
              <div>
                <label className="block font-medium">Holidays:</label>
                {editItem.holidays.map((h, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="date"
                      className="flex-1 border px-3 py-2 rounded text-gray-800 border-gray-300"
                      value={h.start}
                      onChange={(e) => updateHoliday(index, "start", e.target.value)}
                    />


                    <input
                      type="date"
                      className="flex-1 border px-3 py-2 rounded text-gray-800 border-gray-300"
                      value={h.end}
                      onChange={(e) => updateHoliday(index, "end", e.target.value)}
                    />
                    <input
                      className="flex-1 border px-3 py-2 rounded text-gray-800 border-gray-300"
                      placeholder="Reason"
                      value={h.reason}
                      onChange={(e) => updateHoliday(index, "reason", e.target.value)}
                    />
                    <button
                      onClick={() => removeHoliday(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addHoliday}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  + Add Holiday
                </button>
              </div>

              {/* Sick Leaves */}
              <div>
                <label className="block font-medium">Sick Leaves:</label>
                {editItem.sickLeaves.map((s, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="date"
                      className="flex-1 border px-3 py-2 rounded text-gray-800 border-gray-300"
                      value={s.start}
                      onChange={(e) => updateSickLeave(index, "start", e.target.value)}
                    />
                    <input
                      type="date"
                      className="flex-1 border px-3 py-2 rounded text-gray-800 border-gray-300"
                      value={s.end}
                      onChange={(e) => updateSickLeave(index, "end", e.target.value)}
                    />
                    <input
                      className="flex-1 border px-3 py-2 rounded text-gray-800 border-gray-300"
                      placeholder="Reason"
                      value={s.reason}
                      onChange={(e) => updateSickLeave(index, "reason", e.target.value)}
                    />
                    <button
                      onClick={() => removeSickLeave(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addSickLeave}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  + Add Sick Leave
                </button>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-gray-800 border-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
