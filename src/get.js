var request = require ('request');

exports.getHTML = getHTML;

function getHTML (url){
  return new Promise ((resolve, reject) =>
    request (url, function (err, response, html){
      if (response.statusCode != 200){
        reject (new Error ("Bad URL"));
      }
      else if (err){
        reject (err);
      }
      else {
        resolve (html);
      }
    })
  )
}
