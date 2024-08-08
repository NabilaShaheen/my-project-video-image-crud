import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await sql`SELECT * FROM image`;
    console.log('GET request: Retrieved images:', res.rows);
    return NextResponse.json(res.rows);
  } catch (err) {
    console.error('Error fetching images:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  const { type, title, description, url } = await request.json();
  try {
    const res = await sql`INSERT INTO image (type, title, description, url) VALUES (${type}, ${title}, ${description}, ${url}) RETURNING *`;
    console.log('POST request: Created image:', res.rows[0]);
    return NextResponse.json(res.rows[0]);
  } catch (err) {
    console.error('Error creating image:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
