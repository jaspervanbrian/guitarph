<?php

session_start();
if(!isset($_SESSION['user']))
{
	header("Location: ../index.php");
}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>GuitarPH</title>
	<link rel="icon" href="../assets/logo.png" />
	<link rel="stylesheet" href="../assets/css/demo.css">
	<link rel="stylesheet" href="../assets/css/header.css">
	<script src="../assets/js/jquery-3.1.1.min.js"></script>
	<link rel="stylesheet" href="../assets/css/a/bootstrap.min.css">
	<script src="../assets/js/a/popper.min.js"></script>
	<script src="../assets/js/a/bootstrap.min.js"></script>
	<link rel="stylesheet" href="../assets/css/b/css/fontawesome-all.min.css">
	<link rel="stylesheet" href="../assets/css/shop.css">

	<script src="../assets/js/shop.js"></script>
</head>
<body>
<header class="header-user-dropdown">
	<div class="header-limiter">
		<h1><a href="#" id="Home"><i class="fab fa-gofore"></i>uitar<span>PH</span></a></h1>
		<nav>
			<a href="#" id="Acoustic">Acoustic Guitars</a>
			<a href="#" id="Electric">Electric Guitars</a>
			<a href="#" id="Bass">Bass Guitars</a>
		</nav>
		<nav style="line-height: 30px">
			<div class="input-group">
				<input type="text" class="form-control" style="position: relative;" name="search" id="search" placeholder="Enter keyword here">
				<span class="input-group-btn"><button class="btn btn-secondary" id="searchButton"><span class="fas fa-search"></span></button></span>
			</div>
			<div id="searchKeywords" style="position:absolute; z-index: 99999; background-color: white; color: black; max-height: 500px; width: 500px; overflow-y: scroll;">
			</div>
		</nav>
		<nav id="mainCart">
			<a href="#" style="top: 7px"><i class="fas fa-shopping-cart fa-2x"></i><span id="cart_count" class="header-new-feature"></span></a>
		</nav>
		<div class="header-user-menu">
			<img src="../assets/user.png" alt="User Image"/>
			<ul>
				<li><a href="#" data-toggle="modal" data-target="#myAccount">My Profile</a></li>
				<li id="mainWish"><a href="#">Wishlist</a></li>
				<li><a href="../controllers/LogoutController.php" class="highlight">Logout</a></li>
			</ul>
		</div>
	</div>
</header>
<div class="header-fixed-placeholder"></div>
<div id="imgHeader" class="d-flex justify-content-center">
</div>
<div class="container-fluid">
	<ol class="breadcrumb" id="breadcrumb">

	</ol>
</div>
<div class="container">
	<div class="row">
		<div class="col-12" id="Header">
			
		</div>
	</div>
	<div class="row" id="productsContainer">
		
	</div>
	<div class="row" id="paginationSection">
		<div class="col ">
			<nav aria-label="...">
				<ul class="pagination pagination-lg justify-content-center">
					<li class="page-item disabled">
						<a class="page-link" href="#!" tabindex="-1">Previous</a>
					</li>
					<li class="page-item disabled"><a class="page-link selected" href="#!">1</a></li>
					<li class="page-item"><a class="page-link" href="#!">2</a></li>
					<li class="page-item"><a class="page-link" href="#!">3</a></li>
					<li class="page-item"><a class="page-link" href="#!">4</a></li>
					<li class="page-item"><a class="page-link" href="#!">5</a></li>
					<li class="page-item"><a class="page-link" href="#!">6</a></li>
					<li class="page-item">
						<a class="page-link" href="#!">Next</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</div>
