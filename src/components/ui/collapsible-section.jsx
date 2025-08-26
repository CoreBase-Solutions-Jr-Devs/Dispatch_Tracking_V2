import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCollapsible, setCollapsible } from "@/features/ui/uiSlice";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const CollapsibleSection = ({ id, icon: Icon, title, children, defaultOpen = false }) => {
    const dispatch = useDispatch();

    const isOpen = useSelector((state) => state.ui.collapsibles?.[id]);

    useEffect(() => {
        if (isOpen === undefined) {
            dispatch(setCollapsible({ id, value: defaultOpen }));
        }
    }, [id, isOpen, defaultOpen, dispatch]);

    const handleToggle = () => {
        dispatch(toggleCollapsible(id));
    };

    return (
        <div className="border-b border-border">
            <button
                onClick={handleToggle}
                className="flex w-full items-center justify-between py-2 px-1 font-semibold text-sm uppercase tracking-wide hover:bg-muted/30"
            >
                <div className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{title}</span>
                </div>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 transition-transform",
                        isOpen && "rotate-180"
                    )}
                />
            </button>
            {isOpen && <div className="pt-2 pb-3 px-1">{children}</div>}
        </div>
    );
};

export default CollapsibleSection;
