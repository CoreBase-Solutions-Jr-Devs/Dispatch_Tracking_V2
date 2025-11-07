import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";

export default function DispatchButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PROTECTED_ROUTES.NEWDISPATCH);
  };

  return (
    <Button onClick={handleClick} variant="apply">
      New Dispatch
    </Button>
  );
}
