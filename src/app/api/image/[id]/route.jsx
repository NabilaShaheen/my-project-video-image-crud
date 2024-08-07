import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params;
  
    try {
      // Fetch the image record from the database
      const { rows } = await sql`SELECT * FROM image WHERE id = ${id}`;
      // Check if the image record was found
      if (rows.length === 0) {
        console.log(`GET request: No image found with id ${id}`);
        return NextResponse.json({ error: 'Not Found' }, { status: 404 });
      }
      // Log and return the image record
      console.log(`GET request: Found image with id ${id}`);
      const image = rows[0];
      return NextResponse.json({ imageUrl: image.url }); // Adjust 'image.url' based on your schema
    } catch (err) {
      // Log and return an error response
      console.error('Error fetching image:', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function PUT(request, { params }) {
  const { id } = params;
  const { type, title, description, url } = await request.json();
  try {
    const res = await sql`UPDATE image SET type = ${type}, title = ${title}, description = ${description}, url = ${url}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id} RETURNING *`;
    if (res.rows.length === 0) {
      console.log(`PUT request: No image found to update with id ${id}`);
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }
    console.log(`PUT request: Updated image with id ${id}`);
    return NextResponse.json(res.rows[0]);
  } catch (err) {
    console.error('Error updating image:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const res = await sql`DELETE FROM image WHERE id = ${id} RETURNING *`;
    if (res.rows.length === 0) {
      console.log(`DELETE request: No image found to delete with id ${id}`);
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }
    console.log(`DELETE request: Deleted image with id ${id}`);
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
