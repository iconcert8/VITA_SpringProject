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
								<h3>LOG-IN</h3>
							</div>
						</div>
					</div>

					<div class="card-body">
						<form action="/user/login" method="post" class="card-body">
							<div class="form-group">
								<label for="id">ID</label>
								<input type="text" id="inputId" class="form-control" name="userId" placeholder="Id">
							</div>
							<div class="form-group">
								<label for="pw">PASSWORD</label>
								<input type="password" class="form-control" name="userPass" placeholder="Password">
							</div>
							<div>
								<input type="button" value="signup" class="btn btn-primary" onclick="location.href='/user/new'"/>
								<input type="submit" value="Login" id="log_in" class="btn btn-success" />
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
<input id="userId" type="hidden" value="${userId}">
	
<script type="text/javascript">
$(document).ready(function(){
	
	var response = $("#response").val();
	var userId =$("#userId").val();
	if(response != null && response != "" && response != "undefined"){
		alert(response);
		$("#response").val("");
	}
	if(userId != null && userId != "" && userId != "undefined"){
		$("#inputId").val(userId);
		$("userId").val("");
	}
	
});
</script>
</body>

</html>