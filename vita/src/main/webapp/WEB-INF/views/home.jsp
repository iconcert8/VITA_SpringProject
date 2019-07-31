<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ include file="./include/header.jsp"%>

<link rel="stylesheet" href="/resources/css/scrolltop.css">
<script src="/resources/js/scrolltop.js"></script>


<!-- 스크롤 탑 버튼-->
<i onclick="topFunction()" id="scrollTopBtn" class="fas fa-arrow-up"></i>

<!-- 중간 (카테고리 선택 부분, 피드 부분)-->
<div class="container-fluid">
	<div class="row">

		<!-- 카테고리 선택부분 -->
		<div class="col-md-4 col-lg-3">
			
			<c:if test="${sessionScope.authUser != null}">
				<!-- 팔로워 글, 즐겨찾기, 내글 버튼 -->
				<div class="card">
					<div class="card-header" id="userLeftBtn">
						<button class="btn btn-outline-secondary rounded" id="newsFeed">팔로워 글</button>
						<button class="btn btn-outline-secondary rounded" id="myFavorite">즐겨찾기</button>
						<button class="btn btn-outline-secondary rounded" id="myFeed">내글</button>
					</div>
				</div>
			</c:if> 

			<!-- 카테고리 선택 아코디언 -->
			<div class="accordion" id="accordion">

			</div>

		</div>


		<!-- 필터 현황 부분, 피드 출력부분 -->
		<div class="col-md-8 col-lg-9">
		
			<!-- 인기, 최신 버튼 -->
			<div class="text-right mt-2" id="categoryType">
				<button class="btn btn-secondary" id="popularBtn">인기글</button>
				<button class="btn btn-outline-secondary" id="recentBtn">최신순</button>
				<div class="clearfix mb-2"></div>
			</div>

			<!-- 유저 피드 바 -->
			<div class="card bg-light mb-3 d-none" id="userBar">
				<div class="card-header">
					<button class="btn btn-outline-secondary float-right" id="goToMainBtn">Home</button>
				</div>
			</div>

			<!-- 필터 현황 -->
			<div class="card bg-light mb-3" id="categoryBar">
				<div class="card-header">
					<button class="btn btn-outline-secondary float-right" id="resetFilter">초기화</button>
				</div>
			</div>

			<!-- 검색바 -->
			<div class="card bg-light mb-3 d-none" id="searchBar">
				<div class="card-header">
					<button class="btn btn-outline-secondary float-right" id="cancelSearch">검색 취소</button>
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


<%@ include file="./include/footer.jsp"%>