import { NextRequest, NextResponse } from 'next/server';

// Use dynamic import for Cloudinary to avoid build issues
let cloudinary: any;

// Function to initialize Cloudinary
const initCloudinary = async () => {
  try {
    // Dynamically import Cloudinary
    const cloudinaryModule = await import('cloudinary');
    cloudinary = cloudinaryModule.v2;
    
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
      api_key: process.env.CLOUDINARY_API_KEY || '',
      api_secret: process.env.CLOUDINARY_API_SECRET || '',
    });
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Cloudinary:', error);
    return false;
  }
};

// This function handles file uploads for both local development and Netlify
export async function POST(request: NextRequest) {
  try {
    // Initialize Cloudinary
    const cloudinaryInitialized = await initCloudinary();
    
    if (!cloudinaryInitialized) {
      return NextResponse.json(
        { success: false, message: 'Image upload service unavailable' },
        { status: 500 }
      );
    }
    
    // Validate Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary environment variables not set');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Allow images and common document types (PDF/DOC/DOCX) for resumes
    const isImage = file.type.startsWith('image/')
    const isDoc = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
    if (!isImage && !isDoc) {
      return NextResponse.json(
        { success: false, message: 'Unsupported file type' },
        { status: 400 }
      )
    }

    // Check file size (limit to 10MB for docs, 5MB for images)
    if (file.size > 5 * 1024 * 1024) {
      if (!(isDoc && file.size <= 10 * 1024 * 1024)) {
      return NextResponse.json(
        { success: false, message: 'File too large' },
        { status: 400 }
      );
      }
    }
    
    try {
      // Convert file to base64 for Cloudinary upload
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Data = buffer.toString('base64');
      
      // Add file type prefix for Cloudinary
      const fileType = file.type.split('/')[1];
      const base64FileData = `data:${file.type};base64,${base64Data}`;
      
      // Upload to Cloudinary (use raw for non-images)
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          base64FileData, 
          {
            folder: isImage ? 'perrin-articles' : 'perrin-applications',
            resource_type: 'auto',
            use_filename: true,
            unique_filename: true,
          },
          (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });
      
      const resultAny = uploadResult as any
      const url = resultAny.secure_url as string
      return NextResponse.json({
        success: true,
        url,
        publicId: resultAny.public_id,
        resourceType: resultAny.resource_type,
        format: resultAny.format,
      });
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return NextResponse.json(
        { success: false, message: 'Error uploading image' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing upload' },
      { status: 500 }
    );
  }
}
