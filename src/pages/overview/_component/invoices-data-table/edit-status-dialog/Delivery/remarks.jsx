import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function DeliveryRemarks() {
  return (
    <div className='flex flex-col'>
        <Label className={"mb-2"}>Delivery Remarks:</Label>
        <Textarea placeholder="Enter remarks here..." className="min-w-[80px] mb-2 bg-gray-300" />
    </div>
  )
}
