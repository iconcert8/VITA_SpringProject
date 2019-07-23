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
			<h1>이메일 인증결과</h1>
			<p>${response }</p>
			<a href="/login"><input type="button" value="로그인" id="login"/></a>
		</article>

		<article id="right" class="side">우측</article>
	</section>

</body>
</html>