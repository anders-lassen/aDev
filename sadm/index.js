/*
 * Copyright (c) 2018 Tracelink ApS - www.tracelink.dk - info@tracelink.dk
 * -----------------------------------------------------------------------
 *
 * File-created: "2018-06-01 08:59:34 by cbn"
 * Time-stamp:   "2018-06-20 14:07:29 by cbn"
 *
 * Tools under "Forhandler" -> "Væktøj"
 *
 * ONLY FOR SUPERADMIN
 * 
 */

// Tracelink environment
// var install = "/var/www/taglink/";
var install = "C:/wamp64/www/TAGLINK.dk/";
//global.common = require(install + 'admin/common.js');
// global.common = require("/var/www/test.taglink/admin/common.js");
// global.common = require("C:/wamp64/www/TAGLINK.dk/admin/common.js");
var rest = require(install + 'node/rest.js');
var tldb = require(install + 'node/tldb.js');

rest.quiet();			// don't display debug output from rest calls 
rest.login(ready);		// login and then call 'ready'

function sendData(data) {
    process.stdout.write(JSON.stringify(data));
}

function ready() {
    if (user.admin < 100)
	process.exit(1);
    
    var tool_name = process.argv[2];
    
    switch(tool_name) {
    case "test-baits-to-prod-and-finish":
	tldb.query("UPDATE tbl_module_bait_item SET system=40, state=100 WHERE system=30 and state=50",
		   function (err, rows, fields) {
		       if (!err)
			   console.log(JSON.stringify({rows: rows, fields: fields}));
		       else
			   common.log(JSON.stringify({error: err}));

		       process.exit(0);
		   });
	break;

	case "company-module-setting":
	if (process.argv[3].includes(",")){
		
		var processedArgv3 = process.argv[3].split(",");
		//console.log(processedArgv3);
		var ret = [];
		processedArgv3.forEach((argv3, idx) => {
			tldb.query("SELECT * FROM tbl_modules WHERE internal_name = ?", [ argv3 ], (err, rows, fields) => {
        			var module = rows[0];
	
		        	tldb.query("SELECT tbl_company.* FROM tbl_company, tbl_company_modules WHERE disabled = 0 AND tbl_company_modules.company = tbl_company.company AND tbl_company_modules.module_id = ?", [ module.module_id ], (err, rows, fields) => {
	                	        if (err)
        	                	        console.log(JSON.stringify({ rows: rows, fields: fields }));
                	      		else {
                        	       		rows.forEach((comp) => {
							var set = null;
							try {
                                     				set = JSON.parse(comp.ui_settings);
                                        		} catch (err) {
                                        		        set = null;
                                        		}
      	                         			if (ret.map((e) => { return e.company; }).indexOf(comp.company) !== -1) {
								//console.log(ret)
								for( var j in ret){
									if(ret[j].company == comp.company){
										ret[j].value = ret[j].value + ", " + argv3;
										break;
									}
								} 
							} else {
						       		ret.push({
  			         	                     		company: comp.company,
                        		                     		name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" :""),
                       			                     		value: argv3
								});
							}
						});
						if (idx === (processedArgv3.length - 1)){
                                                	sendData(ret);
                                                	tldb.end();
						}
					}
				});
			});
		});
	} else {
	    tldb.query("SELECT * FROM tbl_modules WHERE internal_name = ?", [ process.argv[3] ], (err, rows, fields) => {
		var module = rows[0];
	    
	    tldb.query("SELECT tbl_company.* FROM tbl_company, tbl_company_modules WHERE disabled = 0 AND tbl_company_modules.company = tbl_company.company AND tbl_company_modules.module_id = ?", [ module.module_id ], (err, rows, fields) => {

			if (err)
				console.log(JSON.stringify({ rows: rows, fields: fields }));
			else {
				var ret = [];
		    rows.forEach((comp) => {
			console.log(comp)
				if (process.argv[4]){
				if (process.argv[4].includes(",")){
					var processedArgv4 = process.argv[4].split(",");
					var set = null;
	
                                        try {
                                                set = JSON.parse(comp.ui_settings);
                                        } catch (err) {
                                                set = null;
                                        }

                                        if (set && set.tracelink && set.tracelink[process.argv[3]]) { // works only for Tracelink
						processedArgv4.forEach((args, index) => {
							if (ret.map((e) => { return e.company; }).indexOf(comp.company) !== -1) {
                                                                //console.log(ret)
                                                                for( var j in ret){
                                                                        if(ret[j].company == comp.company){
                                                                                ret[j].value = ret[j].value + ", " + processedArgv4[index] + ": " + (set.tracelink[process.argv[3]][args] == 1 ? "Ja" : (set.tracelink[process.argv[3]][args] == 0 ? "Nej" : set.tracelink[process.argv[3]][args] ));
                                                                                break;
                                                                        }
                                                                }
                                                        } else {							
								ret.push({
									company: comp.company,
									name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" :""),
									value: processedArgv4[index] + ": " + (set.tracelink[process.argv[3]][args] == 1 ? "Ja" : (set.tracelink[process.argv[3]][args] == 0 ? "Nej" : set.tracelink[process.argv[3]][args] ))
								});
							}
						});
					}
				} else if (process.argv[4] == "0"){ // only check for module
					ret.push({
						company: comp.company,
						name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" :""),
						value: "n/a"
					});
				} else {
					var set = null;

					try {
						set = JSON.parse(comp.ui_settings);
					} catch (err) {
						set = null;
					}

					if (set && set.tracelink && set.tracelink[process.argv[3]]) { // works only for Tracelink
						if (process.argv[5] === undefined) // just show the setting
							ret.push({
								company: comp.company,
								name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" :""),
								value: set.tracelink[process.argv[3]][process.argv[4]]
							});
						else if (process.argv[5].length && set.tracelink[process.argv[3]][process.argv[4]] == process.argv[5])
							ret.push({
								company: comp.company,
								name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" :""),
								value: set.tracelink[process.argv[3]][process.argv[4]]
							});
					}
				}
			} else {
				ret.push({
                                	company: comp.company,
                                        name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" :""),
                                        value: "n/a"
                                });
			}
		    });
		    
		    sendData(ret);

		    tldb.end();
		}
	    });
	});
	}
	break;
    }
}

