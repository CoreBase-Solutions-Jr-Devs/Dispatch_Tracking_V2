import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function CollectionRemarks() {
    return (
        <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-col'>
                <Label className={"mb-2"}>Dispatch Remarks:</Label>
                <Textarea placeholder="Enter remarks here..." className="mb-2 bg-gray-300" />
            </div>
            <div className='flex flex-col'>
                <Label className={"mb-2"}>Collection Remarks:</Label>
                <Textarea placeholder="Enter remarks here..." className="mb-2 bg-gray-300" />
            </div>
        </div>
    )
}
