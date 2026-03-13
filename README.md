# Browser Video Recorder Plugin

A lightweight browser-based video recorder built with JavaScript using the MediaDevices and MediaRecorder APIs.

The application allows users to record video directly from their webcam and download the recording locally.

## Features

- Access webcam using MediaDevices API
- Start and stop recording
- Download recorded video as a WebM file
- Handle permission denial
- Prevent recording if no device is available

## Tech Stack

- JavaScript
- HTML / CSS
- MediaDevices API
- MediaRecorder API

## How It Works

1. The application requests webcam permission using:

2. If permission is granted:
   - A video stream is attached to the preview element.
   - MediaRecorder is initialized to capture the stream.

3. When recording starts:
   - MediaRecorder collects video data chunks.

4. When recording stops:
   - Chunks are combined into a Blob.
   - The Blob is converted into a downloadable video file.

## Edge Cases Handled

- User denies camera permission
- Camera device unavailable
- Recording stopped early
- Browser without MediaRecorder support

## Architecture

Frontend: Bubble.io

## Possible Improvements

- Add audio recording
- Add recording timer
- Upload recordings to a backend service
