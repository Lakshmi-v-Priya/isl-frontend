import { useEffect, useRef } from "react";
import { sendMessage } from "../services/websocket";

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(() => {
        alert("Camera access denied");
      });
  }, []);

  // Capture frame every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      captureFrame();
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");

    // Send to backend
    sendMessage(
  JSON.stringify({
    frame: imageData,
    language: language
  })
);

  };

  return (
    <div>
      <h3>Live Camera</h3>
      <video ref={videoRef} autoPlay width="400" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default Camera;
