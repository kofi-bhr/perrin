# Cloudinary Setup for Perrin Institution

## Why Cloudinary?
Cloudinary provides persistent image storage and delivers images through a global CDN, which is ideal for production use on serverless platforms like Netlify.

## Step 1: Create a Cloudinary Account

1. Go to [Cloudinary's website](https://cloudinary.com/users/register/free) and sign up for a free account
2. The free tier includes:
   - 25GB storage
   - 25GB monthly bandwidth
   - 25,000 transformations per month
   - No credit card required

## Step 2: Get Your Credentials

After signing up:

1. Log in to your Cloudinary dashboard
2. Look for the "Account Details" section
3. You'll need three values:
   - **Cloud name**: Usually a word you chose during registration
   - **API Key**: A long string of characters
   - **API Secret**: A private key you should keep secure

## Step 3: Configure Environment Variables

### For Local Development

Create a `.env.local` file in your project root:

```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### For Netlify Deployment

1. Go to your Netlify site settings
2. Navigate to "Build & deploy" > "Environment variables"
3. Add the following variables:
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

## Step 4: Install Cloudinary Package

```bash
npm install cloudinary
```

## Step 5: Test Upload Functionality

1. Deploy your site to Netlify
2. Try uploading an image through the admin dashboard
3. The image should persist across deployments and server restarts

## Image Management

- Images uploaded to Cloudinary will be stored in the `perrin-articles` folder
- You can manage, organize, and optimize these images through the Cloudinary dashboard
- Cloudinary automatically delivers images through their global CDN for fast loading worldwide 