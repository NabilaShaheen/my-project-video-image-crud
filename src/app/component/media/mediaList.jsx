'use client';
import { useEffect, useState } from 'react';
import UpdateMediaForm from './UpdateMediaForm';


export default function MediaList() {
  const [media, setMedia] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch media items on component mount
  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch('/api/image');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setMedia(data);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    }
    fetchMedia();
  }, []);

  // Handle deletion of a media item
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/image/${id}`, {
        method: 'DELETE',
      });
      setMedia(media.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  // Handle updating a media item
  const handleUpdate = (updatedItem) => {
    setMedia(media.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItem(null);
  };

  // Handle canceling the update form
  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Media List</h1>

      {/* Display Update Form if an item is being edited */}
      {editingItem && (
        <UpdateMediaForm
          mediaItem={editingItem}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}


      {/* Display media items */}
      {media.length === 0 ? (
        <p className="text-gray-600">No media items available.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {media.map((item) => (
            <div key={item.id} className="flex flex-col items-center bg-white p-4 shadow rounded max-w-xs">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-gray-800 text-center">{item.description}</p>
              {item.url && (
                <img
                  src={item.url}
                  alt={item.title}
                  className="mt-2 w-full h-auto rounded"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// //src/app/component/media/mediaList.jsx
// 'use client';
// import { useEffect, useState } from 'react';
// import UpdateMediaForm from './UpdateMediaForm'; // Ensure the path is correct

// export default function MediaList() {
//   const [media, setMedia] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);

//   useEffect(() => {
//     async function fetchMedia() {
//       try {
//         const res = await fetch('/api/image');
//         if (!res.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await res.json();
//         console.log('Fetched media:', data);
//         setMedia(data);
//       } catch (error) {
//         console.error('Error fetching media:', error);
//       }
//     }
//     fetchMedia();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`/api/image/${id}`, {
//         method: 'DELETE',
//       });
//       console.log(`Deleted media with id: ${id}`);
//       setMedia(media.filter((item) => item.id !== id));
//     } catch (error) {
//       console.error('Error deleting media:', error);
//     }
//   };

//   const handleUpdate = (updatedItem) => {
//     setMedia(media.map(item => item.id === updatedItem.id ? updatedItem : item));
//     setEditingItem(null);
//   };

//   const handleCancel = () => {
//     setEditingItem(null);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Media List</h1>
      
//       {editingItem && (
//         <UpdateMediaForm
//           mediaItem={editingItem}
//           onUpdate={handleUpdate}
//           onCancel={handleCancel}
//         />
//       )}

//       {media.length === 0 ? (
//         <p className="text-gray-600">No media items available.</p>
//       ) : (
//         <div className="flex flex-wrap gap-4">
//           {media.map((item) => (
//             <div key={item.id} className="flex flex-col items-center bg-white p-4 shadow rounded max-w-xs">
//               <h2 className="text-xl font-semibold">{item.title}</h2>
//               <p className="mt-2 text-gray-800 text-center">{item.description}</p>
//               {item.url && (
//                 <img
//                   src={item.url}
//                   alt={item.title}
//                   className="mt-2 w-full h-auto rounded"
//                   style={{ maxHeight: '200px', objectFit: 'cover' }}
//                 />
//               )}
//               <div className="mt-2 flex gap-2">
//                 <button
//                   onClick={() => setEditingItem(item)}
//                   className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item.id)}
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
