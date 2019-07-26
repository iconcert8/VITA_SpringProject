<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>Vita-Login</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/jquery-3.4.1.js"></script>
<script type="text/javascript" src="/resources/js/signup.js"></script>
<link rel="stylesheet" href="/resources/css/signup.css">
<style>
body{
	background-color: #FCFCFC;
}

#jb-container {
	width: 1200px;
	margin: 100px auto;
	padding: 20px;
	border: 1px solid #bcbcbc;
}

#jb-header {
	padding: 20px 490px;
	margin-bottom: 20px;
	border: 1px solid #bcbcbc;
	background-color: #F9F9F9;
}

#jb-content {
	width: 1158px;
	padding: 20px 250px;
	margin-bottom: 20px;
	float: left;
	border: 1px solid #bcbcbc;
	font-size: 36px;
}

#jb-footer {
	clear: both;
	padding: 20px;
	border: 1px solid #bcbcbc;
	background-color: #F9F9F9;
}
#form{
	margin-left: 90px;
}
#sign_up{
	width: 195px;
	height: 80px;
	font-size: 30px;
}
#cancel{
	width: 195px;
	height: 80px;
	font-size: 30px;
	border: 1px solid #000;
}

@media ( max-width : 480px ) {
	#jb-container {
		width: auto;
	}
	#jb-content {
		float: none;
		width: auto;
	}
	#jb-sidebar {
		float: none;
		width: auto;
	}
}
</style>
</head>
<body>
	<div id="jb-container">
		<div id="jb-header">
			<h1>
				<a href="/"><i class="fas fa-chevron-down" id="logo"
					style="font-size: 60px; color: black">ITA</i></a>
			</h1>
		</div>
		<div id="jb-content">
			<h2>SIGN-UP form</h2>
			<form action="/user/new" method="POST" id="form">
				<p>ID</p>
				<input type="text" id="id" name="id" onkeyup="chkid()" pattern=".{6,}" required title="6자 이상의 아이디" />
				<p id="here1"></p>
				<p>PASSWORD</p>
				<input type="password" id="password" name="password" onkeyup="chkpassword(this,8)" pattern=".{8,}" required title="8자 이상의 비밀번호" />
				<p id="here2"></p>
				<p>CONFIRM PASSWORD</p>
				<input type="password" id="password_chk" pattern=".{8,}" onkeyup="chkpassword_correct()" />
				<p id="here3"></p>
				<p>NICKNAME</p>
				<input type="text" id="nickname" name="nickname" onkeyup="chknickname(this,5)" pattern=".{5,}" required title="5자 이상의 닉네임" />
				<p id="here4"></p> 
				<p>EMAIL</p>
				<input type="email" id="email" name="email" />
				<p id="here5"></p> 
				<input type="submit" value="SIGN UP" id="sign_up" onclick="checkfield()" class="btn btn-success" />
				<input type="button" value="CANCEL" id="cancel" class="btn btn-light" onclick="location.href='/user/login'" /> 
			</form>
		</div>

		<div id="jb-footer">
			<p>Copyright</p>
		</div>
	</div>
</body>
</html>