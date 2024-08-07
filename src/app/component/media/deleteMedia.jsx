'use client';
import { useEffect, useState } from 'react';

export default function MediaList() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch('/api/image');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log('Fetched media:', data);
        setMedia(data);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    }
    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/image/${id}`, {
        method: 'DELETE',
      });
      console.log(`Deleted media with id: ${id}`);
      setMedia(media.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Media List</h1>
      {media.length === 0 ? (
        <p className="text-gray-600">No media items available.</p>
      ) : (
        media.map((item) => (
          <div key={item.id} className="mb-4 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-gray-800">{item.description}</p>
            <p className="mt-1 text-blue-500">{item.url}</p>
            <button
              onClick={() => handleDelete(item.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
