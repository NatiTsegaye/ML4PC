For my final project, I was working on creating a real time translator from sign language to text. As this is a rather big project that would take time to train enough vocabulary, I resorted to a shortcut that would fit with my timeframe. I use the english alphabet in order to spell out words.

Initially, I wanted to experiment and test if this could be achieved with image classification using Teachable Machine (https://teachablemachine.withgoogle.com/ ). I trained the alphabet signs for the American Sign Language (ASL) using images from my webcam.

However, this was not as accurate as I needed it to be. So, I decided to work with hand pose tracking using MediaPipe (https://mediapipe.dev/ ) instead. I felt more comfortable with working with Reactjs, so I wrote a simple demo web app with Reactjs and P5js that would train any hand pose image from the webcam for the english alphabet. The p5js library for Reactjs makes it easier to draw on the canvas and as such build a complete web app around it. I used a KNN classifier to train the model.

The user will first train a model by choosing hand poses for each letter in addition to thumbsUp thumbsDown. Once that is done, the user can simply press predict. The text display has two parts: word and sentence. Once you add letters to your word using hand poses, you can confirm using the thumbsUp and add it to the sentence. If the user wants to discard the word, they can do so using the thumbsDown pose.

If I had more time to work on this project, I would work on training gestures and add more vocabulary. In addition, I would work on adding an audio output. Moreover, I would add support for two hands at a time.

The following videos illustrate how to train the model and how to use the web app.
