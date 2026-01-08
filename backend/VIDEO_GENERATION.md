# Video Generation System Documentation

## Overview

This document describes the implementation of Step 2 (Video Generation Contract) and Step 3 (Async Job System) for the AI video generation platform.

## Architecture

### Clean Architecture Structure

```
backend/
├── models/
│   └── VideoJob.js          # MongoDB model for video jobs
├── controllers/
│   └── videoController.js   # Business logic for video operations
├── routes/
│   └── videoRoutes.js       # API route definitions
├── middleware/
│   └── authMiddleware.js    # Authentication middleware
└── workers/
    └── videoWorker.js       # Background job processor
```

## API Endpoints

### 1. Generate Video Job

**POST** `/api/videos/generate`

**Authentication:** Required (cookie-based)

**Request Body:**
```json
{
  "prompt": "fun science brain animation",
  "style": "fun",
  "duration": 8,
  "aspectRatio": "16:9"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "jobId": "abc123",
    "status": "queued"
  }
}
```

**Validation:**
- `prompt`: Required, string, max 1000 characters
- `style`: Required, must be one of: "fun", "calm", "background"
- `duration`: Required, number between 1-60 seconds
- `aspectRatio`: Required, must be one of: "16:9", "9:16", "1:1", "4:3"

### 2. Get Job Status

**GET** `/api/videos/:jobId`

**Authentication:** Required (cookie-based)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "jobId": "abc123",
    "status": "processing",
    "videoUrl": null,
    "errorMessage": null,
    "prompt": "fun science brain animation",
    "style": "fun",
    "duration": 8,
    "aspectRatio": "16:9",
    "createdAt": "2026-01-08T10:00:00.000Z",
    "updatedAt": "2026-01-08T10:00:05.000Z"
  }
}
```

**Status Values:**
- `queued`: Job created, waiting to be processed
- `processing`: Job is currently being processed
- `completed`: Job completed successfully (videoUrl available)
- `failed`: Job failed (errorMessage available)

## Database Model

### VideoJob Schema

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  prompt: String (required, max 1000 chars),
  style: String (enum: ["fun", "calm", "background"]),
  duration: Number (1-60 seconds),
  aspectRatio: String (enum: ["16:9", "9:16", "1:1", "4:3"]),
  status: String (enum: ["queued", "processing", "completed", "failed"]),
  videoUrl: String (nullable),
  errorMessage: String (nullable),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `{ status: 1, createdAt: 1 }` - For efficient job polling
- `{ userId: 1 }` - For user-specific queries

## Background Worker

### VideoWorker Class

The worker runs as an in-process background service:

- **Polling Interval:** 5 seconds
- **Processing:** One job at a time (sequential)
- **Lifecycle:**
  1. Polls database for oldest `queued` job
  2. Updates status to `processing`
  3. Simulates AI processing (3-8 second delay)
  4. Updates status to `completed` or `failed`
  5. Sets `videoUrl` or `errorMessage` accordingly

### Worker Lifecycle

```
Job Created (queued)
    ↓
Worker picks up job
    ↓
Status → processing
    ↓
[AI Processing - TODO: Replace with real API]
    ↓
Status → completed (with videoUrl)
    OR
Status → failed (with errorMessage)
```

## Security

### Authentication

- All video routes are protected by `authenticate` middleware
- Uses JWT token from HTTP-only cookie
- User must be logged in to create or view jobs

### Authorization

- Users can only access their own video jobs
- Job ownership verified by `userId` comparison
- Returns 403 if user tries to access another user's job

## Error Handling

### Validation Errors (400)
- Missing required fields
- Invalid enum values
- Out of range values

### Authentication Errors (401)
- Missing token
- Invalid token
- Expired token

### Authorization Errors (403)
- User trying to access another user's job

### Not Found Errors (404)
- Job ID doesn't exist

### Server Errors (500)
- Database errors
- Worker processing errors

## TODO: AI Integration Points

The following locations are marked with `TODO` comments for future AI provider integration:

1. **`workers/videoWorker.js`** - Line ~60
   ```javascript
   // TODO: Replace with real AI video generation API call
   // Example: await aiVideoService.generate(job.prompt, job.style, job.duration, job.aspectRatio)
   ```

2. **`workers/videoWorker.js`** - Line ~75
   ```javascript
   // TODO: Replace with actual video URL from AI service
   job.videoUrl = `https://mock-videos.eirthlink.com/videos/${job._id}.mp4`;
   ```

## Testing

### Manual Testing Flow

1. **Login** to get authentication cookie
2. **Create job:**
   ```bash
   POST /api/videos/generate
   {
     "prompt": "fun science brain animation",
     "style": "fun",
     "duration": 8,
     "aspectRatio": "16:9"
   }
   ```
3. **Check status:**
   ```bash
   GET /api/videos/{jobId}
   ```
4. **Wait 3-8 seconds** for worker to process
5. **Check status again** - should be `completed` or `failed`

## Future Enhancements

- [ ] Real AI video generation API integration
- [ ] WebSocket support for real-time status updates
- [ ] Job priority system
- [ ] Retry mechanism for failed jobs
- [ ] Job cancellation
- [ ] Batch job processing
- [ ] Rate limiting per user
- [ ] Video preview thumbnails
