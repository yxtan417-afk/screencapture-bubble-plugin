/* ---------------------------------------------------------------------------- */
/* date         update                                                          */
/* 250726       added create video and download function                        */    
/* ---------------------------------------------------------------------------- */

function initialize (instance, context) {
    
    const videoID = "video-"+Math.round(Math.random()*1000000) + 1;
    const startButtonID = "video-"+Math.round(Math.random()*1000000) + 1;
    const stopButtonID = "video-"+Math.round(Math.random()*1000000) + 1;
    //var video = $('<video id="'+videoID+'"><video>');
    
    instance.data.videoID = videoID;
    instance.data.buttonID = startButtonID;
    instance.canvas.append('<div class="video" ><video id="'+videoID+'" autoplay ></video><button id="'+startButtonID+'">Start Capture</button><button id="'+stopButtonID+'">Stop Capture</button></div>');
    
    
    const displayMediaOptions = {
        video: {
            displaySurface: "window",
        },
        audio: false,
        preferCurrentTab: true,
    };
    
    const video = document.getElementById(videoID);
    const startButton = document.getElementById(startButtonID);
    const stopButton = document.getElementById(stopButtonID);
    let stream = null;
    let mediaRecorder;
    let recordedChunks = [];

    
    // Set event listeners for the start and stop buttons
    startButton.addEventListener(
        "click",
        (evt) => {
            startCapture();
        },
        false
    );
    
    stopButton.addEventListener(
        "click",
        (evt) => {
            stopCapture();
            
        },
        false
    );
    
    /*async function startCapture() {
        try {
            video.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        }
        catch (err) {
            console.error(err);
        }
    }
    
    function stopCapture(evt) {
        let tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
    }*/
    
    async function startCapture() {
        try {
            
            stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = function (e) {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            };
            
            mediaRecorder.onstop = function () {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                
                video.src = url;
                video.play();
                
                // Optionally, auto-download:
                const a = document.createElement('a');
                a.href = url;
                a.download = 'screen-recording.webm';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
            
            mediaRecorder.start();
        }

        catch (err) {
            console.error(err);
        }
    }
    
    function stopCapture(evt) {
        
        mediaRecorder.stop();
        
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
       
    }

}