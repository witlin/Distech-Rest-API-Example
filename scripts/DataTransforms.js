define(['jquery'],function($){
     
  var utils = {
    "findIDs": function(array){
      var result = array.map(function(item){ return item.instance; });
      //console.log("Find IDs: "+result);
      return result;
    },
    "reduceIDs": function(array){
      var result = array.filter(function(item,index,a){
        if(index === 0 || item != a[index-1])
        { 
          //console.log("TRUE -- "+item+" "+index);
          return true; 
        }
        else
        { 
          //console.log("FALSE -- "+item+" "+index);
          return false; 
        }
      });
      return result;
    }
  };
  
  return {
      
    "filterByType": function(array, t){
      var group = array.filter(function(item){
        if(item.type === t) return true
        else return false;
      });
      return group;
    },
    
    "getInstances": function(array){
      return utils.reduceIDs(utils.findIDs(array));
    },
    
    "filterByInstance": function(array, instance){
      var group = array.filter(function(item){
        if(item.instance === instance) return true
        else return false;
      });
      return group;
    }
  };
});

