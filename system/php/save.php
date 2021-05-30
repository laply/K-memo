<?php
    
    $name = $_GET["name"];
    $data = $_GET["data"];

    $myfile = fopen($name.".txt", "w") or die("Unable to open file!");
    
    header('Content-type: text/plain');
    header('Content-Disposition: attachment; filename='.$name.date("Ymd"));
    header('Content-Transfer-Encoding: binary'); 
    header('Content-length: ' . filesize($file));
    header('Expires: 0'); header("Pragma: public");

    fwrite($myfile, $data);
    fclose($myfile);
?>


