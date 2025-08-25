import React from 'react';
import SharedStatusCard from './shared-status-cards';

const DispatchStatusCards = ({ data }) => {
    const today = new Date().toDateString();

    const statusCounts = {
        todaysInvoices: data.filter((i) => new Date(i.createdAt).toDateString() === today).length,
        pending: data.filter((i) => i.status === "In Dispatch").length,
        inDispatch: data.filter((i) => i.status === "Dispatched").length,
        avgDispatchTime: "1hr 30min",
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <SharedStatusCard status="Store" label="Today's Invoices" count={statusCounts.todaysInvoices} />
            <SharedStatusCard status="Verification" label="Pending Dispatch" count={statusCounts.pending} />
            <SharedStatusCard status="Dispatch" label="In-Dispatch Invoices" count={statusCounts.inDispatch} />
            <SharedStatusCard status="Delivered" label="Avg Dispatch Time" count={statusCounts.avgDispatchTime} />
        </div>
    );
}

export default DispatchStatusCards;
