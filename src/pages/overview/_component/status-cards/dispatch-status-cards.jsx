import React from 'react';
import SharedStatusCard from './shared-status-cards';

const DispatchStatusCards = () => {
    const statusCounts = {
        Pending: data.filter((i) => i.status === "Pending").length,
        InDispatch: data.filter((i) => i.status === "In Dispatch").length,
        Dispatched: data.filter((i) => i.status === "Dispatched").length,
        Returned: data.filter((i) => i.status === "Returned").length,
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <SharedStatusCard status="Pending" label="Pending" count={statusCounts.Pending} />
            <SharedStatusCard status="In Dispatch" label="In Dispatch" count={statusCounts.InDispatch} />
            <SharedStatusCard status="Dispatched" label="Dispatched" count={statusCounts.Dispatched} />
            <SharedStatusCard status="Returned" label="Returned" count={statusCounts.Returned} />
        </div>
    );
}

export default DispatchStatusCards;
