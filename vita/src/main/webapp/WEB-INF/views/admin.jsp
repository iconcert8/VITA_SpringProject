<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

<style type="text/css">
.adminList:HOVER{
	background-color: #007bff;
	color:white;
	cursor:pointer;
}

</style>

<title>VITA admin</title>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4 col-lg-3 text-center">

				<ul class="list-group list-group-flush">
					<li class="list-group-item py-5"><a href="#"><i
							class="fas fa-chevron-down" style="font-size: 60px; color: black">ITA</i></a>
						<div>
							<label style="color: gray; font-weight: bold;">관리자</label>
						</div></li>
					<li class="list-group-item py-4 adminList" data-adminlist="warnlist">신고목록</li>
					<li class="list-group-item py-4 adminList" data-adminlist="categorylist">카테고리관리</li>
					<li class="list-group-item py-4 adminList" data-adminlist="deletelist">삭제목록</li>
					<li class="list-group-item py-4 adminList" data-adminlist="statistics">통계보기</li>
					<li class="list-group-item pt-5"><a href="#">로그아웃</a></li>
				</ul>

			</div>

			<div class="col-md-8 col-lg-9 pt-5 px-5">

				<!-- 신고 목록 -->
				<div class="card bg-light mb-3 d-none view warncard">
					<div class="card-header">
						<h3>신고 목록</h3>
					</div>
					<div class="card-body">

						<table class="table">
							<thead>
								<tr>
									<th scope="col">#글번호</th>
									<th></th>
									<th scope="col">#내용</th>
									<th></th>
									<th scope="col">#신고 수</th>
									<th scope="col">#처리</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td colspan="3">Mark kand ibfqo badp hqnd l</td>
									<td>Otto</td>
									<td><button class="btn btn-outline-danger">삭제</button>
										<button class="btn btn-outline-primary">취소</button></td>
								</tr>
								<tr>
									<th scope="row">2</th>
									<td colspan="3">Jacob</td>
									<td>Thornton</td>
									<td><button class="btn btn-outline-danger">삭제</button>
										<button class="btn btn-outline-primary">취소</button></td>
								</tr>
								<tr>
									<th scope="row">3</th>
									<td colspan="3">Larry</td>
									<td>the Bird</td>
									<td><button class="btn btn-outline-danger">삭제</button>
										<button class="btn btn-outline-primary">취소</button></td>
								</tr>
							</tbody>
						</table>

					</div>
				</div>




				<!-- 카테고리관리 -->
				<div class="card bg-light mb-3 d-none view categorycard">
					<div class="card-header">
						<h3>카테고리 관리</h3>
					</div>
					<div class="card-body">

						<div class="row">
							<div class="col-4">
								<div class="card">
									<div class="card-header">#대분류</div>
									<ul class="list-group">
										<li class="list-group-item">Cras justo odio</li>
										<li class="list-group-item">Dapibus ac facilisis in</li>
										<li class="list-group-item">Morbi leo risus</li>
										<li class="list-group-item">Porta ac consectetur ac</li>
										<li class="list-group-item">Vestibulum at eros</li>
									</ul>
								</div>
							</div>

							<div class="col-8">
								<div class="card">
									<div class="card-header">
										<div class="row">
											<div class="col">#요청</div>
											<div class="col">#횟수</div>
											<div class="col">#처리</div>
										</div>
									</div>
									<div class="card-body">
										<div class="row">
											<div class="col">소분류</div>
											<div class="col">6</div>
											<div class="col">
												<button class="btn btn-outline-danger">삭제</button>
												<button class="btn btn-outline-primary">취소</button>
											</div>
										</div>

										<div class="row">
											<div class="col">소분류2</div>
											<div class="col">5</div>
											<div class="col">
												<button class="btn btn-outline-danger">삭제</button>
												<button class="btn btn-outline-primary">취소</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>


					</div>
				</div>



				<!-- 삭제 목록 -->
				<div class="card bg-light mb-3 d-none view deletecard">
					<div class="card-header">
						<h3>삭제 목록</h3>
					</div>
					<div class="card-body">

						<table class="table">
							<thead>
								<tr>
									<th scope="col">#글번호</th>
									<th></th>
									<th scope="col">#내용</th>
									<th></th>
									<th scope="col">#처리</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td colspan="3">Mark kand ibfqo badp hqnd l</td>
									<td><button class="btn btn-outline-success">복구</button></td>
								</tr>
								<tr>
									<th scope="row">2</th>
									<td colspan="3">Jacob</td>
									<td><button class="btn btn-outline-success">복구</button></td>
								</tr>
								<tr>
									<th scope="row">3</th>
									<td colspan="3">Larry</td>
									<td><button class="btn btn-outline-success">복구</button></td>
								</tr>
							</tbody>
						</table>

					</div>
				</div>




			</div>
		</div>
	</div>
	
<script type="text/javascript">
$(document).ready(function(){
	$(".adminList").on('click', function(){
		$(".adminList").removeClass("active");
		$(this).addClass("active");
		var type = $(this).data("adminlist");
		if(type=="warnlist") {$(".view").addClass("d-none"); $('.warncard').removeClass("d-none");}
		if(type=="categorylist"){$(".view").addClass("d-none"); $('.categorycard').removeClass("d-none");}
		if(type=="deletelist"){$(".view").addClass("d-none"); $('.deletecard').removeClass("d-none");}
		if(type=="statistics"){$(".view").addClass("d-none"); $('.statistics').removeClass("d-none");}
	});
});
</script>
</body>
</html>