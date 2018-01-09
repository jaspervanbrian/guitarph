<?php
require '../models/User.php';
use Model\User;

session_start();

if(isset($_SESSION['user']))
{
	header("Location: ../views/shop.php");
}

$xml = new DomDocument();
$xml->load('../db/users.xml');
$users = $xml->getElementsByTagName('user');
$flag=2;

if(isset($_POST['login']))
{
	$username=$_POST['username'];
	$password=$_POST['password'];

	for($x=0;$x<$users->length;$x++){
		$a = $xml->getElementsByTagName('user')->item($x);
		$z = $a->getElementsByTagName('username');
		$y = $a->getElementsByTagName('password');
		if($z->item(0)->nodeValue==$username && $y->item(0)->nodeValue==$password){
			$flag=0;
			break;
		}
		else if($z->item(0)->nodeValue==$username && $y->item(0)->nodeValue!=$password){
			$flag=1;
			break;
		}
		else
		{   
			$flag=2;
		}
	}
	if($flag==0){
		$_SESSION['user'] = "Success";
		echo "Success";
	}
	else if($flag==1 || $flag==2){
		echo "Wrong username or password.";
	}
}
else
{
	header("Location: ../index.php");
}