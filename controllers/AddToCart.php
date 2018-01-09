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
	$quantity = $_POST['qty'];

	$cart = new Cart();
	$cart->add($xml, $username, $product_id, $quantity);
	echo "Success";
}
else
{
	header("Location: ../index.php");
}
