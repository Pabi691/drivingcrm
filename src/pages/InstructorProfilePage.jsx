import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { FiEdit2, FiSave, FiX, FiCamera } from 'react-icons/fi';
import { useStateContext } from '../contexts/ContextProvider';
import toast from 'react-hot-toast';
import Scheduler from './Calendar';
import WeeklyAvailability from '../components/SetupWeeklyPopup';
import WeeklyAvailabilityList from '../components/InstructorWeeklyDisplay';

const EXCLUDED_FIELDS = [
  '_id',
  '__v',
  'createdAt',
  'updatedAt',
  'school_id',
  'branch_id',
  'approved_by',
  'instructor_user_id',
  'status',
];

const InstructorProfilePage = () => {
  const { id } = useParams();
  const {
    instructors,
    approvedInstructor,
    fetchInstructors,
    fetchInstructorWorkingDays,
    updateInstructor,
    IsUpdate,
  } = useStateContext();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePreview, setProfilePreview] = useState(null);
  const [workingDays, setWorkingDays] = useState([]);

  const instructor = instructors.find((i) => i._id === id);
  if (!instructor) return <Navigate to="/instructors" replace />;

  /* ================= SYNC DATA ================= */
  useEffect(() => {
    setFormData({ ...instructor });
    setProfilePreview(instructor.profile || null);
  }, [instructor]);

  /* ================= WORKING DAYS ================= */
  useEffect(() => {
    const loadDays = async () => {
      setLoading(true);
      const res = await fetchInstructorWorkingDays(id);
      setWorkingDays(res || []);
      setLoading(false);
    };
    loadDays();
  }, [id, IsUpdate]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, profile: file }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      // 🔥 CALL UPDATE API HERE
       const  res=await updateInstructor(id,payload);
       if(res){
          toast.success('Instructor updated successfully');
       }
    
      setIsEditing(false);
      setLoading(false);
    } catch {
      toast.error('Update failed');
      setLoading(false);
    }
  };

  const handleConfirmApprove = async () => {
    try {
      setLoading(true);
      const res = await approvedInstructor(instructor._id);
      if (res?.success) {
        toast.success(res.message);
        fetchInstructors();
        setIsApproved(true);
        setOpen(false);
      }
      setLoading(false);
    } catch {
      toast.error('Approval failed');
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <button
        onClick={() => window.history.back()}
        className="text-sm text-gray-500 hover:underline"
      >
        ← Back
      </button>

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between items-start">
          <div className="flex gap-6 items-center">
            {/* PROFILE IMAGE */}
            <div className="relative">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#03C9D7] flex items-center justify-center text-white text-3xl font-bold">
                  {formData.name?.charAt(0)?.toUpperCase()}
                </div>
              )}

              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer">
                  <FiCamera size={14} />
                  <input type="file" hidden onChange={handleProfileChange} />
                </label>
              )}
            </div>

            {/* NAME / EMAIL / MOBILE */}
            <div className="space-y-2">
              {['name', 'email', 'mobile'].map((field) => (
                <div key={field}>
                  {isEditing ? (
                    <input
                      name={field}
                      value={formData[field] || ''}
                      onChange={handleChange}
                      className="border rounded-lg px-3 py-1 text-sm w-72"
                    />
                  ) : (
                    <p
                      className={`${
                        field === 'name'
                          ? 'text-2xl font-bold'
                          : 'text-sm text-gray-500'
                      } break-all`}
                    >
                      {formData[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 h-10 rounded-lg border hover:bg-gray-100"
              >
                <FiEdit2 /> Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 h-10 rounded-lg bg-green-600 text-white disabled:opacity-50"
                >
                  <FiSave /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 h-10 rounded-lg bg-red-600 text-white"
                >
                  <FiX /> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-6">Instructor Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(formData).map(([key, value]) => {
              if (EXCLUDED_FIELDS.includes(key)) return null;
              if (['name', 'email', 'mobile', 'profile'].includes(key))
                return null;

              /* ==== LICENCE IMAGE ==== */
              if (key === 'upload_licence_copy') {
                return (
                  <div
                    key={key}
                    className="md:col-span-2 border rounded-xl p-4 bg-white shadow-sm"
                  >
                    <p className="text-xs font-medium uppercase text-gray-500 mb-2">
                      Upload Licence Copy
                    </p>

                    <div className="flex items-start gap-6">
                      {value ? (
                        <img
                          src={
                            typeof value === 'string'
                              ? value
                              : URL.createObjectURL(value)
                          }
                          alt="Licence"
                          className="w-64 rounded-lg border shadow"
                        />
                      ) : (
                        <div className="w-64 h-40 border rounded-lg flex items-center justify-center text-gray-400 text-sm">
                          No licence uploaded
                        </div>
                      )}

                      {isEditing && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              upload_licence_copy: e.target.files[0],
                            }))
                          }
                        />
                      )}
                    </div>
                  </div>
                );
              }

              const isDate = key.includes('date');

              return (
                <div
                  key={key}
                  className="border rounded-xl p-4 bg-white shadow-sm"
                >
                  <p className="text-xs font-medium uppercase text-gray-500 mb-1">
                    {key.replace(/_/g, ' ')}
                  </p>

                  {isEditing ? (
                    <input
                      name={key}
                      type={isDate ? 'date' : 'text'}
                      value={
                        isDate && value ? value.slice(0, 10) : value || ''
                      }
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-800 break-all">
                      {isDate && value
                        ? new Date(value).toLocaleDateString()
                        : value || '-'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* APPROVE BUTTON */}
        {instructor.status !== 1 && (
          <button
            onClick={() => setOpen(true)}
            className="mt-8 bg-[#03C9D7] text-white px-6 py-3 rounded-xl shadow"
          >
            Approve Instructor
          </button>
        )}
      </div>

      {/* ================= APPROVE MODAL ================= */}
      {open && !isApproved && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h2 className="text-xl font-bold">Confirm Approval</h2>
            <p className="mt-3 text-sm text-gray-600">
              Are you sure you want to approve this instructor?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApprove}
                disabled={loading}
                className="bg-green-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Approving...' : 'Yes, Approve'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= APPROVED VIEW ================= */}
      {instructor.status === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow">
            <Scheduler instructorId={id} />
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <WeeklyAvailability instructor={id} workingDays={workingDays} />
            <WeeklyAvailabilityList workingDays={workingDays} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorProfilePage;
