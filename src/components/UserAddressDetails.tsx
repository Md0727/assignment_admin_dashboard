import React, { useEffect, useState } from 'react';
import FormInput from './FormInput';
import { Icons } from '../constent/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userDetailsSlice';
import { setCurrentStep } from '../store/formSteperSlice';

const UserAddressDetails: React.FC = () => {
    const dispatch = useDispatch();
    const steperTd = useSelector((state: any) => state.steps.steperTd);
    const userData = useSelector((state: any) => state.userDetails);  // Use Redux store data
    const [formData, setFormData] = useState<any>({
        addressLine1: userData.addressLine1 || '',
        addressLine2: userData.addressLine2 || '',
        city: userData.city || '',
        state: userData.state || '',
        pincode: userData.pincode || '',
        country: userData.country || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));

        // Dispatch updated form data to Redux
        dispatch(setUserDetails({
            ...formData,
            [name]: value,
        }));
    };

    const handleNextStep = () => {
        // Validate if addressLine1 is empty
        if (!userData?.addressLine1?.trim()) {
            alert("Address Line 1 is required!");
            return;
        }
        // Optionally, validate addressLine2 if needed (if it's required)
        if (!userData?.addressLine2?.trim()) {
            alert("Address Line 2 is required!");
            return;
        }
        // Validate if city is empty
        if (!userData?.city?.trim()) {
            alert("City is required!");
            return;
        }
        if (!userData?.state?.trim()) {
            alert("State is required!");
            return;
        }
        const pincodeRegex = /^[0-9]{6}$/;
        if (!userData?.pincode?.trim()) {
            alert("Pincode is required!");
            return;
        } else if (!pincodeRegex.test(userData.pincode)) {
            alert("Please enter a valid 6-digit pincode!");
            return;
        }
        if (!userData?.country?.trim()) {
            alert("Country is required!");
            return;
        }
        dispatch(setCurrentStep({ steperTd: steperTd + 1 }));
    };

    return (
        <>
            <h1 className="capitalize">User Address Details</h1>
            <div className="w-full max-w-xl mx-auto p-6 shadow-lg rounded-lg bg-white">
                <div className="flex flex-col gap-4 mb-4">
                    {/* Address Line 1 */}
                    <FormInput
                        icon={Icons.emailIcon}
                        type="text"
                        name="addressLine1"
                        placeholder="Address Line 1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        required
                    />

                    {/* Address Line 2 */}
                    <FormInput
                        icon={Icons.emailIcon}
                        type="text"
                        name="addressLine2"
                        placeholder="Address Line 2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                    />

                    {/* City */}
                    <FormInput
                        icon={Icons.emailIcon}
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />

                    {/* State Select Dropdown */}
                    <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <select
                            name="state"
                            className="pl-2 outline-none border-none w-full"
                            value={formData.state}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select State</option>
                            <option value="california">California</option>
                            <option value="texas">Texas</option>
                            <option value="new_york">New York</option>
                            <option value="florida">Florida</option>
                        </select>
                    </div>

                    {/* Pincode */}
                    <FormInput
                        icon={Icons.emailIcon}
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                    />

                    {/* Country Select Dropdown */}
                    <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <select
                            name="country"
                            className="pl-2 outline-none border-none w-full"
                            value={formData.country}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select Country</option>
                            <option value="us">United States</option>
                            <option value="ca">Canada</option>
                            <option value="uk">United Kingdom</option>
                            <option value="in">India</option>
                        </select>
                    </div>
                </div>
                <button
                    onClick={handleNextStep}
                    // disabled={currentStep === steps.length}
                    className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default UserAddressDetails;
