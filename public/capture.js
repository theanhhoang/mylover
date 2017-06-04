// Trigger photo take
function toggle(id) {
    var element = document.getElementById(id);

    if (element) {
        var display = element.style.display;

        if (display == "none") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }
}

var URL = '';
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('localWebcam');
document.getElementById("snap").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 300, 170);
  toggle('localWebcam');
  //URL = canvas.toDataURL('image/png');
  //console.log(URL);
});


URL = canvas.toDataURL('image/png');
//module.exports.canvas = canvas;
