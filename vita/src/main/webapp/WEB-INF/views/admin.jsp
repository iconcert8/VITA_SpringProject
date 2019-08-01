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

<link rel="stylesheet" href="/resources/css/img-size.css">
<style type="text/css"> 

.hover:HOVER {
	cursor: pointer;
	color:white;
	background-color: #007bff;
}
@media ( min-width : 1600px) {
	.modal-xl {
		max-width: 1500px;
	} 
}
</style>

<title>VITA admin</title>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4 col-lg-3 text-center">

				<ul class="list-group list-group-flush">
					<li class="list-group-item py-5">
						<a href="#"><i class="fas fa-chevron-down" style="font-size: 60px; color: black">ITA</i></a>
						<div>
							<label style="color: gray; font-weight: bold;">관리자</label>
						</div></li>
					<li class="list-group-item py-4 adminList hover" data-adminlist="warnlist">신고목록</li>
					<li class="list-group-item py-4 adminList hover" data-adminlist="categorylist">카테고리관리</li>
					<li class="list-group-item py-4 adminList hover" data-adminlist="deletelist">삭제목록</li>
					<li class="list-group-item py-4 adminList hover" data-adminlist="statistics">통계보기</li>
					<li class="list-group-item pt-5"><a href="/user/logout">로그아웃</a></li>
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
							<tbody class="warn-table">
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
									<ul class="list-group category-big-list">
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
									<div class="card-body category-small-list">
										
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
									<th scope="col">#삭제사유</th>
									<th></th>
									<th scope="col">#내용</th>
									<th></th>
									<th scope="col">#처리</th>
								</tr>
							</thead>
							<tbody class="deletedFeedListBox">
								<tr>
									<th scope="row">1</th>
									<td>삭제사유</td>
									<td colspan="3">Mark kand ibfqo badp hqnd l</td>
									<td><button class="btn btn-outline-success">복구</button></td>
								</tr>
								<tr>
									<th scope="row">2</th>
									<td>삭제사유</td>
									<td colspan="3">Jacob</td>
									<td><button class="btn btn-outline-success">복구</button></td>
								</tr>
								<tr>
									<th scope="row">3</th>
									<td>삭제사유</td>
									<td colspan="3">Larry</td>
									<td><button class="btn btn-outline-success">복구</button></td>
								</tr>
							</tbody>
						</table>

					</div>
				</div>

				
				<div class="card bg-light mb-3 d-none view statisticscard">
					<div class="card-header">
						<ul class="nav nav-pills row text-center pb-0" style="font-size: 18px;">
							<li class="nav-item col">
								<a class="nav-link statistics-nav-btn frequency" href="#">게시물 개수</a>
							</li>
							<li class="nav-item col">
								<a class="nav-link statistics-nav-btn wordcloud" href="#">게시물 키워드</a></li>
							<li class="nav-item col">
								<a class="nav-link statistics-nav-btn timeseries" href="#">일별 게시물 수</a>
							</li>
						</ul>
					</div>
					
					<div class="card-body statistics-body frequencyBody d-none">
						<div class="row">
							<!-- 대분류 선택 부분-->
							<div class="col-sm-3 text-center pt-1">
								<span style="font-size:18px;">대분류</span>
							</div>
							<div class="form-group col-sm-6">
								<select id="choose-frequency-big" class="form-control">
								</select>
							</div>
							<div class="col-sm-3 text-center">
								<button class="btn btn-primary frequencyResultBtn">확인</button>
							</div>
						</div>
						<div class="frequencyResult text-center">
							
						</div>
						
					</div>
					
					<div class="card-body statistics-body wordcloudBody d-none">
						<div class="row">
							<!-- 대분류 선택 부분-->
							<div class="col-lg-2 text-center pt-1">
								<span style="font-size:18px;">대분류</span>
							</div>
							<div class="form-group col-lg-3">
								<select id="choose-wordcloud-big" class="form-control">
								</select>
							</div>
							<div class="col-lg-2 text-center pt-1">
								<span style="font-size:18px;">소분류</span>
							</div>
							<div class="form-group col-lg-3">
								<select id="choose-wordcloud-small" class="form-control">
								</select>
							</div>
							<div class="col-lg-2">
								<button class="btn btn-primary wordcloudResultBtn">확인</button>
							</div>
						</div>
						<div class="wordcloudResult text-center">
							
						</div>
					</div>
					
					<div class="card-body statistics-body timeseriesBody d-none">
						<div class="row">
							<!-- 대분류 선택 부분-->
							<div class="col-lg-2 text-center pt-1">
								<span style="font-size:18px;">대분류</span>
							</div>
							<div class="form-group col-lg-4">
								<select id="choose-timeseries-big" class="form-control">
								</select>
							</div>
							<div class="col-lg-2 text-center pt-1">
								<span style="font-size:18px;">소분류</span>
							</div>
							<div class="form-group col-lg-4">
								<select id="choose-timeseries-small" class="form-control">
								</select>
							</div>
							<div class="col-lg-2 text-center pt-1">
								<span style="font-size:18px;">기간</span>
							</div>
							<div class="form-group col-lg-4">
								<select id="choose-timeseries-period" class="form-control">
									<option value="null">전체기간</option>
									<option value="7">최근 일주일</option>
									<option value="30">최근 한달</option>
									<option value="365">최근 1년</option>
								</select>
							</div>
							<div class="col-lg-6 text-center">
								<button class="btn btn-primary timeseriesResultBtn">확인</button>
							</div>
						</div>
						<div class="timeseriesResult text-center">
							
						</div>
					</div>
					
				</div>


			</div>
		</div>
	</div>
	
	
