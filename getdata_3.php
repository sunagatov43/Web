<?php
require "bd_data.php";

$need = $_GET['fneed'];
$tekush = $_GET['ftekush'];

$header2 = array();
$desc2 = array();
$img2 = array();
$data = array();

$range=0;
$range=$tekush+$need;

$header2 = array_slice($header,$tekush,$range);
$desc2 = array_slice($desc,$tekush,$range);
$img2 = array_slice($img,$tekush,$range);
	
$data['header']=$header2;
$data['desc']=$desc2;
$data['img']=$img2;

echo json_encode($data, JSON_UNESCAPED_UNICODE);

?>