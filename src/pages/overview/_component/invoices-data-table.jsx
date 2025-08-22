import React, { useState } from 'react';

const InvoicesDataTable = () => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample dispatch data matching the interface
  const dispatchData = [
    {
      docNumber: 'W1_20022693',
      account: 'ALFA CHEMIST INVOICE ACCT',
      postingDate: '20/08/2025',
      postingTime: '09:15',
      status: 'Store'
    },
    {
      docNumber: 'W1_20010003',
      account: 'VASCO PHARMACY',
      postingDate: '20/08/2025',
      postingTime: '09:18',
      status: 'Verification'
    },
    {
      docNumber: 'W1_20010005',
      account: 'VASCO PHARMACY',
      postingDate: '20/08/2025',
      postingTime: '09:23',
      status: 'Dispatch'
    },
    {
      docNumber: 'W1_20010008',
      account: 'MALIBU LTD',
      postingDate: '20/08/2025',
      postingTime: '09:30',
      status: 'Delivered'
    },
    {
      docNumber: 'W1_20024569',
      account: 'PHARMAPLUS LTD',
      postingDate: '20/08/2025',
      postingTime: '09:45',
      status: 'Store'
    },
    {
      docNumber: 'W1_20457693',
      account: 'ALFA CHEMIST INVOICE ACCT',
      postingDate: '20/08/2025',
      postingTime: '10:08',
      status: 'Store'
    },
    {
      docNumber: 'W1_20022469',
      account: 'ZETA MEDICAL AGENCIES',
      postingDate: '20/08/2025',
      postingTime: '10:10',
      status: 'Dispatch'
    },
    {
      docNumber: 'W1_21456934',
      account: 'ALFA CHEMIST INVOICE ACCT',
      postingDate: '20/08/2025',
      postingTime: '11:00',
      status: 'Delivered'
    },
    {
      docNumber: 'W1_20022269',
      account: 'OMEGA PHARMA DISTRIBUTORS',
      postingDate: '20/08/2025',
      postingTime: '11:30',
      status: 'Delivered'
    }
  ];

  // Filter data based on search and status
  const filteredData = dispatchData.filter(item => {
    const matchesSearch = !searchTerm ||
      item.docNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.account.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Store':
        return 'bg-orange-200 text-orange-800';
      case 'Verification':
        return 'bg-yellow-200 text-yellow-800';
      case 'Dispatch':
        return 'bg-blue-200 text-blue-800';
      case 'Delivered':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const StatusFlowVisual = () => (
    <div className="flex items-center space-x-2">
      <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded text-sm font-medium">
        Store
      </span>
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-sm font-medium">
        Verification
      </span>
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded text-sm font-medium">
        Dispatch
      </span>
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="px-3 py-1 bg-green-200 text-green-800 rounded text-sm font-medium">
        Delivered
      </span>
    </div>
  );

  const SearchAndFilterControls = () => (
    <div className="flex items-center space-x-4">
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">All Status</option>
        <option value="Store">Store</option>
        <option value="Verification">Verification</option>
        <option value="Dispatch">Dispatch</option>
        <option value="Delivered">Delivered</option>
      </select>
      <div className="relative">
        <input
          type="text"
          placeholder="Search Invoice No or Account"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {/* Status Flow and Search Controls */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <StatusFlowVisual />
        <SearchAndFilterControls />
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-700">DocNumber</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Account</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Posting Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Posting Time</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {item.docNumber}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {item.account}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {item.postingDate}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {item.postingTime}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No records found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredData.length} of {dispatchData.length} records
      </div>
    </div>
  );
};

export default InvoicesDataTable;