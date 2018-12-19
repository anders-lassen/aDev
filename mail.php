<?php

$name="=?utf-8?Q?Badelement_l=C3=B8sningsforslag.docx?=";
$name2="Ordre- og Produktionsstyring - Semtek.pdf";

function decode_qprint($str) {
    $str = preg_replace("/\=([A-F][A-F0-9])/","%$1",$str);
    $str = urldecode($str);
    $str = utf8_encode($str);
    return $str;
}

// echo utf8_decode($name);
// echo base64_decode($name, true);
// echo quoted_printable_decode($name);
// echo decode_qprint($name);

echo iconv_mime_decode($name, 0, "UTF-8");
echo "\n\n";
echo iconv_mime_decode($name2, 0, "UTF-8");

echo "<br>hello";