<?php

$cwd='/';
$descriptorspec = array(
    0 => array("pipe", "r"),
    1 => array("pipe", "w"),
    2 => array("file", "./tmp/error-output.txt", "a") );
    
$env = array("NODE_PATH" => "C:/Users/Heidi Tracelink/AppData/Roaming/npm/node_modules","TRACELINK_LOGIN" => "33782837" . ":" . "arl" . ":" . "81dc9bdb52d04dc20036dbd8313ed055");

$process = proc_open("C:/nodejs/node.exe C:/wamp64/www/aDev/node-test/node-file.js", $descriptorspec, $pipes, $cwd);

if (is_resource($process)) {
    // $pipes now looks like this:
    // 0 => writeable handle connected to child stdin
    // 1 => readable handle connected to child stdout
    // 2 => readable handle connected to child stderr
    
    fwrite($pipes[0], "10 2018");
    fclose($pipes[0]);
    
    echo stream_get_contents($pipes[1])."\n";
    fclose($pipes[1]);

    // echo stream_get_contents($pipes[2]);
    // fclose($pipes[2]);

    // It is important that you close any pipes before calling
    // proc_close in order to avoid a deadlock
    echo proc_close($process);
}
?>