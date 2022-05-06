import * as tfjs from "@tensorflow/tfjs";
import * as core from "@tensorflow/tfjs-core";
import * as converter from "@tensorflow/tfjs-converter";

export const addExample = (label, predictions, classifier) => {
  console.log("clicked");
  if (predictions.length > 0) {
    const features = predictions[0].landmarks;
    const tensors = tfjs.tensor(features);
    // Add an example with a label to the classifier
    classifier.addExample(tensors, label);
    //updateCounts();
    let value = Number(document.getElementById(label + label).innerHTML);
    document.getElementById(label + label).innerHTML = ++value;
  } else {
    console.log("No gesture is detected");
  }
};
