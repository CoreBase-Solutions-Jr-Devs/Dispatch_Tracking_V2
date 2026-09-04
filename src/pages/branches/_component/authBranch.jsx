import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { logout, setActiveBcode } from "@/features/auth/authSlice";
import { resetDispatchData } from "@/features/dispatch/dispatchSlice";
import { setQueryFilter } from "@/features/invoices/invoiceSlice";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { Loader, PlusCircleIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AuthBranch() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [branch, setBranch] = useState("");

  const { user } = useTypedSelector((state) => state.auth);

  let branches = user["userBranches"] || [];

  const handleBranchChange = (value) => {
    setBranch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!branch) {
      return toast.error("Branch Selection Failed", {
        description: "Please Select a branch and try again!!",
        duration: 4000,
      });
    }
    return handleRouting();
  };

  const handleRouting = () => {
    setIsloading(true);
    dispatch(setActiveBcode(branch));
    dispatch(
      setQueryFilter({
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        dateRange: "TODAY",
        status: "",
        bcode: branch,
      }),
    );
    const timeoutId = setTimeout(() => {
      setIsloading(false);
      navigate(PROTECTED_ROUTES.OVERVIEW);
    }, 2000);

    return () => clearTimeout(timeoutId);
  };

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(resetDispatchData());
  }, [dispatch]);

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-md">
          <CardHeader className="text-center pb-2">
            {/* <Link
              to="/"
              className="flex items-center gap-2 justify-center font-medium text-base"
            >
              <Logo />
            </Link> */}
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Branch selection to Dispatch Tracking System
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <form
              autoComplete="off"
              className="flex flex-col gap-6 mt-4"
              onSubmit={handleSubmit}
            >
              <Select
                value={branch}
                disabled={isLoading}
                onValueChange={(value) => handleBranchChange(value)}
              >
                <SelectTrigger className="w-full border-gray-500">
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="Select branch...">
                      {
                        branches.find((item) => item.bcode === Number(branch))
                          ?.brancH_NAME
                      }
                    </SelectValue>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-stone-50">
                  {branches.map((opt, index) => (
                    <SelectItem key={index} value={opt.bcode}>
                      {opt.brancH_NAME}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex justify-between gap-1">
                <Button
                  disabled={isLoading}
                  type="submit"
                  size="default"
                  className="transition-transform duration-200 hover:scale-[1.02] bg-primary text-primary-foreground w-1/2"
                >
                  {isLoading ? (
                    <Loader className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <>Proceed</>
                  )}
                </Button>
                <Button
                  disabled={isLoading}
                  type="button"
                  size="default"
                  className="transition-transform duration-200 hover:scale-[1.02] hover:bg-red-500 hover:text-white outline-red-500 bg-white text-black w-1/2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
              {/* Footer */}
              <div className="text-center pt-4 border-t border-border/50 text-xs text-muted-foreground">
                Secure pharmacy management system
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { AuthBranch };
