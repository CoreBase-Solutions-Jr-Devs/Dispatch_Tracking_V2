import React, { useState } from 'react';

const FilterActions = () => {
  const [startDate, setStartDate] = useState('20/08/2025');
  const [endDate, setEndDate] = useState('20/08/2025');
  const [dateRange, setDateRange] = useState('Current Date');

  const handleApplyFilter = () => {
    // Filter logic can be implemented here
    console.log('Applying filters:', { startDate, endDate, dateRange });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Filter Actions</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Period</label>
          <p className="text-sm text-gray-600">Current Date Range</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Current Date">Current Date</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
            <option value="Custom Range">Custom Range</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleApplyFilter}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Filtered From: <span className="font-medium">{startDate}</span> to <span className="font-medium">{endDate}</span>
      </div>
    </div>
  );
};

export default FilterActions;