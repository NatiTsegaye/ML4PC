import React from "react";
import Sketch from "react-p5";
import * as ml5 from "ml5";

const myImageModelURL =
  "https://teachablemachine.withgoogle.com/models/ngyO9CXDu/";
let handpose;
let video;
let predictions = [];
let gesture = 0;
let prevGesture = 0;
let myImageModel;
let resultDiv;
let resultString = "";
let word = "";
const gotResults = (err, results) => {
  if (err) console.log(err);
  if (results) {
    console.log(results);
    setTimeout(() => myImageModel.classify(video, gotResults), 1000);

    if (results[0].confidence < 0.6) {
      document.getElementById("label").innerHTML = "...";
      return;
    }

    if (results[0].label === "thumbsUp") {
      resultString += " ";
      resultString += word;
      word = "";
      document.getElementById("word").innerHTML = word;
      document.getElementById("label").innerHTML = resultString;
      return;
    } else if (results[0].label === "thumbsDown") word = "";
    //
    else if (results[0].label !== "....") word += results[0].label;

    document.getElementById("word").innerHTML = word;
    //document.getElementById("label").innerHTML = results[0].label;
    //resultDiv.html(results[0].label);
  }
};
const preload = (p5) => {
  video = p5.createCapture({ audio: false, video: true });
  video.size(500, 500);
  myImageModel = ml5.imageClassifier(myImageModelURL + "model.json");
};

const setup = (p5, canvasParentRef) => {
  p5.createCanvas(500, 500).parent(canvasParentRef);
  //resultDiv = p5.createElement("h1", "...");
  myImageModel.classify(video, gotResults);
};

const draw = (p5) => {
  p5.translate(video.width, 0);
  p5.scale(-1, 1);
  p5.image(video, 0, 0);
};

function P5Video() {
  return <Sketch setup={setup} draw={draw} preload={preload} />;
}

export default P5Video;
