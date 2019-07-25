<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<!-- Bootstrap core CSS -->
<link href="/resources/vendor/bootstrap/css/bootstrap.min.css"
	type="text/css" rel="stylesheet">

<!-- Custom fonts for this template -->
<link href="/resources/vendor/fontawesome-free/css/all.min.css"
	rel="stylesheet" type="text/css">
<link
	href='https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic'
	rel='stylesheet' type='text/css'>
<link
	href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
	rel='stylesheet' type='text/css'>

<!-- Custom styles for this template -->
<link href="/resources/css/clean-blog.min.css" type="text/css"
	rel="stylesheet">

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
<script type="text/javascript" src="/resources/js/jquery-3.4.1.js"></script>
<script type="text/javascript" src="/resources/js/login.js"></script>
<style type="text/css">
body{
	font-size: 40px;
}
#middle{
	margin: 300px;
}
form{
	padding-left: 600px;
	width: 1400px;
	height: 300px;
	position: absolute;
	top: 1000px;
	left: 300px;
}
#button{
	list-style:none;
	margin-right: 500px;
	width: 450px;
	height: 300px;
}
span{
 width:200px;
 margin: 0;
}
#img{
	width:300px;
	position: absolute;
	left:770px;
	top:970px;
	
}
#id{
	margin-bottom: 13px;
}
#pw{
	
	margin-bottom: 20px;
}
#log_in{
	width:200px;
	height: 150px;
}
#sign_up{
	width:200px;
	height: 150px;
}
</style>
<title>Log-In</title>
</head>
<body>

	<div style="height: 100px;"></div>
	<section>
		<!-- Navigation -->
		<nav class="navbar navbar-expand-lg navbar-light fixed-top"
			id="mainNav">
			<div class="container">
				<a href="/"><i class="fas fa-chevron-down" id="logo"
					style="font-size: 60px; color: black">ITA</i></a>
			</div>
		</nav>
		
		<!-- Page Header -->
		<header class="masthead"
			style="background-color: #E7E7E7;">
			<div class="overlay"></div>
			<div class="container">
				<div class="row">
					<div class="col-lg-8 col-md-10 mx-auto">
						<div class="site-heading">
							<h1>로그인</h1>
							<span class="subheading"> </span>
						</div>
					</div>
				</div>
			</div>
		</header>
		<p id="img"><img alt="idpw" src="/resources/img/IDPW.jpg" /></p>
		<article id="middle">
			<form action="/user/login" method="post">
				<input type="text" name="id" id="id" /><br>
				<input type="password" name="pw" id="pw" /><br>
				<ul id="button">
				<li><input type="submit" value="로그인" id="log_in" class="btn btn-primary float-right" /></li>
				<li><input type="button" value="회원가입" id="sign_up" class="btn btn-primary float-right" /></li>
				</ul>
			</form>
		</article>
		\
	</section>

</body>
</html>