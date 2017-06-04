// let aCb = (a,b,cb)=>{
//   setTimeout(() => {
//      if (typeof(a) != 'number'){
//        return cb('a must >0');
//      }
//      return cb(undefined, a+b);
//
//   },1000);
// }
//
// aCb(5,6, (e, r)=>{
//   if (e){ return console.log(e);}
//   return console.log(r);
// });
var fs = require('fs');

// let file = fs.readFile('index.js',(e,data)=>{
//   console.log(data.toString());
// });

// let add = (a,b)=>{
//   return new Promise((resolve, reject)=>{
//     let file = fs.readFile('index1.js',(e,data)=>{
//       if (e) { return reject(new Error('cannot found file'));}
//       return resolve(console.log(a+b));
//     });
//   });
// };
//
// add(5,6).then(res => 'Result is '+ res)
// .catch(rej => console.log(rej + ""));


var file = process.argv[2],
    data = fs.readFileSync(file);

console.log(data.toString('base64'));
