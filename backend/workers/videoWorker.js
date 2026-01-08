import VideoJob from "../models/VideoJob.js";

/**
 * Background worker for processing video generation jobs
 * Polls database for queued jobs and processes them asynchronously
 */
class VideoWorker {
  constructor() {
    this.isProcessing = false;
    this.intervalId = null;
    this.pollInterval = 5000; // Poll every 5 seconds
  }

  /**
   * Start the worker
   */
  start() {
    console.log("🎬 Video worker started");
    this.intervalId = setInterval(() => {
      this.processNextJob();
    }, this.pollInterval);
  }

  /**
   * Stop the worker
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("🛑 Video worker stopped");
    }
  }

  /**
   * Process the next queued job
   */
  async processNextJob() {
    // Skip if already processing a job
    if (this.isProcessing) {
      return;
    }

    try {
      // Find the oldest queued job
      const job = await VideoJob.findOne({ status: "queued" })
        .sort({ createdAt: 1 })
        .exec();

      if (!job) {
        // No jobs to process
        return;
      }

      this.isProcessing = true;
      console.log(`📹 Processing job ${job._id}: "${job.prompt}"`);

      // Update status to processing
      job.status = "processing";
      await job.save();

      // Process the job (async, don't await)
      this.processJob(job);
    } catch (error) {
      console.error("Error in video worker:", error);
      this.isProcessing = false;
    }
  }

  /**
   * Process a single video job
   * @param {Object} job - VideoJob document
   */
  async processJob(job) {
    try {
      // TODO: Replace with real AI video generation API call
      // Example: await aiVideoService.generate(job.prompt, job.style, job.duration, job.aspectRatio)
      
      // Mock processing delay (simulating AI video generation)
      const processingTime = Math.random() * 5000 + 3000; // 3-8 seconds
      await new Promise((resolve) => setTimeout(resolve, processingTime));

      // Simulate occasional failures (5% failure rate for testing)
      const shouldFail = Math.random() < 0.05;

      if (shouldFail) {
        // Mark as failed
        job.status = "failed";
        job.errorMessage = "Mock error: Video generation failed. Please try again.";
        await job.save();
        console.log(`❌ Job ${job._id} failed`);
      } else {
        // Mark as completed with mock video URL
        job.status = "completed";
        // TODO: Replace with actual video URL from AI service
        job.videoUrl = `https://mock-videos.eirthlink.com/videos/${job._id}.mp4`;
        await job.save();
        console.log(`✅ Job ${job._id} completed: ${job.videoUrl}`);
      }
    } catch (error) {
      console.error(`Error processing job ${job._id}:`, error);
      
      // Mark job as failed
      try {
        job.status = "failed";
        job.errorMessage = error.message || "Unknown error occurred during video generation";
        await job.save();
      } catch (saveError) {
        console.error("Error saving failed job:", saveError);
      }
    } finally {
      this.isProcessing = false;
    }
  }
}

// Create singleton instance
const videoWorker = new VideoWorker();

export default videoWorker;
