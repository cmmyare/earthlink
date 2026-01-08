import VideoJob from "../models/VideoJob.js";

export const generateVideo = async (req, res) => {
  try {
    const { prompt, style, duration, aspectRatio } = req.body;
    const userId = req.user._id;

    // Validation
    if (!prompt || !style || !duration || !aspectRatio) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: prompt, style, duration, aspectRatio"
      });
    }

    // Validate style
    const validStyles = ["fun", "calm", "background"];
    if (!validStyles.includes(style)) {
      return res.status(400).json({
        success: false,
        message: `Style must be one of: ${validStyles.join(", ")}`
      });
    }

    // Validate aspect ratio
    const validAspectRatios = ["16:9", "9:16", "1:1", "4:3"];
    if (!validAspectRatios.includes(aspectRatio)) {
      return res.status(400).json({
        success: false,
        message: `Aspect ratio must be one of: ${validAspectRatios.join(", ")}`
      });
    }

    // Validate duration
    if (typeof duration !== "number" || duration < 1 || duration > 60) {
      return res.status(400).json({
        success: false,
        message: "Duration must be a number between 1 and 60 seconds"
      });
    }

    // Create video job
    const videoJob = await VideoJob.create({
      userId,
      prompt: prompt.trim(),
      style,
      duration,
      aspectRatio,
      status: "queued"
    });

    res.status(201).json({
      success: true,
      data: {
        jobId: videoJob._id.toString(),
        status: videoJob.status
      }
    });
  } catch (error) {
    console.error("Generate video error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating video job",
      error: error.message
    });
  }
};


export const getVideoJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    // Validate jobId format
    if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID format"
      });
    }

    // Find job and verify ownership
    const videoJob = await VideoJob.findById(jobId);

    if (!videoJob) {
      return res.status(404).json({
        success: false,
        message: "Video job not found"
      });
    }

    // Check if job belongs to authenticated user
    if (videoJob.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied. This job does not belong to you."
      });
    }

    // Return job status
    res.status(200).json({
      success: true,
      data: {
        jobId: videoJob._id.toString(),
        status: videoJob.status,
        videoUrl: videoJob.videoUrl,
        errorMessage: videoJob.errorMessage,
        prompt: videoJob.prompt,
        style: videoJob.style,
        duration: videoJob.duration,
        aspectRatio: videoJob.aspectRatio,
        createdAt: videoJob.createdAt,
        updatedAt: videoJob.updatedAt
      }
    });
  } catch (error) {
    console.error("Get video job status error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching video job status",
      error: error.message
    });
  }
};
