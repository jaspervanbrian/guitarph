<?php
require '../models/User.php';
use Model\User;

session_start();

if(isset($_SESSION['user']))
{
	header("Location: ../views/shop.php");
}

if(isset($_POST['create'])){
	$username= $_POST['newUsername'];
	$password= $_POST['newPassword'];
	$confirmPassword = $_POST['confirmPassword'];
	$firstName = $_POST['newFirstName'];
	$lastName = $_POST['newLastName'];
	$gender = $_POST['newGender'];
	$captcha = $_POST['captcha'];
	if(strcmp($captcha, $_SESSION['captcha_code']) == 0)
	{

		if($password === $confirmPassword)
		{
			$xml = new DomDocument();
			$xml->preserveWhiteSpace = false;
			$xml->formatOutput = true;
			$xml->load('../db/users.xml');
			$users = $xml->getElementsByTagName('user');
			$flag=0;
			foreach($users as $user)
			{
				if($user->getElementsByTagName('username')->item(0)->nodeValue === $username)
				{
					$flag=1;
					break;
				}
				else
				{
					$flag=0;
				}
			}
			if($flag==0)
			{
				$newUser = new User($username, $password, $firstName, $lastName, $gender);
				$newUser->save($xml);
				echo "Account Created Successfully!";
			}
			else if($flag==1)
			{
				echo "Username already taken. Please enter unique username.";
			}
		}
		else
		{
			echo "Passwords do not match.";
		}
	}
	else
	{
		echo "Captcha do not match.";
	}
}