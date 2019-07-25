<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/img-size.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/resources/js/notification.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		notificationService.webSocketLoad();
	});
</script>
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
				<a href="/"><i class="fas fa-chevron-down" style="font-size:60px; color:black">ITA</i></a>
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
			
			<c:if test="${sessionScope.authUser != null}">
				<div class="col-md-4 toolbar-icon mt-3">
					<a href="" data-toggle="modal" id="callBig" data-target="#writeModal"><i class="fas fa-edit" style="font-size:34px;"></i></a>
					<a href="/follow"><i class="fas fa-user-friends" style="font-size:34px;"></i></a>
					<div class="d-inline-block" style="position:relative;">
						<a href="/messenger"><i class="fas fa-envelope" style="font-size:34px;"></i></a>
						<span style="width:20px; height:20px; background-color: red; position:absolute; right:-3px; top:-8px; font-weight:bold; color:white;">0</span>
					</div>
					<div class="dropdown d-inline-block" style="position:relative;">
						<a class="dropdown" href="#" role="button" id="notification-view-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  data-offset="50,10"><i class="fas fa-bell" style="font-size:34px;"></i></a>
						<span class="notification-cnt" style="width:20px; height:20px; background-color:red; position:absolute; top:-8px; font-weight:bold; color:white;">0</span>
						<div class="dropdown-menu dropdown-menu-right notification-list-block overflow-auto" style="max-height:300px;" aria-labelledby="notification-view-btn">
								<button class="dropdown-item notification-ChkAll">전체알림 끄기</button>
								
						</div>
					</div>
					<a href="/testlogout"><i class="fas fa-sign-out-alt" style="font-size:34px;"></i></a>
				</div>
			</c:if>

			<c:if test="${sessionScope.authUser == null}">
				<!-- 비 로그인시 메뉴 -->
				<div class="col-md-4 toolbar-icon mt-3">
					<a href="/testlogin"><i class="fas fa-sign-in-alt" style="font-size:34px;"></i></a>
					<a href="#"><i class="fas fa-user-plus" style="font-size:34px;"></i></a>
				</div>
			</c:if>	
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
						<div class="card-header" >
							<ul id="image-block">
<!-- 								<li class="d-inline-block mx-1" id="preview0~9">이미지1</li> -->
							</ul>
						</div>
						
						<!-- 글쓰기 모달창 파일 선택 부분-->
						<div class="card-body">
							<input type="file" id="write-image" name="uploadFile" maxlength="10" multiple="multiple" />
						</div>

					</div>
					<!-- 글쓰기 모달창 대소분류 선택 부분-->
					<div class="card mt-2" id="contentWriteBox">
						<div class="card-body row">
							<!-- 글쓰기 모달창 대분류 선택 부분-->
							<div class="form-group col-sm-4">
								<label for="category-choose-big">대분류</label> <select
									id="category-choose-big" class="form-control">
								</select>
							</div>
							<!-- 글쓰기 모달창 소분류 선택 부분-->
							<div class="form-group col-sm-4">
								<label for="category-choose-small">소분류</label>
								<select id="category-choose-small" class="form-control"></select>
							</div>
							<!-- 글쓰기 모달창 소분류 직접입력 부분, 소분류 기타일 경우에 나타남-->
							<div class="form-group col-sm-4 d-none" id="selfInsert">
								<label for="category-request">직접입력</label> <input type="text"
									class="form-control" placeholder="원하는 소분류"
									id="category-request" name="categoryTemp"/>
							</div>
						</div>
						
						<!-- 글쓰기 모달창 태그 입력 부분-->
						<div class="card-body pt-0">
							<label for="tag-write-input">태그</label> <input type="text"
								class="form-control" placeholder="#가나다#자전거" id="tag-write-input" name="tags"/>
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
					<button type="button" class="btn btn-secondary" data-dismiss="modal" >취소</button>
					<button type="button" class="btn btn-primary" id="insertFeedBtn">작성하기</button>
				</div>
			</div>
		</div>
	</div>
	
	
