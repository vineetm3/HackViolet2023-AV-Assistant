//import logo from './logo.svg';
import './App.css';
import { gestureMap, gestureMapKey } from './trackingLogic/gestures.jsx';
import { GetTextFromHTML } from "./trackingLogic/extension.jsx";
import Tracking from "./trackingLogic/tracking.jsx";

console.log("yo")

function App() {
  console.log("TEST: ");
  console.log(gestureMapKey);
  const gestureImgLink = gestureMap.get(gestureMapKey)[0]; //Determine which image to display
  const gestureImgAltText = gestureMap.get(gestureMapKey)[1]; //Determine what alt text to display if image fails
  const gestureImgCommand = gestureMap.get(gestureMapKey)[2];
  console.log(gestureImgLink);
  console.log(gestureImgAltText);
  console.log(gestureImgCommand);

  const videoElement = useRef();
  console.log("video element is:" + videoElement.current);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <video ref={videoElement} autoPlay width="500px" height="500px" id="input_video" className="input_video"> </video>
          <canvas width="500px" height="500px" id="output_canvas" className="output_canvas"></canvas>
        </div>
        Welcome to the Auditory-Assistant Google Extension!
        <GetTextFromHTML />       
        {console.log("yo2312" + videoElement)}
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
