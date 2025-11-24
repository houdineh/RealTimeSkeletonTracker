const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('output');
const canvasCtx = canvasElement.getContext('2d');
const cameraSelect = document.getElementById('cameraSelect');
let currentStream = null;

// All skeleton connections
const POSE_CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],
  [9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],
  [12,14],[14,16],[16,18],[16,20],[16,22],
  [18,20],[11,23],[12,24],[23,24],[23,25],[24,26],
  [25,27],[26,28],[27,29],[28,30],[29,31],[30,32]
];

// MediaPipe Pose setup
const pose = new Pose({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5/${file}`;
}});
pose.setOptions({
  modelComplexity: 2,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

// Draw skeleton
function drawFullSkeleton(lm, ctx, width, height) {
  POSE_CONNECTIONS.forEach(conn => {
    const [startIdx, endIdx] = conn;
    const start = {x: lm[startIdx].x * width, y: lm[startIdx].y * height};
    const end = {x: lm[endIdx].x * width, y: lm[endIdx].y * height};
    ctx.strokeStyle = 'cyan';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  });

  lm.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x * width, point.y * height, 4, 0, 2*Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  });
}

// Handle MediaPipe results
pose.onResults(results => {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.poseLandmarks) {
    drawFullSkeleton(results.poseLandmarks, canvasCtx, canvasElement.width, canvasElement.height);
  }
  canvasCtx.restore();
});

// Send frames continuously
async function detectPose() {
  if (videoElement.readyState >= 2) {
    await pose.send({image: videoElement});
  }
  requestAnimationFrame(detectPose);
}

// Start webcam
async function startCamera(deviceId) {
  if (currentStream) currentStream.getTracks().forEach(track => track.stop());
  const constraints = { video: deviceId ? { deviceId: { exact: deviceId } } : true };
  currentStream = await navigator.mediaDevices.getUserMedia(constraints);
  videoElement.srcObject = currentStream;
}

// Populate camera dropdown
async function getCameras() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(d => d.kind === 'videoinput');
  cameraSelect.innerHTML = '';
  videoDevices.forEach((device, index) => {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.text = device.label || `Camera ${index + 1}`;
    cameraSelect.appendChild(option);
  });
}

// Camera selection change
cameraSelect.onchange = () => startCamera(cameraSelect.value);

// Initialize
async function init() {
  await getCameras();
  startCamera(cameraSelect.value);
  videoElement.onloadeddata = () => detectPose();
}

init();
