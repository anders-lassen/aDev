/***********************************************************************
 *  ---------------------
 *   C A L E N D A R   P R I N T
 *  ---------------------
 ***********************************************************************/

var calprt = {
	header_pre: "<html><head>",
	header: 
		'    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">'
		+ '    <link rel="stylesheet" href="http://' + location.hostname + '/admin/reset.css" />'
		+ '    <link rel="stylesheet" href="http://' + location.hostname + '/admin/font/fontello.css" />'
		+ '    <link rel="stylesheet" href="http://' + location.hostname + '/admin/js-lib/fullcalendar.css" />'
		+ '    <link rel="stylesheet" href="http://' + location.hostname + '/admin/js-lib/scheduler.min.css" />'
		+ '    <link rel="stylesheet" media="print" href="http://' + location.hostname + '/admin/js-lib/fullcalendar.print.css?' + moment().unix() + '" />' // 
		+ '    <link rel="stylesheet" href="http://' + location.hostname + '/admin/form-style-2.css?' + moment().unix() + '" />'
		+ '    <link rel="stylesheet" href="http://' + location.hostname + '/admin/modules/common/company.company/form-style.css?' + moment().unix() + '" />'
		+ '    <script src="http://' + location.hostname + '/admin/js-lib/jquery-2.2.0.min.js" ></script>',
	header_post: '</head></html><body>',
	footer: '</body></html>',
	html: "",

	init: function () {
		// do something 
		calprt.make();
	},
	generateHeader: function () {
		return calprt.header_pre + calprt.header + calprt.header_post;
	},
	generateContent: function () {
		var container = $("#schedule-container").html()
		var html = container;

		return html;
	},
	make: function () {
		var header = calprt.generateHeader();
		var html = calprt.generateContent();

		var preview = window.open("", "_blank", "width=20cm");
		preview.document.body.innerHTML = header + html + calprt.footer;
		// preview.window.print();
	}
}
