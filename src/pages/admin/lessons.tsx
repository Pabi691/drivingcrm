
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

type Props = { user?: any; onLogout?: () => void };

interface Enquiry {
  id: number;
  name: string;
  email: string;
  message: string;
}

export default function LessonsPage({ user, onLogout }: Props) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Enquiry | null>(null);

  const [lessons, setLessons] = useState<Enquiry[]>([
    { id: 1, name: "Ravi Kumar", email: "ravi@example.com", message: "Need driving lessons" },
    { id: 2, name: "Priya Singh", email: "priya@example.com", message: "Fee details?" },
    { id: 3, name: "Amit Shah", email: "amit@example.com", message: "Want weekend classes" }
  ]);

  const filtered = lessons.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: number) => {
    setLessons(lessons.filter((i) => i.id !== id));
  };

  const handleSave = () => {
    if (!editItem) return;
    if (editItem.id === 0) {
      setLessons([...lessons, { ...editItem, id: Date.now() }]);
    } else {
      setLessons(lessons.map((i) => (i.id === editItem.id ? editItem : i)));
    }
    setEditItem(null);
    setShowModal(false);
  };

  const openAdd = () => {
    setEditItem({ id: 0, name: "", email: "", message: "" });
    setShowModal(true);
  };

  const openEdit = (item: Enquiry) => {
    setEditItem(item);
    setShowModal(true);
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Lessons</h2>
        <button onClick={openAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-gray-800 border-gray-300">+ Add Lesson</button>
      </div>

      <input placeholder="Search lesson..." className="w-full border rounded-lg px-4 py-2 mb-4" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="overflow-auto bg-white shadow rounded-xl">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-gray-800">{item.id}</td>
                <td className="p-3 font-medium text-gray-800">{item.name}</td>
                <td className="p-3 text-gray-800">{item.email}</td>
                <td className="p-3 text-gray-800">{item.message}</td>
                <td className="p-3 text-center space-x-3">
                  <button onClick={() => openEdit(item)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (<tr><td colSpan={5} className="text-center py-4 text-gray-500">No enquiries found</td></tr>)}
          </tbody>
        </table>
      </div>

      {showModal && editItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 w-[400px] rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-gray-300">{editItem.id === 0 ? "Add Lesson" : "Edit Lesson"}</h3>

            <div className="space-y-4">
              <input className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300" placeholder="Full Name" value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300" placeholder="Email" value={editItem.email} onChange={(e) => setEditItem({ ...editItem, email: e.target.value })} />
              <textarea className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300" placeholder="Message" value={editItem.message} onChange={(e) => setEditItem({ ...editItem, message: e.target.value })} />

              <div className="flex justify-end space-x-3 mt-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-800 border-gray-300">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

