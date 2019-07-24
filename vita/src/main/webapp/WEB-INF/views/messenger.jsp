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
				<!-- 검색결과 출력구간 -->
				<div class="card-body p-0">
					<div class="list-group">
						<a href="#" class="list-group-item list-group-item-action active">
							<div class="d-inline-block rounded bg-secondary">프로필</div>
							<div class="d-inline-block">
								<label>닉네임(ID)</label>
							</div>
						</a> <a href="#" class="list-group-item list-group-item-action">
							<div class="d-inline-block rounded bg-secondary">프로필</div>
							<div class="d-inline-block">
								<label>닉네임(ID)</label>
							</div>
						</a> <a href="#" class="list-group-item list-group-item-action">
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
				<div class="card-body">
					<!-- 채팅 상단 프로필 -->
					<h5>
						<div class="d-inline-block rounded bg-secondary">프로필</div>
						<div class="d-inline-block">
							<label>닉네임(ID)</label>
						</div>
					</h5>
					<!-- 채팅, overflow시 스크롤 생성됨 -->
					<div class="overflow-auto" style="height: 500px;">
						
						<!-- 상대방 채팅 -->
						<div>
							<div class="d-inline-block rounded bg-secondary">프로필</div>
							<div class="d-inline-block">
								<label>닉네임(ID)</label> <label
									style="font-size: 12px; color: gray;">2019-12-12
									10:20:24</label>
							</div>
							<div>안녕하세요</div>
						</div>

						<!-- 내 채팅 -->
						<div class="float-right">
							<div>
								<label style="font-size: 12px; color: gray;">2019-12-12
									10:20:34</label>
							</div>
							<div class="clearfix"></div>
							<div class="float-right">안녕하세요</div>
						</div>
						<div class="clearfix"></div>

						
					</div>
					
					<!-- 채팅 입력 -->
					<div>
						<div class="input-group">
							<input type="text" class="form-control" placeholder="..."
								aria-describedby="msgSendBtn">
							<div class="input-group-append">
								<button class="btn btn-outline-primary" id="msgSendBtn">
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