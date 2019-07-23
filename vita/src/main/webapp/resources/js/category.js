$(function() {console.log("start category.js");})

var categoryService = (function() {
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
	
	function smallCall(value, callback) {
		$.ajax({
			type : 'get',
			url : '/category/list/'+ value,
			dataType : 'JSON',
			// 타입으로 보낸다
			contentType : 'application/json; charset=UTF-8',
			success : function(result) {
				if (callback) {
					callback(result);
				}}});}
	
	return {
		bigCall : bigCall,
		smallCall : smallCall
	};})();
