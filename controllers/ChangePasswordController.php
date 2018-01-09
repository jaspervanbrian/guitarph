<?php

session_start();

if(!isset($_SESSION['user']))
{
	header("Location: ../index.php");
}

if(isset($_SESSION['user']) && isset($_POST['oldPassword']))
{
	if(strcmp($_POST['newPassword'], $_POST['confirmNewPassword']) == 0)
	{
		$oldPassword = $_POST['oldPassword'];
		$newPassword = $_POST['newPassword'];
		$xml = new DomDocument();
		$xml->preserveWhiteSpace = false;
		$xml->formatOutput = true;
		$xml->load('../db/users.xml');
		$users = $xml->getElementsByTagName('user');
		foreach($users as $user)
		{
			if(strcmp($_SESSION['user'], $user->getElementsByTagName('username')->item(0)->nodeValue) == 0)
			{
				if(strcmp($oldPassword, $user->getElementsByTagName('password')->item(0)->nodeValue) == 0)
				{
					$user->getElementsByTagName('password')->item(0)->nodeValue = $newPassword;
					$xml->save('../db/users.xml');
					echo "Success";
					break;
				}
				else
				{
					echo "Invalid";
					break;
				}
			}
		}
	}
	else
	{
		echo "Invalid";
	}
}
else
{
	header("Location: ../index.php");
}