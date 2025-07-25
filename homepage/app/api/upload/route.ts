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
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'Please upload an image file' },
        { status: 400 }
      );
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }
    
    try {
      // Convert file to base64 for Cloudinary upload
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Data = buffer.toString('base64');
      
      // Add file type prefix for Cloudinary
      const fileType = file.type.split('/')[1];
      const base64FileData = `data:${file.type};base64,${base64Data}`;
      
      // Upload to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          base64FileData, 
          {
            folder: 'perrin-articles',
            resource_type: 'image',
          },
          (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });
      
      // Return the Cloudinary URL
      return NextResponse.json({
        success: true,
        url: (uploadResult as any).secure_url,
        publicId: (uploadResult as any).public_id
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
