<?php

require '../models/Wish.php';
use Model\Wish;

session_start();

if(!isset($_SESSION['user']))
{
	header("Location: ../index.php");
}

$xml = new DomDocument();
$xml->preserveWhiteSpace = false;
$xml->formatOutput = true;
$xml->load('../db/wishes.xml');

if(isset($_SESSION['user']) && isset($_GET['request']))
{
	$username = $_SESSION['user'];

	$wish = new Wish();
	$myWish = $wish->getWish($xml, $username);
	echo json_encode($myWish);
}
else
{
	header("Location: ../index.php");
}