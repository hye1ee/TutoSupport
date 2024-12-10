# Firebase Application API Documentation

## Table of Contents
- [Authentication](#authentication)
- [User Management](#user-management)
- [Video Management](#video-management)
- [Section Management](#section-management)
- [Comment System](#comment-system)
- [Notification System](#notification-system)
- [Image Upload](#image-upload)

## Authentication

### Google Sign-In
```typescript
import { signInWithGoogle, logOut, getCurrentUser } from './services/auth';
```

#### Functions
- `signInWithGoogle()`: Initiates Google sign-in popup
  - Returns: Promise<UserCredential>
- `logOut()`: Signs out current user
- `getCurrentUser()`: Returns current authenticated user or null

## User Management

### Interfaces
```typescript
interface UserData {
  userId: string;
  email: string;
  profilePicture: string;
}
```

### Functions
- `createUser(userData: UserData)`: Creates/updates user in Firestore
- `getUser(userId: string)`: Retrieves user data

## Video Management

### Interfaces
```typescript
interface VideoData {
  videoUrl: string;
  title: string;
  description: string;
  userId: string;
  clap: number;
}

interface Video extends VideoData {
  id: string;
}
```

### Functions
- `createVideo(videoData: VideoData)`: Creates new video entry
- `getAllVideos()`: Retrieves all videos
- `getVideoByUrl(videoUrl: string)`: Gets specific video
- `clapVideo(videoUrl: string)`: Increments video clap count

## Section Management

### Interfaces
```typescript
interface SectionData {
  sectionName: string;
  startTime: number;
  endTime: number;
}
```

### Functions
- `addSection(videoUrl: string, sectionData: SectionData)`: Creates new section
- `getSections(videoUrl: string)`: Gets all sections for a video

## Comment System

### Interfaces
```typescript
interface CommentData {
  content: string;
  userId: string;
  timestamp: Date;
  clap: number;
  img?: string;
  tag?: string;
  replies?: ReplyData[];
}

interface ReplyData extends CommentData {
  isPinned: boolean;
}
```

### Functions
#### Comments
- `addComment(videoUrl: string, sectionId: string, commentData: CommentData)`
- `getComments(videoUrl: string, sectionId: string)`
- `clapComment(videoUrl: string, sectionId: string, commentId: string)`

#### Replies
- `addReply(videoUrl, sectionId, commentId, replyData)`
- `toggleReplyPin(videoUrl, sectionId, commentId, replyId)`
- `clapReply(videoUrl, sectionId, commentId, replyId)`

## Notification System

### Interfaces
```typescript
interface Notification {
  userId: string;
  type: 'clap';
  sourceUserId: string;
  contentId: string;
  contentType: 'comment' | 'reply';
  timestamp: Date;
  isRead: boolean;
}
```

### Functions
- `createClapNotification(targetUserId, sourceUserId, contentId, contentType)`
- `getUserNotifications(userId: string)`

## Image Upload

### Functions
- `uploadImage(file: File, path: string)`: Uploads image to Firebase Storage
  - Returns: Promise<string> (download URL)

## Error Handling
All functions include error handling and will throw errors with appropriate messages. Always use try-catch blocks when calling these functions.

## Usage Examples

### Authentication
```typescript
// Sign in
try {
  const user = await signInWithGoogle();
  console.log('Signed in:', user);
} catch (error) {
  console.error('Sign in failed:', error);
}
```

### Adding a Comment with Image
```typescript
try {
  const imageUrl = await uploadImage(imageFile, 'comments/image.jpg');
  await addComment(videoUrl, sectionId, {
    content: 'Comment text',
    userId: getCurrentUser().uid,
    timestamp: new Date(),
    clap: 0,
    img: imageUrl
  });
} catch (error) {
  console.error('Error:', error);
}
```

### Getting User Notifications
```typescript
try {
  const notifications = await getUserNotifications(userId);
  console.log('Notifications:', notifications);
} catch (error) {
  console.error('Error:', error);
}
```
