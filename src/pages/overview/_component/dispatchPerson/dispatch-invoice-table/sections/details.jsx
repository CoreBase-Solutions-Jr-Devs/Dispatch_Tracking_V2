import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";
import { useGetDeliveryDriverQuery } from "@/features/dispatch/dispatchAPI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCourierDetails, setCustomerCourierId, setCustomerCourierName, setCustomerCourierPhone, setDriverDetails } from "@/features/dispatch/dispatchSlice";

export default function DispatchDetails({ collectionType, deliveryPerson }) {


  const [courierDetails,setCourierDetailsState] = useState({
    customerCourierName:'',
    customerCourierId:'',
    customerCourierPhone:'',
    customerCourierRegNo: '',
  })

  const dispatch = useDispatch()

  // Fetch filter options to get delivery guy ID
  const { data: filterOptions, isLoading: filterLoading, isError: filterError } = useFilterOptionsQuery();
  const deliveryGuyOption = filterOptions?.find(opt => opt.key === "deliveryGuy")?.options?.[0];
  const deliveryGuyId = deliveryGuyOption?.value;

  // Fetch driver details based on delivery Guy ID
  const { data: driverDetails, isLoading: driverLoading, isError: driverError, error: driverApiError } = useGetDeliveryDriverQuery(deliveryGuyId, {
    skip: !deliveryGuyId || collectionType !== "delivery" || !deliveryPerson,
  });

// {
//     "driverId": 23,
//     "driverName": "delivery1",
//     "personalId": "123456789",
//     "driverLicenseNo": "D1234567",
//     "phoneNo": "+254792514851",
//     "email": "mikewanj@gmail.com",
//     "carMake": "Toyota Hilux",
//     "regNo": "KBA123A"
// }

  // alert(JSON.stringify(driverDetails))

  const handleChange = (e) =>{
    const {name,value} = e.target

    setCourierDetailsState((prevState)=>({
    ...prevState, [name]:value
    }))

    dispatch(setCourierDetails({...courierDetails, [name]:value}))

  }

  useEffect(() => {
    dispatch(setDriverDetails(driverDetails))
  
  }, [driverDetails]);
  

  return (
    <div className="flex flex-col gap-2 text-xs font-medium">
      <section className="flex justify-between items-center h-full">
        <Label className="text-xs font-medium">Dispatch Date & Time:</Label>
        {/* <Label className="text-xs font-medium">08/20/2025 12:31</Label> */}
      </section>

      {/* Loading and error states for filter options */}
      {/* {filterLoading && <Label className="text-xs text-blue-500">Loading delivery options...</Label>}
      {filterError && <Label className="text-xs text-red-500">Error loading delivery options: {filterError?.message || "Unknown error"}</Label>} */}

      {/* Loading and error states for driver details */}
      {collectionType === "delivery" && driverLoading && <Label className="text-xs text-blue-500">Loading driver details...</Label>}
      {collectionType === "delivery" && driverError && <Label className="text-xs text-red-500">Error loading driver details: {driverApiError?.message || "Unknown error"}</Label>}

      {collectionType === "self-collection" && (
        <section className="flex flex-col w-full justify-between space-x-2">
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Client Name</Label>
            <Input 
              className="w-full h-6 text-xs" 
              value= {courierDetails.customerCourierName} 
              name="customerCourierName"
              onChange={(e) => dispatch(setCustomerCourierName(e.target.value))} />
          </div>
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Client ID</Label>
            <Input 
              className="w-full h-6 text-xs" 
              value={courierDetails.customerCourierId}
              name="customerCourierId"
              onChange={(e) => dispatch(setCustomerCourierId(e.target.value))} />
          </div>
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Phone No</Label>
            <Input 
              className="w-full h-6 text-xs" 
              value={courierDetails.customerCourierPhone}
              name="customerCourierPhone"
              onChange={(e) => dispatch(setCustomerCourierPhone(e.target.value))} />
          </div>
        </section>
      )}

      {collectionType === "delivery" && !deliveryPerson && (
        <>
          <section className="flex justify-between w-full h-full">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">DP ID:</Label>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">DP DL:</Label>
            </div>
          </section>

          <section className="flex justify-between h-full">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">Car Make:</Label>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">Reg No:</Label>
            </div>
          </section>
        </>
      )}

      {collectionType === "delivery" && deliveryPerson && driverDetails && !driverLoading && !driverError && (
        <>
          <section className="flex justify-between w-full h-full">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">DP ID:</Label>
              <Label className="text-xs font-medium">{driverDetails.personalId}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">DP DL:</Label>
              <Label className="text-xs font-medium">{driverDetails.driverLicenseNo}</Label>
            </div>
          </section>

          <section className="flex justify-between h-full">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">Car Make:</Label>
              <Label className="text-xs font-medium">{driverDetails.carMake}</Label>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">Reg No:</Label>
              <Label className="text-xs font-medium">{driverDetails.regNo}</Label>
            </div>
          </section>
        </>
      )}

      {collectionType === "courier" && (
        <section className="flex flex-col justify-between space-x-2">
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Courier Name</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierName || ""}
              name="customerCourierName"
              onChange={handleChange}
              
              // onChange={(e) => dispatch(setCustomerCourierName(e.target.value))}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Courier ID</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierId || ""}
              name="customerCourierId"
              onChange={handleChange}
              // onChange={(e) => dispatch(setCustomerCourierId(e.target.value))}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Phone No</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierPhone}
              name="customerCourierPhone"
              onChange={handleChange}
              // onChange={(e) => dispatch(setCustomerCourierPhone(e.target.value))}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Reg No</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierRegNo}
              name="customerCourierRegNo"
              onChange={handleChange}
            />
          </div>
        </section>
      )}
    </div>
  );
}