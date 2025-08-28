import React from 'react';

interface ReportItem {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  owner: string;
}

const ReportTable: React.FC<{ data: ReportItem[] }> = ({ data }) => {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-800">
          <tr>
            <th className="p-4">
              <input type="checkbox" className="w-4 h-4 text-teal-600" />
            </th>
            <th className="p-4 font-semibold">Customer Name</th>
            <th className="p-4 font-semibold">Email</th>
            <th className="p-4 font-semibold">Phone</th>
            <th className="p-4 font-semibold">Address</th>
            <th className="p-4 font-semibold">Owner</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-4">
                <input type="checkbox" className="w-4 h-4 text-teal-600" />
              </td>
              <td className="p-4 font-medium text-gray-900">{item.customerName}</td>
              <td className="p-4 text-gray-600">{item.email}</td>
              <td className="p-4 text-gray-600">{item.phone}</td>
              <td className="p-4 text-gray-600">{item.address}</td>
              <td className="p-4 text-gray-600">{item.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
