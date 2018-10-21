const request = require("request");
const cheerio = require("cheerio");
const yargs = require('yargs');
var urllib = require('urllib');

var count = 0;
// console.log(yargs.argv);

var urlInput = {
  description: 'Input the url of the web page',
  alias: 'in',
  demand: true
}
var argv = yargs
  //command for taking the url as input 
  .command('URL','Enter the URL',{
    //url input as a argument
    url: urlInput
  })
  //for helping the users to use these command
  .help()
  .argv;

var command = argv._[0];
if(command === 'URL')
{
  var link = yargs.argv.url;
  console.log(`Entered URL is:- ${link}`);
  if(link != null){
  scrap(link);
  size(link);
  } else{
    console.log('Invalid link');
  }
} else {  
  console.log('Invalid command');
}

  //function to find out the total number of links.
function scrap(link){
  request(link,function(error,response,html){
    if(!error && response.statusCode==200)
    {
      // console.log(html);
      var $ = cheerio.load(html);
      $('span.comhead').each(function(i,element){
  
        var a = $(this).prev();
        if(a != null){
          count++;
        }
      });
    }
    console.log(`Total number of links are = ${count}`);
  });
}

//function to find out the size of page
function size(link){
  urllib.request(link).then(function (result) {
    //to find out the size in bytes
    console.log(`Body size in bytes is : ${result.data.length}`);
  }).catch(function (err) {
    console.error(err);
  });
}