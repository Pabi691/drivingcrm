import React, { useState } from "react";

const InstructorForm = ({ instructorValues = {} }) => {
    console.log('formvalues',instructorValues)
    const [formValues, setFormValues] = useState({
        name: instructorValues.name || '',
        email: instructorValues.email || '',
        phone: instructorValues.mobile || '',
        bio: instructorValues.instructor_bio || '',
        address: instructorValues.full_address || '',
        status:instructorValues.status || '1'
    });
    console.log('formvalues',formValues)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
                <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    className="e-input w-full"
                    placeholder="Instructor Name"
                    required
                />
            </div>
            {/* Email */}
            <div>
                <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="e-input w-full"
                    placeholder="Instructor Email"
                />
            </div>
            {/* Phone */}
            <div>
                <input
                    type="text"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    className="e-input w-full"
                    placeholder="Instructor Phone"
                />
            </div>
            {/* Bio */}
            <div>
                <textarea
                    type="text"
                    name="bio"
                    value={formValues.bio}
                    onChange={handleChange}
                    className="e-input w-full"
                    placeholder="Instructor Bio"
                />
            </div>
            {/* Address */}
            <div>
                <textarea
                    type="text"
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    className="e-input w-full"
                    placeholder="Instructor Address"
                />
            </div>
            <div>
                <select
                    id="status"
                    name="status"
                    className="e-input w-full"
                    defaultValue={formValues.status === 1? '1' : '0'}
                >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>
        </div>
    );
};

export default InstructorForm;