<!-- 피드 상세보기 모달 -->
<div class="modal fade" id="feedDetailModal" tabindex="-1" role="dialog"
	aria-hidden="true">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-body m-0 p-0">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body row">
				피드 상세보기 이미지 부분
				<div class="col-xl-8">
					<div id="carouselControlDetail1" class="carousel slide"
						data-interval="false" data-ride="carousel">
						<div class="carousel-inner bg-dark text-white">
							<div class="carousel-item active">
								<img src="..." class="d-block w-100" alt="no image"
									style="height: 800px;">
							</div>
							<div class="carousel-item">
								<img src="..." class="d-block w-100" alt="no image"
									style="height: 800px;">
							</div>
							<div class="carousel-item">
								<img src="..." class="d-block w-100" alt="no image"
									style="height: 800px;">
							</div>
						</div>
						<a class="carousel-control-prev" href="#carouselControlDetail1"
							role="button" data-slide="prev"> <span
							class="carousel-control-prev-icon" aria-hidden="true"></span> <span
							class="sr-only">Previous</span>
						</a> <a class="carousel-control-next" href="#carouselControlDetail1"
							role="button" data-slide="next"> <span
							class="carousel-control-next-icon" aria-hidden="true"></span> <span
							class="sr-only">Next</span>
						</a>
					</div>
				</div>
				피드 상세보기 글 정보, 댓글 부분
				<div class="col-xl-4">
					<div class="card">
						<div class="card-body d-inline-block pt-2 pb-0">
							<label class="text-white bg-secondary mr-1 rounded">대분류</label> <label
								class="text-white bg-secondary rounded">소분류</label>
							<div class="d-inline-block float-right pt-0 mt-0">
								<button class="btn btn-outline-danger">신고</button>
							</div>
						</div>
						<div class="card-body">
							<div class="d-inline-block rounded bg-secondary">프로필</div>
							<div class="d-inline-block">
								<label>닉네임(ID)</label>
							</div>
						</div>
						<div class="card-body">
							<div class="d-inline-block bg-secondary text-white p-0">
								#태그#태그#태그#태그</div>
						</div>
						<div class="card-body pt-0">
							<div>page load. If you don’t usedata-ride="carousel" to
								initialize your carousel, you have to initialize it yourself. It
								cannot be used in combination with (redundant and unnecessary)
								explicit JavaScript initialization of the same carousel. page
								load. If you don’t use data-ride="carousel" to initialize your
								carousel, you have to initialize it yourself. It cannot be used
								in combination with (redundant and unnecessary) explicit
								JavaScript initialization of the same carousel.</div>
						</div>

						<div class="card-body row pt-2">
							<div class="col">
								<button class="btn btn-outline-primary w-100">
									좋아요:<span class="m-0 cnt">0</span>
								</button>
							</div>
							<div class="col">
								<button class="btn btn-outline-primary w-100">즐겨찾기</button>
							</div>
						</div>

						<div class="card-header">
							<div class="input-group">
								<input id="gogi" type="text" class="form-control" placeholder="reply..."
									aria-describedby="sendReplyBtn">
								<div class="input-group-append">
									<button class="btn btn-outline-primary" id="sendReplyBtn">댓글</button>
								</div>
							</div>
						</div>
						<div class="card-body pt-0">
							<div>
								댓글 <label>0</label>개
							</div>
							<ul class="list-group overflow-auto" style="height: 230px;">
								<li class="list-group-item">
									<div class="d-inline-block rounded bg-secondary">프로필</div>
									<div class="d-inline-block">
										<label class="mb-0">닉네임(ID)</label>
									</div> <label class="d-inline ml-3"> initialize it yourself.
										It cannot be used in combinatio </label> <label class="text-secondary">
										(2019-07-21 18:32) </label>
									<button type="button" class="close float-right" aria-label="Close">
           							 	<span aria-hidden="true">&times;</span>
        							</button>
								</li>
								<li class="list-group-item">
									<div class="d-inline-block rounded bg-secondary">프로필</div>
									<div class="d-inline-block">
										<label class="mb-0">닉네임(ID)</label>
									</div> <label class="d-inline ml-3"> initialize it yourself.
										It cannot be used in combinatio,asdon she a initialize it
										yourself. It cannot be used in combinatio </label> <label
									class="text-secondary"> (2019-07-21 18:32) </label>
									<button type="button" class="close float-right" aria-label="Close">
           							 	<span aria-hidden="true">&times;</span>
        							</button>
								</li>
								<li class="list-group-item">
									<div class="d-inline-block rounded bg-secondary">프로필</div>
									<div class="d-inline-block">
										<label class="mb-0">닉네임(ID)</label>
									</div> <label class="d-inline ml-3"> initialize it yourself.
										It cannot be used in combinatio </label> <label class="text-secondary">
										(2019-07-21 18:32) </label>
										<button type="button" class="close float-right" aria-label="Close">
           							 	<span aria-hidden="true">&times;</span>
        							</button>
								</li>
								<li class="list-group-item">
									<div class="d-inline-block rounded bg-secondary">프로필</div>
									<div class="d-inline-block">
										<label class="mb-0">닉네임(ID)</label>
									</div> <label class="d-inline ml-3"> initialize it yourself.
										It cannot be used in combinatio </label> <label class="text-secondary">
										(2019-07-21 18:32) </label>
										<button type="button" class="close float-right" aria-label="Close">
           							 	<span aria-hidden="true">&times;</span>
        							</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--end 피드 상세보기 모달 -->

