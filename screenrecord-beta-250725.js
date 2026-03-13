function instance (instance, context) {
    
    const videoID = "video-"+Math.round(Math.random()*1000000) + 1;
    const buttonID = "video-"+Math.round(Math.random()*1000000) + 1;
    //var video = $('<video id="'+videoID+'"><video>');
    
    instance.data.videoID = videoID;
    instance.data.buttonID = buttonID;
    instance.canvas.append('<div class="video" ><video id="'+videoID+'" autoplay ></video><button id="'+buttonID+'">Start Capture</button></div>');
    
    
    const displayMediaOptions = {
        video: {
            displaySurface: "window",
        },
        audio: false,
        preferCurrentTab: true,
    };
    
    const video = document.getElementById(videoID);
    const button = document.getElementById(buttonID);
    
    // Set event listeners for the start and stop buttons
    button.addEventListener(
        "click",
        (evt) => {
            startCapture();
        },
        false
    );
    
    async function startCapture() {
        try {
            video.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        }
        catch (err) {
            console.error(err);
        }
    }

}