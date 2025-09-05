import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function CollectionRemarks({ data }) {
    const invoice = data || mockInvoices[0];

    return (
        <div className='flex flex-row justify-between items-center gap-x-4'>
            <div className='flex flex-col w-1/2'>
                <Label className="mb-2">Dispatch Remarks:</Label>
                <Textarea 
                    placeholder="Enter remarks here..."
                    className="mb-2 bg-gray-300"
                    value={invoice?.dispatchRemarks}
                />
            </div>
            <div className='flex flex-col w-1/2'>
                <Label className="mb-2">Collection Remarks:</Label>
                <Textarea
                    placeholder="Enter remarks here..."
                    className="mb-2 bg-gray-300" 
                    value={invoice?.collectionRemarks}
                />
            </div>
        </div>
    )
}
