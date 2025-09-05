import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { mockInvoices } from '@/constant/mockInvoices'

export default function DeliveryReception({ data }) {
    const invoice = data || mockInvoices[0];

    return (
        <section>
            <section className='flex justify-between gap-x-2'>
                <div className="flex flex-row justify-between items-center w-1/2 gap-x-2">
                    <Label className="text-xs font-medium">Received By:</Label>
                    <Input type="text" placeholder="Enter Name" className="h-6 w-30" value={invoice?.receivedBy} />
                </div>
                <div className="flex flex-row justify-between items-center w-1/2 gap-x-2">
                    <Label className="text-xs font-medium">Received ID:</Label>
                    <Input type="text" placeholder="Enter Ref(ID)" className="h-6 w-30" value={invoice?.receivedID} />
                </div>
            </section>
        </section>
    )
}