<!-- 신고 상세보기 모달 -->
<div class="modal fade" id="adminFeedDetailModal" tabindex="-1" role="dialog"
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
				<!-- 피드 상세보기 이미지 부분 -->
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
				<!-- 피드 상세보기 글 정보, 댓글 부분 -->
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
									좋아요:<label class="m-0">0</label>
								</button>
							</div>
							<div class="col">
								<button class="btn btn-outline-primary w-100">즐겨찾기</button>
							</div>
						</div>

						<div class="card-header">
							<div class="input-group">
								<input type="text" class="form-control" placeholder="reply..."
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
								</li>
								<li class="list-group-item">
									<div class="d-inline-block rounded bg-secondary">프로필</div>
									<div class="d-inline-block">
										<label class="mb-0">닉네임(ID)</label>
									</div> <label class="d-inline ml-3"> initialize it yourself.
										It cannot be used in combinatio,asdon she a initialize it
										yourself. It cannot be used in combinatio </label> <label
									class="text-secondary"> (2019-07-21 18:32) </label>
								</li>
								<li class="list-group-item">
									<div class="d-inline-block rounded bg-secondary">프로필</div>
									<div class="d-inline-block">
										<label class="mb-0">닉네임(ID)</label>
									</div> <label class="d-inline ml-3"> initialize it yourself.
										It cannot be used in combinatio </label> <label class="text-secondary">
										(2019-07-21 18:32) </label>
								</li>
								<li class="list-group-item">
									<div class="d-inline-block rounded bg-secondary">프로필</div>
									<div class="d-inline-block">
										<label class="mb-0">닉네임(ID)</label>
									</div> <label class="d-inline ml-3"> initialize it yourself.
										It cannot be used in combinatio </label> <label class="text-secondary">
										(2019-07-21 18:32) </label>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end 신고 상세보기 모달 -->
	

<!-- 삭제 모달창 -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="modalWriteTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<!-- 삭제 모달창 헤더-->
			<div class="modal-header">
				<h5 class="modal-title" id="modalWriteTitle">피드 삭제</h5>
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
							<select class="form-control" id="deleteCategory">
								<option selected="selected" value="욕설">욕설</option>
								<option value="광고">광고</option>
								<option value="음란">음란</option>
								<option value="사기">사기</option>
								<option value="도배">도배</option>
							</select>
						</div>
						
					</div>
					
					
					<!-- 신고 모달창 내용 입력 부분-->
					<div class="card-body pt-0">
						<div class="form-group">
							<label for="content-write-textarea">사유</label>
							<textarea class="form-control" id="deleteReason" placeholder="내용을 입력하여 주세요" rows="4"></textarea>
						</div>
					</div>
				</div>
			</div>
			<!-- 신고 모달창 푸터, 작성/취소버튼-->
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
				<button type="button" class="btn btn-danger deleteDecision">삭제하기</button>
			</div>
		</div>
	</div>
</div>

