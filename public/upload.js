function uploadEx() {
      var dataURL = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "THEANHFIRST");
      dataURL += "THEANHLAST";


      document.getElementById('hidden_data').value = dataURL;

      //console.log(document.forms["form1"]);
      var fd = new FormData(document.forms["form1"]);

      //for (var key of fd.keys()) {
      //   console.log(key);
      //}
      console.log(fd.get('hidden_data'));
      console.log(fd.get('hidden_data').length);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload', true);

      xhr.upload.onprogress = function(e) {
          if (e.lengthComputable) {
              var percentComplete = (e.loaded / e.total) * 100;
              console.log(percentComplete + '% uploaded');
              //alert('Succesfully uploaded');
          }
      };

      xhr.onload = function() {

      };
      xhr.send(fd);

  };

// var data = canvas.toDataURL("image/png");
// data = data.replace(/^data:image\/(png|jpg);base64,/, "")
//     // Sending the image data to Server
//     $.ajax({
//         type: 'POST',
//         url: 'upload',
//         data: '{ "image" : "' + data + '" }',
//         contentType: 'application/json; charset=utf-8',
//         dataType: 'json',
//         success: function (msg) {
//             alert("Done, Picture Uploaded.");
//         }
//     });
//
//
// $( "#uploadBtn" ).click(function() {
//   // $.post('/upload', { filename: 'test.png', file: canvas.toDataURL() , name: 'image' , enctype: 'multipart/form-data'});
//   $.ajax({
//   type: "POST",
//   url: "/upload",
//   data: {
//     'image':context.getImageData(0,0,300, 170).data
//   },
//   cache: false,
//   contentType: false,
//   processData: false,
// }).done(function(o) {
//   console.log('saved');
//   // If you want the file to be visible in the browser
//   // - please modify the callback in javascript. All you
//   // need is to return the url to the file, you just saved
//   // and than put the image in your browser.
// });
//     // $.ajax({
//     //     type: 'POST',
//     //     url: '/upload',
//     //     data: '{ "image" : "' + data + '" }',
//     //     contentType: 'application/json; charset=utf-8',
//     //     dataType: 'json',
//     //     success: function (msg) {
//     //         alert("Done, Picture Uploaded.");
//     //     }
//     // });
// });
//
// console.log(context.getImageData(0,0,300, 170).data);
