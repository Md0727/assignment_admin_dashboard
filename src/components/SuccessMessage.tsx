import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userDetailsSlice";
import { setCurrentStep } from "../store/formSteperSlice";

const SuccessMessage: React.FC = () => {
    const dispatch = useDispatch();
    const GOtoHome = () => {
        // Dispatch actions to reset form data and stepper state
        dispatch(setUserDetails({
            name: "",
            email: "",
            phone: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            file: null,
        }));

        // Reset the current step to 1 (home step)
        dispatch(setCurrentStep({ steperTd: 1 }));
        window.location.href = "/admin/dashboard"

    }
    return (
        <div className="max-w-[550px] m-auto">
            <h1 className="text-6xl text-center font-bold text-black mb-5">Thank you!</h1>
            <svg width="200" className="m-auto" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* <!-- Rotating circle animation --> */}
                <circle cx="50" cy="50" r="45" stroke="#4CAF50" stroke-width="5" fill="none" stroke-dasharray="283" stroke-dashoffset="0">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite" />
                </circle>

                {/* <!-- Second circle fading in and out indefinitely --> */}
                <circle cx="50" cy="50" r="30" fill="#4CAF50" opacity="1">
                    <animate attributeName="opacity" from="0" to="1" dur="4s" begin="0s" />
                </circle>

                {/* <!-- Path animation (drawing the line) --> */}
                <path d="M35 50 L45 60 L65 40" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-dasharray="40" stroke-dashoffset="40">
                    <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1s" repeatCount="indefinite" begin="0s" />
                </path>
            </svg>



            <p className="text-center">
                Your form has been successfully submitted. We appreciate your time and effort in providing this information. Our team will review it promptly, and we will be in touch if any further information is needed.
            </p>

            <button className="text-black mt-3" onClick={GOtoHome} type="button">Go to Home</button>
        </div>
    )
}
export default SuccessMessage;