define(['jquery','cookies'],function($,cookies){
  
  //HTTP Response Object      
  function Response(data,status,headers){
    this.Data = data;     
    this.Status = status;
    this.Headers = headers;
  }

  return {
    //HTTP GET Request
    "get":function(url,token,action){
      var resp = {};
      $.ajax({
        url:url,
        method:"GET",
        contentType:"application/json",
        cache: false,
        crossDomain: true,
        /*
        xhrFields:{
          withCredentials: true
        },*/
        headers:{
          "Accept":"application/json",
          "Authorization":token,
        },
        success:function(data,status,xhr){
          resp = new Response(
            data,
            status,
            xhr.getAllResponseHeaders()
          );
          action(resp);
        }
      });
    },
    
    //HTTP POST Request
    "post":function(url,token,pData,action){
      var resp = {};
      $.ajax({
        url:url,
        /*
        xhrFields:{
          withCredentials: true
        },*/
        method:"POST",
        contentType:"application/json",
        dataType:"json",
        data:pData,
        headers:{
          "Accept":"application/json",
          "Authorization":token,
        },
        success:function(data,status,xhr){
          resp = new Response(
            data,
            status,
            xhr.getAllResponseHeaders()
          );
          action(resp);
          console.log("POST Success: " + status) ;
        },
        complete:function(xhr,status){
          console.log("POST Complete: "+status);
        }
      });
    }
    
  };
});

