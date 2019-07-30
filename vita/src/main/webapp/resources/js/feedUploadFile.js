$(function() {
	// 이미지 미리보기 설정
	$("#write-image").on("change", handleImg);
});

// 이미지 미리보기 설정
var selFiles = [];
var maxSize = 52428800;

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