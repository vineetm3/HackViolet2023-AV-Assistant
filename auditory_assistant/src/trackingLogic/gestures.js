//all gesture related logic
import AuditoryAssistant from "../images/AuditoryAssistant.png";
import OkHand from "../images/OkHand.jpg"

//Determines which key to call
let gestureMapKey = "Ok-Hand";

export { gestureMapKey };
//Format: Key | (Array: Img Link | Alt Tag Text | Command Description)
export const gestureMap = new Map([
    ["Ok-Hand", [OkHand, "Ok Hand Img", "MAKE THIS SYMBOL FOR A SURPRISE!"]],
    ["Backup", [AuditoryAssistant, "Auditory Assistant Img", "This is an error. Please check the running state of the application!"]]
]);
