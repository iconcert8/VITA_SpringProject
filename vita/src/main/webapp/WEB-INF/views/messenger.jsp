<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ include file="./include/header.jsp"%>

<div class="container">

	<div class="row">
		<div class="col-lg-4">
			<!-- 검색 쪽 -->
			<div class="card mb-3">
				<!-- 검색어 input 구간 -->
				<div class="card-header">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="ID..."
							aria-describedby="msgSearchBtn">
						<div class="input-group-append">
							<button class="btn btn-outline-primary" id="msgSeachBtn">
								<i class="fas fa-search" style="font-size: 20px;"></i>
							</button>
							<button class="btn btn-outline-primary d-none"
								id="msgSearchDownBtn">
								<i class="fas fa-caret-square-down" style="font-size: 20px;"></i>
							</button>
							<button class="btn btn-outline-primary" id="msgSearchUpBtn">
								<i class="fas fa-caret-square-up" style="font-size: 20px;"></i>
							</button>
						</div>
					</div>
				</div>

				<!-- 대화목록및 팔로우 검색 출력구간 -->
				<div class="card-body p-0">
					<div class="list-group" id="messengerList">
						<a href="#" class="list-group-item list-group-item-action active" data-contact="">
							<div class="d-inline-block rounded bg-secondary">프로필</div>
							<div class="d-inline-block">
								<label>닉네임(ID)</label><br>
								<label class=".text-secondary lastMsg">마지막 대화 내용</label>
							</div>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-inline-block rounded bg-secondary">프로필</div>
							<div class="d-inline-block">
								<label>닉네임(ID)</label>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-8">
			<!-- 채팅창 쪽 -->
			<div class="card">
				<div class="card-header">
					<!-- 채팅 상단 프로필 -->
					<h5>
						<div class="d-inline-block rounded bg-secondary">프로필</div>
						<div class="d-inline-block">
							<label>닉네임(ID)</label>
						</div>
					</h5>
				</div>
				<div class="card-body">
					
					<!-- 채팅, overflow시 스크롤 생성됨 -->
					<div class="overflow-auto" style="height: 500px;" id="messageView">
						
						<!-- 상대방 채팅 -->
						<div>
							<div class="clearfix"></div>
							<div class="d-inline-block rounded bg-secondary float-left">프로필</div>
							<div class="d-inline-block float-left mx-2">
								<label>닉네임(ID)</label>
								<div>
									안녕하세요
									<label class="msgTime pl-2"style="font-size: 10px; color: gray;">오후 10:20</label>
								</div>
							</div>
						</div>

						<!-- 내 채팅 -->
						<div>
							<div class="clearfix"></div>
							<div class="float-right mx-2">
								<label class="readless pr-1" style="font-size: 8px; color: gray;">1</label>
								<label class="msgTime pr-2" style="font-size: 10px; color: gray;">오후 10:20</label>
								안녕하세요
							</div>
						</div>

						
					</div>
					
					<!-- 채팅 입력 -->
					<div>
						<div class="input-group">
							<input type="text" class="form-control" placeholder="..."
								aria-describedby="msgSendBtn" id="sendMsgForm">
							<div class="input-group-append">
								<button class="btn btn-outline-primary" id="sendMsgBtn">
									<i class="fas fa-paper-plane" style="font-size: 20px;"></i>
								</button>
							</div>
						</div>
					</div>
				

				</div>
			</div>
		</div>
	</div>


</div>

<script src="/resources/js/messengerModule.js"></script>
<script src="/resources/js/messenger.js"></script>
<!-- 검색결과 숨김 이벤트 -->
<script>
	$(document).ready(function(){
		$("#msgSearchDownBtn").click(function(){
			$(".list-group").removeClass("d-none");
			$("#msgSearchDownBtn").addClass("d-none");
			$("#msgSearchUpBtn").removeClass("d-none");
		});
		$("#msgSearchUpBtn").click(function(){
			$(".list-group").addClass("d-none");
			$("#msgSearchDownBtn").removeClass("d-none");
			$("#msgSearchUpBtn").addClass("d-none");
		});
	});
</script>


<%@ include file="./include/footer.jsp"%>