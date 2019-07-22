<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h3>자신의 DB에 있는 ID를 입력하시오</h3>
	<h4>session에 'authUser'라는 키값으로 userVO객체가 들어갈것임</h4>
	<form action="/testlogin" method="post">
		ID : <input type="text" name="userId"><br>
		<input type="submit" value="GO">
	</form>
	
	
</body>
</html>