import React from 'react';
import SharedStatusCard from './shared-status-cards';

const DeliveryStatusCards = ({ data }) => {
    const today = new Date().toDateString();
    
    const statusCounts = {
        todaysInvoices: data.filter((i) => new Date(i.createdAt).toDateString() === today).length,
        pending: data.filter((i) => i.status === "In Progress").length,
        delivered: data.filter((i) => i.status === "Delivered").length,
        avgDeliveryTime: "3hr 33min",
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <SharedStatusCard status="Store" label="Today's Deliveries" count={statusCounts.todaysInvoices} />
            <SharedStatusCard status="Verification" label="Invoices Pending Collection" count={statusCounts.pending} />
            <SharedStatusCard status="Dispatch" label="Invoices Delivered" count={statusCounts.delivered} />
            <SharedStatusCard status="Delivered" label="Avg Delivery Time" count={statusCounts.avgDeliveryTime} />
        </div>
    );
}

export default DeliveryStatusCards;
