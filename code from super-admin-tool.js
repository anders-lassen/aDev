if (process.argv[3].length > 1) {

    var ret = [];
    process.argv[3].forEach(function (argv3, idx) {
        console.log(argv3);
        tldb.query("SELECT * FROM tbl_modules WHERE internal_name = ?", [argv3], (err, rows, fields) => {
            var module = rows[0];

            tldb.query("SELECT tbl_company.* FROM tbl_company, tbl_company_modules WHERE disabled = 0 AND tbl_company_modules.company = tbl_company.company AND tbl_company_modules.module_id = ?", [module.module_id], (err, rows, fields) => {
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
                            for (var j in ret) {
                                if (ret[j].company == comp.company) {
                                    ret[j].value = ret[j].value + ", " + argv3;
                                    break;
                                }
                            }
                        } else {
                            ret.push({
                                company: comp.company,
                                name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
                                value: argv3
                            });
                        }
                    });
                    if (idx === (process.argv[3].length - 1)) {
                        sendData(ret);
                        tldb.end();
                    }
                }
            });
        });
    });
} else {
    process.argv[3] = process.argv[3].toString();
    console.log(process.argv[3]);

    tldb.query("SELECT * FROM tbl_modules WHERE internal_name = ?", [process.argv[3]], (err, rows, fields) => {
        var module = rows[0];

        tldb.query("SELECT tbl_company.* FROM tbl_company, tbl_company_modules WHERE disabled = 0 AND tbl_company_modules.company = tbl_company.company AND tbl_company_modules.module_id = ?", [module.module_id], (err, rows, fields) => {

            if (err)
                console.log(JSON.stringify({ rows: rows, fields: fields }));
            else {
                var ret = [];
                rows.forEach((comp) => {
                    //console.log(comp)
                    if (process.argv[4]) {
                        if (process.argv[4].includes(",")) {
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
                                        for (var j in ret) {
                                            if (ret[j].company == comp.company) {
                                                ret[j].value = ret[j].value + ", " + processedArgv4[index] + ": " + (set.tracelink[process.argv[3]][args] == 1 ? "Ja" : (set.tracelink[process.argv[3]][args] == 0 ? "Nej" : set.tracelink[process.argv[3]][args]));
                                                break;
                                            }
                                        }
                                    } else {
                                        ret.push({
                                            company: comp.company,
                                            name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
                                            value: processedArgv4[index] + ": " + (set.tracelink[process.argv[3]][args] == 1 ? "Ja" : (set.tracelink[process.argv[3]][args] == 0 ? "Nej" : set.tracelink[process.argv[3]][args]))
                                        });
                                    }
                                });
                            }
                        } else if (process.argv[4] == "0") { // only check for module
                            ret.push({
                                company: comp.company,
                                name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
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
                                        name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
                                        value: set.tracelink[process.argv[3]][process.argv[4]]
                                    });
                                else if (process.argv[5].length && set.tracelink[process.argv[3]][process.argv[4]] == process.argv[5])
                                    ret.push({
                                        company: comp.company,
                                        name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
                                        value: set.tracelink[process.argv[3]][process.argv[4]]
                                    });
                            }
                        }
                    } else {
                        ret.push({
                            company: comp.company,
                            name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
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

if (process.argv[3].includes(",")) {

    var processedArgv3 = process.argv[3].split(",");
    //console.log(processedArgv3);
    var ret = [];
    processedArgv3.forEach((argv3, idx) => {
        tldb.query("SELECT * FROM tbl_modules WHERE internal_name = ?", [argv3], (err, rows, fields) => {
            var module = rows[0];

            tldb.query("SELECT tbl_company.* FROM tbl_company, tbl_company_modules WHERE disabled = 0 AND tbl_company_modules.company = tbl_company.company AND tbl_company_modules.module_id = ?", [module.module_id], (err, rows, fields) => {
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
                            for (var j in ret) {
                                if (ret[j].company == comp.company) {
                                    ret[j].value = ret[j].value + ", " + argv3;
                                    break;
                                }
                            }
                        } else {
                            ret.push({
                                company: comp.company,
                                name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
                                value: argv3
                            });
                        }
                    });
                    if (idx === (processedArgv3.length - 1)) {
                        sendData(ret);
                        tldb.end();
                    }
                }
            });
        });
    });
} else {
    tldb.query("SELECT * FROM tbl_modules WHERE internal_name = ?", [process.argv[3]], (err, rows, fields) => {
        var module = rows[0];

        tldb.query("SELECT tbl_company.* FROM tbl_company, tbl_company_modules WHERE disabled = 0 AND tbl_company_modules.company = tbl_company.company AND tbl_company_modules.module_id = ?", [module.module_id], (err, rows, fields) => {

            if (err)
                console.log(JSON.stringify({ rows: rows, fields: fields }));
            else {
                var ret = [];
                rows.forEach((comp) => {
                    //console.log(comp)
                    if (process.argv[4]) {
                        if (process.argv[4].includes(",")) {
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
                                        for (var j in ret) {
                                            if (ret[j].company == comp.company) {
                                                ret[j].value = ret[j].value + ", " + processedArgv4[index] + ": " + (set.tracelink[process.argv[3]][args] == 1 ? "Ja" : (set.tracelink[process.argv[3]][args] == 0 ? "Nej" : set.tracelink[process.argv[3]][args]));
                                                break;
                                            }
                                        }
                                    } else {
                                        ret.push({
                                            company: comp.company,
                                            name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
                                            value: processedArgv4[index] + ": " + (set.tracelink[process.argv[3]][args] == 1 ? "Ja" : (set.tracelink[process.argv[3]][args] == 0 ? "Nej" : set.tracelink[process.argv[3]][args]))
                                        });
                                    }
                                });
                            }
                        } else if (process.argv[4] == "0") { // only check for module
                            ret.push({
                                company: comp.company,
                                name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
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
                                        name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
                                        value: set.tracelink[process.argv[3]][process.argv[4]]
                                    });
                                else if (process.argv[5].length && set.tracelink[process.argv[3]][process.argv[4]] == process.argv[5])
                                    ret.push({
                                        company: comp.company,
                                        name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
                                        value: set.tracelink[process.argv[3]][process.argv[4]]
                                    });
                            }
                        }
                    } else {
                        ret.push({
                            company: comp.company,
                            name: comp.name + (comp.phone ? " (tlf: " + comp.phone + ")" : ""),
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