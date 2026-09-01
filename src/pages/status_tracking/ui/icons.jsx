import { MapPinHouse, Package, ShieldCheck, Truck } from "lucide-react"


export const iconMap = {
    STORE: Package,
    VERIFICATION: ShieldCheck,
    DISPATCH: Truck,
    DELIVERY: MapPinHouse,
};

export const statusColor = {
    Completed: 'text-primary',
    Active: 'text-green-600',
    Pending: 'text-destructive',
}