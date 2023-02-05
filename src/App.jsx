//import logo from './logo.svg';
import './App.css';
import { gestureMap, gestureMapKey } from './trackingLogic/gestures.jsx';
import { GetTextFromHTML } from "./trackingLogic/extension.jsx";
import Tracking from "./trackingLogic/tracking.jsx";
import Webcam from 'react-webcam';

function App() {
  const gestureImgLink = gestureMap.get(gestureMapKey)[0]; //Determine which image to display
  const gestureImgAltText = gestureMap.get(gestureMapKey)[1]; //Determine what alt text to display if image fails
  const gestureImgCommand = gestureMap.get(gestureMapKey)[2];

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Webcam />
      <br />
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
