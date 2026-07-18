import { NextResponse } from 'next/server';
import { writeFile, mkdir, readdir, unlink } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    
    const files = await readdir(uploadsDir);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        name: file,
        url: `/uploads/${file}`
      }));
    
    return NextResponse.json({ images });
  } catch (err) {
    return NextResponse.json({ images: [] });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: '没有文件' }, { status: 400 });
    }

    // 生成唯一文件名
    const timestamp = Date.now();
    const ext = file.name.split('.').pop();
    const filename = `${timestamp}-${Math.random().toString(36).substr(2, 9)}.${ext}`;
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);
    
    return NextResponse.json({ 
      url: `/uploads/${filename}`,
      filename 
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: '上传失败' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { filename } = await request.json();
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
    await unlink(filepath);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
