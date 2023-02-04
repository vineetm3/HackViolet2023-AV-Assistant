//All hand-tracking related logic

export default tracking = async() => {
    // console.log("This file is for the Google Extension Logic.");
    // // Load the MediaPipe handpose model assets.
    const model = await handpose.load();

    // // Pass in a video stream to the model to obtain
    // // a prediction from the MediaPipe graph.
    //const video = document.querySelector("input_video");
    const hands = await model.estimateHands('testFist.jpg');

    // // Each hand object contains a `landmarks` property,
    // // which is an array of 21 3-D landmarks.
    hands.forEach((hand) => console.log(hand.landmarks));
};