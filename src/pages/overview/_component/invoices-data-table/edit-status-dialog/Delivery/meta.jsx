import { Label } from '@/components/ui/label'
import React from 'react'

export default function DeliveryMeta({ data }) {
    return (
        <div className='flex flex-col border-b pb-4'>
            <section className="flex flex-row justify-between gap-2">
                <section className="flex items-center gap-1">
                    <Label htmlFor="turnaround-time" className="text-xs font-medium">Turnaround Time:</Label>
                    <Label className="text-xs font-medium uppercase">{data?.turnaroundTime}</Label>
                </section>
                <section className="flex items-center gap-1">
                    <Label htmlFor="verificationControl" className="text-xs font-medium">Delivery Control:</Label>
                    <Label className="text-xs font-medium uppercase">{data?.deliveryControl}</Label>
                </section>
            </section>
        </div>
    )
}
