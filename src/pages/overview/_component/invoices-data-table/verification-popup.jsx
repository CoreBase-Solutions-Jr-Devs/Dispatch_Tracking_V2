import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

export default function VerificationPopup({ rowData, onSubmit }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleDialogClose = () => {
        setIsOpen(false);
        // Reset form state here if needed
    };

    return (
        <>
            <DialogHeader className='flex flex-row justify-between items-center mt-3'>
                <DialogTitle className="text-orange-300">VERIFICATION - 1</DialogTitle>
                <Badge variant="primary" className="uppercase bg-green-300">Document Verified</Badge>
            </DialogHeader>
            <div className='my-2'>
            <Separator className="mb-4"/>
                <Form className="flex flex-col gap-2">
                    <section className="flex flex-row justify-items-start items-center gap-x-12 mb-2">
                        <Label className="text-xs font-medium">Customer Name:</Label>
                        <Label className="text-xs font-medium"> BADAR PHARMACY JOMO KENYARRA AVE.</Label>
                    </section>
                    <section className="flex flex-row justify-between items-center gap-x-6 mb-2 text-wrap">
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">Invoice No:</Label>
                            <Label className="text-xs font-medium"> W1-000123</Label>
                        </div>
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">Invoice Date & Time:</Label>
                            <Label className="text-xs font-medium"> 26-08-2025 08:59 AM</Label>
                        </div>
                    </section>
                    <section className="flex flex-row justify-between items-center gap-x-6 mb-2 text-wrap">
                        <div className="flex justify-between w-1/2">
                            <Label className=" text-xs font-medium">Salesman:</Label>
                            <Label className="text-xs font-medium"> Samir</Label>
                        </div>
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">Start Date and Time:</Label>
                            <Label className="text-xs font-medium"> 27-08-2025 09:15 AM</Label>
                        </div>
                    </section>
                    <section className="flex flex-row justify-between items-center gap-x-6 text-wrap">
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">Verified By:</Label>
                            <Label className="text-xs font-medium"> PAUL NETIA</Label>
                        </div>
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">End Date and Time:</Label>
                            <Label className="text-xs font-medium"> 27-08-2025 11:15 AM</Label>
                        </div>
                    </section>
                </Form>
                <Separator className="my-2"/>
                <section className="flex flex-row justify-between items-center mb-2">
                    <div className="flex items-center">
                        <Label>Items:</Label>
                        <Label className="ml-2">5</Label>
                    </div>
                    <div className="flex items-center">
                        <Label>Total Weight(kg):</Label>
                        <Input type="number" value="12.5" className="w-20 ml-2 h-8"/>
                    </div>
                    <div className="flex items-center">
                        <Label>No of Packages:</Label>
                        <Input type="number" value="3" className="w-12 ml-2 h-8"/>
                    </div>
                </section>
                <Label>Verification Remarks:</Label>
                <Textarea placeholder="Enter remarks here..." className="min-w-[80px] mb-2 bg-gray-300" />
                <section className="flex flex-row justify-between items-center gap-2">
                    <section className="flex items-center gap-1">
                        <Label htmlFor="turnaround-time" className="text-xs font-medium">Turnaround Time (mins):</Label>
                        <Label className="text-xs font-medium uppercase">0d 02h 30m 0s</Label>
                    </section>
                    <section className="flex items-center gap-1">
                        <Label htmlFor="verificationControl" className="text-xs font-medium">Verification Control:</Label>
                        <Label className="text-xs font-medium uppercase">CoreDBA</Label>
                    </section>
                </section>
            </div>
            
            <DialogFooter className="flex flex-row justify-end">
                <Button variant="outline" onClick={handleDialogClose} className="mt-2 mr-2 bg-amber-600 uppercase">Start</Button>
                <Button
                    onClick={() => {
                        if (onSubmit) onSubmit(rowData);
                        handleDialogClose();
                    }}
                    className="mt-2 bg-green-500 uppercase"
                    disabled
                >
                    Send to Dispatch
                </Button>
            </DialogFooter>
        </>
    )
}
