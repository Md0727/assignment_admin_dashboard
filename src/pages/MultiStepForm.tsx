import { useEffect, useState } from 'react';
import UserBasicDetails from '../components/UserBasicDetails';
import UserAddressDetails from '../components/UserAddressDetails';
import FileUpload from '../components/FileUpload';
import SuccessMessage from '../components/SuccessMessage';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../store/formSteperSlice';

const MultiStepForm = () => {
    const dispatch = useDispatch();
    const steperTd = useSelector((state: any) => state.steps.steperTd);
    const [currentStep, setCurrentStep1] = useState(1);
    const steps = [
        { label: "user basic details", index: 1, content: <UserBasicDetails /> },
        { label: "Address", index: 2, content: <UserAddressDetails /> },
        { label: "File Upload", index: 3, content: <FileUpload /> },
        { label: currentStep === 4 ? "Completed" : "Submit", index: 4, content: <SuccessMessage />, isFinal: true }
    ];

    const handleBack = () => {
        if (currentStep > 1) dispatch(setCurrentStep({ steperTd: steperTd - 1 }));;
    };

    useEffect(() => {
        setCurrentStep1(steperTd)
    }, [steperTd])

    return (
        <div>
            {/* Stepper Navigation */}
            <ul className="relative flex flex-row gap-x-2">
                {steps.map(step => (
                    <li key={step.index} className={`flex items-center gap-x-2 shrink-0 flex-1`}>
                        <span className={`size-7 rounded-full ${currentStep === step.index ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} flex justify-center items-center font-medium`}>{step.index}</span>
                        <span className="text-sm font-medium capitalize">{step?.label}</span>
                        {step.index < steps.length && <div className="w-full h-px flex-1 bg-gray-200" />}
                    </li>
                ))}
            </ul>

            {/* Step Content */}
            <div className="mt-5 sm:mt-8">
                {steps.map(step => (
                    <div key={step.index} style={{ display: currentStep === step.index ? 'block' : 'none' }}>
                        <div className="p-4 bg-gray-50 border border-dashed border-gray-200 rounded-xl">
                            <h3 className="text-gray-500">{step.content}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Button Group */}
            <div className="mt-5 flex justify-between items-center gap-x-2">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50"
                >
                    Back
                </button>
                {/* <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length}
                    className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                    Next
                </button> */}

            </div>
        </div>
    );
};

export default MultiStepForm;
