<?php
require "connectToDB.php";

$name=json_decode($_GET['sname']);
$email=json_decode($_GET['semail']);
$message=json_decode($_GET['smess']);


 mysqli_query($linkmy, 'SET NAMES utf8');
 
 $sql_add = "INSERT INTO review SET name='".$name.
"', email='".$email."', message='".$message. "'";
 mysqli_query($linkmy, $sql_add); // Выполнение запроса
 if (mysqli_affected_rows($linkmy)>0) // если нет ошибок при выполнении запроса
 { print "Спасибо, вы зарегистрированы в базе данных.";
 }
 else { print "Ошибка сохранения."; 
 }

 ?>