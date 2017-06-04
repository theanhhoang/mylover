

function openStream(){
  const config = {audio: false, video:true};
  return navigator.mediaDevices.getUserMedia(config);
};

function playVideo(idVideoTag, stream){
  const video = document.getElementById(idVideoTag);

  video.srcObject = stream;
  video.play();

}

openStream()
.then(stream => {
  playVideo("localWebcam", stream);
  //console.log(stream);
});
