# Firebase Video Sharing Application API Documentation

## Table of Contents
- [Video Management](#video-management)
- [Section Management](#section-management) 
- [Comment Management](#comment-management)
- [Reply Management](#reply-management)
- [User Management](#user-management)

## Video Management

### Video Data Interface
```typescript
interface VideoData {
  videoUrl: string;
  title: string; 
  description: string;
  userId: string;
  clap: number;
}
```

### Create Video
Creates a new video entry in the database.

**Function:** `createVideo(videoData: VideoData)`
- **Parameters:** VideoData object
- **Returns:** Promise with the encoded video URL as ID
- **Error Handling:** Throws error if creation fails

### Get All Videos 
Retrieves all videos from the database.

**Function:** `getAllVideos()`
- **Returns:** Promise with array of video objects including IDs
- **Error Handling:** Throws error if retrieval fails

### Get Video by URL
Retrieves a specific video using its URL.

**Function:** `getVideoByUrl(videoUrl: string)`
- **Parameters:** Video URL string
- **Returns:** Promise with video object if found
- **Error Handling:** Throws error if video not found or retrieval fails

### Clap Video
Increments the clap count for a video.

**Function:** `clapVideo(videoUrl: string)`
- **Parameters:** Video URL string
- **Error Handling:** Throws error if video not found or update fails

## Section Management

### Section Data Interface
```typescript
interface SectionData {
  sectionName: string;
  startTime: number;
  endTime: number;
}
```

### Add Section
Adds a new section to a video.

**Function:** `addSection(videoUrl: string, sectionData: SectionData)`
- **Parameters:**
  - videoUrl: Video URL string
  - sectionData: SectionData object
- **Returns:** Promise with section ID
- **Error Handling:** Throws error if addition fails

### Get Sections
Retrieves all sections for a video.

**Function:** `getSections(videoUrl: string)`
- **Parameters:** Video URL string
- **Returns:** Promise with array of section objects
- **Error Handling:** Throws error if retrieval fails

## Comment Management

### Comment Data Interface
```typescript
interface CommentData {
  content: string;
  userId: string;
  timestamp: Date;
  clap: number;
  img?: string; // Optional comment image URL
}
```

### Add Comment
Adds a comment to a section.

**Function:** `addComment(videoUrl: string, sectionId: string, commentData: CommentData)`
- **Parameters:**
  - videoUrl: Video URL string
  - sectionId: Section ID string
  - commentData: CommentData object
- **Returns:** Promise with comment ID
- **Error Handling:** Throws error if addition fails

### Get Comments
Retrieves all comments for a section.

**Function:** `getComments(videoUrl: string, sectionId: string)`
- **Parameters:**
  - videoUrl: Video URL string
  - sectionId: Section ID string
- **Returns:** Promise with array of comment objects
- **Error Handling:** Throws error if retrieval fails

### Clap Comment
Increments the clap count for a comment.

**Function:** `clapComment(videoUrl: string, sectionId: string, commentId: string)`
- **Parameters:**
  - videoUrl: Video URL string
  - sectionId: Section ID string
  - commentId: Comment ID string
- **Error Handling:** Throws error if comment not found or update fails

## Reply Management

### Add Reply
Adds a reply to a comment.

**Function:** `addReply(videoUrl: string, sectionId: string, commentId: string, replyData: CommentData)`
- **Parameters:**
  - videoUrl: Video URL string
  - sectionId: Section ID string
  - commentId: Comment ID string
  - replyData: CommentData object
- **Returns:** Promise with reply ID
- **Error Handling:** Throws error if addition fails

### Get Replies
Retrieves all replies for a comment.

**Function:** `getReplies(videoUrl: string, sectionId: string, commentId: string)`
- **Parameters:**
  - videoUrl: Video URL string
  - sectionId: Section ID string
  - commentId: Comment ID string
- **Returns:** Promise with array of reply objects
- **Error Handling:** Throws error if retrieval fails

### Clap Reply
Increments the clap count for a reply.

**Function:** `clapReply(videoUrl: string, sectionId: string, commentId: string, replyId: string)`
- **Parameters:**
  - videoUrl: Video URL string
  - sectionId: Section ID string
  - commentId: Comment ID string
  - replyId: Reply ID string
- **Error Handling:** Throws error if reply not found or update fails

## User Management

### User Data Interface
```typescript
interface UserData {
  userId: string;
  email: string;
  profilePicture: string;
}
```

### Create User
Creates a new user profile.

**Function:** `createUser(userData: UserData)`
- **Parameters:** UserData object
- **Returns:** Promise with user ID
- **Error Handling:** Throws error if creation fails

### Get User
Retrieves user profile by ID.

**Function:** `getUser(userId: string)`
- **Parameters:** User ID string
- **Returns:** Promise with user object if found
- **Error Handling:** Throws error if user not found or retrieval fails

## Error Handling
All functions include error handling and will:
1. Log errors to console
2. Throw appropriate error messages
3. Return meaningful error information to the client

## Best Practices
1. Always handle promises with try/catch blocks
2. Validate input data before making API calls
3. Check for existence of referenced documents
4. Handle loading and error states in UI
5. Implement proper error feedback to users