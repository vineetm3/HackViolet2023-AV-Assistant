/*global chrome*/
import { useEffect } from "react";

export const GetTextFromHTML = () => {

    useEffect(() => {
        chrome.tabs ? chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
            var activeTab = tabs[0];
            var activeTabId = activeTab.id;
            //chrome.tts ? chrome.tts.speak("" + activeTabId) : console.log("failed at tts");
            return chrome.scripting ? chrome.scripting.executeScript({
                target: { tabId: activeTabId },
                injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
                func: DOMtoString,
                // args: ['body']  // you can use this to target what element to get the html for
            }) : console.log("failed at scripting");
        }).then(function (results) {
            HTMLtoReadableText(results[0].result);
        }).catch(function (error) {
            console.log('There was an error injecting script : \n' + error.message);
        }) : console.log("failed at tabs");
    });

    const HTMLtoReadableText = (allHTML) => {
        //const temp = allHTML;
        const output = [];
        const tags = [/(<p\b([^>]*)>|<\/p>)/g];
        for (let i = 0; i < tags.length; i++){
            let tempTagString = "";
            let replaced = allHTML.replaceAll(tags[i], "TAG_WAS_HERE_REPLACED");
            let replacedArr = replaced.split("TAG_WAS_HERE_REPLACED");
            console.log(replacedArr);
            for (let i = 0; i < replacedArr.length; i++){
                if (i % 2 === 1){
                    tempTagString = tempTagString + replacedArr[i];
                }
            }
            output.push(tempTagString);
        }
        chrome.tts ? chrome.tts.speak(output[0]) : console.log("failed at tts");
        console.log(output);
    }
    
    const DOMtoString = (selector) => {
        if (selector) {
            selector = document.querySelector(selector);
            if (!selector) return "ERROR: querySelector failed to find node"
        } else {
            selector = document.documentElement;
        }
        console.log("" + selector.outerHTML);
        return selector.outerHTML;
    }

    return (
        null
    );

}