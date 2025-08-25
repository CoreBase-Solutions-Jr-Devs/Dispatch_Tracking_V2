import React from 'react';
import SharedStatusCard from './shared-status-cards';

const DeliveryStatusCards = ({ data }) => {
    const statusCounts = {
        PendingCollection: data.filter((i) => i.status === "Pending Collection").length,
        InProgress: data.filter((i) => i.status === "In Progress").length,
        Delivered: data.filter((i) => i.status === "Delivered").length,
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <SharedStatusCard status="Pending Collection" label="Pending Collection" count={statusCounts.PendingCollection} />
            <SharedStatusCard status="In Progress" label="In Progress" count={statusCounts.InProgress} />
            <SharedStatusCard status="Delivered" label="Delivered" count={statusCounts.Delivered} />
        </div>
    );
}

export default DeliveryStatusCards;
