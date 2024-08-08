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
  const { title, description, url } = await request.json();

  try {
    const result = await sql`
      UPDATE image
      SET title = ${title}, description = ${description}, url = ${url}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.count === 0) {
      return NextResponse.json({ error: 'image not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
