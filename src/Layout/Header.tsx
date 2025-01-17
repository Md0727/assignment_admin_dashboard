const Header: React.FC = () => {
    const LogOutHandler = () => {
        localStorage.removeItem("token");
        window.location.href = "/"
    }
    return (
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
            <div className="flex items-center px-4">
                <button className="text-gray-500 focus:outline-none focus:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
            </div>
            <div className="flex items-center pr-4">
                <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
                    </svg>
                </button>
                <button
                    onClick={LogOutHandler}
                    // disabled={currentStep === steps.length}
                    className="py-2 ml-3 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                    Log Out
                </button>
            </div>
        </div>
    )
}
export default Header