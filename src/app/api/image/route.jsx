// import { sql } from '@vercel/postgres';
//import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';

export const runtime = 'nodejs'; // Use Node.js runtime to access Node.js APIs

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// export async function GET() {
//   try {
//     const res = await sql`SELECT * FROM image`;
//     return NextResponse.json(res.rows);
//   } catch (err) {
//     console.error('Error fetching images:', err);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

export async function POST(req) {
  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    // Convert the NextRequest to a Node.js-like stream
    const nodeReq = toNodeRequest(req);

    form.parse(nodeReq, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing the files:', err);
        return reject(NextResponse.json({ error: 'Error parsing the files' }, { status: 500 }));
      }

      console.log('Parsed fields:', fields);
      console.log('Parsed files:', files);

      const { title, description } = fields;
      const file = files.file;

      if (!file || !file.filepath) {
        return reject(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }));
      }

      const fileName = `${Date.now()}-${file.originalFilename}`;
      const filePath = path.join(uploadDir, fileName);

      try {
        // Move the file to the uploads directory
        await fs.rename(file.filepath, filePath);

        // Construct the URL to serve the file
        const url = `/uploads/${fileName}`;

        // Insert file metadata into the database
        const res = await sql`
          INSERT INTO image (type, title, description, url)
          VALUES ('image', ${title}, ${description}, ${url})
          RETURNING *
        `;

        return resolve(NextResponse.json(res.rows[0], { status: 201 }));
      } catch (error) {
        console.error('Error storing the file:', error);
        return reject(NextResponse.json({ error: 'Error storing the file' }, { status: 500 }));
      }
    });
  });
}



//src/app/api/image/route.jsx
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

// export async function POST(request) {
//   const { type, title, description, url } = await request.json();
//   try {
//     const res = await sql`INSERT INTO image (type, title, description, url) VALUES (${type}, ${title}, ${description}, ${url}) RETURNING *`;
//     console.log('POST request: Created image:', res.rows[0]);
//     return NextResponse.json(res.rows[0]);
//   } catch (err) {
//     console.error('Error creating image:', err);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
