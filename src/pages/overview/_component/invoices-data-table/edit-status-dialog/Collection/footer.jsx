import { Button } from '@/components/ui/button'
import { useCollectionPushMutation, useCollectionRecallMutation, useCollectionStartMutation } from '@/features/invoices/invoicesAPI'
import React, { useState } from 'react'

export default function CollectionFooter({ rowData, onSubmit, onClose }) {
    const [startDisabled, setStartDisabled] = useState(false)
    const [dispatchDisabled, setDispatchDisabled] = useState(true)
    const [recallDisabled, setRecallDisabled] = useState(true)

    const [collectionStart] = useCollectionStartMutation();
    const [collectionPush] = useCollectionPushMutation();
    const [collectionRecall] = useCollectionRecallMutation();

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

    const handleRecall = () => {
        setStartDisabled(true)
        setRecallDisabled(true)
        if (onClose) onClose()
    }


    return (
        <div className='flex flex-row justify-between items-center mt-3 w-full'>
            <Button
                variant="verification"
                // onClick={handleStart}
                // disabled={startDisabled}
                className="mt-2 uppercase"
            >
                Deliv. Note
            </Button>
            <Button
                variant="apply"
                // onClick={handleDispatch}
                // disabled={dispatchDisabled}
                className="mt-2 uppercase"
            >
                Re-Call
            </Button>
            <Button
                variant="verification"
                onClick={handleStart}
                // disabled={startDisabled}
                className="mt-2 uppercase"
            >
                Start
            </Button>
            <Button
                variant="apply"
                onClick={handleStart}
                disabled={startDisabled}
                className="mt-2 uppercase"
            >
                Complete
            </Button>
        </div>
    )
}
