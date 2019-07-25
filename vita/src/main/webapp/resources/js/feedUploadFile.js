$(function() {
	$("#write-image-delete").on("click", function() {
		$("#image-block").empty();
	});

	$("#insertFeedBtn").on("click", function(e) {
		var formData = new FormData();
		var inputFile = $("input[name='uploadFile']");
		var files = inputFile[0].files;

		for (var i = 0; i < files.length; i++) {
			formData.append("uploadFile", files[i]);
		}

		console.log("ajax start");

		$.ajax({
			url : '/feed/new',
			processData : false,
			contentType : "application/json; charset=UTF-8",
			data : formData,
			type : 'POST',
			success : function(result) {
				alert("Uploaded");
			}
		});
		console.log("ajax end");
	});

	// 이미지 미리보기 설정
	$("#write-image").on("change", handleImg);

});

// 이미지 미리보기 설정
var selFiles = [];

function handleImg(e) {
	$("#image-block").empty();

	var files = e.target.files;
	var filesArr = Array.prototype.slice.call(files);

	for (var i = 0; i < filesArr.length; i++) {
		if (!filesArr[i].type.match("image.*")) {
			$("#write-image").val('');
			alert("이미지 파일만 업로드 가능합니다");
			return;
		}else if(filesArr.length> 10){
			$("#write-image").val('');
			alert("사진은 10장까지 올릴 수 있습니다.");
			return;
		}
	}
	
	for (var i = 0; i < filesArr.length; i++) {
		var reader = new FileReader();

		reader.onload = function(e) {
			var imgHtml = "<li><img id='" + "preview" + "' src='" + e.target.result + "' /></li>";
			$("#image-block").append(imgHtml);
		}

		selFiles.push(filesArr[i]);
		reader.readAsDataURL(filesArr[i]);
	}
}