var express = require('express');
var app = express();
var fs = require('fs');
var request = require('sync-request');

var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public"));

var Mine = require('./public/Mine.json');

app.set('view engine', 'ejs');
app.set('views','./views');

var server = require("http").createServer(app);
server.listen(process.env.PORT || 3000);

//app.listen(3000);
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

let key = '4c525ecf62e64205954b122ade0e408f';



function detect(imageUrl) {
    let url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
    //console.log('Begin to detect face from image:' + imageUrl);

    var res = request('POST', url, {
        headers: {
            'Ocp-Apim-Subscription-Key': key
        },
        json: {
            url: imageUrl
        }
    });

    if (res.statusCode == 200) {
        var result = JSON.parse(res.getBody('utf8'));
      //  console.log(`Found ${result.length} faces.`);
        return result;
    }


}

function identify(faceIds) {
    //console.log(`Begin to identity face.`);
    let url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify';
    var res = request('POST', url, {
        headers: {
            'Ocp-Apim-Subscription-Key': key
        },
        json: {
            "personGroupId": 'mylover',
            "faceIds": faceIds,
            "maxNumOfCandidatesReturned": 1,
        }
    });

    if (res.statusCode == 200) {
        //console.log(`Finish identity face.`);
        return JSON.parse(res.getBody('utf8'));
    } else {
        console.log('Error');
        console.log(res.getBody('utf8'));
    }
}

// Nhận diện vị trí khuôn mặt và tên idol từ URL ảnh
function recognize(imageUrl) {
    console.log(`Begin to recognize image: ${imageUrl}`);
    var detectedFaces = detect(imageUrl);

    if (typeof(detectedFaces) != 'object') {
        console.log("Can't detect any face");
        return '';
    }

    // Sau khi đã phát hiện các khuôn mặt,
    // So sánh chúng với mặt đã có trong person group

    var identifiedResult = identify(detectedFaces.map(face => face.faceId));
    //return identifiedResult;

    console.log(identifiedResult[0].candidates.length);
    if (identifiedResult.length === 1)
      {
      if (identifiedResult[0].candidates.length != 0){
        var mineCandidate = identifiedResult.map(result => result.candidates[0]);
        var mineID = mineCandidate.map(result => result.personId);

        var result = Mine.filter(person => person.personId == mineID);
        var mine = result.map(aResult => aResult.name);
        console.log(`Finish recognize image: ${imageUrl}`);
        return mine[0];
      }else {
        return '';
        }
      }
    else {
      return '';
    }
}

//var test = recognize('https://68.media.tumblr.com/a0c038cc5be383424ac6707b78fe1457/tumblr_oqifve1Fse1wqxq9do1_1280.jpg')
//var test = recognize('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/1280px-President_Barack_Obama.jpg');
//console.log(test);



app.post('/', urlencodedParser, function (req, res) {
  var url = req.body.url;
  //console.log(url);

  var mine = recognize(url);
  console.log(mine);
  var result = false;
  if (mine.length > 0){
    result = true;
  }
  else
  {
    result = false;
  }
  res.render("result.ejs", {result: result});
});

app.get('/', function (req, res) {
   res.render('index.ejs');

});

app.get('/result', function (req, res) {
   res.render('result.ejs');
});

//for multer upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //cb(null, file.fieldname + '-' + Date.now())
    cb(null, file.originalname);
  }
})

var upload = multer({ storage: storage })


app.post('/upload',urlencodedParser, function(req, res) {

   var test;
   req.on('data', function (data) {
         test += data;
      });
    req.on('end', function () {
       res.end('\n');
       test=test.split("THEANHFIRST").pop();
       test = test.substring(0, test.indexOf("THEANHLAST") - 10);
       fs.writeFile("./uploads/test.png", test, "base64", function(err) {});
       fs.writeFile("./uploads/test.txt", test, function(err) {});
       console.log('RECEIVED THIS DATA:\n'+ test);
       console.log(test.length);

    });

   //fs.writeFile("./uploads/test.png", new Buffer(data, "base64"), function(err) {});
 res.end();
});

app.get('/uploads/:id', function(req, res){
   fs.readFile('./uploads/'+ req.params.id, function(e, img){
     if (e){
       res.writeHead(200, {'Content-Type': 'text/plain' });
       res.end('Hello World \n');
     }
     else {
       res.writeHead(200, {'Content-Type': 'image/gif' });
       res.end(img, 'binary');
     }

   });


});
