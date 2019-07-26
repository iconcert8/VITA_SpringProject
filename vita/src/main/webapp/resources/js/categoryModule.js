console.log("start categoryModule.............");

var categoryService = (function () {
	//	url get타입으로 요청을 보내서 받은 값을 callback 함수가 존재하면 result를 안에 넣어서 보낸다
	function bigCall(callback) {
		$.ajax({
			type: 'get',
			url: '/category/list/big.json',
			// 타입으로 보낸다
			contentType: 'application/json; charset=UTF-8',
			success: function (result) {
				if (callback) {
					callback(result);
				}
			}
		});
	}

	//	url+대분류를 get타입으로 요청을 보내서 받은 값을 callback 함수가 존재하면 result를 안에 넣어서 보낸다
	function smallCall(value, callback, index) {
		$.ajax({
			type: 'get',
			url: '/category/list/' + value + '.json',
			dataType: 'JSON',
			// 타입으로 보낸다
			contentType: 'application/json; charset=UTF-8',
			success: function (result) {
				if (callback) {
					callback(result, index, value);
				}
			}
		});
	}

	function selectCategory(category) {
		var categoryNo = $(category).data('categoryno');
		var bigGroup = $(category).data('biggroup');
		var smallGroup = $(category).data('smallgroup');

		$('#categoryBar > div').append(template.filterAdd(smallGroup, bigGroup, categoryNo));
	}

	function unselectCategory(category) {
		var categoryNo = $(category).data('categoryno');

		$('#categoryBar > div').find(`div[data-categoryno="${categoryNo}"]`).remove();
		var filter = categoryFilter.indexOf(categoryNo);
		categoryFilter.splice(filter, 1);
	}

	function deleteCategory(category) {
		var categoryNo = $(category).data('categoryno');
		
		$('#accordion > div').find(`input[data-categoryno=${categoryNo}]`).prop('checked',false);
		
		$(category).remove();
		var filter = categoryFilter.indexOf(categoryNo);
		categoryFilter.splice(filter, 1);
	}

	//	bigCall 이라는 이름으로 bigCall함수 사용가능, smallCall 동일 
	return {
		bigCall: bigCall,
		smallCall: smallCall,
		selectCategory: selectCategory,
		unselectCategory: unselectCategory,
		deleteCategory : deleteCategory
	};
})();
