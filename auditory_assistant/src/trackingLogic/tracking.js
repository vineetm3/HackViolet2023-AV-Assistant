//All hand-tracking related logic
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import { useEffect, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { } from "@mediapipe/control_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Hands, HAND_CONNECTIONS, HandsConfig } from "@mediapipe/hands";

const Tracking = () => {
  const videoElement = document.getElementById("input_video");
  const canvasElement = document.getElementById("output_canvas");
  const canvasCtx = canvasElement.getContext("2d");
  const [time, setTime] = useState(Date.now());
  

  const startCamera = async () => {
    // Load the MediaPipe handpose model assets.
    const model = await handpose.load();

    // Pass in a video stream to the model to obtain 
    // a prediction from the MediaPipe graph.
    //const video = document.querySelector("input_video");
    const hands = await model.estimateHands(videoElement);
    console.log(hands);

    // Each hand object contains a `landmarks` property,
    // which is an array of 21 3-D landmarks.
    hands.forEach(hand => console.log(hand.landmarks));
  }

  useEffect(() => {
    startCamera();
  }, [time]);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          videoElement.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong!");
        });
    }
    const interval = setInterval(() => setTime(Date.now()), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default Tracking;
