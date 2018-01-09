<?php
	
	require '../models/Captcha.php';
	use Model\Captcha;
	
	session_start();
	
	/*create class object*/
	$phptextObj = new Captcha();	
	/*phptext function to genrate image with text*/
	$phptextObj->phpcaptcha('#162453','#fff',120,40,10,25);