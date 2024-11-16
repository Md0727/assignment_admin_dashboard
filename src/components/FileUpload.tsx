import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userDetailsSlice';
import { setCurrentStep } from '../store/formSteperSlice';
import { APIRequest, ApiUrl } from '../utils/api';
import { toast } from 'react-toastify';

const FileUpload: React.FC = () => {
    const dispatch = useDispatch();
    const steperTd = useSelector((state: any) => state.steps.steperTd);
    const userData = useSelector((state: any) => state.userDetails);  // Use Redux store data
    const [loading, setLoading] = useState(false); // Loading state
    const [ImageFile, setImageFile] = useState<any>()
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first file selected
        if (file) {
            // Generate a temporary URL for the selected image
            const imageUrl = URL.createObjectURL(file);
            console.log("Image URL:", imageUrl); // Log the URL or use it as needed
            setImageFile(imageUrl);
            dispatch(setUserDetails({ file })); // Add imageUrl to the dispatched payload if needed
        }
    };

    const usersHandler = () => {
        setLoading(true); // Set loading to true when login starts
        const config = {
            method: 'POST',
            url: `${ApiUrl.users}`,
            body: {
                email: userData?.email,
                username: userData?.name,
                name: {
                    fullname: userData?.name,
                },
                address: {
                    addressLine1: userData?.addressLine1,
                    addressLine2: userData?.addressLine2,
                    city: userData?.city,
                    state: userData?.newState,
                    country: userData?.country,
                    pincode: userData?.pincode,
                    zipcode: userData?.countryCode,
                    geolocation: {
                        lat: '-37.3159',
                        long: '81.1496'
                    }
                },
                phone: userData?.phone,
                file: ImageFile,
            }
        };

        APIRequest(
            config,
            res => {
                setLoading(false); // Set loading to false on success
                if (res) {
                    toast.success("Add User Success.");
                    dispatch(setCurrentStep({ steperTd: steperTd + 1 }));
                    setTimeout(() => {
                        dispatch(setCurrentStep({ steperTd: 1 }));
                        window.location.href = "/admin/dashboard"
                    }, 2000)
                }
            },
            err => {
                setLoading(false); // Set loading to false on error
                console.log('Error:', err);
            }
        );
    };

    const handleNextStep = () => {
        // Validate if a file is selected (if necessary)
        if (!userData?.file) {
            alert("File is required!");
            return;
        }
        usersHandler();
    };

    return (
        <div className='w-full max-w-xl mx-auto p-6 shadow-lg rounded-lg bg-white'>
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="file-upload" className="text-sm font-medium text-gray-700">
                    Upload a PNG or PDF file
                </label>
                <input
                    id="file-upload"
                    type="file"
                    name="file"
                    accept=".png, .pdf"
                    className="py-2 px-3 border-2 rounded-md"
                    required
                    onChange={handleFileChange}
                />
            </div>
            <button
                type="submit"
                value="login"
                id="login"
                className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000 flex justify-center items-center"
                disabled={loading} // Disable button when loading
                onClick={handleNextStep}
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                ) : (
                    "Submit"
                )}
            </button>
        </div>
    );
};

export default FileUpload;
