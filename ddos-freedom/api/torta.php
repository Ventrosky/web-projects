<?php

	require("funzioni.php");
	
	

	header('Content-Type : application/json');
	

		$query = "SELECT c.status, a.type, SUM(a.n) as tot FROM `country` as c, `attacksmall` as a WHERE c.code = a.dest GROUP BY a.type, c.status ORDER BY c.status, tot desc;";
		
		echo carica_pie($query);
	
	

?>