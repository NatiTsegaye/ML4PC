import React from "react";
import Sketch from "react-p5";
import * as handpose from "@tensorflow-models/handpose";
import * as core from "@tensorflow/tfjs-core";
import * as converter from "@tensorflow/tfjs-converter";
import * as KNNClassifier from "@tensorflow-models/knn-classifier";
import * as tfjs from "@tensorflow/tfjs";
import { drawKeypoints, drawSkeleton } from "./draw";
import { addExample } from "./train";

let model,
  video,
  predictions = [],
  word = "",
  sentence = "";

let display = true;
const classifier = KNNClassifier.create();
const classify = async () => {
  const numLabels = classifier?.getNumClasses();
  if (numLabels <= 0) return;
  if (predictions?.length > 0) {
    const results = await classifier.predictClass(
      tfjs.tensor(predictions[0].landmarks)
    );

    if (results.confidences && display) {
      const confidences = results.confidences;
      if (results.label) {
        // select('#result').html(results.label);
        // select('#confidence').html(`${confidences[results.label] * 100} %`);
        console.log(results.label);
        console.log(`${confidences[results.label] * 100} %`);
        if (results.label === "thumbsUp") {
          if (word !== "...") {
            sentence += " ";
            sentence += word;
            word = "...";
          }
        } else if (results.label === "thumbsDown") {
          if (word === "...") sentence = "...";
          else word = "...";
        } else {
          if (word === "...") word = "";
          word += results.label;
        }
        document.getElementById("word").innerHTML = word;
        document.getElementById("sentence").innerHTML = sentence;
      }
    }
    //setTimeout(() => classify(), 1500);
  }
  display = !display;
  setTimeout(() => classify(), 1500);
};

const handleButtons = () => {
  var buttons = [...document.getElementById("btn")?.children];
  buttons?.map((button) => {
    button = [...button.children][0];
    button.addEventListener("click", () => {
      addExample(button.id, predictions, classifier);
    });
  });

  buttons = document.getElementById("predict");
  buttons.addEventListener("click", () => {
    classify();
  });
};

const predictHand = async () => {
  predictions = await model.estimateHands(video.elt);
  setTimeout(() => predictHand(), 200);
};

const loadHandTrackingModel = async () => {
  model = await handpose.load();
  //console.log(model);
  predictHand();
};

const preload = (p5) => {
  video = p5.createCapture({ audio: false, video: true }, () => {
    loadHandTrackingModel();
  });
  handleButtons();
};

const setup = (p5, canvasParentRef) => {
  p5.createCanvas(500, 500).parent(canvasParentRef);
  //resultDiv = p5.createElement("h1", "...");
  var e = document.body.getElementsByTagName("video")[0];
  e?.parentNode.removeChild(e);
};

const draw = (p5) => {
  p5.translate(video.width, 0);
  p5.scale(-1, 1);
  p5.image(video, 0, 0);
  if (predictions.length > 0) {
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints(p5, predictions);
    drawSkeleton(p5, predictions);
  }
};

function Trial2() {
  return <Sketch setup={setup} draw={draw} preload={preload} />;
}

export default Trial2;
