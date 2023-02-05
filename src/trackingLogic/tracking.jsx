//All hand-tracking related logic
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import { useEffect, useState } from "react";
/*global chrome*/
let globArr = [];

const Tracking = () => {
  console.log("yo3");
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
    //console.log(hands);

    // Each hand object contains a `landmarks` property,
    // which is an array of 21 3-D landmarks.
    //hands.forEach(hand => console.log(hand.annotations));
    hands.forEach((hand) => (dataAnalysis(hand.annotations)) );
  };

  const dataAnalysis = (mano) => {
    let indexX = mano.indexFinger[0][0];
    let middleX = mano.middleFinger[0][0];
    let ringX = mano.ringFinger[0][0];
    let pinkyX = mano.pinky[0][0];
    let thumbX = mano.thumb[0][0];

    let arr = [indexX, middleX, ringX, pinkyX, thumbX];
    globArr.push(indexX - thumbX);
    console.log(globArr);
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
      sum = 0;
    }
    console.log("fail")
    return false;
  };

  const tts = () => {
    chrome.tabs
      ? chrome.tabs
          .query({ active: true, currentWindow: true })
          .then(function (tabs) {
            var activeTab = tabs[0];
            var activeTabId = activeTab.id;
            //chrome.tts ? chrome.tts.speak("" + activeTabId) : console.log("failed at tts");
            return chrome.scripting
              ? chrome.scripting.executeScript({
                  target: { tabId: activeTabId },
                  injectImmediately: true, // uncomment this to make it execute straight away, other wise it will wait for document_idle
                  func: DOMtoString,
                  // args: ['body']  // you can use this to target what element to get the html for
                })
              : console.log("failed at scripting");
          })
          .then(function (results) {
            HTMLtoReadableText(results[0].result);
          })
          .catch(function (error) {
            console.log(
              "There was an error injecting script : \n" + error.message
            );
          })
      : console.log("failed at tabs");
  };

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
    chrome.tts ? chrome.tts.speak(output[0]) : console.log("failed at tts");
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
    console.log("helo");
    startCamera();
  }, [time]);

  useEffect(() => {
    console.log("helo2");
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
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
