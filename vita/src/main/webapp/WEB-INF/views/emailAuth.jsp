<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<title>Log-In</title>
</head>
<body>
	
	<div class="container mt-5">
		<div class="row">
			<div class="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
				<div class="card mt-5">
					<div class="card-body">
						<div class="row text-center">
							<div class="col-12">
								<h3>이메일 인증</h3>
							</div>
						</div>
					</div>

					<div class="card-body">
						<form action="/user/login/emailAuth" method="post" class="card-body">
							<div class="form-group">
								<label>아이디 : </label>
								<label>${userId}</label>
								<input type="hidden" name="userId" value="${userId}">
							</div>
							<div class="form-group">
								<label for="pw">인증키</label>
								<input type="text" class="form-control" name="authKey" placeholder="authkey">
							</div>
							<div>
								<input type="button" value="취소" class="btn btn-secondary" onclick="location.href='/user/login'"/>
								<input type="submit" value="확인" class="btn btn-success" />
							</div>
						</form>
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