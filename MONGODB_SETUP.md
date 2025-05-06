# MongoDB Atlas Setup for Perrin Institution

## MongoDB Atlas Setup

1. **Create a MongoDB Atlas account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account

2. **Create a new cluster**
   - Choose the free tier (Shared Cluster)
   - Select a cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region closest to your users
   - Click "Create Cluster" (this may take a few minutes)

3. **Set up database access**
   - In the sidebar, click "Database Access"
   - Click "Add New Database User"
   - Create a username and password (save these securely)
   - Set privileges to "Read and Write to Any Database"
   - Click "Add User"

4. **Set up network access**
   - In the sidebar, click "Network Access"
   - Click "Add IP Address"
   - For development, you can add your current IP
   - For production, click "Allow Access from Anywhere" (or better, add Netlify IP ranges)
   - Click "Confirm"

5. **Get your connection string**
   - Once your cluster is created, click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Replace `<dbname>` with `perrindb`

## Netlify Setup

1. **Set environment variables in Netlify**
   - Go to your site settings in Netlify
   - Navigate to "Build & deploy" > "Environment variables"
   - Add a new variable:
     - Key: `MONGODB_URI`
     - Value: Your MongoDB connection string (from step 5 above)

2. **Trigger a new deployment**
   - After setting the environment variable, trigger a new deployment
   - The application will initialize the database with default articles on first run

## Testing

After deploying, you should:

1. Visit your site at `<your-netlify-url>/api/init` to initialize the database
2. Try logging in to the admin panel and creating a new article
3. Verify the article appears on the news page

## Troubleshooting

If you encounter issues:

1. Check Netlify function logs for errors
2. Verify your MongoDB connection string is correct
3. Ensure the database user has proper permissions
4. Check that network access is properly configured 