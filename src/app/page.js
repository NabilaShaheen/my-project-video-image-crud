"use client"
import React, { useState } from 'react';
import CreateMedia from './component/media/createMediaForm';
import MediaList from './component/media/mediaList';

const Page = () => {
    const [showCreateMedia, setShowCreateMedia] = useState(false);

    const toggleCreateMedia = () => setShowCreateMedia(!showCreateMedia);

    return (
        <main className='w-full h-[100vh]'>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Media Management</h1>
                <div className="space-x-4 mb-4">
                    <button
                        onClick={toggleCreateMedia}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                        {showCreateMedia ? 'Hide Create Media' : 'Create Media'}
                    </button>
                </div>

                {showCreateMedia && (
                    <div className="mb-4 p-4 bg-white shadow rounded">
                        <CreateMedia />
                    </div>
                )}
                <div className="p-4 bg-white shadow rounded">
                    <MediaList />
                </div>
            </div>
        </main>
    );
};

export default Page;