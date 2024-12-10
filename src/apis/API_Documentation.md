# Video Platform API Documentation

This API provides functionality for a video platform with features including video management, sectioning, commenting, gallery management, and user interactions.

## Core Features

- Video Management
- Section Management 
- Comment System with Replies
- Gallery System
- User Management
- Interaction System (Claps)
- Notification System

## API Structure

### Video Management (`/apis/videos.ts`)

```typescript
interface VideoData {
  id: string;
  title: string; 
  description: string;
  clap: number;
}
```

**Key Functions:**
- `createVideo(videoData: VideoData)`: Create a new video
- `getAllVideos()`: Retrieve all videos
- `getVideoById(videoId: string)`: Get specific video
- `clapVideo(videoId: string)`: Increment video claps

### Section Management (`/apis/sections.ts`)

```typescript
interface SectionData {
  id: string;
  sectionName: string;
  startTime: number;
  endTime: number;
}
```

**Key Functions:**
- `addSection(videoId: string, sectionData: SectionData)`: Add new section
- `getSections(videoId: string)`: Get all sections for a video

### Comment System (`/apis/comments.ts`)

Supports threaded comments with replies and interactions.

**Key Features:**
- Nested replies
- Clap system
- Comment tagging
- Pin/unpin replies

**Main Functions:**
- `addComment()`: Add new comment
- `addReply()`: Add reply to comment
- `getComments()`: Get all comments with replies
- `clapComment()/clapReply()`: Interact with comments
- `toggleReplyPin()`: Pin/unpin replies

### Gallery System (`/apis/gallery.ts`)

```typescript
interface GalleryImage {
  id?: string;
  userId: string;
  imageUrl: string;
  timestamp: Date;
  clap: number;
  clappedBy: string[];
}
```

**Key Functions:**
- `addGalleryImage()`: Add image to section gallery
- `getGalleryImages()`: Get all images in gallery
- `clapGalleryImage()`: Interact with gallery images
- `uploadImage()`: Handle image uploads

### User Management (`/apis/users.ts`)

```typescript
interface UserDto {
  userId: string;
  email: string;
  profilePicture?: string;
}
```

**Key Functions:**
- `createUser(userData: UserDto)`: Create new user
- `getUser(userId: string)`: Get user details

## Firebase Integration

This API is built on Firebase and utilizes:
- Firestore for data storage
- Firebase Storage for image uploads
- Firebase Authentication for user management

## Usage Examples

### Adding a Comment
```typescript
const commentData = {
  userId: 'user123',
  content: 'Great video!',
  timestamp: new Date(),
  clap: 0,
  clappedBy: []
};

await addComment(videoId, sectionId, commentData);
```

### Adding an Image to Gallery
```typescript
const imageData = {
  userId: 'user123',
  imageUrl: 'https://example.com/image.jpg',
  timestamp: new Date(),
  clap: 0,
  clappedBy: []
};

await addGalleryImage(videoId, sectionId, imageData);
```

## Error Handling

All functions include error handling and logging. Errors are caught and logged to console with descriptive messages.

## Best Practices

1. Always check for user authentication before performing operations
2. Handle errors appropriately in the frontend
3. Validate input data before making API calls
4. Use appropriate security rules in Firebase

## Dependencies

- Firebase/Firestore
- Firebase Storage
- Firebase Authentication

## Setup

1. Configure Firebase in your project
2. Set up appropriate Firebase security rules
3. Initialize Firebase with your config
4. Import required functions from API modules
