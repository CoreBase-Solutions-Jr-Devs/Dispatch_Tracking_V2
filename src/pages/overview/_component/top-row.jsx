import { useTypedSelector } from "@/app/hook";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const TopRow = ({ pageHeading }) => {
    const { user } = useTypedSelector((state) => state.auth);
    const location = useLocation();

    // Split pathname and remove empty values
    const pathSegments = location.pathname.split("/").filter(Boolean);

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Breadcrumbs */}
            <Breadcrumb>
                <BreadcrumbList>
                    {pathSegments.map((segment, index) => {
                        const href = "/" + pathSegments.slice(0, index + 1).join("/");
                        const isLast = index === pathSegments.length - 1;

                        return (
                            <React.Fragment key={href}>
                                <BreadcrumbItem className="text-[15px] capitalize">
                                    {isLast ? (
                                        <BreadcrumbPage className="line-clamp-1">
                                            {pageHeading || segment}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link to={href}>{segment}</Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>

           
        </div>
    );
};

export default TopRow;
