
function checkfield(){
	if($('#id').val().trim()==""){
		alert("아이디 미입력");
		$('#id').focus();
		return false;
	}else if($('#password').val().trim()==""){
		alert("패스워드 미입력");
		$('#password').focus();
		return false;
		}else if($('#password_chk').val().trim()==""){
		alert("패스워드 확인 미입력");
		$('#password_chk').focus();
		return false;
	}else if($('#nickname').val().trim()==""){
		alert("닉네임 미입력");
		$('#nickname').focus();
		return false;
	}else if($('#email').val().trim()==""){
		alert("이메일 미입력");
		$('#email').focus();
		return false;
	}else if($('#password').val().trim()!=$('#password_chk').val().trim()){
		alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
		$('#password_chk').focus();
		return false;
	}else if($('#idcheck').val().trim()=="0"){
		alert("다른 아이디를 입력해주세요.");
		$('#idcheck').focus();
		return false;
	}
}


//비밀번호 검사 함수
function chkpassword(obj, minByte){
	var strValue = obj.value;
	var strLen = strValue.length;
	var totalByte = 0;
	var oneChar = "";
	
	for(var i=0; i<strLen;i++){
		oneChar = strValue.charAt(i);
		if(escape(oneChar).length>4){
			totalByte+=2;
		}else{
			totalByte++;
		}
	}
	
	if(totalByte<minByte){
		$('#here2').append().html('8자 이상 입력하세요').addClass('warn');
	}else{
		$('#here2').append().removeClass().html('');
	}
}
//닉네임검사함수
function chknickname(obj, minByte){
	var strValue = obj.value;
	var strLen = strValue.length;
	var totalByte = 0;
	var oneChar = "";
	
	for(var i=0; i<strLen;i++){
		oneChar = strValue.charAt(i);
		if(escape(oneChar).length>4){
			totalByte+=2;
		}else{
			totalByte++;
		}
	}
	
	if(totalByte<minByte){
		$('#here4').append().html('5자 이상 입력하세요').addClass('warn');
	}else{
		$('#here4').append().removeClass().html('');
	}
}


//id검사함수
function chkid(obj,minByte){
	var userId= $('#id').val();
	userId = String(userId);
	if(userId == null || userId == "") return;
	
	$.ajax({
		type: 'post',
		data: userId,
		url: "/user/idcheck",
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		success: function(data){
			console.log(data);
			var strValue = obj.value;
			var strLen = strValue.length;
			var totalByte = 0;
			var oneChar = "";
			if(data.cnt>0 || $('#id').val().trim()==""){
				//아이디가 중복될 경우
				$('#here1').append().removeClass().html('').html('사용 불가능한 아이디입니다.').addClass('warn');
				$('#idcheck').val("0");
			}else{
				//중복되지 않을경우
				for(var i=0; i<strLen;i++){
					oneChar = strValue.charAt(i);
					if(escape(oneChar).length>4){
						totalByte+=2;
					}else{
						totalByte++;
					}
				}
				
				if(totalByte<minByte){
					$('#here1').append().removeClass().html('').html('사용 불가능한 아이디입니다.').addClass('warn');
				}else{
					$('#here1').append().removeClass().html('').html('사용가능한 아이디입니다.').addClass('ok');
					$('#idcheck').val("1");
				}
			}
		}
	});
}

//비밀번호 확인 함수
function chkpassword_correct(){
	var pass1 = $('#password').val();
	var pass2 = $('#password_chk').val();
	if(pass1==pass2){
		$('#here3').append().removeClass().html('').html('비밀번호가 일치합니다.').addClass('ok');
	}else{
		$('#here3').append().removeClass().html('').html('비밀번호가 일치하지 않습니다.').addClass('warn').focus();
	}
}



