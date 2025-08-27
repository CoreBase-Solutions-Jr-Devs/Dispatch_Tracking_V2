import { Badge } from '@/components/ui/badge'
import { DialogTitle } from '@/components/ui/dialog'

export default function VerificationHeader() {
    return (
        <div className="flex flex-row justify-between items-center mt-3 w-full">
            <DialogTitle className="text-primary">VERIFICATION - 1</DialogTitle>
            <Badge variant="pushed" className="uppercase">
                Document Verified
            </Badge>
        </div>
    )
}
