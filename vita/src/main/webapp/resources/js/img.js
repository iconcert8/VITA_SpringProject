$(function() {
	// 이미지 미리보기 설정
	$("#write-image").on("change", handleImg);

	// 프로필 이미지 변경 이벤트
	$(document).on("change", "#prof-img", function(e) {
		var file = e.target.files[0];

		if (!file.type.match("image.*")) {
			alert("이미지파일이 아닙니다")
			return;
		}

		if (file.size > 1048576) {
			$("#write-image").val("");
			alert("프로필이미지는 최대 1MB까지 업로드 가능합니다");
			return;
		}

		var imgForm = new FormData();
		imgForm.append("userImgFileName", file);
		
		$.ajax({
			url : "/user/update/" + $('#authUserId').val(),
			processData : false,
			contentType : false,
			data : imgForm,
			dataType: "text",
			type : 'put',
			success : function(result) {
				location.href = "/user/gotoUser/"+$('#authUserId').val();
			}
		});
	});
});

// -----------------------------------------------------------------

// 이미지 미리보기 설정
var selFiles = [];
var maxSize = 52428800;

// 파일 복사해서 폴더에 넣기
var copyImg = function(feedNo) {
	var copyForm = new FormData();
	var copyInput = $("input[name='uploadFile']");
	var copyFiles = copyInput[0].files;

	for (var i = 0; i < copyFiles.length; i++) {
		copyForm.append("uploadFile", copyFiles[i]);
	}

	$.ajax({
		url : '/feed/copy/' + feedNo,
		processData : false,
		contentType : false,
		data : copyForm,
		type : 'post',
		success : function(result) {
			alert("Uploaded");
			$("#write-image").val('');
			$("#tag-write-input").val('');
			$("#content-write-textarea").val('');
			$("#category-request").val('');
			$("#image-block").empty();

			$("#writeModal").modal("hide");
		}
	});
};

// -----------------------------------------------------------------

// 파일 선택시 미리보기 이미지 생성하기 및 파일 용량검사, 이미지 확장자 검사, 이미지 개수 검사
function handleImg(e) {
	$("#image-block").empty();

	var files = e.target.files;
	var filesArr = Array.prototype.slice.call(files);
	var totalSize = 0;

	for (var i = 0; i < filesArr.length; i++) {
		totalSize += filesArr[i].size;

		if (totalSize > maxSize) {
			$("#write-image").val('');
			alert("파일은 최대 50MB까지 업로드 가능합니다");
			return;
		}
		if (!filesArr[i].type.match("image.*")) {
			$("#write-image").val('');
			alert("이미지 파일만 업로드 가능합니다");
			return;
		} else if (filesArr.length > 10) {
			$("#write-image").val('');
			alert("사진은 10장까지 올릴 수 있습니다.");
			return;
		}
	}

	for (var i = 0; i < filesArr.length; i++) {
		var reader = new FileReader();

		reader.onload = function(e) {
			var imgHtml = "<li><img id='" + "preview" + "' src='"
					+ e.target.result + "' /></li>";
			$("#image-block").append(imgHtml);
		}
		selFiles.push(filesArr[i]);
		reader.readAsDataURL(filesArr[i]);
	}
}