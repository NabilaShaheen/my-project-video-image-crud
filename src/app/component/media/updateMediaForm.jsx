'use client';
import { useState } from 'react';

export default function UpdateMediaForm({ mediaItem, onUpdate, onCancel }) {
  const [title, setTitle] = useState(mediaItem.title || '');
  const [description, setDescription] = useState(mediaItem.description || '');
  const [url, setUrl] = useState(mediaItem.url || '');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/image/${mediaItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, url }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.log('Error response:', errorData);
        throw new Error('Network response was not ok');
      }
  
      const updatedItem = await res.json();
      console.log('Updated media:', updatedItem);
      setSuccessMessage('Media updated successfully!');
      onUpdate(updatedItem);
  
      // Clear the success message after a delay
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating media:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Media</h2>
      {successMessage && (
        <div className="mb-4 p-2 bg-green-500 text-white rounded">
          {successMessage}
        </div>
      )}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full px-4 py-2 border rounded mb-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="w-full px-4 py-2 border rounded mb-2"
      ></textarea>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        required
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Update
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
      >
        Cancel
      </button>
    </form>
  );
}
