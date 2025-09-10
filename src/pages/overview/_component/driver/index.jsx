import PageLayout from '@/components/page-layout'
import { roleToView, viewMeta } from '@/lib/utils'
import React from 'react'
import { useSelector } from 'react-redux';
import SharedInvoiceDataTable from './../invoices-data-table/shared-invoice-data-table';

export default function DriverOverview() {
    const user = useSelector((state) => state.auth);

    const view = roleToView(user?.userRole);
    const pageMeta = viewMeta[view];

    return (
        <PageLayout
            title={pageMeta?.title}
            subtitle={pageMeta?.subtitle}
            rightAction={
                <div className='flex items-center gap-2 text-sm'>
                    <FilterSheet />
                </div>
            }
        >
            {/* Main Content */}
            <div className='flex-1 min-h-0 overflow-hidden'>
                <SharedInvoiceDataTable />
            </div>
        </PageLayout>
    )
}