<script>
	$(document).ready(function(){
		var userMenu = $('.header-user-dropdown .header-user-menu');
		userMenu.on('touchend', function(e){
			userMenu.addClass('show');
			e.preventDefault();
			e.stopPropagation();
		});
		// This code makes the user dropdown work on mobile devices
		$(document).on('touchend', function(e){
			// If the page is touched anywhere outside the user menu, close it
			userMenu.removeClass('show');
		});

		var showHeaderAt = 100;

		var win = $(window),
				body = $('body');

		// Show the fixed header only on larger screen devices

		if(win.width() > 600){

			// When we scroll more than 150px down, we set the
			// "fixed" class on the body element.

			win.on('scroll', function(e){

				if(win.scrollTop() > showHeaderAt) {
					body.addClass('fixed');
				}
				else {
					body.removeClass('fixed');
				}
			});
		}
	});
</script>
<div id="modalHere">

</div>
<div class="modal fade" id="myAccount" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModal3Label">My Account</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="card">
					<img class="card-img-top h-50 w-75 align-self-center" src="../assets/user.png" alt="Card image cap">
					<div class="card-body">
						<?php
							$xml = new DomDocument();
							$xml->preserveWhiteSpace = false;
							$xml->formatOutput = true;
							$xml->load('../db/users.xml');
							$users = $xml->getElementsByTagName('user');

							$username = "";
							$firstName = "";
							$lastName = "";
							$gender = "";

							foreach($users as $user)
							{
								if(strcmp($_SESSION['user'], $user->getElementsByTagName('username')->item(0)->nodeValue) == 0)
								{
									$username = $_SESSION['user'];
									$firstName = $user->getElementsByTagName('firstName')->item(0)->nodeValue;
									$lastName = $user->getElementsByTagName('lastName')->item(0)->nodeValue;
									$gender = $user->getElementsByTagName('gender')->item(0)->nodeValue;
									break;
								}
							}
							echo 
							"<h4 class=\"card-title\">". $firstName ." ". $lastName ."</h4>
								<p class=\"card-text\">Username: <strong>" . $username . "</strong>" . "<br>
								Gender: " . $gender;
						?>
						</p>
						<a href="#!" class="btn btn-outline-dark" data-toggle="modal" data-target="#changePass"><i class="fas fa-key"></i> Change Password</a>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="changePass" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModal3Label">Change Password</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
        	<label for="formGroupExampleInput">Old Password</label>
        	<input type="password" class="form-control" id="oldPass">
        </div>
        <div class="form-group">
        	<label for="formGroupExampleInput2">New Password</label>
        	<input type="password" class="form-control" id="newPass">
        </div>
        <div class="form-group">
        	<label for="formGroupExampleInput2">Confirm New Password</label>
        	<input type="password" class="form-control" id="confirmNewPass">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-dark" id="savePass">Save changes</button>
      </div>
    </div>
  </div>
</div>
<script>
	$(document).ready(function(){
		$("#savePass").on('click', function(){
			var data =  {
				oldPassword: $("#oldPass").val(),
				newPassword: $("#newPass").val(),
				confirmNewPassword: $("#confirmNewPass").val(),
			};
			var request = $.ajax({
				url: '../controllers/ChangePasswordController.php',
				type: 'POST',
				data: data,
			});
			request.done(function(response, textstatus, jqXHR){
				if(response === "Success")
				{
					$("#oldPass").val("");
					$("#newPass").val("");
					$("#confirmNewPass").val("");
					$("#savePass").attr({
						"data-content": "The password has been changed.",
						"data-placement": 'top',
					}).popover('show');
					$('.popover').show();
					$("#savePass").on('mouseleave mouseout mouseenter mouseover', function(){
						$('.popover').fadeOut(2000, function(){ 
							$(this).remove(); 
						});
					});
				}
				else
				{
					$("#savePass").attr({
						"data-content": "Invalid passwords given.",
						"data-placement": 'top',
					}).popover('show');
					$('.popover').show();
					$("#savePass").on('mouseleave mouseout mouseenter mouseover', function(){
						$('.popover').fadeOut(2000, function(){ 
							$(this).remove(); 
						});
					});
				}
			});
			request.fail(function(jqXHR, textStatus, errorThrown){
				$("#savePass").attr({
						"data-content": errorThrown,
						"data-placement": 'top',
					}).popover('show');
					$('.popover').show();
					$("#savePass").on('mouseleave mouseout mouseenter mouseover', function(){
						$('.popover').fadeOut(2000, function(){ 
							$(this).remove(); 
						});
					});
			});
		});
	});
