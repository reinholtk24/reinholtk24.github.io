<?php
    $fp = fopen('names.json', 'w');
    fwrite($fp, json_encode($_POST['name']));
    fclose($fp);
?>