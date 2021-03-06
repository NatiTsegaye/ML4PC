// Update this following link to your own model link
const poseModelUrl =
  "https://teachablemachine.withgoogle.com/models/USWKretWE/";
let serial; // variable to hold an instance of the serialport library
let portName = "COM7"; // fill in your serial port name here
// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = poseModelUrl + "model.json";
// the metatadata json file contains the text labels of your model and additional information
const metadataURL = poseModelUrl + "metadata.json";

const size = 300;
let webcam;
let model;
let totalClasses;
let myCanvas;
let ctx;

let outByte = 0; // for outgoing data

// A function that loads the model from the checkpoint
async function load() {
  model = await tmPose.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

async function loadWebcam() {
  webcam = new tmPose.Webcam(size, size, true); // can change width and height
  await webcam.setup(); // request access to the webcam
  await webcam.play();
}

async function setup() {
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("error", serialError); // callback for errors
  serial.open(portName); // open a serial port
  myCanvas = createCanvas(size, size);
  ctx = myCanvas.elt.getContext("2d");
  // Call the load function, wait until it finishes loading
  await load();
  await loadWebcam();
  predictVideo(webcam.canvas);
}

function serialError(err) {
  console.log("Something went wrong with the serial port. " + err);
}

async function predictVideo() {
  webcam.update();
  // Prediction #1: run input through posenet
  // predictPosenet can take in an image, video or canvas html element
  const flipHorizontal = false;
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine assification model
  const prediction = await model.predict(posenetOutput);

  console.log("prediction", prediction);
  // Find the class with the highest probability
  const maxClass = prediction.reduce((prev, current) =>
    prev.probability > current.probability ? prev : current
  );
  // Show the result
  const res = select("#res"); // select <span id="res">
  res.html(maxClass.className);

  // Show the probability
  const prob = select("#prob"); // select <span id="prob">
  prob.html(maxClass.probability.toFixed(2));

  // draw the keypoints and skeleton
  if (pose) {
    const minPartConfidence = 0.5;
    ctx.drawImage(webcam.canvas, 0, 0);
    tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
    tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
  }

  if (maxClass.className === "on") {
    outByte = 1;
  } else if (maxClass.className === "off") {
    outByte = 0;
  } else {
    outByte = 0;
  }
  // send it out the serial port:
  console.log("outByte: ", outByte);
  serial.write(outByte);

  // Wait for 0.2 second before classifying again
  setTimeout(() => predictVideo(), 200);
}
