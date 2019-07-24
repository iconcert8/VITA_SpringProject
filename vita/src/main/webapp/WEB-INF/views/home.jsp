<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ include file="./include/header.jsp"%>

<link rel="stylesheet" href="/resources/css/scrolltop.css">
<script src="/resources/js/scrolltop.js"></script>
<style>

</style>

<!-- 스크롤 탑 버튼-->
<i onclick="topFunction()" id="scrollTopBtn" class="fas fa-arrow-up"></i>

<!-- 중간 (카테고리 선택 부분, 피드 부분)-->
<div class="container-fluid">
	<div class="row">

		<!-- 카테고리 선택부분 -->
		<div class="col-md-4 col-lg-3">

			<!-- 팔로워 글, 즐겨찾기, 내글 버튼 -->
			<div class="card">
				<div class="card-header" id="userLeftBtn">
					<button class="btn btn-outline-secondary rounded" id="newsFeed">팔로워 글</button>
					<button class="btn btn-outline-secondary rounded" id="myFavorite">즐겨찾기</button>
					<button class="btn btn-outline-secondary rounded" id="myFeed">내글</button>
				</div>
			</div>

			<!-- 카테고리 선택 아코디언 -->
			<div class="accordion" id="accordion">
				<div class="card">
					<button class="btn card-header" id="big1" data-toggle="collapse"
						data-target="#small1" aria-expanded="false" aria-controls="small1">게임</button>

					<div id="small1" class="collapse row" aria-labelledby="big1"
						data-parent="#accordion">

						<div class="col-sm-6">
							<input type="checkbox"><label>전체선택</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox"><label>오버워치</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox"><label>롤</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox"><label>배틀그라운드</label>
						</div>

					</div>
				</div>
				<div class="card">
					<button class="btn card-header" id="big2" data-toggle="collapse"
						data-target="#small2" aria-expanded="false" aria-controls="small1">영화</button>

					<div id="small2" class="collapse row" aria-labelledby="big2"
						data-parent="#accordion">

						<div class="col-sm-6">
							<input type="checkbox"><label>전체선택</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox"><label>해리포터</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox"><label>레옹</label>
						</div>
						<div class="col-sm-6">
							<input type="checkbox"><label>괴물</label>
						</div>

					</div>
				</div>
			</div>

		</div>

		<!-- 필터 현황 부분, 피드 출력부분 -->
		<div class="col-md-8 col-lg-9">
		
			<!-- 인기, 최신 버튼 -->
			<div class="text-right mt-2" id="categoryType">
				<button class="btn btn-outline-secondary" id="popularBtn">인기순</button>
				<button class="btn btn-outline-secondary" id="recentBtn">최신순</button>
				<div class="clearfix mb-2"></div>
			</div>

			<!-- 필터 현황 -->
			<div class="card bg-light mb-3" id="filterBar">
				<div class="card-header">
					<button class="btn btn-outline-secondary float-right">초기화</button>

					<div class="d-inline-block text-center mx-1">
						<span>오버워치</span>
						<button type="button" class="close" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<br>(게임)
					</div>
					<div class="d-inline-block text-center mx-1">
						<span>롤</span>
						<button type="button" class="close" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<br>(게임)
					</div>
					<div class="d-inline-block text-center mx-1">
						<span>배틀그라운드</span>
						<button type="button" class="close" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<br>(게임)
					</div>

				</div>
			</div>

			<!-- 회원정보, 다른유저 글보기 경우에만 출력-->
			<div class="card bg-light mb-3" id="userInfo">
				<div class="card-header text-center">
					<div class="d-inline-block rounded bg-secondary text-white">
						<h3>
							프로필
							</h3>
					</div>
					<div class="d-inline-block ml-3">
						<h3>닉네임(ID)</h3>
					</div>
					<div class="row mt-5">
						<button class="btn btn-outline-primary col col-sm-4 offset-sm-2">팔로우</button>
						<button class="btn btn-outline-primary col col-sm-4 ml-1">메세지</button>
					</div>
				</div>
			</div>

			<div class="row" id="viewFeedList">

				<!-- 피드 1개 -->
				<div class="col-xl-6">
					<div class="card bg-light mb-4">
						<!-- 피드 헤더 -->
						<div class="card-header">
							<div class="d-inline-block rounded bg-secondary">프로필</div>
							<div class="d-inline-block">
								<label>닉네임(ID)</label>
							</div>
							<div class="d-inline-block float-right">
								<button class="btn btn-outline-danger">신고</button>
							</div>
						</div>
						<!-- 피드 바디 -->
						<div class="card-body pt-2 pb-0">
							<label class="text-white bg-secondary mr-1 rounded">게임</label> <label
								class="text-white bg-secondary rounded">기타(등록안된게임)</label>
						</div>
						<div class="card-body pt-0">
							<div id="carouselControl3" class="carousel slide"
								data-interval="false" data-ride="carousel">
								<div class="carousel-inner bg-dark text-white"
									data-toggle="modal" data-target="#feedDetailModal">
									<div class="carousel-item active">
										<img src="..." class="d-block w-100" alt="no image"
											style="height: 300px;">
									</div>
									<div class="carousel-item">
										<img src="..." class="d-block w-100" alt="no image"
											style="height: 300px;">
									</div>
									<div class="carousel-item">
										<img src="..." class="d-block w-100" alt="no image"
											style="height: 300px;">
									</div>
								</div>
								<a class="carousel-control-prev" href="#carouselControl3"
									role="button" data-slide="prev"> <span
									class="carousel-control-prev-icon" aria-hidden="true"></span> <span
									class="sr-only">Previous</span>
								</a> <a class="carousel-control-next" href="#carouselControl3"
									role="button" data-slide="next"> <span
									class="carousel-control-next-icon" aria-hidden="true"></span> <span
									class="sr-only">Next</span>
								</a>
							</div>
						</div>
						<div class="card-body pt-2" data-toggle="modal"
							data-target="#feedDetailModal">
							<label> #태그#태그#태그<br> page load. If you don’t use
								data-ride="carousel" to initialize your carousel, you have to
								initialize it yourself. It cannot be used in combination with
								(redundant and unnecessary) explicit JavaScript initialization
								of the same carousel. ..더보기
							</label>
						</div>
						<div class="card-body row pt-2">
							<div class="col">
								<button class="btn btn-outline-primary w-100">
									좋아요:<span class="m-0 cnt">0</span>
								</button>
							</div>
							<div class="col">
								<button class="btn btn-outline-primary w-100"
									data-toggle="modal" data-target="#feedDetailModal">
									댓글:<span class="m-0 cnt">0</span>
								</button>
							</div>
							<div class="col">
								<button class="btn btn-outline-primary w-100">즐겨찾기</button>
							</div>
						</div>
					</div>
				</div>
				<!-- end 피드1개-->
			</div>
		</div>
	</div>
</div>
<!-- end 중간 (카테고리 선택 부분, 피드 부분)-->




<input type="hidden" id="authUserId" value='<c:out value="${authUser.userId }"/>'>
<script src="/resources/js/template.js"></script>
<script src="/resources/js/feedModule.js"></script>
<script src="/resources/js/replyModule.js"></script>
<script src="/resources/js/feed.js"></script>

 



<%@ include file="./include/footer.jsp"%>