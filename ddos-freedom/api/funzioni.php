<?php

	

	function carica_dati($query)
	{
		require("config.php");
		
		$campi_tabella = array(
			'id',
			'dest',
			'type',
			'n',
			'mins'
	    );
	
		$risultato = array();
		$i = 0;
		$risultato_query = mysqli_query($conn, $query);
		if($risultato_query != false && mysqli_num_rows($risultato_query) > 0)
		{
			while($riga = mysqli_fetch_assoc($risultato_query))
			{
				$risultato[$i] = array();
				foreach($campi_tabella as $campo)
					$risultato [$i][$campo] = utf8_encode($riga[$campo]);
				$i++;				
			}
			
			return json_encode($risultato);
		}
		else
		{			
			return json_encode(array("status" => "error", "details" => "nessun risultato"));
		}
	}

	function carica_density($query)
	{
		require("config.php");


		$campi_tabella = array(
			'code',
			'tot',
			'pr',
			'cl',
			'status'
	    );
	
		$risultato = array();
		$i = 0;
		$risultato_query = mysqli_query($conn, $query);
		if($risultato_query != false && mysqli_num_rows($risultato_query) > 0)
		{
			while($riga = mysqli_fetch_assoc($risultato_query))
			{
				$risultato[$i] = array();
				foreach($campi_tabella as $campo)
					$risultato [$i][$campo] = utf8_encode($riga[$campo]);
				$i++;				
			}


			return json_encode($risultato);
		}
		else
		{			
			return json_encode(array("status" => "error", "details" => "nessun risultato"));
		}
	}

	function carica_pie($query)
	{
		require("config.php");



		$campi_tabella = array(
			'status',
			'type',
			'tot'
	    );
	
		$risultato = array();
		$i = 0;
		$risultato_query = mysqli_query($conn, $query);
		if($risultato_query != false && mysqli_num_rows($risultato_query) > 0)
		{
			while($riga = mysqli_fetch_assoc($risultato_query))
			{
				$risultato[$i] = array();
				foreach($campi_tabella as $campo)
					$risultato [$i][$campo] = utf8_encode($riga[$campo]);
				$i++;				
			}

			return json_encode($risultato);
		}
		else
		{			
			return json_encode(array("status" => "error", "details" => "nessun risultato"));
		}
	}

	function carica_media($query)
	{
		require("config.php");


		$campi_tabella = array(
			'id',
			'mediacl',
			'mediapr'
	    );
	
		$risultato = array();
		$i = 0;
		$risultato_query = mysqli_query($conn, $query);
		if($risultato_query != false && mysqli_num_rows($risultato_query) > 0)
		{
			while($riga = mysqli_fetch_assoc($risultato_query))
			{
				$risultato[$i] = array();
				foreach($campi_tabella as $campo)
					$risultato [$i][$campo] = utf8_encode($riga[$campo]);
				$i++;				
			}

			return json_encode($risultato);
		}
		else
		{			
			return json_encode(array("status" => "error", "details" => "nessun risultato"));
		}
	}

	function controlla_get($campo)
	{
		if(isset($_GET[$campo]))
		{
			return true;
		}
		else
		{
			return json_encode(array("status" => "error", "details" => "parametro mancante"));
		}
	}


	function debug_to_console( $data ) {

	    if ( is_array( $data ) )
	        $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
	    else
	        $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";
	
	    echo $output;
	}
	

?>