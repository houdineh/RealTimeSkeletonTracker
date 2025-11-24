Skeleton Tracker (Webcam + Optional Phone)

Real-time skeleton tracker using your PC webcam (phone optional). It detects head, neck, torso, arms, hands, legs, and feet, drawing connected cyan lines and red landmarks. Fully browser-based, with selectable webcams, smooth tracking, and lightweight performance.

The tracker provides real-time skeleton detection directly in the browser, showing red landmarks with cyan lines connecting joints. You can select any connected PC webcam, and optionally use a phone camera via virtual webcam or IP camera. It is lightweight, easy to run, and requires no extra hardware.

Installation

Clone this repository:

git clone https://github.com/houdineh/RealTimeSkeletonTracker.git
cd RealTimeSkeletonTracker


Open index.html in a browser (Chrome/Edge recommended).

Allow camera access when prompted.

Usage

Open the tracker in your browser and select your PC webcam from the dropdown. Optionally, you can use a phone camera via virtual webcam or IP camera. The video feed will appear with the fully connected skeleton overlay in real time.

File Structure

The project includes:

index.html — Main HTML file.

style.css — Styles for layout and design.

script.js — JavaScript for skeleton detection.

README.md — Project description and instructions.

Dependencies

The tracker relies on MediaPipe Pose
 via CDN and a modern browser with camera support (Chrome or Edge recommended).

Screenshots
https://i.postimg.cc/Mn9NCj8R/Screenshot-2025-11-24-140450.png

License

MIT License. Free to use for personal and educational purposes.