<!-- 카테고리 추가시 확인 모달창 -->
<div class="modal fade" id="decisionAlertModal" tabindex="-1" role="dialog" aria-labelledby="modalWriteTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<!-- 카테고리 추가 바디-->
			<div class="modal-body">
						
			</div>
			<!-- 카테고리 모달창 푸터, 확인 버튼-->
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal">확인</button>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="/resources/js/warn.js"></script>
<script type="text/javascript" src="/resources/js/template.js"></script>
<script type="text/javascript" src="/resources/js/feedModule.js"></script>
<script type="text/javascript" src="/resources/js/notification.js"></script>
<script type="text/javascript" src="/resources/js/categoryModule.js"></script>
<script type="text/javascript" src="/resources/js/categoryRequest.js"></script>
<script type="text/javascript" src="/resources/js/deletedFeed.js"></script>
<script type="text/javascript" src="/resources/js/statistics.js"></script>

<script type="text/javascript">
$(document).ready(function(){
	$(".adminList").on('click', function(){
		var type = $(this).data("adminlist");
		
		if(type=="warnlist") {
			warnService.getList(0, warnGetListCallback);
		}
		if(type=="categorylist"){
			categoryService.bigCall(categoryBigListCallback);
		}
		if(type=="deletelist"){
			deletedFeedService.getList(0, deletedFeedGetListCallback);
		}
		if(type=="statistics"){
			
		}
	});
	
	/* warn 이벤트 등록 */
	//warn detail modal 뿌리기
	$(document).on('click', 'td[data-target="#adminFeedDetailModal"]', function() {
        var feedNo = $(this).data("feedno");
        
        feedService.get(feedNo, function(result) {
            $('#adminFeedDetailModal').empty().append(template.warnfeedDetail(result));
            warnService.getListRequest(feedNo, warnGetListRequestCallback);
        });
    });
	//warn delete modal 뿌리기
	$(document).on('click', 'button[data-target="#deleteModal"]', function(){
		var feedNo = $(this).data("feedno");
		var feedLimitContent = $(this).data("feedlimitcontent");
		$("#deleteModal").empty().append(template.warnDelete(feedNo, feedLimitContent));
	});
	//warn delete 확인
	$(document).on('click', '.deleteDecision', function(){
		var feedNo = $(this).data("feedno");
		var feedLimitContent = $(this).data("feedlimitcontent");
		var warnCategory = $('.deleteCategory').val();
		var deletedFeedReason = $('.deleteReason').val();
		
		var target = "td[data-feedno="+feedNo+"]";
		var $tr = $(target);
		
		var deletedFeed = {"feedNo":feedNo, "feedLimitContent":feedLimitContent, "warnCategory":warnCategory, "deletedFeedReason":deletedFeedReason};
		warnService.remove(feedNo, deletedFeed, function(){
			alert("삭제 완료"); 
			$("#deleteModal").modal("hide");
			$tr.closest("tr").remove();
			
			var notification = {"reqId":"root", "feedNo":feedNo, "notifyType":"delete"};
			
			notificationService.register(notification);
		});
	});
	
	//warn 취소
	$(document).on('click', '.deleteCancel', function(){
		var feedNo = $(this).data("feedno");
		var $this = $(this);
		warnService.modify(feedNo, function(){
			alert("취소 완료");
			$this.closest("tr").remove();
		});
	});
	
	
	/* warn콜백함수 */
	function warnGetListCallback(result){
		$(".warn-table").empty();
		$.each(result, function(index, item){
			var content = item.feedLimitContent;
			if(content.length > 30){
				content = content.substring(0,30);
			}
			var html = "";
			html += '<tr>';
			html += 	'<th>'+item.feedNo+'</th>';
			html +=		'<td class="hover" data-toggle="modal" data-target="#adminFeedDetailModal" data-feedno="'+item.feedNo+'" colspan="3">'+content+'</td>';
			html +=		'<td>'+item.count+'</td>';
			html +=		'<td>';
			html +=			'<button class="btn btn-outline-danger" data-toggle="modal" data-target="#deleteModal" data-feedno="'+item.feedNo+'" data-feedlimitcontent="'+item.feedLimitContent+'">삭제</button>';
			html +=			'<button class="btn btn-outline-primary deleteCancel" data-feedno="'+item.feedNo+'">취소</button>';			
			html +=		'</td>';
			html +=	'</tr>';
			
			$(".warn-table").append(html);
		});
	}
	
	function warnGetListRequestCallback(result){
		$.each(result, function(index, item){
			var date = new Date(item.warnDate);
			var warnDate = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-'
            + (date.getDate() < 9 ? '0' : '') + date.getDate() + ' '
            + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
			
			var html = "";
			html += '<li class="list-group-item">';
			html += 	'<div class="d-inline-block">';
			html +=			'<label class="mb-0">'+item.userId+'</label>';
			html +=		'</div>';
			html +=		'<label class="d-inline ml-3">'+item.warnMsg+'</label>';
			html +=		'<label class="text-secondary" style="font-size:12px;">'+warnDate+'</label>';
			html += '</li>';
			
			$('#warnRequestModal').append(html);
		});	
	}
	
	/* category 이벤트 등록 */
	//big카테고리 클릭시 이벤트(소분류 불러오기, 버튼 활성화)
	$(document).on('click', "li[data-big]", function(){
		var big = $(this).data("big");
		categoryRequestService.getList(big, 0, categorySmallListCallback);
		$("li[data-big]").removeClass("active");
		$(this).addClass("active");
	});
	
	//카테고리 추가시
	$(document).on('click', ".categoryRequestDecision-btn", function(){
		var $row = $(this).closest(".row");
		var bigGroup = $row.data("biggroup");
		var smallGroup = $row.data("smallgroup");
		var feedNo = [];
		$row.find("option").each(function(){
			feedNo.push(Number($(this).val()))
		});
		categoryRequestService.register(bigGroup, smallGroup, feedNo, function(){
			var text = bigGroup+" / "+smallGroup+" 이 추가되었습니다.";
			$("#decisionAlertModal").empty();
			$("#decisionAlertModal").append(template.decisionAlertModal(text, 'btn-primary'));
			$("#decisionAlertModal").modal("show");
			$row.remove();
		});
		
		
	});
	
	//카테고리 요청 취소시
	$(document).on('click', ".categoryRequestDismiss-btn", function(){
		var $row = $(this).closest(".row");
		var bigGroup = $row.data("biggroup");
		var smallGroup = $row.data("smallgroup");
		
		categoryRequestService.remove(bigGroup, smallGroup, function(){
			var text = bigGroup+" / "+smallGroup+" 이 거절되었습니다.";
			$("#decisionAlertModal").empty();
			$("#decisionAlertModal").append(template.decisionAlertModal(text, 'btn-danger'));
			$("#decisionAlertModal").modal("show");
			$row.remove();
		});
	});
	
	/* category 콜백함수 */
	function categoryBigListCallback(result){
		$(".category-big-list").empty();
		$.each(result, function(index, item){
			var html = "";
			
			html += '<li class="list-group-item hover" data-big="'+item+'">';
			html += 	item;
			html += '</li>';
			
			$(".category-big-list").append(html);
		});
		
	}
	
	function categorySmallListCallback(result, big){
		$(".category-small-list").empty();
		if(result == null || result == ""){
			$(".category-small-list").append(big+" 요청 없음");
		}
		$.each(result, function(index, item){
			var html = "";
			html += '<div class="row mb-2" data-biggroup="'+item.bigGroup+'" data-smallgroup="'+item.categoryRequestSmallGroup+'">';
			html +=		'<datalist>';
			$.each(item.feedNo, function(i, fno){
				html +=		'<option value="'+fno+'">';
			});
			html +=		'</datalist>';
			html += 	'<div class="col">'+item.categoryRequestSmallGroup+'</div>';
			html += 	'<div class="col">'+item.count+'</div>';			
			html += 	'<div class="col">';
			html +=			'<button class="btn btn-outline-primary categoryRequestDecision-btn mx-1">수락</button>';
			html +=			'<button class="btn btn-outline-danger categoryRequestDismiss-btn mx-1">취소</button>';
			html += 	'</div>';	
			html += '</div>';
			
		
			$(".category-small-list").append(html);
		});
	}
	
	
	
	/* deletefeed 이벤트 등록 */
	//deletefeed 상세보기 창
	$(document).on('click', '.deletedContent', function() {
		var $tr = $(this).closest('tr');
        var feedNo = $tr.data("feedno");
        var warnCategory = $tr.data("warncategory");
        var deletedFeedReason = $tr.data("deletedfeedreason");
        
        
        feedService.get(feedNo, function(result) {
        	var html = "";
        	html += '<li class="list-group-item">';
        	html += 	deletedFeedReason;
        	html +=	'</li>';
            $('#adminFeedDetailModal').empty().append(template.deletedfeedDetail(result, warnCategory));
            $('#deletedFeedReasonBox').append(html);
            
            $('#adminFeedDetailModal').modal("show");
        });
    });
	//복구시 ajax호출 및 alert창	
	$(document).on('click', '.recoverBtn', function(){
		var $tr = $(this).closest("tr");
		var feedNo = $tr.data("feedno");
		
		deletedFeedService.modify(feedNo, function(){
			var text = feedNo+"번 게시글이 복구 되었습니다.";
			$("#decisionAlertModal").empty();
			$("#decisionAlertModal").append(template.decisionAlertModal(text, 'btn-success'));
			$("#decisionAlertModal").modal("show");
			$tr.remove();
			
			var notification = {"reqId":"root", "feedNo":feedNo, "notifyType":"deleteRecover"};
			notificationService.register(notification);
		});
	});
	
	/* deletefeed 콜백함수 */
	function deletedFeedGetListCallback(result){
		$(".deletedFeedListBox").empty();
		$.each(result, function(index, item){
			var content = item.feedLimitContent;
			if(content.length > 30){
				content = content.substring(0,30);
			}
			
			var html = "";
			html += '<tr data-feedno="'+item.feedNo+'" data-warncategory="'+item.warnCategory+'" data-deletedfeedreason="'+item.deletedFeedReason+'">';
			html +=		'<th>'+item.feedNo+'</th>';
			html +=		'<td>'+item.warnCategory+'</td>';
			html +=		'<td class="hover deletedContent" colspan="3">'+content+'</td>';
			html +=		'<td><button class="btn btn-outline-success recoverBtn">복구</button></td>';
			html += '</tr>';
			
			$(".deletedFeedListBox").append(html);
		});
		
		
	}
	
	/* statistics 콜백함수 */
	
	//로딩 html
	var loadingHtml = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
	/* statistics 이벤트 등록 */
	//nav버튼 이벤트
	$(document).on("click", ".statistics-nav-btn", function(){
		$(".statistics-nav-btn").removeClass("active");
		$(this).addClass("active");
	});
	
	//게시물 개수버튼 이벤트
	$(document).on("click", ".frequency", function(){
		$(".statistics-body").addClass("d-none");
		$(".frequencyBody").removeClass("d-none");
		categoryService.bigCall(function(result){
			$("#choose-frequency-big").empty();
			$("#choose-frequency-big").append('<option value="null">전체</option>')
			$.each(result, function(index, item){
				html ="";
				html += '<option class="frequencyBigOption" value="' + item + '">';
		 		html += 	item;
		 		html += '</option>';
		 		
		 		$("#choose-frequency-big").append(html);
		  	});
		});
	});
	//frequency 확인 버튼 이벤트
	var index = 0;
	$(document).on("click", ".frequencyResultBtn", function(){
		var select = $("#choose-frequency-big").val();
		
		$(".frequencyResult").html(loadingHtml);
		statisticsService.frequency(select, function(result){
			$(".frequencyResult").empty();
			html = "";
			html += '<img style="width:60%;" src="/display?fileName='+result+'&index='+(index++)+'">';
			$(".frequencyResult").append(html);
		});
	});
	
	
	
	//게시물 키워드버튼 이벤트
	$(document).on("click", ".wordcloud", function(){
		$(".statistics-body").addClass("d-none");
		$(".wordcloudBody").removeClass("d-none");
		categoryService.bigCall(function(result){
			$("#choose-wordcloud-big").empty();
			$("#choose-wordcloud-big").append('<option value="null">전체</option>')
			$.each(result, function(index, item){
				html ="";
				html += '<option class="wordcloudBigOption" value="' + item + '">';
		 		html += 	item;
		 		html += '</option>';
		 		
		 		$("#choose-wordcloud-big").append(html);
		  	});
			$("#choose-wordcloud-small").html('<option value="null">전체</option>');
		});
	});
	
	//wordcloud 큰카테고리 선택 이벤트
	$(document).on("change", "#choose-wordcloud-big", function(){
		var selectBig = $("#choose-wordcloud-big").val();
		if(selectBig == "null") $("#choose-wordcloud-small").html('<option value="null">전체</option>');
		else{
			categoryService.smallCall(selectBig, function(result){
				$("#choose-wordcloud-small").empty();
				$("#choose-wordcloud-small").append('<option value="null">전체</option>')
				$.each(result, function(index, item){
					html ="";
					html += '<option class="wordcloudSmallOption" value="' + item.smallGroup + '">';
			 		html += 	item.smallGroup;
			 		html += '</option>';
			 		
			 		$("#choose-wordcloud-small").append(html);
			  	});
			});
		}
	});
	
	//wordcloud 확인 버튼 이벤트
	$(document).on("click", ".wordcloudResultBtn", function(){
		var selectBig = $("#choose-wordcloud-big").val();
		var selectSmall = $("#choose-wordcloud-small").val();
		
		$(".wordcloudResult").html(loadingHtml);
		
		statisticsService.wordcloud(selectBig, selectSmall, function(result){
			$(".wordcloudResult").empty();
			html = "";
			html += '<img style="width:60%;" src="/display?fileName='+result+'&index='+(index++)+'">';
			$(".wordcloudResult").append(html);
		});
	});
	
	//일별 게시물 수 버튼 이벤트
	$(document).on("click", ".timeseries", function(){
		$(".statistics-body").addClass("d-none");
		$(".timeseriesBody").removeClass("d-none");
		categoryService.bigCall(function(result){
			$("#choose-timeseries-big").empty();
			$("#choose-timeseries-big").append('<option value="null">전체</option>')
			$.each(result, function(index, item){
				html ="";
				html += '<option class="timeseriesBigOption" value="' + item + '">';
		 		html += 	item;
		 		html += '</option>';
		 		
		 		$("#choose-timeseries-big").append(html);
		  	});
			$("#choose-timeseries-small").html('<option value="null">전체</option>');
		});
	});
	
	//timeseries 큰카테고리 선택 이벤트
	$(document).on("change", "#choose-timeseries-big", function(){
		var selectBig = $("#choose-timeseries-big").val();
		if(selectBig == "null") $("#choose-timeseries-small").html('<option value="null">전체</option>');
		else{
			categoryService.smallCall(selectBig, function(result){
				$("#choose-timeseries-small").empty();
				$("#choose-timeseries-small").append('<option value="null">전체</option>')
				$.each(result, function(index, item){
					html ="";
					html += '<option class="timeseriesSmallOption" value="' + item.smallGroup + '">';
			 		html += 	item.smallGroup;
			 		html += '</option>';
			 		
			 		$("#choose-timeseries-small").append(html);
			  	});
			});
		}
	});
	
	//timeseries 확인 버튼 이벤트
	$(document).on("click", ".timeseriesResultBtn", function(){
		var selectBig = $("#choose-timeseries-big").val();
		var selectSmall = $("#choose-timeseries-small").val();
		var selectPeriod = $("#choose-timeseries-period").val();
		
		$(".timeseriesResult").html(loadingHtml);
		
		statisticsService.timeseries(selectPeriod, selectBig, selectSmall, function(result){
			$(".timeseriesResult").empty();
			html = "";
			html += '<img style="width:60%;" src="/display?fileName='+result+'&index='+(index++)+'">';
			$(".timeseriesResult").append(html);
		});
	});
	
});
</script>
	
	
	
	
	
<!-- 기본이벤트 -->	
<script type="text/javascript">
$(document).ready(function(){
	$(".adminList").on('click', function(){
		$(".adminList").removeClass("active");
		$(this).addClass("active");
		var type = $(this).data("adminlist");
		if(type=="warnlist") {$(".view").addClass("d-none"); $('.warncard').removeClass("d-none");}
		if(type=="categorylist"){$(".view").addClass("d-none"); $('.categorycard').removeClass("d-none");}
		if(type=="deletelist"){$(".view").addClass("d-none"); $('.deletecard').removeClass("d-none");}
		if(type=="statistics"){$(".view").addClass("d-none"); $('.statisticscard').removeClass("d-none");}
	});
});
</script>
</body>
</html>