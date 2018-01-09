<?php

require '../models/Cart.php';
use Model\Cart;

session_start();

if(!isset($_SESSION['user']))
{
	header("Location: ../index.php");
}

$xml = new DomDocument();
$xml->preserveWhiteSpace = false;
$xml->formatOutput = true;
$xml->load('../db/carts.xml');

if(isset($_SESSION['user']) && isset($_POST['id']))
{
	$username = $_SESSION['user'];
	$product_id = $_POST['id'];

	$cart = new Cart();
	$cart->delete($xml, $username, $product_id);
	echo "Success";
}
else
{
	header("Location: ../index.php");
}
