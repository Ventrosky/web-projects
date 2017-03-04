<?php

	require("funzioni.php");
	
	

	header('Content-Type : application/json');
	if(isset($_GET['status']))
	{
		$status = $_GET['status'];
		

		$query = "SELECT c.code, SUM(a.n) as tot, c.pr, c.cl, c.status FROM `country` as c, `attacksmall` as a WHERE c.code=a.dest AND c.status = '$status' GROUP BY a.dest ORDER BY tot desc;";
		
		echo carica_density($query);
	}
	else
	{
		echo json_encode(array("status" => "error", "details" => "parametro mancante"));
	}
	

?>