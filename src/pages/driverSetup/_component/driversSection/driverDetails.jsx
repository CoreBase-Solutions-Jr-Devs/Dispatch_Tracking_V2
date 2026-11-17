import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import { useCreateNewDriverMutation } from "@/features/delivery/deliveryAPI";
import { toast } from "sonner";
import { useTypedSelector } from "@/app/hook";
import Select from "react-select";

// {
//   "userName": "John",
//   "password": "password1234",
//   "fullName": "string",
//   "phoneNo": "0714028051",
//   "driverId": "123",
//   "driverLicenseNo": "str1231ing",
//   "carMake": "Subaru Cross Trek",
//   "regNo": "qweqwe",
//   "branches": [
//     1
//   ]s
// }

export function DriverDetails({ show, handleNewDriverModal }) {
  const { user } = useTypedSelector((state) => state.auth);

  let branches = user["userBranches"] || [];

  let branchOptions = branches.map((branch) => {
    return {
      value: branch.bcode,
      label: branch.brancH_NAME,
    };
  });

  const [createDriver, { isLoading }] = useCreateNewDriverMutation();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    fullName: "",
    phoneNo: "",
    driverId: "",
    driverLicenseNo: "",
    carMake: "",
    regNo: "",
    branches: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBranchSelect = (selectedList) => {
    const data = selectedList.map((item) => item.value);

    setFormData((prevState) => ({
      ...prevState,
      //   branches: Array.from(new Set([...(prevState.branches ?? []), ...data])),
      branches: data,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      userName: formData?.userName,
      password: formData?.password,
      fullName: formData?.fullName,
      phoneNo: formData?.phoneNo,
      driverId: formData?.driverId,
      driverLicenseNo: formData?.driverLicenseNo,
      carMake: formData?.carMake,
      regNo: formData?.regNo,
      branches: formData?.branches,
    };
    createDriver(payload)
      .unwrap()
      .then((data) => {
        toast.success("Client created successfully");
        console.log(data);
        handleNewDriverModal();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Driver Creation Failed", {
          description:
            error?.data?.message || error?.data?.title || "Please  try again",
          duration: 4000,
        });
      });
  };

  return (
    <React.Fragment>
      <Dialog open={show} onOpenChange={handleNewDriverModal}>
        <DialogTrigger onClick={handleNewDriverModal} />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Drvier Details</DialogTitle>
            <DialogDescription>
              Please enter the driver details.
            </DialogDescription>
          </DialogHeader>

          <form
            autoComplete="off"
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 mb-2 gap-4">
              <div className="flex flex-col">
                <Label className="text-xs font-medium ">Username:</Label>
                <Input
                  type={"text"}
                  value={formData?.userName}
                  name="userName"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <Label className="text-xs font-medium ">FullName:</Label>
                <Input
                  type={"text"}
                  value={formData?.fullName}
                  name="fullName"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col mb-3">
              <Label className="text-xs font-medium ">Password:</Label>
              <Input
                type={"text"}
                value={formData?.password}
                name="password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-3">
              <Label className="text-xs font-medium ">Phone:</Label>
              <PhoneInput
                country={"ke"}
                value={formData.phoneNo}
                inputStyle={{
                  width: "100%",
                  fontSize: "12px",
                  lineHeight: "1.5",
                  height: " calc(1.5em + 0.5rem + 2px)",
                }}
                id="phoneNo"
                name="phoneNo"
                masks={{ ke: "... ... ..." }}
                onChange={(value, country, e, formattedValue) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    phoneNo: value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-2 mb-2 gap-4">
              <div className="flex flex-col">
                <Label className="text-xs font-medium ">Driver ID:</Label>
                <Input
                  type={"text"}
                  value={formData?.driverId}
                  name="driverId"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <Label className="text-xs font-medium ">Driver License:</Label>
                <Input
                  type={"text"}
                  value={formData?.driverLicenseNo}
                  name="driverLicenseNo"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 mb-2 gap-4">
              <div className="flex flex-col">
                <Label className="text-xs font-medium ">Car Make:</Label>
                <Input
                  type={"text"}
                  value={formData?.carMake}
                  name="carMake"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <Label className="text-xs font-medium ">
                  Car Registration:
                </Label>
                <Input
                  type={"text"}
                  value={formData?.regNo}
                  name="regNo"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col mb-3">
              <Label className="text-xs font-medium ">Branches:</Label>
              <Select
                isMulti
                name="branches"
                options={branchOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) =>
                  handleBranchSelect(selectedOptions)
                }
              />
              {/* <Input
                type={"text"}
                value={formData?.password}
                name="password"
                required
                onChange={handleChange}
              /> */}
            </div>
            <hr />
            <div className="flex flex-row-reverse gap-3">
              <Button
                variant="ghost"
                className="text-xs font-medium"
                disabled={isLoading}
                // onClick={handleNewDriverModal}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                type="submit"
                className="text-xs font-medium"
                disabled={isLoading}
                // onClick={handleNewDriverModal}
              >
                Update
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
