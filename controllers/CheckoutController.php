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

if(isset($_SESSION['user']) && isset($_GET['request']))
{
	$username = $_SESSION['user'];

	$cart = new Cart();
	$myCart = $cart->checkout($xml, $username);
	echo json_encode($myCart);
}
else
{
	header("Location: ../index.php");
}