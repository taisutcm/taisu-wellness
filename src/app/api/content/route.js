import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/content.json');

export async function GET() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const content = await request.json();
    fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
