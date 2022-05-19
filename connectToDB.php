<?php
define ("HOST", "localhost");
define ("USER", "f0675328_Ilgiz");
define ("PASS", "12345");
define ("DB", "f0675328_student");
 
 $linkmy = @mysqli_connect(HOST, USER, PASS, DB) or die ('Не получилось из-за @mysqli_connect :(');
 mysqli_select_db($linkmy, "f0675328_student") or die("Нет такой таблицы!");
 ?>