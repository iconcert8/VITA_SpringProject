<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="/resources/css/all.css">
<script type="text/javascript" src="/resources/js/jquery-3.4.1.js"></script>
<script type="text/javascript" src="/resources/js/login.js"></script>
<style type="text/css">
	
</style>
<title>Log-In</title>
</head>
<body>
	
	<div style="height: 100px;"></div>
	<section>
		<article id="left" class="side">좌측</article>

		<article id="middle">
			<h1>VITA 로그인</h1>
				<form action="/login/login" method="post">
					I&nbsp;D:&ensp;<input type="text" name="id" id="id"/><br>
					PW:&ensp;<input type="password" name="pw" id="pw"/><br>
					<input type="submit" id="log_in" value="로그인"/>
					<input type="button" id="sign_up" value="회원가입"/>
				</form>				
			
		</article>

		<article id="right" class="side">우측</article>
	</section>

</body>
</html>