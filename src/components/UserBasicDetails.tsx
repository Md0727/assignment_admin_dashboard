import React, { useState, useCallback } from 'react';
import FormInput from './FormInput';
import { Icons } from '../constent/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userDetailsSlice';
import { setCurrentStep } from '../store/formSteperSlice';
import CountryCodeDropdown from "./CountryCodeDropdown"

const UserBasicDetails: React.FC = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.userDetails);  // Use Redux store data
    const steperTd = useSelector((state: any) => state.steps.steperTd);

    // State to hold input values temporarily (local state)
    const [formData, setFormData] = useState<any>({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        countryCode: userData?.countryCode || '',
    });

    // Handle form field change and dispatch to Redux store
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;

            setFormData((prevState: any) => ({
                ...prevState,
                [name]: value,
            }));

            // Dispatch to Redux store to update the global state
            dispatch(setUserDetails({
                ...formData,
                [name]: value,
            }));
        },
        [formData, dispatch]
    );

    const handleNextStep = () => {
        if (!userData?.name?.trim()) {
            alert("Name is required!");
            return;
        }

        // Validate if email is in correct format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!userData?.email?.trim()) {
            alert("Email is required!");
            return;
        } else if (!emailRegex.test(userData.email)) {
            alert("Please enter a valid email address!");
            return;
        }

        // Validate if phone number is 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        if (!userData?.phone?.trim()) {
            alert("Phone number is required!");
            return;
        } else if (!phoneRegex.test(userData.phone)) {
            alert("Please enter a valid 10-digit phone number!");
            return;
        }
        dispatch(setCurrentStep({ steperTd: steperTd + 1 }));
    };

    console.log(userData, 'userData')

    return (
        <>
            <h1 className="capitalize">User Basic Details</h1>
            <div className="w-full max-w-md mx-auto p-6 shadow-lg rounded-lg bg-white">
                <div className="flex flex-col gap-4 mb-4">
                    <FormInput
                        icon={Icons.emailIcon}
                        type="text"
                        name="name"
                        placeholder="User Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        icon={Icons.emailIcon}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className='perent-bx'>
                        <FormInput
                            icon={Icons.emailIcon}
                            type="number"
                            name="phone"
                            placeholder="Phone No."
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            addCustomClass="addCustomClass"
                        />
                        <CountryCodeDropdown />
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

export default UserBasicDetails;
