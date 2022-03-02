requirejs.config({
  baseUrl: '',
  paths:{}
});

require(['jquery','Auth','Request','RequestObjects','DataTransforms'],
  function($,auth,req,reqObjs,dt){
    
    var baseURL = "http://192.168.0.6/api/rest/v1/protocols/bacnet";
    var bacObjURL = "/local/objects";
    var rPropMultURL = "/read-property-multiple";
    var sessionID;
    
    auth.username = "admin";
    auth.password = "8hernMK#";
    
    
    auth.authCall(baseURL+bacObjURL,
      function(token){
        sessionID = token;
        console.log("WORKING..."+sessionID);
        req.get(baseURL+bacObjURL+rPropMultURL, token,
          function(bacnet){
            
            var reqBody = reqObjs.readAllOp(bacnet);
          
            req.post( baseURL+bacObjURL+rPropMultURL, token, JSON.stringify(reqBody),
              function(props){
                var analogInputs = dt.filterByType(props.Data,"analogInput");
                var aiInstances = dt.getInstances(analogInputs);
                var objArray = [];
                
                console.log("AI Instances: "+aiInstances);
                aiInstances.forEach(function(item){
                  objArray.push(dt.filterByInstance(analogInputs, item));
                })
                console.log(objArray);
                //analogInputs.forEach(function(item){ console.log(item); }); 
              });
        });
      }); 
  });