<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="/resources/css/all.css">
<script type="text/javascript" src="/resources/js/jquery-3.4.1.js"></script>
<style type="text/css">
	
</style>
<title>Log-In</title>
</head>
<body>
	
	<div style="height: 100px;"></div>
	<section>
		<article id="left" class="side">좌측</article>

		<article id="middle">
			<h1>이메일 인증</h1>
				<p>${response }</p>
				<form action="/login/authorize" method="post">
					I&nbsp;D:&ensp;${id }<input type="hidden" name="id" id="id" value="${id }"/><br>
					인증키:&ensp;<input type="text" name="authKey" id="authKey"/><br>
					<input type="submit" id="submit" value="확인"/>
					<input type="button" id="prev" value="이전페이지"/>
				</form>				
			
		</article>

		<article id="right" class="side">우측</article>
	</section>

</body>
</html>