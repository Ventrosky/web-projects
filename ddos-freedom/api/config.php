<?php
//$conn = mysqli_connect("","", NULL);
$conn = mysqli_connect("","", "");
if(!$conn) die("Errore connessione".mysqli_error()); 

//$ok = mysqli_select_db($conn ,"");
$ok = mysqli_select_db($conn ,"");

if(!$ok) die("Errore selez. DB progetto ".mysql_errno()); 



?>