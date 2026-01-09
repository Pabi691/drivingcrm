
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

type Props = { user?: any; onLogout?: () => void };

interface Learner {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function LearnersPage({ user, onLogout }: Props) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Learner | null>(null);

  const [learners, setLearners] = useState<Learner[]>([
    { id: 1, name: "Ravi Kumar", email: "ravi@example.com", phone: "123-456-7890" },
    { id: 2, name: "Priya Singh", email: "priya@example.com", phone: "234-567-8901" },
    { id: 3, name: "Amit Shah", email: "amit@example.com", phone: "345-678-9012" }
  ]);

  const filtered = learners.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: number) => {
    setLearners(learners.filter((i) => i.id !== id));
  };

  const handleSave = () => {
    if (!editItem) return;
    if (editItem.id === 0) {
      setLearners([...learners, { ...editItem, id: Date.now() }]);
    } else {
      setLearners(learners.map((i) => (i.id === editItem.id ? editItem : i)));
    }
    setEditItem(null);
    setShowModal(false);
  };

  const openAdd = () => {
    setEditItem({ id: 0, name: "", email: "", phone: "" });
    setShowModal(true);
  };

  const openEdit = (item: Learner) => {
    setEditItem(item);
    setShowModal(true);
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Learners</h2>
        <button onClick={openAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg">+ Add Learner</button>
      </div>

      <input placeholder="Search learner..." className="w-full border rounded-lg px-4 py-2 mb-4" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="overflow-auto bg-white shadow rounded-xl">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
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
            <h3 className="text-xl text-gray-800 border-gray-300 font-semibold mb-4">{editItem.id === 0 ? "Add Enquiry" : "Edit Enquiry"}</h3>

            <div className="space-y-4">
              <input className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300" placeholder="Full Name" value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300" placeholder="Email" value={editItem.email} onChange={(e) => setEditItem({ ...editItem, email: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded text-gray-800 border-gray-300" placeholder="Phone" value={editItem.phone} onChange={(e) => setEditItem({ ...editItem, phone: e.target.value })} />

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

