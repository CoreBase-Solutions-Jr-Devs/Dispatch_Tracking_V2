import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function CollectionSummary() {
    return (
        <div className='flex flex-col'>

            <section className='flex flex-row justify-between items-center gap-6 mb-2'>
                <div className='flex justify-between w-1/2'>
                    <Label className="text-xs font-medium">Collection Type:</Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="dispatch" className="bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
                                Type
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 bg-gray-200">
                            <DropdownMenuLabel>Collection</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuRadioGroup value="BTR" onValueChange={(value) => console.log(value)}>
                                <DropdownMenuRadioItem value="Single">Single Order</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Batch">Batch</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="BTR">Branch Transfer</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className='flex justify-between w-1/2'>
                    <Label className="text-xs font-medium">Collection Mode:</Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="dispatch" className="bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
                                Mode
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 bg-gray-200">
                            <DropdownMenuLabel>Collection Mode</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuRadioGroup value="BTR" onValueChange={(value) => console.log(value)}>
                                <DropdownMenuRadioItem value="BTR">Branch Transfer</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Courier">Courier</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Pickup">Pickup Location</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </section>

        </div>
    )
}
