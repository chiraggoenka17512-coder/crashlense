const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const brainDir = 'C:\\Users\\Chirag\\.gemini\\antigravity-ide\\brain\\2dded430-7599-49a4-934f-9b2cebb12dcd';
const userUploadedDir = path.join(brainDir, '.user_uploaded');
const videoPath = path.join(brainDir, 'crashlens_full_demo_1792924049646.webp');

const workDir = path.join(__dirname, '..', 'public', 'video_work');
if (!fs.existsSync(workDir)) {
  fs.mkdirSync(workDir, { recursive: true });
}

// 1. Map the 5 uploaded audio files
// uploaded_media_4: Welcome to CrashLens (10.20s)
// uploaded_media_0: Now let's launch (8.70s)
// uploaded_media_1: On the Overview tab (7.62s)
// uploaded_media_2: CrashLens isn't limited (6.06s)
// uploaded_media_3: For AI tasks (9.54s)

const a1 = path.join(userUploadedDir, 'uploaded_media_4_1792925326016.img');
const a2 = path.join(userUploadedDir, 'uploaded_media_0_1792925326016.img');
const a3 = path.join(userUploadedDir, 'uploaded_media_1_1792925326016.img');
const a4 = path.join(userUploadedDir, 'uploaded_media_2_1792925326016.img');
const a5 = path.join(userUploadedDir, 'uploaded_media_3_1792925326016.img');

fs.copyFileSync(a1, path.join(workDir, 'audio_1.webm'));
fs.copyFileSync(a2, path.join(workDir, 'audio_2.webm'));
fs.copyFileSync(a3, path.join(workDir, 'audio_3.webm'));
fs.copyFileSync(a4, path.join(workDir, 'audio_4.webm'));
fs.copyFileSync(a5, path.join(workDir, 'audio_5.webm'));

console.log('Audio files copied to video_work.');

// Output paths
const outputMp4 = path.join(__dirname, '..', 'public', 'crashlens_demo_final.mp4');
const artifactMp4 = path.join(brainDir, 'crashlens_demo_final.mp4');

// Construct FFmpeg complex filter command
// Video pts scaling factor: 24.9s * 1.85 = ~46.0s
// Audio delays:
// [1:a] adelay=0|0
// [2:a] adelay=11000|11000
// [3:a] adelay=20300|20300
// [4:a] adelay=28600|28600
// [5:a] adelay=35300|35300
// Total mixed audio = ~45.5s

const ffmpegCmd = [
  'ffmpeg -y',
  `-i "${videoPath}"`,
  `-i "${path.join(workDir, 'audio_1.webm')}"`,
  `-i "${path.join(workDir, 'audio_2.webm')}"`,
  `-i "${path.join(workDir, 'audio_3.webm')}"`,
  `-i "${path.join(workDir, 'audio_4.webm')}"`,
  `-i "${path.join(workDir, 'audio_5.webm')}"`,
  '-filter_complex "' +
    '[0:v]setpts=1.85*PTS,fps=30,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p[v];' +
    '[1:a]adelay=0|0,volume=1.8[a1];' +
    '[2:a]adelay=11000|11000,volume=1.8[a2];' +
    '[3:a]adelay=20300|20300,volume=1.8[a3];' +
    '[4:a]adelay=28600|28600,volume=1.8[a4];' +
    '[5:a]adelay=35300|35300,volume=1.8[a5];' +
    '[a1][a2][a3][a4][a5]amix=inputs=5:duration=longest:dropout_transition=2:normalize=0,volume=1.5,alimiter=limit=0.95[aout]"',
  '-map "[v]"',
  '-map "[aout]"',
  '-c:v libx264 -preset fast -crf 19',
  '-c:a aac -b:a 192k -ar 48000',
  '-shortest',
  `"${outputMp4}"`
].join(' ');

console.log('Running FFmpeg build command...');
console.log(ffmpegCmd);

try {
  execSync(ffmpegCmd, { stdio: 'inherit' });
  console.log('Video compiled successfully to ' + outputMp4);
  fs.copyFileSync(outputMp4, artifactMp4);
  console.log('Copied to artifacts directory: ' + artifactMp4);
} catch (err) {
  console.error('Error during ffmpeg compile:', err);
  process.exit(1);
}
