<?php

	require("funzioni.php");
	

	header('Content-Type : application/json');
	
		$table = "SELECT c.code, SUM(a.n) as tot, c.pr, c.cl, c.status FROM `country` as c, `attacksmall` as a WHERE c.code=a.dest GROUP BY a.dest";
		$query1 = "SELECT t.cl as id, AVG(t.tot) as mediacl FROM (".$table.") as t GROUP BY t.cl ORDER BY t.cl";
		$query2 = "SELECT t.pr as id, AVG(t.tot) as mediapr FROM (".$table.") as t GROUP BY t.pr ORDER BY t.pr";
		$query ="SELECT t1.id, t1.mediacl, t2.mediapr FROM(".$query1.") as t1, (".$query2.") as t2 WHERE t1.id = t2.id";
		
		echo carica_media($query);
	
	

?>