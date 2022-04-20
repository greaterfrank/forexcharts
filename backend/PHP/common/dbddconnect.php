<?php

	$host_name = 'localhost';
	$database = 'fxratedb';
	$user_name = 'dbuser';
	$password = 'dbpass';

	$con=mysqli_connect($host_name,$user_name,$password,$database);
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
?>