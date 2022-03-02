define(['jquery','cookies'],function($,cookies){
  
  var user = "";
  var pass = "";
  
  var setUser = function(arg){ user = arg; }
  var getUser = function(){ return user; }
  
  var setPass = function(arg){ pass = arg; }
  var getPass = function(){ return pass; }
  
  var token = function(){
    return window.btoa(getUser()+":"+getPass());
  };
  
  var authRequest = function(url,success){
      var Token;
      $.ajax({
        url:url,
        method:"GET",
        contentType:"application/json",
        cache: false,
        crossDomain: true,
        headers:{
          "Accept":"application/json",
          "Authorization": "Basic "+ token,
        },
        error:function(xhr,status,err){
          console.log("Auth ERROR: "+ status);
        },
        complete:function(xhr,status){
          var sessionId = "ECLYPSERESTSESSIONID="+docCookies.getItem("ECLYPSERESTSESSIONID");
          success(sessionId);  
        }
      });  
    }
  
  return {
    
    "username":"User",
    "password":"secretPassword",
    
    //Login information encoding
    "encAuthString":function(){
      return window.btoa(this.username+":"+this.password);
    },
    
    //Authentication Request
    "authCall": function(url,success){
      var Token;
      $.ajax({
        url:url,
        method:"GET",
        contentType:"application/json",
        cache: false,
        crossDomain: false,
        /*
        xhrFields:{
          withCredentials: true
        },*/
        headers:{
          "Accept":"application/json",
          "Authorization": "Basic "+this.encAuthString(),
        },
        error:function(xhr,status,err){
          console.log("Auth ERROR: "+status);
        },
        complete:function(xhr,status){
          var sessionId = "ECLYPSERESTSESSIONID="+docCookies.getItem("ECLYPSERESTSESSIONID");
          success(sessionId);  
        }
      });  
    }
    
  };

});


