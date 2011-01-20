var fs = require('fs')
  , path = require('path');
  
  
  
/*
* Load configs from json file
*/
var loadConfig = function(filename, success){
  fs.readFile(path.join(process.env.HOME, filename), 'utf8', function(err, data){
    if(err){
      console.log(err);
      success({});
      return;
    }
    success(JSON.parse(data));
  });
}


/*
* returns [{opts}, [args]]
*/
var optParse = function(argv){
  var opts = {}
    , args = []
    
  for(var i in argv){
    var x = argv[i]
    if (x[0] == '-'){
      // either flag, in which case store true, or opts  
      if (x.indexOf('=') == -1){
      opts[x] = true
    } else {
      var flag = x.slice(0, x.indexOf('='))
        , val = x.slice(x.indexOf('=')+1);
      opts[flag] = val;  
    }  
  } else {
    args.push(x)
  }
  }  
  return [opts, args]
}



exports.optParse = optParse
exports.loadConfig = loadConfig