<!-- 신고 모달창 -->
<div class="modal fade" id="warnModal" tabindex="-1" role="dialog" aria-labelledby="modalWriteTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<!-- 신고 모달창 헤더-->
			<div class="modal-header">
				<h5 class="modal-title" id="modalWriteTitle">신고</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<!-- 신고 모달창 바디-->
			<div class="modal-body">
				
				<!-- 신고 모달창 대소분류 선택 부분-->
				<div class="card mt-2" >
					<div class="card-body">
						<!-- 신고 모달창 대분류 선택 부분-->
						<div class="form-group">
							<label>신고분류</label> 
							<select class="form-control warnCategory">
								<option selected>[신고 선택]</option>
								<option>욕설</option>
								<option>광고</option>
								<option>음란</option>
								<option>사기</option>
								<option>도배</option>
							</select>
						</div>
					</div>
					
					
					<!-- 신고 모달창 내용 입력 부분-->
					<div class="card-body pt-0">
						<div class="form-group">
							<label for="content-write-textarea">내용</label>
							<textarea class="form-control warnMsg" placeholder="내용을 입력하여 주세요" rows="4"></textarea>
						</div>
					</div>
					<p class="text-danger font-weight-bolder pl-4 warnCheckMsg"></p>
				</div>
			</div>
			
			<!-- 신고 모달창 푸터, 작성/취소버튼-->
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
				<button type="button" class="btn btn-danger" id="warnActionBtn" data-feedno='', data-limitcontent='' data-toggle="modal" data-target="#alertModal" aria-label="Close">신고하기</button>
			</div>
		</div>
	</div>
</div>

<!-- 알림 모달창 -->
<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-body m-0 p-0">
				<%-- <div class="card bg-light" id="imageUploadBox"> --%>
					<%-- <div class="card-body"> --%>
						<p class="text-secondary font-weight-bolder alertMsg text-center pt-2" style="font-size:20px;"></p>
					<%-- </div> --%>
				<%-- </div> --%>
			</div>
		</div>
	</div>
</div>

<link rel="stylesheet" href="/resources/css/upload.css" />
<script type="text/javascript" src="/resources/js/header.js"></script>
<script type="text/javascript" src="/resources/js/category.js"></script>
<script type="text/javascript" src="/resources/js/feedUploadFile.js"></script>
<script type="text/javascript">
$(function(){
// 	글쓰기 창 선택시 대분류 나타나게 해줌
	$("#callBig").on("click", function(){
		categoryService.bigCall(bigCallback);
	});
		
// 	대분류 선택시 소분류 생성
	$("#category-choose-big").on("change", function(e){
		categoryService.smallCall(this.value, smallCallback);
		
		if (this.value === "기타") {
			$("#selfInsert").removeClass("d-none");
		}else{
			$("#selfInsert").addClass("d-none");
		}
	});
	
// 	소분류 기타 선택시 직접입력창 생성/삭제
	$("#category-choose-small").on("change", function(e){
		if (this.value === "기타") {
			$("#selfInsert").removeClass("d-none");
		}else{
			$("#selfInsert").addClass("d-none");
		}
	});
});

// 글쓰기 버튼 활성화시 대분류 선택창 부르는 콜백함수
function bigCallback(result){
	var html = '';
	
	if(document.querySelector("#category-choose-big option") === null){
	//  처음 글쓰기 화면 활성화시 소분류 나타나게 해주는 코드
		categoryService.smallCall( result[0], smallCallback);
	
		$.each(result, function(index, item){
			html += '<option value="' + item + '">';
	 		html += item+'</option>';
	  	});
		var smallElement = document.getElementById("category-choose-small");
		var clickedSmallCategory = smallElement.value;
		$("#category-choose-big").append(html);
	}
}

//대분류 선택시 소분류 나타나게 해주는 콜백함수
function smallCallback(result){
	var html = '';
	
	$.each(result, function(index, item){
		html += '<option value="' + item.smallGroup + '">';
 		html += item.smallGroup+'</option>';
 	});
	
	$("#category-choose-small").empty();
	$("#category-choose-small").append(html);
}
</script>

