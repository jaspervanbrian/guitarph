$(document).ready(function(){
	$('.message').on('click', 'a', function(event){
    event.preventDefault();
    if($(this).attr("id") === "refreshCaptcha")
    {
      var $src = $("#captchaImage").attr("src");
      $("#captchaImage").attr("src", $src.substring(0,$src.lastIndexOf("?"))+"?rand="+Math.random()*1000);
    }
    else
    {
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
      titleToggle();
    }
	});
	function titleToggle()
	{
		if(document.title === "Login | GuitarPH")
		{
			document.title = "Register | GuitarPH";
		}
		else
		{
			document.title = "Login | GuitarPH";
		}
	}
	// Register
	var request;
	$("#register-form").submit(function(event){
		event.preventDefault();
		if(request){ // check kapag may pending request, if there's pending, abort it
			request.abort();
		}
		// setup some local variables, $form is the register-form
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        var data = {
        	newFirstName: $("#newFirstName").val(),
         newLastName: $("#newLastName").val(),
         newGender: $("#newGender").val(),
         newUsername: $("#newUsername").val(),
         newPassword: $("#newPassword").val(),
         confirmPassword: $("#confirmPassword").val(),
         captcha: $("#captcha").val(),
         create: $("#create").val(),
       };
        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);
        // Fire off the request to action
        request = $.ajax({
    			url: $form.attr("action"), // controllers/RegisterController.php
    			type: 'POST',
    			data: data,
        });
        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
            // Log a message
            if(response==="Account Created Successfully!")
            {
            	$("#flash-message").empty().show().append('<strong>' + response + '</strong>').fadeOut(5000);
            	$("#newFirstName").val("");
            	$("#newLastName").val("");
            	$("#newGender").val("");
            	$("#newUsername").val("");
            	$("#newPassword").val("");
            	$("#confirmPassword").val("");
              $("#captcha").val("");
            }
            else if(response==="Username already taken. Please enter unique username.")
            {
            	$("#flash-message").empty().show().append(response).fadeOut(5000);
            }
            else if(response==="Passwords do not match.")
            {
            	$("#flash-message").empty().show().append(response).fadeOut(5000);
            	$("#newPassword").val() = $("#confirmPassword").val() = "";
            }
            else if(response === "Captcha do not match.")
            {
              $("#flash-message").empty().show().append(response).fadeOut(5000);
              $("#captcha").val("");
            }
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error
            $("#flash-message").empty().show().append(errorThrown).fadeOut(5000);
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });
       // request = new XMLHttpRequest();
       // request.onreadystatechange = function() {
       //      if (this.readyState == 4 && this.status == 200) {
       //          if(this.responseText==="Account Created Successfully!")
       //          {
       //              $("#flash-message").empty().show().append('<strong>' + this.responseText + '</strong>').fadeOut(5000);
       //              $("#newFirstName").val("");
       //              $("#newLastName").val("");
       //              $("#newGender").val("");
       //              $("#newUsername").val("");
       //              $("#newPassword").val("");
       //              $("#confirmPassword").val("");
       //          }
       //          else if(this.responseText==="Username already taken. Please enter unique username.")
       //          {
       //              $("#flash-message").empty().show().append(this.responseText).fadeOut(5000);
       //          }
       //          else if(this.responseText==="Passwords do not match.")
       //          {
       //              $("#flash-message").empty().show().append(this.responseText).fadeOut(5000);
       //              $("#newPassword").val() = $("#confirmPassword").val() = "";
       //          }
       //          $inputs.prop("disabled", false);
       //      }
       //      else if(this.status == 403 || this.status == 404)
       //      {
       //          $("#flash-message").empty().show().append(this.statusText).fadeOut(5000);
       //          $inputs.prop("disabled", false);
       //      }
       // }
       // request.open("POST", $form.attr("action"), true);
       // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       // request.send("newFirstName="+data.newFirstName+"&newLastName="+data.newLastName+"&newGender="+data.newGender+"&newUsername="+data.newUsername+"&newPassword="+data.newPassword+"&confirmPassword="+data.confirmPassword+"&create="+data.create); 
	});

	// Login
	$(".login-form").on('click', '#login', function(){
		if(request){
			request.abort();
		}
        var $form = $("#login-form");
        var $inputs = $form.find("input, select, button, textarea");
        var data = {
        	username: $("#username").val(),
        	password: $("#password").val(),
        	login: $("#login").val(),
        };
        $inputs.prop("disabled", true);
        request = $.ajax({
    		url: $form.attr("action"),
    		type: 'POST',
    		data: data,
        });
        request.done(function (response, textStatus, jqXHR){
            if(response==="Success")
            {
              $inputs.prop("disabled", false);
            	$form.attr("action", "controllers/LoginSuccessController.php");
            	$form.submit();
            }
            else if(response==="Wrong username or password.")
            {
            	$("#flash-message").empty().show().append(response).fadeOut(5000);
            }
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
            $("#flash-message").empty().show().append(errorThrown).fadeOut(5000);
        });
        request.always(function () {
            $inputs.prop("disabled", false);
        });
      // request = new XMLHttpRequest();
      //  request.onreadystatechange = function() {
      //       if (this.readyState == 4 && this.status == 200) {
      //           if(this.responseText==="Success")
      //           {
      //               $inputs.prop("disabled", false);
      //               $form.attr("action", "controllers/LoginSuccessController.php");
      //               $form.submit();
      //           }
      //           else if(this.responseText==="Wrong username or password.")
      //           {
      //               $("#flash-message").empty().show().append(this.responseText).fadeOut(5000);
      //           }
      //           $inputs.prop("disabled", false);
      //       }
      //       else if(this.status == 403 || this.status == 404)
      //       {
      //           $("#flash-message").empty().show().append(this.statusText).fadeOut(5000);
      //           $inputs.prop("disabled", false);
      //       }
      //  }
      //  request.open("POST", $form.attr("action"), true);
      //  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      //  request.send("username="+data.username+"&password="+data.password+"&login="+data.login); 
	});
});