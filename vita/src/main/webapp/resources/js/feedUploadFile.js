$(function() {
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

function handleImg(e){
	var files = e.target.files;
	var filesArr = Array.prototype.slice.call(files);
	
	filesArr.forEach(function(f) {
		if(!f.type.match("image.*")){
			alert("이미지 파일이 아닙니다");
			return;
		}
		selFiles.push(f);
		
		var reader = new FileReader();
		reader.onload = function(e){
			var imgHtml =
				"<li><img id='"
				+ "preview"
				+ "' src='" 
				+ e.target.result
				+ "' /></li>";
			$("#image-block").append(imgHtml);
		}
		reader.readAsDataURL(f);
	});
}