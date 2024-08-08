'use client';

import { useState } from 'react';

export default function UploadImageForm({ onUpload, onSuccess }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !title || !description) {
      console.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (onSuccess) {
        onSuccess(result);
      }
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
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
        type="file"
        accept='image/*'
        onChange={(e) => setFile(e.target.files[0])}
        required
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Upload
      </button>
    </form>
  );
}
