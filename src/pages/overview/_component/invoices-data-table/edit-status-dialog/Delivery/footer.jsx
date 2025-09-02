import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

export default function DeliveryFooter() {
    const [startDisabled, setStartDisabled] = useState(false)
    const [dispatchDisabled, setDispatchDisabled] = useState(true)

    const handleStart = () => {
        setStartDisabled(true)
        setDispatchDisabled(false)
        if (onClose) onClose()
    }

    const handleDispatch = () => {
        setStartDisabled(true)
        setDispatchDisabled(true)
        if (onSubmit) onSubmit(rowData)
        if (onClose) onClose()
    }


    return (
        <div className='flex flex-row justify-between items-center mt-3 w-full gap-x-2'>
            <Button
                variant="verification"
                // onClick={handleStart}
                // disabled={startDisabled}
                className="mt-2 h-8 uppercase w-22"
            >
                Deliv. Note
            </Button>
            <Button
                variant="apply"
                // onClick={handleDispatch}
                // disabled={dispatchDisabled}
                className="mt-2 h-8 uppercase w-24"
            >
                Re-Dispatch
            </Button>
            <Button
                variant="verification"
                // onClick={handleStart}
                // disabled={startDisabled}
                className="mt-2 h-8 uppercase w-20"
            >
                Start
            </Button>
            <Button
                variant="apply"
                onClick={handleStart}
                disabled={startDisabled}
                className="mt-2 h-8 uppercase w-20"
            >
                Complete
            </Button>
        </div>
    )
}
