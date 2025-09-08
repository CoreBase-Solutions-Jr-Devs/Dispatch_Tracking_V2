import { Label } from '@/components/ui/label'
import React from 'react'

export default function CollectionDetails() {
    return (
        <section className='flex flex-col gap-2'>

            <section className='flex gap-x-12'>
                <Label className="text-xs font-medium">Customer Name:</Label>
                <Label className="text-xs font-medium text-muted dark:text-white"> BADAR PHARMACY JOMO KENYARRA AVE.</Label>
            </section>

            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Invoice No:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white"> W1-000123</Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Inv. Date-Time:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white"> 26-08-2025 08:59 AM</Label>
                </div>
            </section>

            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Salesman:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">Samir</Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Start Date-Time:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">27-08-2025 09:15 AM</Label>
                </div>
            </section>

            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Delivered By:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">PAUL NETIA</Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">End Date-Time:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">27-08-2025 11:15 AM</Label>
                </div>
            </section>

            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Dispatch Ref:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">DPT000001</Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Disp Date-Time:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">27-08-2025 11:45 AM</Label>
                </div>
            </section>

            <section className="flex justify-between items-center">
                <div className="flex justify-between gap-x-2">
                    <Label className="text-xs font-medium">Driver Name:</Label>
                    <Label className="text-xs font-medium uppercase">Peter Tanui</Label>
                </div>
                <div className="flex justify-between gap-x-2">
                    <Label className="text-xs font-medium">Dr ID:</Label>
                    <Label className="text-xs font-medium">34006837</Label>
                </div>
                <div className="flex justify-between gap-x-2">
                    <Label className="text-xs font-medium">Dr DL:</Label>
                    <Label className="text-xs font-medium">34006837</Label>
                </div>
            </section>

            <section className="flex justify-between gap-x-4">
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Car Reg No:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">KCX 420B</Label>
                </div>
                <div className="flex justify-between w-1/2">
                    <Label className="text-xs font-medium">Make:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">Probox - Saloon</Label>
                </div>
            </section>

            <section className='flex justify-between gap-x-4'>
                <div className="flex justify-start items-center gap-12 my-1">
                    <Label className="text-xs font-medium">Driver's Contact:</Label>
                    <Label className="text-xs font-medium text-muted dark:text-white">+254723349483</Label>
                </div>
            </section>
        
    </section>
    )
}
