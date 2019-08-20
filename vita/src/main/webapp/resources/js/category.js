//소분류 호출 
function startSmallCallback(resultSmall, index, big){
	var htmlSmall = '';

    htmlSmall += `<div class='col-12 mt-2 mb-2'>
                    <div class='row'>
                        <div class='col-sm-6 categorySelectSmallAll'>
                            <button class='btn btn-outline-success btn-sm btn-block'
                            data-biggroup='${big}' data-type='small${index+1}'>전체선택</button>
                        </div>
                        <div class='col-sm-6 categoryUnselectSmallAll'>
                            <button class='btn btn-outline-warning btn-sm btn-block'
                            data-biggroup='${big}' data-type='small${index+1}'>전체해제</button>
                        </div>
                    </div>
				</div>`;
				
	$.each(resultSmall, function(i, itemSmall){
			/* 일반 소분류 버튼 */
		htmlSmall += `<div class="input-group col-sm-6 mb-1 category">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type='checkbox' data-categoryno='${itemSmall.categoryNo}' data-biggroup='${big}'
                                data-smallgroup='${itemSmall.smallGroup}' name='small${index+1}' aria-label="Checkbox">
                            </div>
                        </div>
                        <input type="text" class="form-control bg-light" aria-label="Readonly text checkbox" value=${itemSmall.smallGroup} readonly>
                    </div>`;
	});
	var name = "#small" + (index+1);
	
	$(name).append(htmlSmall);
	
}

//서버 시작시 큰 카테고리 호출
function startBigCallback(result){
	$.each(result, function(i, item){
		var html = '';

		html += `<div class='card'>
                    <button class='btn card-header' id='big${i+1}' data-toggle='collapse' data-target='#small${i+1}'
                        aria-expanded='false' aria-controls='small${i+1}'>${item}</button>
                    <div id='small${i+1}' class='collapse row p-1' aria-labelledby='big${i+1}' data-parent='#accordion'></div>
                </div>`;
			
		$("#accordion").append(html);

		categoryService.smallCall(item, startSmallCallback, i);
	});
}

$(document).ready(function () {

    categoryService.bigCall(startBigCallback);
    
   // 카테고리 선택 이벤트
    var categoryListDiv = $('#accordion');
    var categoryBarDiv = $('#categoryBar');


    categoryListDiv.click(function(e) {
        viewService.myBtnUnActive();
        viewService.userBarReset();
    });
    
    // 전체선택
    categoryListDiv.on('click', 'div.categorySelectSmallAll > button', function(event) {

        var chekcboxName = $(this).data('type');
        var categorys = $(`input[name=${chekcboxName}]`);
        
        categorys.prop('checked',true);
        categorys.each(function (i, category) {
            categoryService.selectCategory(category);
        });
        viewMainPage('', true);
    });

    // 전체해제
    categoryListDiv.on('click', 'div.categoryUnselectSmallAll > button', function(event) {
        var chekcboxName = $(this).data('type');
        var categorys = $(`input[name=${chekcboxName}]`);
        
        categorys.prop('checked',false);
        categorys.each(function (i, category) {
            categoryService.unselectCategory(category);
        });
        viewMainPage('', true);
    });

    // 개별 선택 div
    categoryListDiv.on('click', 'div.category', function(event) {
        var select =  $(this).find('input');
        
        if(!select.prop('checked')) {
            select.prop('checked',true);
            categoryService.selectCategory(select);
        } else {
            select.prop('checked',false);
            categoryService.unselectCategory(select);
        }
        viewMainPage('', true);
    });

    // 개별 선택 checkbox - 이벤트 버블링 이용
    categoryListDiv.on('click', 'input[name^="small"]', function(event) {
         var select =  $(this);
         if(!select.prop('checked')) {
             select.prop('checked',true);
         } else {
             select.prop('checked',false);
         }
    });

    // 카테고리 바 카테고리 삭제 이벤트
    categoryBarDiv.on('click', '.close', function() {
        categoryService.deleteCategory($(this).parent());
        viewMainPage('', true);
    });

    // 카테고리 바 초기화 버튼
    $('#resetFilter').on('click',function() {
        var categorys = $(this).parent().find('div[data-categoryno]');
        
        categorys.each(function (i, category) {
            categoryService.deleteCategory(category);
        });
        viewMainPage('', true);
    });

});