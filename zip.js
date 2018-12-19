// 
//  Dette script har kode til zip funktionaliteten
//  Er udviklet og sendt til test. opdateres ikke hvis godkendt.
// 

$(document).on("click", "#zip-click", function(){
    console.log("generate zip");
    generateZip();
});

var zip = new JSZip();

// create a file
zip.file("hello.txt", "Hello World\n");

// create a file and a folder
zip.file("nested/hello.txt", "Hello World\n");

var photoZip = zip.folder("photos");
// this call will create photos/README
photoZip.file("README", "a folder with photos");

zip.file("hello.txt").async("string").then(function (data) {
    // data is "Hello World\n"
    $(".zip").append("<p>" + data + "</p>");
});

if (JSZip.support.uint8array) {
    zip.file("hello.txt").async("uint8array").then(function (data) {
        // data is Uint8Array { 0=72, 1=101, 2=108, more...}
        console.log(data);
    });
}

// loading a file and add it in a zip file
JSZipUtils.getBinaryContent("/filestore/DC76F0F7-0F76-484A-B4B6-E3D6D9F061BB/documents/0/0/452.txt", function (err, data) {
    if(err) {
       throw err; // or handle the error
    }
    // var zip = new JSZip();
    zip.file("text.txt", data, {binary:true});
}); 

// loading a file and add it in a zip file
JSZipUtils.getBinaryContent("img/image001.png", function (err, data) {
    if(err) {
       throw err; // or handle the error
    }
    // var zip = new JSZip();
    zip.file("picture.png", data, {binary:true});
});

// loading a file and add it in a zip file
JSZipUtils.getBinaryContent("download/style.css", function (err, data) {
    if(err) {
       throw err; // or handle the error
    }
    // var zip = new JSZip();
    zip.file("style.css", data, {binary:true});
});



function generateZip(){
    console.log("generating zip");
    // Generate zip ***
    zip.generateAsync({ type: "blob" })
    .then(function (blob) {
        saveAs(blob, "zip/hello.zip");
    }, function (err) {
        jQuery("#blob").text(err);
    });
}

var reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = function () {
  console.log(reader.result);
};
reader.onerror = function (error) {
  console.log('Error: ', error);
};


			// loading a file and add it in a zip file

			// JSZipUtils.getBinaryContent(u.url, function (err, data) {
			// 	if (err) {
			// 		throw err; // or handle the error
			// 	}
			// 	zip.file(k + u.name, data, { binary: true });
			// });
			// loading a file and add it in a zip file
			// JSZipUtils.getBinaryContent("/filestore/DC76F0F7-0F76-484A-B4B6-E3D6D9F061BB/documents/0/0/452.txt", function (err, data) {
			// 	if(err) {
			// 	throw err; // or handle the error
			// 	}
			// 	// var zip = new JSZip();
			// 	zip.file("text.txt", data, {binary:true});
            // }); 
            

            var promise = $.get(u.url);
			zip.file(u.name, promise); 