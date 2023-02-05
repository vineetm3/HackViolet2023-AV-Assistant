//all gesture related logic
import AuditoryAssistant from "../images/AuditoryAssistant.png";
import OkHand from "../images/OkHand.jpg"
import StopHand from "../images/StopHand.jpg";

//Determines which key to call
let gestureMapKey = "Ok-Hand"; //Initial Call

export { gestureMapKey };
//Format: Key | (Array: Img Link | Alt Tag Text | Command Description)
export const gestureMap = new Map([
    ["Ok-Hand", [OkHand, "Ok Hand Img", "MAKE THIS SYMBOL FOR A SURPRISE!"]],
    ["Stop-Hand", [StopHand, "Stop Hand Img", "CONGRATS! YOUR AUDIO IS PLAYING! TO STOP, MAKE THIS SYMBOL!"]],
    ["Backup", [AuditoryAssistant, "Auditory Assistant Img", "ERROR! PLEASE RELOAD THE GOOGLE EXTENSION AND START AGAIN!"]]
]);
