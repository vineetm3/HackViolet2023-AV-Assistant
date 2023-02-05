//All hand-tracking related logic
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import { useEffect, useState, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
/*global chrome*/
let globArr = [];

const Tracking = (props) => {
  const [time, setTime] = useState(Date.now());
  const {speak, cancel} = useSpeechSynthesis();

  const startCamera = async () => {
    // Load the MediaPipe handpose model assets.
    const model = await handpose.load();

    // Pass in a video stream to the model to obtain
    // a prediction from the MediaPipe graph.
    //const video = document.querySelector("input_video");
    const hands = await model.estimateHands(props.videoElement.current);
    //console.log(hands);

    // Each hand object contains a `landmarks` property,
    // which is an array of 21 3-D landmarks.
    //hands.forEach(hand => console.log(hand.annotations));
    console.log(hands);
    hands.forEach((hand) => (dataAnalysis(hand.annotations)));
  };

  const dataAnalysis = (mano) => {
    console.log(mano);
    let indexX = mano.indexFinger[0][0];
    let middleX = mano.middleFinger[0][0];
    let ringX = mano.ringFinger[0][0];
    let pinkyX = mano.pinky[0][0];
    let thumbX = mano.thumb[0][0];

    let arr = [indexX, middleX, ringX, pinkyX, thumbX];
    globArr.push(indexX - thumbX);
    if (globArr.length === 5) {
      let sum = 0;
      for (let i = 0; i < 5; i++) {
        sum += globArr[i];
      }
      globArr = []
      if (sum / 5 < 3) {
        console.log("this is a test");
        tts();
        return true;
      }
      if (sum / 5 > 10) {
        cancel();
      }
      sum = 0;
    }
    console.log("fail")
    return false;
  };

  const tts = () => {
    HTMLtoReadableText(DOMtoString());
  }

  const HTMLtoReadableText = (allHTML) => {
    //const temp = allHTML;
    const output = [];
    const tags = [/(<p\b([^>]*)>|<\/p>)/g];
    for (let i = 0; i < tags.length; i++) {
      let tempTagString = "";
      let replaced = allHTML.replaceAll(tags[i], "TAG_WAS_HERE_REPLACED");
      let replacedArr = replaced.split("TAG_WAS_HERE_REPLACED");
      console.log(replacedArr);
      for (let i = 0; i < replacedArr.length; i++) {
        if (i % 2 === 1) {
          tempTagString = tempTagString + replacedArr[i];
        }
      }
      output.push(tempTagString);
    }
    speak({text: output[0]});
    console.log(output);
  };

  const DOMtoString = (selector) => {
    if (selector) {
      selector = document.querySelector(selector);
      if (!selector) return "ERROR: querySelector failed to find node";
    } else {
      selector = document.documentElement;
    }
    console.log("" + selector.outerHTML);
    return selector.outerHTML;
  };

  useEffect(() => {
    startCamera();
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default Tracking;
