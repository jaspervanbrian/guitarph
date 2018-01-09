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

if(isset($_SESSION['user']) && isset($_POST['id']))
{
	$username = $_SESSION['user'];
	$product_id = $_POST['id'];

	$wish = new Wish();
	$wish->delete($xml, $username, $product_id);
	echo "Success";
}
else
{
	header("Location: ../index.php");
}
