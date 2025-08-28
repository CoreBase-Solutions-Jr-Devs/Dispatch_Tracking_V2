import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function DeliverySummary() {
    return (
        <div className='flex flex-col'>
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
        </div>
    )
}
