<?php

session_start();

if(!isset($_SESSION['user']))
{
	header("Location: ../index.php");
}
else
{
	if(isset($_POST['username']))
	{
		$_SESSION['user'] = $_POST['username'];
	}
	header("Location: ../views/shop.php"); 
}