import './App.css';
import { gestureMap, gestureMapKey } from './trackingLogic/gestures.js';
import { GetTextFromHTML } from "./trackingLogic/extension.js";
import Tracking from "./trackingLogic/tracking.js";

function App() {
  console.log("TEST: ");
  console.log(gestureMapKey);
  const gestureImgLink = gestureMap.get(gestureMapKey)[0]; //Determine which image to display
  const gestureImgAltText = gestureMap.get(gestureMapKey)[1]; //Determine what alt text to display if image fails
  const gestureImgCommand = gestureMap.get(gestureMapKey)[2]; //Determine what description to show to the user 
  console.log(gestureImgLink);
  console.log(gestureImgAltText);
  console.log(gestureImgCommand);

  return (
    <div className="App">  
      <Tracking />
      <GetTextFromHTML />
      <div className="App-Gesture-Img-and-Description">
        <img src={gestureImgLink} className="App-Gesture-Img" alt={gestureImgAltText} />
        <p className="App-Gesture-Description">
          {gestureImgCommand}
        </p>
      </div>
    </div>
  );
}

export default App;
