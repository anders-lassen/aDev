/*
 * Copyright (c) 2017 Tracelink ApS - www.tracelink.dk - info@tracelink.dk
 * -----------------------------------------------------------------------
 *
 * File-created: "2018-01-22 09:45:22 by hjk"
 *
 * Calculate flex and overtime
 * Script is executed every night for all companies, that use the inout module
 * Can also be executed for a single company and/or a single user.
 * If no date is given as input, it runs for todays date
 *
 */

/* args
 * 0  : node
 * 1  : script name
 * 2  : company
 * 3  : user
 * 4  : date
 */

process.stdout.write(JSON.stringify("script startet"));
