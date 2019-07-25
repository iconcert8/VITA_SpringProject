<!DOCTYPE html>
<html lang="en">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<head>

<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title></title>

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

<link rel="stylesheet" href="/resources/css/signup.css">
<script type="text/javascript" src="/resources/js/signup.js"></script>
</head>

<body>
	<div style="height: 100px;"></div>
	<!-- Navigation -->
	<nav class="navbar navbar-expand-lg navbar-light fixed-top"
		id="mainNav">
		<div class="container">
			<a href="/"><i class="fas fa-chevron-down" id="logo" style="font-size:60px; color:black">ITA</i></a>
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
						<h1>회원가입</h1>
						<span class="subheading"> </span>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<div class="container">
		<div class="row">
			<div class="col-lg-8 col-md-10 mx-auto">
				<div class="post-preview">
					<h2 class="post-title"> </h2>
					<h3 class="post-subtitle">
						<form action="/user/new" method="POST">
							<ul>
								<li>ID: <input type="text" id="id" name="id" onkeyup="chkid()" pattern=".{6,}" required title="6자 이상의 아이디" />
								<p id="here1"></p><input type="hidden" id="idcheck" value="0" /></li>
								<li>PW: <input type="password" id="password"
									name="password" onkeyup="chkpassword(this,8)" pattern=".{8,}"
									required title="8자 이상의 비밀번호" />
								<p id="here2"></p></li>
								<li>PW확인: <input type="password" id="password_chk"
									pattern=".{8,}" onkeyup="chkpassword_correct()" />
								<p id="here3"></p></li>
								<li>Nickname: <input type="text" id="nickname"
									name="nickname" onkeyup="chknickname(this,5)" pattern=".{5,}" required title="5자 이상의 닉네임" />
								<p id="here4"></p></li>
								<li>Email: <input type="email" id="email" name="email" />
								<p id="here5"></p></li>
								<li><input type="submit" value="회원가입" id="sign_in"
									onclick="checkfield()" class="btn btn-primary float-right" /> <input
									type="button" value="취소" id="cancel"
									class="btn btn-primary float-right" /></li>
							</ul>
						</form>
					</h3>
					<p class="post-meta"> </p>
				</div>
				<hr>

				<hr>
			</div>
		</div>
	</div>

	<hr>

	<!-- Footer -->
	<footer>
		<div class="container">
			<div class="row">
				<div class="col-lg-8 col-md-10 mx-auto">
					<ul class="list-inline text-center">
						<li class="list-inline-item"><a href="#"> <span
								class="fa-stack fa-lg"> <i
									class="fas fa-circle fa-stack-2x"></i> <i
									class="fab fa-twitter fa-stack-1x fa-inverse"></i>
							</span>
						</a></li>
						<li class="list-inline-item"><a href="#"> <span
								class="fa-stack fa-lg"> <i
									class="fas fa-circle fa-stack-2x"></i> <i
									class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
							</span>
						</a></li>
						<li class="list-inline-item"><a href="#"> <span
								class="fa-stack fa-lg"> <i
									class="fas fa-circle fa-stack-2x"></i> <i
									class="fab fa-github fa-stack-1x fa-inverse"></i>
							</span>
						</a></li>
					</ul>
					<p class="copyright text-muted">Copyright &copy; Vita 2019</p>
				</div>
			</div>
		</div>
	</footer>

	<!-- Bootstrap core JavaScript -->
	<script type="text/javascript" src="/resources/js/jquery-3.4.1.js"></script>
	<script src="/resources/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

	<!-- Custom scripts for this template -->
	<script src="/resources/js/clean-blog.min.js"></script>

</body>

</html>
