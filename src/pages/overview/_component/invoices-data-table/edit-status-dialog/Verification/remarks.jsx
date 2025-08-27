import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function VerificationRemarks() {
    return (
        <div className="flex flex-col mb-2">
            <Label>Verification Remarks:</Label>
            <Textarea className="min-w-[80px] bg-gray-300" />
        </div>
    )
}
