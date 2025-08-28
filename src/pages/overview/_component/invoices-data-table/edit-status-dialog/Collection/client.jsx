import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function CollectionClient() {
    return (
        <section className='flex flex-col mb-2'>
            <section className='flex justify-between gap-x-2'>
                <div className="flex flex-row items-center w-1/2 gap-x-2">
                    <Label className="text-xs font-medium">Collected By:</Label>
                    <Input type="text" placeholder="Enter Name" className="h-8"/>
                </div>
                <div className="flex flex-row items-center w-1/2 gap-x-2">
                    <Label className="text-xs font-medium">Collection Ref(ID):</Label>
                    <Input type="text" placeholder="Enter Ref(ID)" className="h-8" />
                </div>
            </section>
        </section>
    )
}
