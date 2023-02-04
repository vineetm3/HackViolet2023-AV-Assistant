//All hand-tracking related logic
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import { useEffect } from "react";

const Tracking = () => {
  const tracking = async () => {
    // Load the MediaPipe handpose model assets.
    
    const model = await handpose.load();
    // Pass in a video stream to the model to obtain
    // a prediction from the MediaPipe graph.
    const video = document.querySelector("#videoElement");
    const hands = await model.estimateHands(video);
    console.log(hands);
    // Each hand object contains a `landmarks` property,
    // which is an array of 21 3-D landmarks.
    hands.forEach((hand) => console.log(hand.landmarks));
  };

  useEffect(() => {
    tracking();
  });

  return null;
};

export default Tracking;
