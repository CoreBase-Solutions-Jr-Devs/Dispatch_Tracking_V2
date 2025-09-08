import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { mockInvoices } from '@/constant/mockInvoices'

export default function DeliveryDetails({ data }) {
    const invoice = data || mockInvoices[0];
    
    return (
        <section className='flex flex-col gap-2'>

            <section className='flex justify-between gap-x-4'>
                <div className='flex justify-between w-1/2'>
                    <Label className="text-xs font-medium">Customer Name:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white ml-4">{invoice?.customerName}</Label>
                </div>
                <div className='flex justify-between w-1/2'>
                    <Label className="text-xs font-medium">Customer Address:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white ml-4">{invoice?.customerAddress}</Label>
                </div>
            </section>

            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Invoice No:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {invoice?.invoiceNo}
                    </Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Inv. Date-Time:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {invoice?.invoiceDateTime}
                    </Label>
                </div>
            </section>

            {/* <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Delivered By:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {invoice?.driverName}
                    </Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">End Date-Time:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {invoice?.collectEndDateTime}
                    </Label>
                </div>
            </section> */}

            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Dispatch Ref:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {invoice?.dispatchRef}
                    </Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Disp Date-Time:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {invoice?.dispatchDateTime}
                    </Label>
                </div>
            </section>

            <section className="flex justify-between gap-x-4">
                <div className="flex items-center justify-between w-1/2">
                    <Label className="text-xs font-medium">Driver Name:</Label>
                    <Label className="text-xs font-medium uppercase">{invoice?.driverName}</Label>
                </div>
                
                <section className="flex items-center justify-between w-1/2">

                    <div className="flex justify-start items-center gap-x-6">
                        <Label className="text-xs font-medium">Driver's Contact:</Label>
                        <Label className="text-xs font-medium text-muted dark:text-white">
                            +254723349483
                        </Label>
                    </div>
                </section>

            </section>


            <section className="flex justify-between gap-x-4 mb-2">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Car Reg No:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {invoice?.carPlate}
                    </Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Make:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {invoice?.carMake}
                    </Label>
                </div>
            </section>
            
        </section>
    )
}
