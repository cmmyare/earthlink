import mongoose from "mongoose";

const videoJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
      trim: true,
      maxlength: [1000, "Prompt cannot exceed 1000 characters"]
    },
    style: {
      type: String,
      required: [true, "Style is required"],
      enum: {
        values: ["fun", "calm", "background"],
        message: "Style must be one of: fun, calm, background"
      }
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 second"],
      max: [60, "Duration cannot exceed 60 seconds"]
    },
    aspectRatio: {
      type: String,
      required: [true, "Aspect ratio is required"],
      enum: {
        values: ["16:9", "9:16", "1:1", "4:3"],
        message: "Aspect ratio must be one of: 16:9, 9:16, 1:1, 4:3"
      }
    },
    status: {
      type: String,
      enum: ["queued", "processing", "completed", "failed"],
      default: "queued",
      index: true
    },
    videoUrl: {
      type: String,
      default: null,
      trim: true
    },
    errorMessage: {
      type: String,
      default: null,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Index for efficient querying of queued jobs
videoJobSchema.index({ status: 1, createdAt: 1 });

const VideoJob = mongoose.model("VideoJob", videoJobSchema);

export default VideoJob;
