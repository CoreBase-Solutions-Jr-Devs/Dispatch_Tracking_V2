import React from 'react';

const StatusCards = () => {
  // Sample dispatch data for calculating counts
  const dispatchData = [
    { status: 'Store' },
    { status: 'Store' },
    { status: 'Store' },
    { status: 'Verification' },
    { status: 'Dispatch' },
    { status: 'Dispatch' },
    { status: 'Delivered' },
    { status: 'Delivered' },
    { status: 'Delivered' }
  ];

  // Calculate status counts
  const statusCounts = {
    Store: dispatchData.filter(item => item.status === 'Store').length,
    Verification: dispatchData.filter(item => item.status === 'Verification').length,
    Dispatch: dispatchData.filter(item => item.status === 'Dispatch').length,
    Delivered: dispatchData.filter(item => item.status === 'Delivered').length
  };

  const getStatusCardColor = (status) => {
    switch (status) {
      case 'Store':
        return 'bg-orange-100 border-orange-300';
      case 'Verification':
        return 'bg-yellow-100 border-yellow-300';
      case 'Dispatch':
        return 'bg-blue-100 border-blue-300';
      case 'Delivered':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className={`p-6 rounded-lg border-2 ${getStatusCardColor('Store')}`}>
        <h3 className="text-sm font-medium text-gray-600">Invoices in Store</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{statusCounts.Store}</p>
      </div>
      <div className={`p-6 rounded-lg border-2 ${getStatusCardColor('Verification')}`}>
        <h3 className="text-sm font-medium text-gray-600">Invoices Pending Verification</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{statusCounts.Verification}</p>
      </div>
      <div className={`p-6 rounded-lg border-2 ${getStatusCardColor('Dispatch')}`}>
        <h3 className="text-sm font-medium text-gray-600">Invoices Pending Dispatch</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{statusCounts.Dispatch}</p>
      </div>
      <div className={`p-6 rounded-lg border-2 ${getStatusCardColor('Delivered')}`}>
        <h3 className="text-sm font-medium text-gray-600">Invoices Delivered</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{statusCounts.Delivered}</p>
      </div>
    </div>
  );
};

export default StatusCards;