</script>
<div id="pusher">
	<!-- <table border="1px solid black" id="slip">
		<tbody>
			<tr>
				<td style="border:none !important; padding: 10px; text-align: center;" colspan="2"><h4><strong><samp>GuitarPH</samp></strong></h4></td>
			</tr>
			<tr>
				<td style="border:none !important; padding: 10px; text-align: center;" colspan="2"><samp>Payment Slip #</samp></td>
			</tr>
			<tr>
				<td style="border:none !important; padding: 10px;" colspan="2"><samp id="date"></samp></td>
			</tr>
			<tr>
				<td style="border:none !important; padding: 10px;"><br></td>
				<td style="border:none !important; padding: 10px;"><br></td>
			</tr>
			<tr>
				<td style="border:none !important; padding: 10px;"><samp>Fuel Type: </samp></td>
				<td style="border:none !important; padding: 10px; text-align: right;"><strong><samp id="fuelType"></samp></strong></td>
			</tr>
			<tr>
				<td style="border:none !important; padding: 10px;"><samp>Price per liter: </samp></td>
				<td style="border:none !important; padding: 10px; text-align: right;">₱<samp id="pricePerLiter"></samp></td>
			</tr>
			<tr>
				<td style="border:none !important; padding: 10px;"><samp>Purchase Amount: </samp></td>
				<td style="border:none !important; padding: 10px; text-align: right;">₱<samp id="purchaseAmount"></samp></td>
			</tr>
			<tr>
				<td style="border:none !important; padding: 10px;"><samp>VAT: </samp></td>
				<td style="border:none !important; padding: 10px; text-align: right;">₱<samp id="vat"></samp></td>
			</tr>
			<tr>
				<td style="border:none !important; padding: 10px;"><samp>Total Amount: </samp></td>
				<td style="border:none !important; padding: 10px; text-align: right;"><strong>₱<samp id="total"></samp></strong></td>
			</tr>
			<tr>
				<td style="border:none !important; padding: 10px;"><br></td>
				<td style="border:none !important; padding: 10px;"><br></td>
			</tr>
			<tr>
				<td style="border:none !important; padding: 10px;">Credit Card: </td>
				<td style="border:none !important; padding: 10px; text-align: right;"><samp id="creditCard"></samp></td>
			</tr>
		</tbody>
	</table> -->
</div>
<div id="footer">
<footer class="footer-distributed">
	<div class="footer-left">
		<h3><i class="fab fa-gofore"></i>uitar<span>PH</span></h3>
		<p class="footer-company-name">All Rights Reserved. &copy; 2017</p>
	</div>
	<div class="footer-center">
		<div>
			<i class="fas fa-map-marker-alt"></i>
			<p><span>4F 112 Aguirre</span> Legaspi Village, Makati</p>
		</div>
		<div>
			<i class="fas fa-phone"></i>
			<p>02 7096671</p>
		</div>
		<div>
			<i class="fas fa-envelope"></i>
			<p>guitarph@gmail.com</p>
		</div>
	</div>
	<div class="footer-right">
		<p class="footer-company-about">
			<span>About the company</span>
			The mellow shop for the melodic souls! GuitarPH is a retailing shop that started in 2017 that focuses on selling guitars. We are operating 24/7 and feel free to visit the main branch at Makati!
		</p>
		<div class="footer-icons">
			<a><i class="fab fa-facebook"></i></a>
			<a><i class="fab fa-twitter"></i></a>
			<a><i class="fab fa-linkedin"></i></a>
			<a><i class="fab fa-github"></i></a>
		</div>
	</div>
</footer>
</div>
</body>
</html>