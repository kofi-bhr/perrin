# Perrin Institute News Management System

## Overview

The Perrin Institute News Management System is a comprehensive solution for publishing and managing news articles and opinion pieces. It provides a rich text editing experience for content creation, supports various media formats, and delivers a professional reading experience to users.

## Features

- **Article Management**
  - Create, edit, and publish news articles and opinion pieces
  - Rich text editing with support for formatting, images, and multimedia
  - Category-based organization
  - Featured article highlighting

- **User Experience**
  - Responsive design for all devices
  - Category filtering
  - Related articles recommendations
  - Social sharing capabilities

## Technical Architecture

### Key Components

1. **Article Storage**
   - MongoDB database for article persistence
   - Articles include rich content, metadata, and media references

2. **Admin Interface**
   - Secure dashboard for content management
   - ReactQuill integration for WYSIWYG editing
   - Image upload and management

3. **API Endpoints**
   - RESTful API for article operations
   - GET /api/articles - List all articles
   - GET /api/articles/[id] - Get specific article
   - POST /api/articles - Create new article
   - PUT /api/articles/[id] - Update existing article

4. **Frontend Rendering**
   - Next.js pages for article display
   - Advanced typography and styling
   - Responsive layout system

## Rich Text Formatting

The system supports the following rich text formatting elements:

- Headings (H1-H6)
- Paragraph text
- Bold, italic, and underlined text
- Ordered and unordered lists
- Blockquotes
- Code blocks
- Hyperlinks
- Images
- Video embeds

### HTML Processing

When articles are displayed, the HTML content is processed to enhance typography and maintain consistent styling across the site. The processing includes:

1. Adding appropriate CSS classes to HTML elements
2. Ensuring responsive image handling
3. Maintaining semantic structure
4. Applying consistent typography rules

## Development Guidelines

### Adding New Features

When adding new features to the news system:

1. Maintain consistent styling with the existing UI
2. Ensure responsive behavior across device sizes
3. Add appropriate TypeScript types for new components
4. Update both admin and public-facing components as needed

### Content Security

The system includes basic sanitization for user-generated content:
- Script tag removal
- Iframe and object element removal
- Input validation for all fields
- Proper HTML escaping

## Troubleshooting

Common issues and solutions:

1. **Rich text formatting not displaying correctly**
   - Ensure the `formats` array in ReactQuill configuration matches the HTML processing in `[id]/page.tsx`
   - Stick to standard Quill formats to avoid compatibility issues
   - Avoid adding custom Quill modules without proper TypeScript declarations

2. **Images not displaying**
   - Verify image paths are correct
   - Check image upload functionality in the admin dashboard

3. **API error handling**
   - API endpoints include detailed error messages to assist with debugging
   - Check browser console for error details

4. **ReactQuill Editor Issues**
   - Keep Quill module configuration simple to avoid "moduleClass is not a constructor" errors
   - Only use standard modules that are part of the default Quill distribution
   - Test formatting options thoroughly after any configuration changes 