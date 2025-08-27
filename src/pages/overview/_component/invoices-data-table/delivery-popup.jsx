import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

export default function DeliveryPopup({ rowData, onSubmit }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleDialogClose = () => {
        setIsOpen(false);
        // Reset form state here if needed
    };

    const handleOpenChange = (open) => {
        if (!open) {
            handleDialogClose();
            return;
        }
        setIsOpen(true);
    };

    return (
        <>
            <div className='my-2'>
                <DialogHeader className='flex flex-row justify-between items-center mt-3'>
                    <DialogTitle className="text-orange-300 uppercase">Delivery Confirmation</DialogTitle>
                    <Badge variant="primary" className="uppercase bg-green-300">Document Confirmed</Badge>
                </DialogHeader>
                
                <Separator className="my-3"/>
                <Form className="flex flex-col gap-2">
                    <section className="flex flex-row justify-items-start items-center gap-x-6 mb-2">
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
                            <Label className="text-xs font-medium">Samir</Label>
                        </div>
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">Start Date and Time:</Label>
                            <Label className="text-xs font-medium">27-08-2025 09:15 AM</Label>
                        </div>
                    </section>
                    <section className="flex flex-row justify-between items-center gap-x-6 mb-2 text-wrap">
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">Delivered By:</Label>
                            <Label className="text-xs font-medium">PAUL NETIA</Label>
                        </div>
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">End Date and Time:</Label>
                            <Label className="text-xs font-medium">27-08-2025 11:15 AM</Label>
                        </div>
                    </section>
                    <section className="flex flex-row justify-between items-center gap-x-6 mb-2 text-wrap">
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">Dispatch Ref:</Label>
                            <Label className="text-xs font-medium">DPT000001</Label>
                        </div>
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">Disp Date and Time:</Label>
                            <Label className="text-xs font-medium">27-08-2025 11:45 AM</Label>
                        </div>
                    </section>
                    <section className="flex flex-row items-stretch gap-x-6 mb-2 text-wrap">
                        <div className="flex justify-between w-1/3">
                            <Label className="text-xs font-medium">Driver Name:</Label>
                            <Label className="text-xs font-medium uppercase">Peter Tanui</Label>
                        </div>
                        <div className='border-l border-gray-800 h-6 self-center'></div>
                        <div className="flex justify-between w-1/3">
                            <Label className="text-xs font-medium">Dr ID:</Label>
                            <Label className="text-xs font-medium">34006837</Label>
                        </div>
                        <div className='border-l border-gray-800 h-6 self-center'></div>
                        <div className="flex justify-between w-1/3">
                            <Label className="text-xs font-medium">Dr DL:</Label>
                            <Label className="text-xs font-medium">34006837</Label>
                        </div>
                    </section>
                    <section className="flex flex-row justify-between items-center gap-x-6 mb-2 text-wrap">
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">Car Reg No:</Label>
                            <Label className="text-xs font-medium">KCX 420B</Label>
                        </div>
                        <div className="flex justify-between w-1/2">
                            <Label className="text-xs font-medium">Make:</Label>
                            <Label className="text-xs font-medium uppercase">Probox - Saloon</Label>
                        </div>
                    </section>
                    <section className="flex flex-row justify-items-start items-center gap-x-6 mb-2">
                        <Label className="text-xs font-medium">Driver's Contact</Label>
                        <Label className="text-xs font-medium"> +254722000000</Label>
                    </section>
                    <section className='flex flex-row justify-between items-center gap-x-6 mb-2'>
                        <div className='flex justify-between w-1/2'>
                            <Label className="text-xs font-medium">Received By:</Label>
                            <Input type="text" placeholder="Enter Client Name" className="w-1/2 h-8" />
                        </div>
                        <div className='flex justify-between w-1/2'>
                            <Label className="text-xs font-medium">Received Ref(ID): </Label>
                            <Input type="text" placeholder="Enter Ref/ID" className="w-1/2 h-8" />
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
                <section className='flex flex-row justify-between items-center gap-6 mb-2'>
                    <div className='flex justify-between w-1/2'>
                        <Label className="text-xs font-medium">Delivery Status:</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="dispatch" className="bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
                                    Status
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-40 bg-gray-200">
                                <DropdownMenuLabel>Current Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuRadioGroup value="Delivered" onValueChange={(value) => console.log(value)}>
                                    <DropdownMenuRadioItem value="Pending Collection">Pending Collection</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="In Progress">In Progress</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Delivered">Delivered</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='flex justify-between w-1/2'>
                        <Label className="text-xs font-medium">Invoice Value:</Label>
                        <Label className="text-xs font-medium"> KES 14,700.00</Label>
                    </div>
                </section>
                <section className='flex flex-row justify-between items-center gap-6 mb-4'>
                    <div className='flex justify-between w-1/2'>
                        <Label className="text-xs font-medium">Delivery Mode:</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="dispatch" className="bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
                                    Mode
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-40 bg-gray-200">
                                <DropdownMenuLabel>Current Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuRadioGroup value="COD" onValueChange={(value) => console.log(value)}>
                                    <DropdownMenuRadioItem value="COD">Cash on Order</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="COO">Cash on Delivery</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Account">Account</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='flex justify-between w-1/2'>
                        <Label className="text-xs font-medium">Cash Collected:</Label>
                        <Input type="number" value="0.00" className="w-32 ml-2 h-8"/>
                    </div>
                </section>
                <Label className={"mb-2"}>Delivery Remarks:</Label>
                <Textarea placeholder="Enter remarks here..." className="min-w-[80px] mb-2 bg-gray-300" />
                <section className="flex flex-row justify-between gap-2">
                    <section className="flex items-center gap-1">
                        <Label htmlFor="turnaround-time" className="text-xs font-medium">Turnaround Time (mins):</Label>
                        <Label className="text-xs font-medium uppercase">0d 02h 30m 0s</Label>
                    </section>
                    <section className="flex items-center gap-1">
                        <Label htmlFor="verificationControl" className="text-xs font-medium">Delivery Control:</Label>
                        <Label className="text-xs font-medium uppercase">CoreDBA</Label>
                    </section>
                </section>

                <DialogFooter className="flex flex-row mt-4 justify-between gap-2 w-full">
                    <Button variant="outline" onClick={handleDialogClose} className="flex-1 bg-amber-600 uppercase">Deliv. Note</Button>
                    <Button
                        onClick={() => {
                            if (onSubmit) onSubmit(rowData);
                            handleDialogClose();
                        }}
                        className="flex-1 bg-green-500 uppercase"
                        disabled
                    >
                        Re-dispatch
                    </Button>
                    <Button variant="outline" className="flex-1 uppercase bg-orange-500">Start</Button>
                    <Button className="flex-1 uppercase">Complete</Button>
                </DialogFooter>
            </div>
        </>
    )
}
