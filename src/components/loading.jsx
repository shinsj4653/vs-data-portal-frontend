import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
        </div>
    );
};

export default Loading;