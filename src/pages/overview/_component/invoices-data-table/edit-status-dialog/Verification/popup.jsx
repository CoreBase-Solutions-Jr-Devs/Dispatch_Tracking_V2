import React, { useState } from 'react'
import { DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import VerificationHeader from './header'
import VerificationDetails from './details'
import VerificationSummary from './summary'
import VerificationRemarks from './remarks'
import VerificationMeta from './meta'
import VerificationFooter from './footer'

export default function VerificationPopup({ rowData, onSubmit }) {
    const [isOpen, setIsOpen] = useState(false)

    const handleDialogClose = () => setIsOpen(false)

    return (
        <>
            <DialogHeader>
                <VerificationHeader />
            </DialogHeader>

            <Separator className="mb-4" />

            <VerificationDetails data={rowData} />

            <Separator className="my-2" />

            <VerificationSummary data={rowData} />

            <VerificationRemarks />

            <VerificationMeta />

            <DialogFooter>
                <VerificationFooter
                    rowData={rowData}
                    onSubmit={onSubmit}
                    onClose={handleDialogClose}
                />
            </DialogFooter>
        </>
    )
}
