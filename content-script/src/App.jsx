//import logo from './logo.svg';
import './App.css';
import { useRef, useEffect, useState } from "react"; 
import { gestureMap, gestureMapKey } from '../../src/trackingLogic/gestures.jsx';
import { GetTextFromHTML } from "../../src/trackingLogic/extension.jsx";
import Tracking from "../../src/trackingLogic/tracking.jsx";

console.log("yo2");

const VideoOutput = (props) => {
  const videoRef = props.videoRef;

  useEffect(() => {
    const videoObj = videoRef.current;
    videoObj.srcObject = props.video;
    videoObj.play();
  }, []);

    return <video width="500px" height="500px" ref={videoRef}></video>;
}

function App() {
  console.log(gestureMapKey);
  const gestureImgLink = gestureMap.get(gestureMapKey)[0]; //Determine which image to display
  const gestureImgAltText = gestureMap.get(gestureMapKey)[1]; //Determine what alt text to display if image fails
  const gestureImgCommand = gestureMap.get(gestureMapKey)[2];
  console.log(gestureImgLink);
  console.log(gestureImgAltText);
  console.log(gestureImgCommand);
  const videoElement = useRef();

  const [video, setVideo] = useState();
  
  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          setVideo(stream);
        })
        .catch(function (error) {
          console.log("Something went wrong!" + error);
        });
    }

  });

  return (
    <div className="App">
      <header className="App-header">
      {video ? <VideoOutput videoRef={videoElement} video={video} /> : ''}
        Welcome to the Auditory-Assistant Google Extension!
        <GetTextFromHTML />       
        <Tracking videoElement={videoElement}/>
      </header>
      <div className="App-Gesture-Img-and-Description">
        <img src={gestureImgLink} className="App-Gesture-Img" alt={gestureImgAltText} />
        <p>
          {gestureImgCommand}
        </p>
      </div>
    </div>
  );
}

export default App;
