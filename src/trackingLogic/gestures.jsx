//all gesture related logic
import AuditoryAssistant from "../images/AuditoryAssistant.png";

//Determines which key to call
let gestureMapKey = "Image2";

export { gestureMapKey };
//Format: Key | (Array: Img Link | Alt Tag Text | Command Description)
export const gestureMap = new Map([
    ["Image1", [AuditoryAssistant, "Auditory Assistant Img", "START: WORD WORD WORD WORD WORD WORD WORD WORD WORD WORD "]],
    ["Image2", [AuditoryAssistant, "Auditory Assistant Img 2", "STOP: WORD WORD WORD WORD WORD WORD WORD WORD WORD WORD "]],
    ["Image3", [AuditoryAssistant, "Auditory Assistant Img 3", "PAUSE: WORD WORD WORD WORD WORD WORD WORD WORD WORD WORD "]]
]);
