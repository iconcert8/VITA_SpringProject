<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>


<%@ include file="./include/header.jsp"%>


<div class="row">
	<div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
		<div class="card row">
			<ul class="card-header nav nav-pills text-center pb-0" style="font-size: 18px;">
				<li class="nav-item col">
					<a class="nav-link active flw-nav-btn" data-type="follower" href="#">팔로워</a>
				</li>
				<li class="nav-item col">
					<a class="nav-link flw-nav-btn" data-type="following" href="#">팔로잉</a></li>
				<li class="nav-item col">
					<a class="nav-link flw-nav-btn" data-type="follow" href="#">사람찾기</a>
				</li>
			</ul>
			<div class="card-body">
				<div class="input-group col-lg-8 offset-lg-2">
					<input type="text" class="form-control" id="flw-search-input" placeholder="Search ID..."
						aria-describedby="flw-search-btn">
					<div class="input-group-append">
						<button class="btn btn-outline-primary" id="flw-search-btn">
							<i class="fas fa-search" style="font-size: 20px;"></i>
						</button>
					</div>
				</div>
			</div>

			<div class="card-body">
				<ul class="list-group list-group-flush overflow-auto flw-list" style="max-height: 500px;">
					<li class="list-group-item text-center">
						<div class="row">
							<div class="col-7" style="font-size: 20px;">
								<div class="d-inline-block rounded bg-secondary">프로필</div>
								<div class="d-inline-block">
									<label class="mb-0">닉네임(ID)</label>
								</div>
							</div>
							<div class="col-5">
								<button class="btn btn-outline-primary">팔로우</button>
							</div>
						</div>
					</li>
					<li class="list-group-item text-center">
						<div class="row">
							<div class="col-7" style="font-size: 20px;">
								<div class="d-inline-block rounded bg-secondary">프로필</div>
								<div class="d-inline-block">
									<label class="mb-0">닉네임(ID)</label>
								</div>
							</div>
							<div class="col-5">
								<button class="btn btn-outline-primary">팔로우</button>
							</div>
						</div>
					</li>
					<li class="list-group-item text-center">
						<div class="row">
							<div class="col-7" style="font-size: 20px;">
								<div class="d-inline-block rounded bg-secondary">프로필</div>
								<div class="d-inline-block">
									<label class="mb-0">닉네임(ID)</label>
								</div>
							</div>
							<div class="col-5">
								<button class="btn btn-outline-primary">팔로우</button>
							</div>
						</div>
					</li>

				</ul>
			</div>
		</div>
	</div>
</div>




<script type="text/javascript" src="/resources/js/follow.js"></script>

<script type="text/javascript">
$(document).ready(function(){
	
	$(".flw-list").empty();
	var page = 0;
	var type = "follower";
	followService.getListFollower("null", page, getListFollowerCallback);
	followService.registerBtnEvent();
	
	$(document).keydown(function(event){
		if (event.keyCode == 13) {
			$(".flw-list").empty();
			page = 0;
			var searchWord = $("#flw-search-input").val();
			searchAction(searchWord, page);
        }
	});
	
	$("#flw-search-btn").on("click", function(){
		var searchWord = $("#flw-search-input").val();
		$(".flw-list").empty();
		page = 0;
		searchAction(searchWord, page);
	});
	
	$(".flw-nav-btn").on("click", function(event){
		event.preventDefault();
		
		$(".flw-nav-btn").removeClass("active");
		$(this).addClass("active");
		
		$(".flw-list").empty();
		$("#flw-search-input").val("");
		
		type = $(this).data("type");
		page = 0;
		
		$(".flw-list").empty();
		searchAction("null", page);
	});
	
	$(".flw-list").scroll(function(){
		if($(".flw-list").scrollTop() == $(".flw-list").prop("scrollHeight") - $(".flw-list").height()){
			var searchWord = $("#flw-search-input").val();
			page++;
			console.log("page: "+page);
			searchAction(searchWord, page);
		}
	});
	
	function searchAction(word, page){
		if(type == "follower"){
			followService.getListFollower(word, page, getListFollowerCallback);
		}else if(type == "following"){
			followService.getListFollowing(word, page, getListFollowingCallback);
		}else if(type == "follow"){
			followService.getList(word, page,  getListCallback);
		}
	}
	
});
	
</script>


<!-- callback function -->
<script type="text/javascript">
function getListFollowerCallback(result){
	
	$.each(result, function(index, item){
		
		var fileCallPath = encodeURIComponent(item.userImgUploadPath+"/s_"+item.userImgUuid+"_"+item.userImgFileName);
		
		//임시 이미지
		fileCallPath = 'test.gif';
		
		var html = "";
		html += '<li class="list-group-item text-center">';
		html +=		'<div class="row">';
		html +=			'<div class="col-7" style="font-size: 20px;">';
		html +=				'<div class="d-inline-block rounded bg-secondary"><img class="img-2" src="/display?fileName='+fileCallPath+'"></div>';
		html +=				'<div class="d-inline-block">';
		html +=					'<label class="mb-0">'+item.userNick+'('+item.userId+')'+'</label>';
		html +=				'</div>';
		html +=			'</div>';
		html +=			'<div class="col-5">';
		if(item.isFollow != null) {
			html += 		'<button class="btn btn-primary fln mt-3" data-userid="'+item.userId+'">팔로잉</button>';
		}
		else {
			html +=			'<button class="btn btn-outline-primary nofln mt-3" data-userid="'+item.userId+'">팔로우</button>';
		}
		html +=			'</div>';
		html +=		'</div>';
		html += '</li>';
		
		$(".flw-list").append(html);
	});
	
}

function getListFollowingCallback(result){
	
	$.each(result, function(index, item){
		
		var fileCallPath = encodeURIComponent(item.userImgUploadPath+"/s_"+item.userImgUuid+"_"+item.userImgFileName);
		
		//임시 이미지
		fileCallPath = 'test.gif';
		
		var html = "";
		html += '<li class="list-group-item text-center">';
		html +=		'<div class="row">';
		html +=			'<div class="col-7" style="font-size: 20px;">';
		html +=				'<div class="d-inline-block rounded bg-secondary"><img class="img-2" src="/display?fileName='+fileCallPath+'"></div>';
		html +=				'<div class="d-inline-block">';
		html +=					'<label class="mb-0">'+item.userNick+'('+item.userId+')'+'</label>';
		html +=				'</div>';
		html +=			'</div>';
		html +=			'<div class="col-5">';
		html += 		'<button class="btn btn-primary fln mt-3" data-userid="'+item.userId+'">팔로잉</button>';
		html +=			'</div>';
		html +=		'</div>';
		html += '</li>';
		
		$(".flw-list").append(html);
	});
}

function getListCallback(result){
	getListFollowerCallback(result);
}
	
</script>


<%@ include file="./include/footer.jsp"%>