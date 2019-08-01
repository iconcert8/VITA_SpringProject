<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>Vita-Login</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/resources/js/signup.js"></script>
<link rel="stylesheet" href="/resources/css/signup.css">

</head>
<body>

	<div class="container mt-5">
		<div class="row">
			<div class="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
				<div class="card mt-5">
					<div class="card-body">
						<div class="row text-center">
							<div class="col-12">
								<h1>
									<a href="/"><i class="fas fa-chevron-down" id="logo"
										style="font-size: 60px; color: black">ITA</i></a>
								</h1>
								<h3>SIGN UP</h3>
							</div>
						</div>
					</div>

		
					<div class="card-body">
						<form action="/user/new" method="post" class="card-body">
							<div class="form-group">
								<label for="id">ID</label>
								<input type="text" class="form-control" id="id" name="userId" onkeyup="chkid(this,6)" pattern=".{6,}" required title="6자 이상 입력하여 주십시오" />
								<p id="here1"></p>
							</div>
							<div class="form-group">
								<label for="password">PASSWORD</label>
								<input type="password" class="form-control" id="password" name="userPass" onkeyup="chkpassword(this,8)" pattern=".{8,}" required title="8자 이상 입력하여 주십시오" />
								<p id="here2"></p>
							</div>
							<div class="form-group">
								<label for="password_chk">CONFIRM PASSWORD</label>
								<input type="password" class="form-control" id="password_chk" pattern=".{8,}" onkeyup="chkpassword_correct()" />
								<p id="here3"></p>
							</div>
							<div class="form-group">
								<label for="nickname">NICKNAME</label>
								<input type="text" class="form-control" id="nickname" name="userNick" onkeyup="chknickname(this,5)" pattern=".{5,}" required title="5자 이상 입력하여 주십시오"/>
								<p id="here4"></p>
							</div>
							<div class="form-group">
								<label for="email">EMAIL</label>
								<input type="email" class="form-control" id="email" name="userEmail" />
								<p id="here5"></p> 
							</div>
							<div>
								<input type="submit" value="SIGN UP" id="sign_up" onclick="checkfield()" class="btn btn-success" />
								<input type="button" value="CANCEL" id="cancel" class="btn btn-light" onclick="location.href='/user/login'" /> 
							</div>
						</form>
					</div>
					<div class="card-header">
						<div class="text-center" id="jb-footer">
							<p>hello guys</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
<input id="response" type="hidden" value="${response}">
	
<script type="text/javascript">

$(document).ready(function(){
	var response = $("#response").val();
	if(response != null && response != "" && response != "undefined"){
		alert(response);
		$("#response").val("");
	}
});
</script>
	
</body>
</html>