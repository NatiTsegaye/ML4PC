export const drawSkeleton = (p5, predictions) => {
  let annotations = predictions[0].annotations;
  p5.stroke(0, 0, 255);
  for (let j = 0; j < annotations.thumb.length - 1; j++) {
    p5.line(
      annotations.thumb[j][0],
      annotations.thumb[j][1],
      annotations.thumb[j + 1][0],
      annotations.thumb[j + 1][1]
    );
  }
  for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
    p5.line(
      annotations.indexFinger[j][0],
      annotations.indexFinger[j][1],
      annotations.indexFinger[j + 1][0],
      annotations.indexFinger[j + 1][1]
    );
  }
  for (let j = 0; j < annotations.middleFinger.length - 1; j++) {
    p5.line(
      annotations.middleFinger[j][0],
      annotations.middleFinger[j][1],
      annotations.middleFinger[j + 1][0],
      annotations.middleFinger[j + 1][1]
    );
  }
  for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
    p5.line(
      annotations.ringFinger[j][0],
      annotations.ringFinger[j][1],
      annotations.ringFinger[j + 1][0],
      annotations.ringFinger[j + 1][1]
    );
  }
  for (let j = 0; j < annotations.pinky.length - 1; j++) {
    p5.line(
      annotations.pinky[j][0],
      annotations.pinky[j][1],
      annotations.pinky[j + 1][0],
      annotations.pinky[j + 1][1]
    );
  }

  p5.line(
    annotations.palmBase[0][0],
    annotations.palmBase[0][1],
    annotations.thumb[0][0],
    annotations.thumb[0][1]
  );
  p5.line(
    annotations.palmBase[0][0],
    annotations.palmBase[0][1],
    annotations.indexFinger[0][0],
    annotations.indexFinger[0][1]
  );
  p5.line(
    annotations.palmBase[0][0],
    annotations.palmBase[0][1],
    annotations.middleFinger[0][0],
    annotations.middleFinger[0][1]
  );
  p5.line(
    annotations.palmBase[0][0],
    annotations.palmBase[0][1],
    annotations.ringFinger[0][0],
    annotations.ringFinger[0][1]
  );
  p5.line(
    annotations.palmBase[0][0],
    annotations.palmBase[0][1],
    annotations.pinky[0][0],
    annotations.pinky[0][1]
  );
};

export const drawKeypoints = (p5, predictions) => {
  let prediction = predictions[0];
  for (let j = 0; j < prediction.landmarks.length; j++) {
    let keypoint = prediction.landmarks[j];
    p5.fill(0, 0, 0);
    p5.noStroke();
    p5.ellipse(keypoint[0], keypoint[1], 10, 10);
  }
};
