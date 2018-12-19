/** Extend Array Class **/
function getDiff(thisArg, obj, type = "object") {
	if(type == "object"){
		var ret = {};
		for(var key in thisArg){
			if(thisArg.hasOwnProperty(key) && obj.hasOwnProperty(key)){
				if(thisArg[key] != obj[key]){
					ret[key+"_new"] = thisArg[key];
					ret[key+"_old"] = obj[key];
				}
			}
		}
		return ret;
	} else if (type == "string"){
		var ret = [];
		for(var key in thisArg){
			if(thisArg.hasOwnProperty(key) && obj.hasOwnProperty(key)){
				if(thisArg[key] != obj[key]){
					ret.push("'" + dispTrans(key) + "' ændret fra " + thisArg[key] + " til " + obj[key]);
				}
			}
		}
		return ret.join(", ");
	} else if (type == "boolean"){
		var ret = {};
		for(var key in thisArg){
			if(thisArg.hasOwnProperty(key) && obj.hasOwnProperty(key)){
				if(thisArg[key] != obj[key]){
					ret[key] = true;
				} else {
                    ret[key] = false;
                }
			}
		}
		return ret;
	}
};

var vals = {"id": 1, "name": "A", "key": 1234, "value": "100"}
var data = {"id": "1", "name": "B", "key": 1235, "value": "100"}

console.log(getDiff(vals, data, "boolean"));
console.log(getDiff(vals, data, "boolean"));