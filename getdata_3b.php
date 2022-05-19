<?php
require "connectToDB.php";
$names = array();
$emails = array();
$messages = array();
$data = array();
$i=0;


 mysqli_query($linkmy, 'SET NAMES utf8');

$result=mysqli_query($linkmy, "SELECT * FROM review"); // запрос на выборку сведений о пользователях
while ($row=mysqli_fetch_array($result)){// для каждой строки из запроса
$names[$i]=$row['name'];
$emails[$i]=$row['email'];
$messages[$i]=$row['message'];
$i++;
}
$data['names']=$names;
$data['emails']=$emails;
$data['messages']=$messages;
echo json_encode($data, JSON_UNESCAPED_UNICODE);

?>