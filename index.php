<?php
session_start();

if(isset($_SESSION['user']))
{
	header("Location: views/shop.php"); 
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Login | GuitarPH</title>
	<link rel="icon" href="assets/logo.png" />
	<script src="assets/js/jquery-3.1.1.min.js"></script>
	<link rel="stylesheet" href="assets/css/login.css">
	<script src="assets/js/login.js"></script>
	<link rel="stylesheet" href="assets/css/b/css/fontawesome-all.min.css">
</head>
<body>
	<div class="login-page">
	  <div class="form">
	  	<h1 id="GuitarPH"><i class="fab fa-gofore"></i>uitar<span id="PH">PH</span></h1>
	    <form class="register-form" id="register-form" action="controllers/RegisterController.php" method="POST">
	      <input type="text" name="newFirstName" id="newFirstName" placeholder="First Name" required/>
	      <input type="text" name="newLastName" id="newLastName" placeholder="Last Name" required/>
	      <input type="text" name="newGender" id="newGender" placeholder="Gender" required/>
	      <input type="text" name="newUsername" id="newUsername" placeholder="Username" required/>
	      <input type="password" name="newPassword" id="newPassword" placeholder="Password" required/>
	      <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required/>
	      <img src="controllers/CaptchaController.php?rand=<?php echo rand();?>" id="captchaImage">
	      <input type="text" name="captcha" id="captcha" placeholder="Verify Captcha" required/>
	      <p class="message">Can't read the captcha? click <a href='#' id="refreshCaptcha">here</a> to refresh.</p>
	      <br>
	      <button type="submit" name="create" value="1" id="create">Create Account</button>
	      <p class="message">Already registered? <a href="#" id="signIn">Sign In</a></p>
	    </form>
	    <form class="login-form" id="login-form" action="controllers/LoginController.php" method="POST">
	      <input type="text" name="username" id="username" placeholder="Username"/>
	      <input type="password" name="password" id="password" placeholder="Password"/>
	      <button type="button" name="login" id="login" value="1">Login</button>
	      <p class="message">Not registered? <a href="#" id="createAnAccount">Create an account</a></p>
	    </form>
	  </div>
	  <div id="flash-message" class="alert" role="alert" hidden></div>
	</div>
</body>
</html>