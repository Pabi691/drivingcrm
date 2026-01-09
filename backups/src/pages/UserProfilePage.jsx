import React from 'react';
import avatar from '../data/avatar.jpg';
import { getUser } from '../utils/auth';

const UserProfilePage = () => {
  const user = getUser();
  const name = user?.name || 'User';
  const email = user?.email || '—';
  const role = user?.role || 'Guest';
  const avatarUrl = user?.avatar || avatar;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      {/* Back */}
      <button type="button" className="text-sm text-gray-600 mb-4 hover:underline">
        ← Back
      </button>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT PROFILE */}
        <div className="lg:col-span-2 bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
          <div className="flex gap-6 items-center">
            <img
              src={avatarUrl}
              alt="profile"
              className="h-28 w-28 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-gray-500">{role}</p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>

          {/* BIO */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Instructor Bio</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hi, I’m Ahmad! I help learners gain confidence and independence
              on the road. My teaching style is calm, supportive, and
              safety-focused. Whether you’re a beginner or preparing for your
              test, I’m here to help.
            </p>
          </div>

          {/* DETAILS */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p>✔ Auto lessons & test packages</p>
            <p>✔ Verified working with children</p>
            <p>✔ Driving instructor licence</p>
            <p>✔ Instructing for 4+ months</p>
          </div>

          {/* LANGUAGES */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Spoken languages</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                English
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                Arabic
              </span>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="mt-8 border-t pt-4 text-sm text-gray-500">
            No reviews yet. This instructor is new.
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* PRICE CARD */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            {/* <h3 className="font-semibold mb-4"></h3> */}
            {/* <p className="text-2xl font-bold mb-4">test</p> */}

            {/* <button type="button" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold">
              ADD
            </button> */}

            <button type="button" className="w-full mt-3 border py-2 rounded-lg text-sm">
              Edit Profile
            </button>
          </div>

          {/* INFO */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow text-sm space-y-3">
            <p>✔ Reschedule online</p>
            <p>✔ Instructor choice</p>
            <p>✔ Book now or later</p>
            <p>✔ Real-time availability</p>
          </div>

          {/* VEHICLE */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-3">Vehicle</h3>
            <p className="text-sm">
              Toyota Corolla Hatchback (2022 – Auto)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              5-star ANCAP · Dual controls
            </p>
          </div>

          {/* MAP PLACEHOLDER */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-3 shadow">
            <div className="h-48 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
              Google Map Area
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
