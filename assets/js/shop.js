$(document).ready(function(){
	var $productsContainer = $("#productsContainer");
	var $breadcrumb = $("#breadcrumb");
	var $pagination = $("ul.pagination");
	$("#searchKeywords").hide();
	// var $pages = $pagination.find(".page-item");
	// initial page
	var data = {
		category: "Home",
		start: 0*6,
		end: (0*6)+6,
	};
	$("#imgHeader").empty().css("background-color", "#fac451").append('<img src="../assets/home.png" alt="home">');
	pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
	$(".header-limiter").on('click', "#Home", function(){
		data = {
			category: "Home",
			start: 0*6,
			end: (0*6)+6,
		};
		$pagination.show();
		$pagination.empty().append('<li class="page-item disabled"><a class="page-link" href="#!" tabindex="-1">Previous</a></li><li class="page-item disabled"><a class="page-link selected" href="#!">1</a></li><li class="page-item"><a class="page-link" href="#!">2</a></li><li class="page-item"><a class="page-link" href="#!">3</a></li><li class="page-item"><a class="page-link" href="#!">4</a></li><li class="page-item"><a class="page-link" href="#!">5</a></li><li class="page-item"><a class="page-link" href="#!">6</a></li><li class="page-item"><a class="page-link" href="#!">Next</a></li>');
		pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
		scrollToTop();
	});
	$(".header-limiter").on('click', "#Acoustic", function(){
		data = {
			category: "Acoustic",
			start: 0*6,
			end: (0*6)+6,
		};
		$pagination.show();
		$pagination.empty().append('<li class="page-item disabled"><a class="page-link" href="#!" tabindex="-1">Previous</a></li><li class="page-item disabled"><a class="page-link selected" href="#!">1</a></li><li class="page-item"><a class="page-link" href="#!">2</a></li><li class="page-item"><a class="page-link" href="#!">Next</a></li>');
		pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
		scrollToTop();
	});
	$(".header-limiter").on('click', "#Electric", function(){
		data = {
			category: "Electric",
			start: 0*6,
			end: (0*6)+6,
		};
		$pagination.show();
		$pagination.empty().append('<li class="page-item disabled"><a class="page-link" href="#!" tabindex="-1">Previous</a></li><li class="page-item disabled"><a class="page-link selected" href="#!">1</a></li><li class="page-item"><a class="page-link" href="#!">2</a></li><li class="page-item"><a class="page-link" href="#!">Next</a></li>');
		pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
		scrollToTop();
	});
	$(".header-limiter").on('click', "#Bass", function(){
		data = {
			category: "Bass",
			start: 0*6,
			end: (0*6)+6,
		};
		$pagination.show();
		$pagination.empty().append('<li class="page-item disabled"><a class="page-link" href="#!" tabindex="-1">Previous</a></li><li class="page-item disabled"><a class="page-link selected" href="#!">1</a></li><li class="page-item"><a class="page-link" href="#!">2</a></li><li class="page-item"><a class="page-link" href="#!">Next</a></li>');
		pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
		scrollToTop();
	});
	$pagination.on('click', ".page-item", function(){
		if(!($(this).hasClass("disabled")))
		{
			if($.trim($(this).text()) === "Previous")
			{
				var toPage = parseInt($pagination.find(".page-item").find(".selected").text(), 10)-1;
				data.start = getStart(toPage.toString());
				data.end = getEnd(toPage.toString());
				$pagination.find(".page-item").removeClass("disabled").find(".page-link").removeClass("selected");
				if(toPage === 1)
				{
					$(this).addClass("disabled");
				}
				$pagination.find(":contains('" + toPage + "')").addClass("disabled").find(".page-link").addClass("selected");
				pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
			}
			else if($.trim($(this).text()) === "Next")
			{
				var toPage = parseInt($pagination.find(".page-item").find(".selected").text(), 10)+1;
				data.start = getStart(toPage.toString());
				data.end = getEnd(toPage.toString());
				$pagination.find(".page-item").removeClass("disabled").find(".page-link").removeClass("selected");
				if(data.category === "Home")
				{
					if(toPage === 6)
					{
						$(this).addClass("disabled");
					}
				}
				else
				{
					if(toPage === 2)
					{
						$(this).addClass("disabled");
					}
				}
				$pagination.find(":contains('" + toPage + "')").addClass("disabled").find(".page-link").addClass("selected");
				pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
			}
			else
			{
				data.start = getStart($(this).text());
				data.end = getEnd($(this).text());
				$pagination.find(".page-item").removeClass("disabled").find(".page-link").removeClass("selected");
				if($(this).text() === "1")
				{
					$pagination.find(":contains('Previous')").addClass("disabled");
					$pagination.find(":contains('Next')").removeClass("disabled");
				}
				if(data.category === "Home")
				{
					if($(this).text() === "6")
					{
						$pagination.find(":contains('Previous')").removeClass("disabled");
						$pagination.find(":contains('Next')").addClass("disabled");
					}
				}
				else
				{
					if($(this).text() === "2")
					{
						$pagination.find(":contains('Previous')").removeClass("disabled");
						$pagination.find(":contains('Next')").addClass("disabled");
					}
				}
				$(this).addClass("disabled").find(".page-link").addClass("selected");
				pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
			}
			if(data.category === "Home")
			{
				$('body,html').animate({
					scrollTop: 642
				}, 600);
			}
			else if(data.category === "Acoustic")
			{
				$('body,html').animate({
					scrollTop: 713
				}, 600);
			}
			else if(data.category === "Electric")
			{
				$('body,html').animate({
					scrollTop: 460
				}, 600);
			}
			else if(data.category === "Bass")
			{
				$('body,html').animate({
					scrollTop: 714
				}, 600);
			}
		}
	});
	$("#modalHere").on('change', '.quantity', function(){
		if($(this).val() <= 0)
		{
			$(this).val(1);
		}
	});
	$("#modalHere").on('click', '.addToCart', function(){
		var $thisButton = $(this);
		$('.popover').remove();
		var order = {
			id: $(this).closest(".modal").attr("id"),
			qty: $(this).closest(".modal").find(".quantity").val(),
		};
		var request = $.ajax({
			url: '../controllers/AddToCart.php',
			type: 'POST',
			data: order,
		});
		request.done(function(response, textstatus, jqXHR){
			$thisButton.attr({
				"title": 'Added!',
				"data-content": (order.qty == 1 ? ("This item was added to your cart.") : (order.qty + " items of this product were added to your cart.")),
				"data-placement": 'top',
			}).popover('show');
			$('.popover').show();
			$thisButton.on('mouseleave mouseout mouseenter mouseover', function(){
				$('.popover').fadeOut(2000, function(){ 
					$(this).remove(); 
				});
			});
		});
		request.fail(function (jqXHR, textStatus, errorThrown){
			$thisButton.attr({
				"title": 'Error!',
				"data-content": "Seems like server is down.",
				"data-placement": 'top',
			}).popover('show');
			$('.popover').show();
			$thisButton.on('mouseleave mouseout mouseenter mouseover', function(){
				$('.popover').fadeOut(2000, function(){ 
					$(this).remove(); 
				});
			});
		});
		// var request = new XMLHttpRequest();
		// request.onreadystatechange = function() {
		// 	if (this.readyState == 4 && this.status == 200) {
		// 		$thisButton.attr({
		// 			"title": 'Added!',
		// 			"data-content": (order.qty == 1 ? ("This item was added to your cart.") : (order.qty + " items of this product were added to your cart.")),
		// 			"data-placement": 'top',
		// 		}).popover('show');
		// 		$('.popover').show();
		// 		$thisButton.on('mouseleave mouseout mouseenter mouseover', function(){
		// 			$('.popover').fadeOut(2000, function(){ 
		// 				$(this).remove(); 
		// 			});
		// 		});
		// 	}
		// 	else if(this.status == 403 || this.status == 404)
		// 	{
		// 		$thisButton.attr({
		// 			"title": 'Error!',
		// 			"data-content": "Seems like server is down.",
		// 			"data-placement": 'top',
		// 		}).popover('show');
		// 		$('.popover').show();
		// 		$thisButton.on('mouseleave mouseout mouseenter mouseover', function(){
		// 			$('.popover').fadeOut(2000, function(){ 
		// 				$(this).remove(); 
		// 			});
		// 		});
		// 	}
		// };
		// request.open("POST", "../controllers/AddToCart.php", true);
		// request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		// request.send("id="+order.id+"&qty="+order.qty); 
		getCartCount();
	});
	$("#modalHere").on('click', '.addToWish', function(){
		var $thisButton = $(this);
		$('.popover').remove();
		var order = {
			id: $(this).closest(".modal").attr("id"),
			qty: $(this).closest(".modal").find(".quantity").val(),
		};
		var request = $.ajax({
			url: '../controllers/AddToWish.php',
			type: 'POST',
			data: order,
		});
		request.done(function(response, textstatus, jqXHR){
			$thisButton.attr({
				"title": 'Added!',
				"data-content": (order.qty == 1 ? ("This item was added to your wishlist. You definitely must buy it!") : (order.qty + " items of this product were added to your wishlist. You definitely must buy it!")),
				"data-placement": 'top',
			}).popover('show');
			$('.popover').show();
			$thisButton.on('mouseleave mouseout mouseenter mouseover', function(){
				$('.popover').fadeOut(2000, function(){ 
					$(this).remove(); 
				});
			});
		});
		request.fail(function (jqXHR, textStatus, errorThrown){
			$thisButton.attr({
				"title": 'Error!',
				"data-content": "Seems like server is down.",
				"data-placement": 'top',
			}).popover('show');
			$('.popover').show();
			$thisButton.on('mouseleave mouseout mouseenter mouseover', function(){
				$('.popover').fadeOut(2000, function(){ 
					$(this).remove(); 
				});
			});
		});
		// var request = new XMLHttpRequest();
		// request.onreadystatechange = function() {
		// 	if (this.readyState == 4 && this.status == 200) {
		// 		$thisButton.attr({
		// 			"title": 'Added!',
		// 			"data-content": (order.qty == 1 ? ("This item was added to your wishlist. You definitely must buy it!") : (order.qty + " items of this product were added to your wishlist. You definitely must buy it!")),
		// 			"data-placement": 'top',
		// 		}).popover('show');
		// 		$('.popover').show();
		// 		$thisButton.on('mouseleave mouseout mouseenter mouseover', function(){
		// 			$('.popover').fadeOut(2000, function(){ 
		// 				$(this).remove(); 
		// 			});
		// 		});
		// 	}
		// 	else if(this.status == 403 || this.status == 404)
		// 	{
		// 		$thisButton.attr({
		// 			"title": 'Error!',
		// 			"data-content": "Seems like server is down.",
		// 			"data-placement": 'top',
		// 		}).popover('show');
		// 		$('.popover').show();
		// 		$thisButton.on('mouseleave mouseout mouseenter mouseover', function(){
		// 			$('.popover').fadeOut(2000, function(){ 
		// 				$(this).remove(); 
		// 			});
		// 		});
		// 	}
		// };
		// request.open("POST", "../controllers/AddToWish.php", true);
		// request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		// request.send("id="+order.id+"&qty="+order.qty); 
		getCartCount();
	});
	$("#mainCart").on('click', function(){
		getCart(data, $breadcrumb, $productsContainer, $pagination);
	});
	$("#mainWish").on('click', function(){
		getWish(data, $breadcrumb, $productsContainer, $pagination);
	});
	$("#search").on('focus', function(){
		if($.trim($(this).val()) !== "")
		{
			$("#searchKeywords").show();
		}
	});
	$("#search").on('focusout', function(){
		$("#searchKeywords").hide();
	});
	$("#search").on('keyup', function(){
		if($.trim($(this).val()) !== "")
		{
			$("#searchKeywords").show();
			autoComplete();
		}
		else
		{
			$("#searchKeywords").hide();
		}
	});
	$("#searchKeywords").on('mousedown', '.hits', function() {
		$("#search").val($(this).text());
	});
	$("#searchButton").on('click', function(){
		if($.trim($("#search").val()) !== "")
		{
			var keyword = {
				keyword: $("#search").val(),
			};
			var request = $.ajax({
				url: '../controllers/SearchController.php',
				type: 'GET',
				data: keyword,
			});
			request.done(function(response, textstatus, jqXHR){
				$("#imgHeader").empty();
				$breadcrumb.empty();
				$productsContainer.empty();
				$pagination.hide();
				$("#modalHere").empty();

				var products = JSON.parse(response);
				$breadcrumb.append('<li class="breadcrumb-item">GuitarPH</li><li class="breadcrumb-item active">Search</li>');
				$productsContainer.append('<div class="col-12"><h2><strong>Search results for: '+keyword.keyword+'</strong></h2><hr><h6><small>'+products.length+ ' ' + (products.length === 1 ? 'result' : 'results') + '</small></h6></div>');
				if(products.length === 0)
				{
					$productsContainer.find(".col-12").append('<hr><h6>No products found.</h6>');
					$productsContainer.append('<div class="col-12"><button type="button" id="continueShopping" class="btn btn-outline-dark float-right"><span class="fas fa-arrow-left"></span> Back to categories</button></div>');
					$("#continueShopping").on('click', function(){
						$pagination.show();
						scrollToTop();
						pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
					});
				}
				else
				{
					$.each(products, function(i, product){
						$productsContainer.append('<div class="col-4 pad"><div class="card h-100"><img class="card-img-top h-50 w-75 d-flex align-self-center" src="../img/'+ product.filename +'" alt="Card image cap"><div class="card-body"><h5 class="card-title">'+ product.name +'</h5></div><ul class="list-group list-group-flush"><li class="list-group-item">Price: ₱<strong>'+ product.price +'.00</strong></li><li class="list-group-item"><button type="button" class="btn btn-dark" data-toggle="modal" data-target="#' + product.id + '"><i class="fas fa-info-circle"></i> View Details</button></li></ul><div class="card-footer">Status: <span style="color:green;">Available</span></div></div></div>');
						$("#modalHere").append('<div class="modal fade product_view" id="' + product.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">Item #: ' + product.id + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="row"><div class="col-5 d-flex justify-content-center align-items-center"><img src="../img/' + product.filename + '" alt="' + product.name + '"></div><div class="col-7"><h3>' + product.name + '</h3><h6><small class="text-muted">Category: ' + product.category + '<br>Status: <span style="color:green;">Available</span></small></h6><br><h5>Description:</h5><br><p style="font-size: 14px;">' + product.description + '</p><br><br><h5 class="cost">Price: ₱<strong>'+ product.price +'.00</strong></h5><div class="space-ten"></div><div class="form-group row"><label for="quantity" class="col-2 col-form-label">Quantity:</label><div class="col-4"><input type="number" class="form-control quantity" min=1 value=1></div></div><div class="row"><div class="col-3"><button type="button" class="btn btn-dark addToCart"><span class="fas fa-shopping-cart"></span> Add To Cart</button></div><div class="col-3"><button type="button" class="btn btn-dark addToWish"><span class="fas fa-heart"></span> Add To Wishlist</button></div></div></div></div></div></div></div></div>');
					});
					$productsContainer.append('<div class="col-12"><button type="button" id="continueShopping" class="btn btn-outline-dark float-right"><span class="fas fa-arrow-left"></span> Back to categories</button></div>');
					$("#continueShopping").on('click', function(){
						$pagination.show();
						scrollToTop();
						pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
					});
				}
			});
			request.fail(function (jqXHR, textStatus, errorThrown){
				$productsContainer.empty().append(errorThrown);
			});
		}
		getCartCount();
		scrollToTop();
	});
});

function getStart(numberInString) {
	var index = (parseInt(numberInString, 10)-1)*6;
	return index;
}
function getEnd(numberInString) {
	var index = ((parseInt(numberInString, 10)-1)*6)+6;
	return index;
}
function pageLoad(data, $productsContainer, $breadcrumb, $pagination) {
	$pagination.show();
	if(data.category === "Home")
	{
		$("#imgHeader").empty().css("background-color", "#fac451").append('<img src="../assets/home.png" alt="home">');
		$breadcrumb.empty().append('<li class="breadcrumb-item">GuitarPH</li><li class="breadcrumb-item active">Home</li>').append('<li class="breadcrumb-item active">Page ' + $pagination.find(".selected").text() + '</li>');
	}
	else if(data.category === "Acoustic")
	{
		$("#imgHeader").empty().css("background-color", "#c14155").append('<img src="../assets/acoustics.png" alt="acoustics" class="img-fluid">');
		$breadcrumb.empty().append('<li class="breadcrumb-item">GuitarPH</li><li class="breadcrumb-item">Home</li>').append('<li class="breadcrumb-item active">'+ data.category +'</li>').append('<li class="breadcrumb-item active">Page ' + $pagination.find(".selected").text() + '</li>');
	}
	else if(data.category === "Electric")
	{
		$("#imgHeader").empty().css("background-color", "#212122").append('<img src="../assets/electrics.png" alt="electrics" class="img-fluid">');
		$breadcrumb.empty().append('<li class="breadcrumb-item">GuitarPH</li><li class="breadcrumb-item">Home</li>').append('<li class="breadcrumb-item active">'+ data.category +'</li>').append('<li class="breadcrumb-item active">Page ' + $pagination.find(".selected").text() + '</li>');
	}
	else if(data.category === "Bass")
	{
		$("#imgHeader").empty().css("background-color", "#2d4059").append('<img src="../assets/bass.png" alt="bass" class="img-fluid">');
		$breadcrumb.empty().append('<li class="breadcrumb-item">GuitarPH</li><li class="breadcrumb-item">Home</li>').append('<li class="breadcrumb-item active">'+ data.category +'</li>').append('<li class="breadcrumb-item active">Page ' + $pagination.find(".selected").text() + '</li>');
	}
	var request = $.ajax({
		url: "../controllers/ShopController.php",
		type: 'GET',
		data: data,
	});
	request.done(function (response, textstatus, jqXHR) {
		$productsContainer.empty();
		$("#modalHere").empty();
		var products = JSON.parse(response);
		$.each(products, function(i, product){
			$productsContainer.append('<div class="col-4 pad"><div class="card h-100"><img class="card-img-top h-50 w-75 d-flex align-self-center" src="../img/'+ product.filename +'" alt="Card image cap"><div class="card-body"><h5 class="card-title">'+ product.name +'</h5></div><ul class="list-group list-group-flush"><li class="list-group-item">Price: ₱<strong>'+ product.price +'.00</strong></li><li class="list-group-item"><button type="button" class="btn btn-dark" data-toggle="modal" data-target="#' + product.id + '"><i class="fas fa-info-circle"></i> View Details</button></li></ul><div class="card-footer">Status: <span style="color:green;">Available</span></div></div></div>');
			$("#modalHere").append('<div class="modal fade product_view" id="' + product.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">Item #: ' + product.id + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="row"><div class="col-5 d-flex justify-content-center align-items-center"><img src="../img/' + product.filename + '" alt="' + product.name + '"></div><div class="col-7"><h3>' + product.name + '</h3><h6><small class="text-muted">Category: ' + product.category + '<br>Status: <span style="color:green;">Available</span></small></h6><br><h5>Description:</h5><br><p style="font-size: 14px;">' + product.description + '</p><br><br><h5 class="cost">Price: ₱<strong>'+ product.price +'.00</strong></h5><div class="space-ten"></div><div class="form-group row"><label for="quantity" class="col-2 col-form-label">Quantity:</label><div class="col-4"><input type="number" class="form-control quantity" min=1 value=1></div></div><div class="row"><div class="col-3"><button type="button" class="btn btn-dark addToCart"><span class="fas fa-shopping-cart"></span> Add To Cart</button></div><div class="col-3"><button type="button" class="btn btn-dark addToWish"><span class="fas fa-heart"></span> Add To Wishlist</button></div></div></div></div></div></div></div></div>');
		});
	});
  request.fail(function (jqXHR, textStatus, errorThrown){
    $productsContainer.empty().append(errorThrown).fadeOut(5000);
  });
 // var request = new XMLHttpRequest();
 // request.onreadystatechange = function() {
 // 	if (this.readyState == 4 && this.status == 200) {
 // 		$productsContainer.empty();
	// 	$("#modalHere").empty();

 // 		var products = JSON.parse(this.responseText);
 // 		$.each(products, function(i, product){
 // 			$productsContainer.append('<div class="col-4 pad"><div class="card h-100"><img class="card-img-top h-50 w-75 d-flex align-self-center" src="../img/'+ product.filename +'" alt="Card image cap"><div class="card-body"><h5 class="card-title">'+ product.name +'</h5></div><ul class="list-group list-group-flush"><li class="list-group-item">Price: ₱<strong>'+ product.price +'.00</strong></li><li class="list-group-item"><button type="button" class="btn btn-dark" data-toggle="modal" data-target="#' + product.id + '"><i class="fas fa-info-circle"></i> View Details</button></li></ul><div class="card-footer">Status: <span style="color:green;">Available</span></div></div></div>');
	// 		$("#modalHere").append('<div class="modal fade product_view" id="' + product.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">Item #: ' + product.id + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="row"><div class="col-5 d-flex justify-content-center align-items-center"><img src="../img/' + product.filename + '" alt="' + product.name + '"></div><div class="col-7"><h3>' + product.name + '</h3><h6><small class="text-muted">Category: ' + product.category + '<br>Status: <span style="color:green;">Available</span></small></h6><br><h5>Description:</h5><br><p style="font-size: 14px;">' + product.description + '</p><br><br><h5 class="cost">Price: ₱<strong>'+ product.price +'.00</strong></h5><div class="space-ten"></div><div class="form-group row"><label for="quantity" class="col-2 col-form-label">Quantity:</label><div class="col-4"><input type="number" class="form-control quantity" min=1 value=1></div></div><div class="row"><div class="col-3"><button type="button" class="btn btn-dark addToCart"><span class="fas fa-shopping-cart"></span> Add To Cart</button></div><div class="col-3"><button type="button" class="btn btn-dark addToWish"><span class="fas fa-heart"></span> Add To Wishlist</button></div></div></div></div></div></div></div></div>');
 // 		});
 // 	}
 // 	else if(this.status == 403 || this.status == 404)
 // 	{
 // 		$productsContainer.empty().append(this.statusText);
 // 	}
 // };
 // request.open("GET", "../controllers/ShopController.php?category="+data.category+"&start="+data.start+"&end="+data.end, true);
 // request.send();
 getCartCount();
}
function scrollToTop() {
	$('body,html').animate({
		scrollTop: 0
	}, 600);
}
function getCartCount()
{
	var sampleData = {
		request: "Request",
	};
	var request = $.ajax({
		url: '../controllers/GetCartCount.php',
		type: 'GET',
		data: sampleData,
	});
	request.done(function(response, textstatus, jqXHR){
		$("#cart_count").empty().append(response);
	});
	// var request = new XMLHttpRequest();
	// request.onreadystatechange = function(){
	// 	if (this.readyState == 4 && this.status == 200) {
	// 		$("#cart_count").empty().append(this.responseText);
	// 	}
	// 	else if(this.status == 403 || this.status == 404)
	// 	{
	// 		$("#cart_count").empty().append(this.statusText);
	// 	}
	// };
	// request.open("GET", "../controllers/GetCartCount.php", true);
	// request.send();
}
function getCart(data, $breadcrumb, $productsContainer, $pagination)
{
	var totalQty = 0;
	var totalPrice = 0;
	var sampleData = {
		request: "Request",
	};
	var request = $.ajax({
			url: '../controllers/GetCart.php',
			type: 'GET',
			data: sampleData,
		});
		request.done(function(response, textstatus, jqXHR){
			$("#imgHeader").empty();
			$breadcrumb.empty();
			$productsContainer.empty();
			$pagination.hide();
			$("#modalHere").empty();

			var products = JSON.parse(response);
			$breadcrumb.append('<li class="breadcrumb-item">GuitarPH</li><li class="breadcrumb-item active">Cart</li>');
			$productsContainer.append('<div class="col-12"><h2><strong>Your Cart ('+products.length+')</strong></h2></div>');
			if(products.length === 0)
			{
				$productsContainer.find(".col-12").append('<hr><h6>You have no products in cart. Buy now!</h6>');
				$productsContainer.append('<div class="col-12"><button type="button" id="continueShopping" class="btn btn-outline-dark float-right"><span class="fas fa-shopping-cart"></span> Continue Shopping</button></div>');
				$("#continueShopping").on('click', function(){
					$pagination.show();
					scrollToTop();
					pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
				});
			}
			else
			{
				$productsContainer.find(".col-12").append('<table class="table table-hover"><thead><tr><th>Product</th><th>Quantity</th><th class="text-center">Price</th><th class="text-center">Total</th><th> </th></tr></thead><tbody id="cartContents"></tbody></table>');
				$cartContents = $productsContainer.find("#cartContents");
				$.each(products, function(i, product){
					totalQty+=parseInt(product.quantity);
					totalPrice+=parseInt(product.subtotal);
					$cartContents.append('<tr id="item'+product.id+'"><td class="col-8 col-md-6"><div class="media"><a class="thumbnail float-left" href="#"> <img class="h-100" src="../img/'+product.filename+'" style="width: 72px; height: 72px;"> </a><div class="media-body"><h4 class="mt-0">'+product.name+'</h4><h6 class="text-muted"><small>Item #: '+product.id+'</small></h6><h6 class="text-muted"><small>Category: '+product.category+'</small></h6><span>Status: </span><span class="text-success"><strong>In Cart</strong></span></div></div></td><td class="col-1 col-md-1" style="text-align: center">'+product.quantity+'</td><td class="col-1 col-md-1 text-center"><strong>₱'+ product.price +'.00</strong></td><td class="col-1 col-md-1 text-center"><strong>₱'+ product.subtotal +'.00</strong></td><td class="col-1 col-md-1"><button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target="#'+product.id+'">Remove</button></td></tr>');
					$("#modalHere").append('<div class="modal fade" id="'+product.id+'" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true" style="top:100px;"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h6 class="modal-title" id="exampleModal3Label">Item #'+product.id+' for removal</h6><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>Are you sure you want to remove all <strong class="font-italic">'+product.name+'</strong> from your cart?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-dark remove">Remove</button></div></div></div></div>');
				});
				$cartContents.append('<tr><td>   </td><td>   </td><td>   </td><td><h5>Total items</h5></td><td class="text-right"><h5><strong>'+totalQty+'</strong></h5></td></tr><tr><td>   </td><td>   </td><td>   </td><td><h5>Subtotal</h5></td><td class="text-right"><h5><strong>₱'+totalPrice+'.00</strong></h5></td></tr><tr><td>   </td><td>   </td><td>   </td><td><h5>Estimated shipping fee</h5></td><td class="text-right text-success"><h5><strong>Free!</strong></h5></td></tr><tr><td>   </td><td>   </td><td>   </td><td><h3>Total</h3></td><td class="text-right"><h3><strong>₱'+totalPrice+'.00</strong></h3></td></tr><tr><td>   </td><td>   </td><td>   </td><td><button type="button" id="continueShopping" class="btn btn-outline-dark"><span class="fas fa-shopping-cart"></span> Continue Shopping</button></td><td><button type="button" class="btn btn-dark" id="checkout">	Checkout <span class="fas fa-play"></span></button></td></tr></tbody></table></div>');
				$("#modalHere").on('click', '.remove', function(){
					$thisModal = $(this).closest(".modal");
					var deleteId = {
						id: $(this).closest(".modal").attr("id"),
					}
					var deleteRequest = $.ajax({
						url: '../controllers/DeleteItemController.php',
						type: 'POST',
						data: deleteId,
					});
					deleteRequest.done(function(response, textstatus, jqXHR){
						$cartContents.find("#item"+deleteId.id).remove();
						$thisModal.modal('toggle');
						$('body').removeClass('modal-open');
						$('.modal-backdrop').remove();
						$('body').css('padding-right',0);
						getCartCount();
						$pagination.show();
						getCart(data, $breadcrumb, $productsContainer, $pagination);
					});
					deleteRequest.fail(function (jqXHR, textStatus, errorThrown){
						$productsContainer.empty().append(errorThrown);
					});
				});
				$("#continueShopping").on('click', function(){
					$pagination.show();
					scrollToTop();
					pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
				});
				$("#checkout").on('click',function(){
					var totalQty = 0;
					var totalPrice = 0;
					var sampleData = {
						request: "Request",
					};
					var request = $.ajax({
						url: '../controllers/CheckoutController.php',
						type: 'GET',
						data: sampleData,
					});
					request.done(function(response, textstatus, jqXHR){
						$("#imgHeader").empty();
						$breadcrumb.empty();
						$productsContainer.empty();
						$pagination.hide();
						$("#modalHere").empty();

						$breadcrumb.append('<li class="breadcrumb-item">GuitarPH</li><li class="breadcrumb-item">Cart</li><li class="breadcrumb-item active">Checkout</li>');
						$productsContainer.append('<div class="col-12"><h2><strong>Thanks for shopping!</strong></h2><hr /></div>');
						var transID = randomRange(100,999)+"-"+randomRange(1000,9999)+"-"+randomRange(1000,9999)+"-"+randomRange(100,999);
						var dateString = "Transaction date is: ";
						var newDate = new Date();  
						dateString += (newDate.getMonth() + 1) + "/";  
						dateString += newDate.getDate() + "/";  
						dateString += newDate.getFullYear();  
						dateString += " @ " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();

						$productsContainer.append('<div class="col-12 d-flex justify-content-center"><table border="1px solid black" style="max-width: 1000px;" id="slip"><tbody><tr><td style="border:none !important; padding: 10px; text-align: center;" colspan="2"><h4><strong><i class="fab fa-gofore"></i>uitar<span style="color: #b34700;">PH</span></strong></h4></td></tr><tr><td style="border:none !important; padding: 10px; text-align: center;" colspan="2"><samp>POS Serial #'+transID+'</samp></td></tr><tr><td style="border:none !important; padding: 10px; text-align: center;" colspan="2"><samp id="date"><small>'+dateString+'</small></samp></td></tr><tr><td style="border:none !important; padding: 10px;"><br></td><td style="border:none !important; padding: 10px;"><br></td></tr></tbody></table></div>');
						$.each(products, function(i, product){
							totalQty+=parseInt(product.quantity);
							totalPrice+=parseInt(product.subtotal);
							$productsContainer.find('table').find('tbody').append('<tr>				<td style="border:none !important; padding: 10px;"><strong><samp>'+product.name+'</samp></strong></td>				<td style="border:none !important; padding: 10px; text-align: right;"></td>			</tr>');
							$productsContainer.find('table').find('tbody').append('<tr>				<td style="border:none !important; padding: 10px; text-align: right;"><samp>Price: </samp></td>				<td style="border:none !important; padding: 10px; text-align: right;">₱<samp id="purchaseAmount">'+product.price+'</samp></td>			</tr>');
							$productsContainer.find('table').find('tbody').append('<tr>				<td style="border:none !important; padding: 10px; text-align: right;"><samp>Quantity Ordered: </samp></td>				<td style="border:none !important; padding: 10px; text-align: right;"><samp id="purchaseAmount">'+product.quantity+'</samp></td>			</tr>');
							$productsContainer.find('table').find('tbody').append('<tr>				<td style="border:none !important; padding: 10px; text-align: right;"><samp>Subtotal: </samp></td>				<td style="border:none !important; padding: 10px; text-align: right;">₱<samp id="purchaseAmount">'+product.subtotal+'</samp></td>			</tr>');
						});
						$productsContainer.find('table').find('tbody').append('			<tr>				<td style="border:none !important; padding: 10px;"><br></td>				<td style="border:none !important; padding: 10px;"><br></td>			</tr><tr>				<td style="border:none !important; padding: 10px;"><samp>Total Items: </samp></td>				<td style="border:none !important; padding: 10px; text-align: right;"><strong><samp>'+totalQty+'</samp></strong></td>			</tr><tr>				<td style="border:none !important; padding: 10px;"><samp>Shipping Fee: </samp></td>				<td style="border:none !important; padding: 10px; text-align: right;"><strong>₱<samp>0.00</samp></strong></td>			</tr>				<tr>				<td style="border:none !important; padding: 10px;"><samp>Total: </samp></td>				<td style="border:none !important; padding: 10px; text-align: right;"><strong>₱<samp>'+totalPrice+'.00</samp></strong></td>			</tr>');
						$productsContainer.append('<div class="col-12"><hr><button type="button" id="continueShopping" class="btn btn-outline-dark float-right"><span class="fas fa-shopping-cart"></span> Continue Shopping</button></div>');
						$("#continueShopping").on('click', function(){
							$pagination.show();
							scrollToTop();
							pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
						});
					});
					request.fail(function (jqXHR, textStatus, errorThrown){
						$productsContainer.empty().append(errorThrown);
					});
					scrollToTop();
					getCartCount();
				});
			}
		});
		request.fail(function (jqXHR, textStatus, errorThrown){
			$productsContainer.empty().append(errorThrown);
		});
		scrollToTop();
		// var request = new XMLHttpRequest();
		// request.onreadystatechange = function() {
		// 	if (this.readyState == 4 && this.status == 200) {
		// 		$("#imgHeader").empty();
		// 		$breadcrumb.empty();
		// 		$productsContainer.empty();
		// 		$pagination.empty();
		// 		$("#modalHere").empty();

		// 		var products = JSON.parse(this.responseText);
		// 		$breadcrumb.append('<li class="breadcrumb-item">GuitarPH</li><li class="breadcrumb-item active">Cart</li>');
		// 		$productsContainer.append('<div class="col-12"><h2><strong>Your Cart ('+products.length+')</strong></h2><table class="table table-hover"><thead><tr><th>Product</th><th>Quantity</th><th class="text-center">Price</th><th class="text-center">Total</th><th> </th></tr></thead><tbody id="cartContents"></tbody></table></div>');
		// 		$cartContents = $productsContainer.find("#cartContents");
		// 		$.each(products, function(i, product){
		// 			totalQty+=parseInt(product.quantity);
		// 			totalPrice+=parseInt(product.subtotal);
		// 			$cartContents.append('<tr><td class="col-8 col-md-6"><div class="media"><a class="thumbnail float-left" href="#"> <img class="h-100" src="../img/'+product.filename+'" style="width: 72px; height: 72px;"> </a><div class="media-body"><h4 class="mt-0">'+product.name+'</h4><h6 class="text-muted"><small>Item #: '+product.id+'</small></h6><h6 class="text-muted"><small>Category: '+product.category+'</small></h6><span>Status: </span><span class="text-success"><strong>In Cart</strong></span></div></div></td><td class="col-1 col-md-1" style="text-align: center">'+product.quantity+'</td><td class="col-1 col-md-1 text-center"><strong>₱'+ product.price +'.00</strong></td><td class="col-1 col-md-1 text-center"><strong>₱'+ product.subtotal +'.00</strong></td><td class="col-1 col-md-1"><button type="button" class="btn btn-outline-secondary">Remove</button></td></tr>');
		// 		});
		// 		$cartContents.append('<tr><td>   </td><td>   </td><td>   </td><td><h5>Total items</h5></td><td class="text-right"><h5><strong>'+totalQty+'</strong></h5></td></tr><tr><td>   </td><td>   </td><td>   </td><td><h5>Subtotal</h5></td><td class="text-right"><h5><strong>₱'+totalPrice+'.00</strong></h5></td></tr><tr><td>   </td><td>   </td><td>   </td><td><h5>Estimated shipping fee</h5></td><td class="text-right text-success"><h5><strong>Free!</strong></h5></td></tr><tr><td>   </td><td>   </td><td>   </td><td><h3>Total</h3></td><td class="text-right"><h3><strong>₱'+totalPrice+'.00</strong></h3></td></tr><tr><td>   </td><td>   </td><td>   </td><td><button type="button" class="btn btn-outline-dark"><span class="fas fa-shopping-cart"></span> Continue Shopping</button></td><td><button type="button" class="btn btn-dark">	Checkout <span class="fas fa-play"></span></button></td></tr></tbody></table></div>');
		// 	}
		// 	else if(this.status == 403 || this.status == 404)
		// 	{
		// 		$productsContainer.empty().append(this.statusText);
		// 	}
		// };
		// request.open("GET", "../controllers/GetCart.php?request="+sampleData.request, true);
		// request.send();
}
function getWish(data, $breadcrumb, $productsContainer, $pagination)
{
	var totalQty = 0;
	var totalPrice = 0;
	var sampleData = {
		request: "Request",
	};
	var request = $.ajax({
			url: '../controllers/GetWish.php',
			type: 'GET',
			data: sampleData,
		});
		request.done(function(response, textstatus, jqXHR){
			$("#imgHeader").empty();
			$breadcrumb.empty();
			$productsContainer.empty();
			$pagination.hide();
			$("#modalHere").empty();

			var products = JSON.parse(response);
			$breadcrumb.append('<li class="breadcrumb-item">GuitarPH</li><li class="breadcrumb-item active">Wishlist</li>');
			$productsContainer.append('<div class="col-12"><h2><strong>Your Wishlist ('+products.length+')</strong></h2><hr></div>');
			if(products.length === 0)
			{
				$productsContainer.find(".col-12").append('<h6>You haven\'t added products in your wishlist yet.</h6>');
				$productsContainer.append('<div class="col-12"><button type="button" id="continueShopping" class="btn btn-outline-dark float-right"><span class="fas fa-shopping-cart"></span> Continue Shopping</button></div>');
				$("#continueShopping").on('click', function(){
					$pagination.show();
					scrollToTop();
					pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
				});
			}
			else
			{
				$.each(products, function(i, product){
					totalQty+=parseInt(product.quantity);
					totalPrice+=parseInt(product.subtotal);
					$productsContainer.append('<div class="col-4 pad"><div class="card h-100"><img class="card-img-top h-50 w-75 d-flex align-self-center" src="../img/'+ product.filename +'" alt="Card image cap"><div class="card-body"><h5 class="card-title">'+ product.name +'</h5></div><ul class="list-group list-group-flush"><li class="list-group-item">Price: ₱<strong>'+ product.price +'.00</strong></li><li class="list-group-item"><button type="button" class="btn btn-dark" data-toggle="modal" data-target="#' + product.id + '"><i class="fas fa-info-circle"></i> View Details</button></li></ul><div class="card-footer">Status: <span style="color:green;">In Wishlist</span></div></div></div>');
					$("#modalHere").append('<div class="modal fade product_view" id="' + product.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">Item #: ' + product.id + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="row"><div class="col-5 d-flex justify-content-center align-items-center"><img src="../img/' + product.filename + '" alt="' + product.name + '"></div><div class="col-7"><h3>' + product.name + '</h3><h6><small class="text-muted">Category: ' + product.category + '<br>Status: <span style="color:green;">In Wishlist</span></small></h6><br><h5>Description:</h5><br><p style="font-size: 14px;">' + product.description + '</p><br><br><h5 class="cost">Price: ₱<strong>'+ product.price +'.00</strong></h5><div class="space-ten"></div><div class="form-group row"><label for="quantity" class="col-5 col-form-label">Your desired quantity:</label><div class="col-4"><input type="number" class="form-control quantity" min=1 value='+product.quantity+' readonly></div></div><div class="form-group row"><label for="subtotal" class="col-5 col-form-label">Subtotal of the wished product:</label><div class="col-4">₱<strong>'+ product.subtotal +'.00</strong></div></div><div class="row"><div class="col-3"><button type="button" class="btn btn-dark addToCart"><span class="fas fa-shopping-cart"></span> Add To Cart</button></div><div class="col-3"><button type="button" class="btn btn-dark" data-toggle="modal" data-target="#item' + product.id + '"> Remove on Wishlist</button></div></div></div></div></div></div></div></div>');
					$("#modalHere").append('<div class="modal fade" id="item'+product.id+'" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true" style="top:100px;"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h6 class="modal-title" id="exampleModal3Label">Item #'+product.id+' for removal</h6><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>Are you sure you want to remove <strong class="font-italic">'+product.name+'</strong> from your wishlist?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-dark remove">Remove</button></div></div></div></div>');
				});
				$productsContainer.append('<div class="col-12"><hr><h5>Total Wishlist Quantity: <strong>'+totalQty+'</strong></h5></div><div class="col-12"><hr><h5>Total Wishlist Cost: ₱<strong>'+ totalPrice +'.00</strong></h5></div><div class="col-12"><button type="button" id="continueShopping" class="btn btn-outline-dark float-right"><span class="fas fa-shopping-cart"></span> Continue Shopping</button></div>');
				$("#modalHere").on('click', '.remove', function(){
					$thisModal = $(this).closest(".modal");
					var id = $(this).closest(".modal").attr("id").replace("item", "");
					var deleteId = {
						id: id,
					}
					var deleteRequest = $.ajax({
						url: '../controllers/DeleteWishController.php',
						type: 'POST',
						data: deleteId,
					});
					deleteRequest.done(function(response, textstatus, jqXHR){
						$("#"+id).modal('toggle');
						$thisModal.modal('toggle');
						$('body').removeClass('modal-open');
						$('.modal-backdrop').remove();
						$('body').css('padding-right',0);
						getCartCount();
						$pagination.show();
						getWish(data, $breadcrumb, $productsContainer, $pagination);
					});
					deleteRequest.fail(function (jqXHR, textStatus, errorThrown){
						$productsContainer.empty().append(errorThrown);
					});
				});
				$("#continueShopping").on('click', function(){
					$pagination.show();
					scrollToTop();
					pageLoad(data, $productsContainer, $breadcrumb, $pagination.find(".page-item"));
				});
			}
		});
		request.fail(function (jqXHR, textStatus, errorThrown){
			$productsContainer.empty().append(errorThrown);
		});
		scrollToTop();
}
function autoComplete()
{
	$("#searchKeywords").empty();
	var keyword = {
		keyword: $.trim($("#search").val())
	};
	var request = $.ajax({
		url: '../controllers/DisplayHitsController.php',
		type: 'GET',
		data: keyword,
	});
	request.done(function(response, textstatus, jqXHR){
		var products = JSON.parse(response);
		if(products.length > 0)
		{
			$.each(products, function(i, product){
				var start = product.toLowerCase().indexOf((keyword.keyword).toLowerCase());
				var upToLength = start + (keyword.keyword).length;
				product = product.substring(0,start) + "<strong>" + product.substring(start, upToLength) + "</strong>" + product.substring(upToLength);
				$("#searchKeywords").append("<p class=\"hits\" style=\"padding:10px;\">" + product + "</p>");
			});
			$("#searchKeywords").on('mouseenter', '.hits', function() {
				$(this).css('background-color','#e6e6e6');
  		});
			$("#searchKeywords").on('mouseleave', '.hits', function() {
				$(this).css('background-color','white');
			});
		}
		else
		{
			$("#searchKeywords").append("No products found.");
		}
	});
	request.fail(function (jqXHR, textStatus, errorThrown){
		$("#searchKeywords").append(errorThrown);
	});
}
function randomRange(myMin, myMax) {
	return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
}