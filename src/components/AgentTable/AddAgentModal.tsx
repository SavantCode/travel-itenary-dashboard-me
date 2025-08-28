import React, { useState } from 'react';

interface AddAgentModalProps {
  onClose: () => void;
  onSubmit: (agent: {
    name: string;
    email: string;
    phone: string;
    role: string;
    team: string;
    status: string;
    avatar: string;
  }) => void;
}

const AddAgentModal: React.FC<AddAgentModalProps> = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    team: '',
    status: 'Assigned',
    avatar: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    form.avatar = form.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            name="team"
            placeholder="Team"
            value={form.team}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="Assigned">Assigned</option>
            <option value="Unassigned">Unassigned</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Add Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgentModal;
