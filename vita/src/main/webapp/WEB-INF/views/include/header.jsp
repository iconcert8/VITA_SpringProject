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
<style>
@media ( min-width : 1600px) {
	.modal-xl {
		max-width: 1500px;
	}
}
.toolbar-icon a{margin-right:5px;}
</style>

<title>VITA</title>
</head>
<body>
	<!-- 툴바 -->
	<div class="container-fluid bg-light mb-5 py-3" style="position: sticky; top: 0px; z-index: 10;">
		<div class="row text-center">

			<!-- 로고 -->
			<div class="col-md-3 mt-3">
				<a href="#"><i class="fas fa-dog" style="font-size:55px; color:black">VITA</i></a>
			</div>

			<!-- 검색 -->
			<div class="col-md-5 mt-3">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Search tag..." aria-describedby="searchBtn">
					<div class="input-group-append">
						<button class="btn btn-outline-primary" id="searchBtn"><i class="fas fa-search" style="font-size:20px;"></i></button>
					</div>
				</div>
				<div class="mt-2">
					-<b>실시간 인기검색어</b>-
				</div>
			</div>
			
			<!-- 로그인 -->
			<div class="col-md-4 toolbar-icon mt-3">
				<a href="" data-toggle="modal" data-target="#writeModal"><i class="fas fa-edit" style="font-size:34px;"></i></a>
				<a href="#"><i class="fas fa-user-friends" style="font-size:34px;"></i></a>
				<a href="#"><i class="fas fa-envelope" style="font-size:34px;"></i></a>
				<a href="#"><i class="fas fa-bell" style="font-size:34px;"></i></a>
				<a href="#"><i class="fas fa-sign-out-alt" style="font-size:34px;"></i></a>
			</div>

			<!-- 비 로그인 -->
			<div class="col-md-4 toolbar-icon mt-3 d-none">
				<a href="#"><i class="fas fa-sign-in-alt" style="font-size:34px;"></i></a>
				<a href="#"><i class="fas fa-user-plus" style="font-size:34px;"></i></a>
			</div>
		</div>
	</div>

	<!-- 글쓰기 모달창 -->
	<div class="modal fade" id="writeModal" tabindex="-1" role="dialog" aria-labelledby="modalWriteTitle"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<!-- 글쓰기 모달창 헤더-->
				<div class="modal-header">
					<h5 class="modal-title" id="modalWriteTitle">글 작성</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<!-- 글쓰기 모달창 바디-->
				<div class="modal-body">
					<!-- 글쓰기 모달창 이미지 관련 부분-->
					<div class="card bg-light" id="imageUploadBox">
						<!-- 글쓰기 모달창 이미지 미리보기 출력부분-->
						<div class="card-header" id="image-preview">
							<ul id="image-block">
								<li class="d-inline-block mx-1">이미지1</li>
								<li class="d-inline-block mx-1">이미지2</li>
							</ul>
						</div>
						<!-- 글쓰기 모달창 파일 선택 부분-->
						<div class="card-body">
							<input type="file" id="write-image" multiple="multiple" />
						</div>
					</div>
					<!-- 글쓰기 모달창 대소분류 선택 부분-->
					<div class="card mt-2" id="contentWriteBox">
						<div class="card-body row">
							<!-- 글쓰기 모달창 대분류 선택 부분-->
							<div class="form-group col-sm-4">
								<label for="category-choose-big">대분류</label> <select
									id="category-choose-big" class="form-control">
									<option selected>[대분류 선택]</option>
									<option>게임</option>
									<option>영화</option>
								</select>
							</div>
							<!-- 글쓰기 모달창 소분류 선택 부분-->
							<div class="form-group col-sm-4">
								<label for="category-choose-small">소분류</label> <select
									id="category-choose-small" class="form-control">
									<option selected>[소분류 선택]</option>
									<option>오버워치</option>
									<option>롤</option>
									<option>배틀그라운드</option>
								</select>
							</div>
							<!-- 글쓰기 모달창 소분류 직접입력 부분, 소분류 기타일 경우에 나타남-->
							<div class="form-group col-sm-4">
								<label for="category-request">직접입력</label> <input type="text"
									class="form-control" placeholder="원하는 소분류"
									id="category-request" />
							</div>
						</div>
						
						<!-- 글쓰기 모달창 태그 입력 부분-->
						<div class="card-body pt-0">
							<label for="tag-write-input">태그</label> <input type="text"
								class="form-control" placeholder="#가나다#자전거" id="tag-write-input" />
						</div>
						
						<!-- 글쓰기 모달창 내용 입력 부분-->
						<div class="card-body pt-0">
							<div class="form-group">
								<label for="content-write-textarea">내용</label>
								<textarea class="form-control" id="content-write-textarea"
									placeholder="내용을 입력하여 주세요" rows="4"></textarea>
							</div>
						</div>
					</div>
				</div>
				<!-- 글쓰기 모달창 푸터, 작성/취소버튼-->
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
					<button type="button" class="btn btn-primary">작성하기</button>
				</div>
			</div>
		</div>
	</div>
