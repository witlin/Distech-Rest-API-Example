define(['jquery'],function($){

  //Property Reference Object
  function PropReference(type,instance,property,arrIndex){
    this.type = type;
    this.instance = instance;
    this.property = property;
    this.arrayIndex = arrIndex;
  }

  //Read Multiple Properties Request Object
  function ReadMulti(encode,propRefs){
    this.encode = encode;
    this.propertyReferences = propRefs;
  }

  //Read Multiple Properties Pre-Assembly Object
  function RmAssembly(types,instances,props,indexes){
    this.types = types;
    this.instances = instances;
    this.properties = props;
    this.indexes = indexes;
  }

  return{

    "makePropRef":function(type,inst,prop,arr){
      var propRef = new PropReference(type,inst,prop,arr);
      return propRef;
    },

    "makeReadMulti":function(enc,pRefs){
      var readMulti = new ReadMulti(enc,pRefs);
      return readMulti;
    },

    "readAllOp":function(bacnet){
      var typeObjs;
      var propRefs = [];
      for(var obj in bacnet.Data){
          if(obj == "bacnetObjectTypes"){
            typeObjs = bacnet.Data[obj];
          }
        }
      for(var type in typeObjs){
        switch(typeObjs[type].name){
          case "analogInput":
            propRefs.push(this.makePropRef(typeObjs[type].name,-1,"all",-1));
            break;
          case "analogOutput":
            propRefs.push(this.makePropRef(typeObjs[type].name,-1,"all",-1));
            break;
          case "analogValue":
            propRefs.push(this.makePropRef(typeObjs[type].name,-1,"all",-1));
            break;  
          case "binaryInput":
            propRefs.push(this.makePropRef(typeObjs[type].name,-1,"all",-1));
            break;  
          case "binaryOutput":
            propRefs.push(this.makePropRef(typeObjs[type].name,-1,"all",-1));
            break;
          case "binaryValue":
            propRefs.push(this.makePropRef(typeObjs[type].name,-1,"all",-1));
            break;
          case "multiStateValue":
            propRefs.push(this.makePropRef(typeObjs[type].name,-1,"all",-1));
            break;
          default:
            "";
        }
        //console.log(typeObjs[type].name);
      }
      return this.makeReadMulti("text",propRefs);
    }
  };

});
