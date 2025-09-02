import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function DeliveryDetails({ data }) {
    return (
        <section className='flex flex-col gap-2'>

            <section className='flex'>
                <Label className="text-xs font-medium">Customer Name:</Label>
                <Label className="text-xs font-medium text-muted dark:text-white ml-4">{data?.customerName}</Label>
            </section>

            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Invoice No:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {data?.invoiceNo}
                    </Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Inv. Date-Time:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {data?.invoiceDateTime}
                    </Label>
                </div>
            </section>

            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Delivered By:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {data?.driverName}
                    </Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">End Date-Time:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {collectEndDateTime}
                    </Label>
                </div>
            </section>

            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Dispatch Ref:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {data?.dispatchRef}
                    </Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Disp Date-Time:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {data?.dispatchDateTime}
                    </Label>
                </div>
            </section>

            <section className="flex justify-between gap-x-2">
                <div className="flex items-center justify-between w-1/2">
                    <Label className="text-xs font-medium">Driver Name:</Label>
                    <Label className="text-xs font-medium uppercase">{data?.driverName}</Label>
                </div>

                <div className="flex items-center justify-between w-1/4">
                    <Label className="text-xs font-medium">Dr ID:</Label>
                    <Label className="text-xs font-medium">{data?.driverID}</Label>
                </div>

                <div className="flex items-center justify-between w-1/4">
                    <Label className="text-xs font-medium">Dr DL:</Label>
                    <Label className="text-xs font-medium">{data?.driverDL}</Label>
                </div>
            </section>


            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Car Reg No:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {data?.carPlate}
                    </Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Make:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        {data?.carMake}
                    </Label>
                </div>
            </section>

            <section className='flex justify-between gap-x-4'>
                <div className="flex justify-start items-center gap-12 mb-2">
                    <Label className="text-xs font-medium">Driver's Contact:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">
                        +254723349483
                    </Label>
                </div>
            </section>
            
        </section>
    )
}
