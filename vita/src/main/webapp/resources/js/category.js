$(function() {console.log("start category.js");})

var categoryService = (function() {
//	url get타입으로 요청을 보내서 받은 값을 callback 함수가 존재하면 result를 안에 넣어서 보낸다
	function bigCall(callback) {
		$.ajax({
			type : 'get',
			url : '/category/list/big.json',
			// 타입으로 보낸다
			contentType : 'application/json; charset=UTF-8',
			success : function(result) {
				if (callback) {
					callback(result);
				}}});}
	
//	url+대분류를 get타입으로 요청을 보내서 받은 값을 callback 함수가 존재하면 result를 안에 넣어서 보낸다
	function smallCall(value, callback, index) {
		$.ajax({
			type : 'get',
			url : '/category/list/'+ value + '.json',
			dataType : 'JSON',
			// 타입으로 보낸다
			contentType : 'application/json; charset=UTF-8',
			success : function(result) {
				if (callback) {
					callback(result, index);
				}}});}
	
//	bigCall 이라는 이름으로 bigCall함수 사용가능, smallCall 동일 
	return {
		bigCall : bigCall,
		smallCall : smallCall
	};})();
