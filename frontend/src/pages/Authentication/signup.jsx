import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [form, setForm] = useState({
    fullname: '',
    phone: '',
    username: '',
    password: '',
    address: {
      buildingNumber: '',
      sub_province: '',
      province: '',
      city: '',
      country: '',
      zip_code: '',
      txt: '',
    },
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const nameParts = form.fullname.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    const midName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : null;

    if (form.password.length < 9 || form.password.length > 30) {
      return setMessage('Password must be between 9 and 30 characters.');
    }
    if (!/^\d{10}$/.test(form.phone)) {
      return setMessage('Phone number must be exactly 10 digits.');
    }

    try {
      const res = await axios.post('/auth/register', {
        firstName,
        midName,
        lastName,
        userName: form.username,
        password: form.password,
        role: 'buyer',
        phone_number: form.phone,
        is_primary: true,
        address: form.address,
      });

      if (res.status === 200) {
        setMessage('Sign Up successful!');
        navigate('/signin');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="pt-12 m-12 flex flex-col items-center">
      {message && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-4 border-t-4 border-red-300 rounded-lg shadow-lg max-w-md w-full">
          <p className="text-red poppins-font text-xs">{message}</p>
        </div>
      )}

      <h2 className="text-5xl text-center pb-8 font-bold">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        {/* Name */}
        <div>
          <label className="text-lg">Full Name</label><br />
          <input
            type="text"
            name="fullname"
            placeholder="John Doe"
            value={form.fullname}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg"
            required
          />
        </div><br />

        {/* Phone */}
        <div>
          <label className="text-lg">Phone Number</label><br />
          <input
            type="text"
            name="phone"
            placeholder="0123456789"
            value={form.phone}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg"
            required
          />
        </div><br />

        {/* Username */}
        <div>
          <label className="text-lg">Username</label><br />
          <input
            type="text"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg"
            required
          />
        </div><br />

        {/* Password */}
        <div>
          <label className="text-lg">Password</label><br />
          <input
            type="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg"
            required
          />
        </div><br />

        {/* Optional Address */}
        <div>
          <label className="text-lg">Address</label><br />
          <input
            type="text"
            name="address.buildingNumber"
            placeholder="Building Number"
            value={form.address.buildingNumber}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg mt-1"
          /><br /><br />
          <input
            type="text"
            name="address.sub_province"
            placeholder="Sub-Province"
            value={form.address.sub_province}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg mt-1"
          /><br /><br />
          <input
            type="text"
            name="address.province"
            placeholder="Province"
            value={form.address.province}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg mt-1"
          /><br /><br />
          <input
            type="text"
            name="address.city"
            placeholder="City"
            value={form.address.city}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg mt-1"
          /><br /><br />
          <input
            type="text"
            name="address.country"
            placeholder="Country"
            value={form.address.country}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg mt-1"
          /><br /><br />
          <input
            type="text"
            name="address.zip_code"
            placeholder="Zip Code"
            value={form.address.zip_code}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg mt-1"
          /><br /><br />
          <textarea
            name="address.txt"
            placeholder="Additional Address Details"
            value={form.address.txt}
            onChange={handleChange}
            className="bg-stone-200 px-4 py-2 rounded-lg mt-1 w-full"
          ></textarea>
        </div><br />

        <input
          type="submit"
          value="Sign Up"
          className="font-bold text-2xl bg-orange-600 px-14 py-1 rounded-2xl text-white"
        /><br />
        <p className="text-xs my-2">
          Already have an account? <a href="/signin" className="text-orange-600">Sign In!</a>
        </p>
      </form>
    </div>
  );
}
