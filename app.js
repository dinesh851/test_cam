document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  const videoElement = document.getElementById('videoElement');

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      let stream;

      // Function to start the camera when the button is clicked
      startButton.addEventListener('click', async () => {
          try {
              // Request access to the user's camera
              stream = await navigator.mediaDevices.getUserMedia({ video: true });

              // Display the camera stream in the video element
              videoElement.srcObject = stream;
          } catch (error) {
              console.error('Error accessing camera:', error);
          }
      });

      // Function to stop the camera when the user leaves or stops the stream
      window.addEventListener('beforeunload', () => {
          if (stream) {
              const tracks = stream.getTracks();
              tracks.forEach(track => track.stop());
          }
      });
  } else {
      console.error('getUserMedia is not supported in this browser');
  }
});
