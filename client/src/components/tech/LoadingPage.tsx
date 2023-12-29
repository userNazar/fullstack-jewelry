'use client'

const LoadingPage = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="border-t-4 border-blue-500 border-solid h-12 w-12 rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingPage;
