$(document).ready(function () {
   // 카테고리 선택 이벤트
    var categoryListDiv = $('#accordion');
    
    // 전체선택 div
    categoryListDiv.on('click', 'div.categorySelectSmallAll', function(event) {
        var categorys = $(this).parent().find('input');
        var select =  $(this).find('input');
        var name = select.data('type');
        alert(select.prop('checked'));
        console.log(select);
        if(!select.prop('checked')) {
        	categorys.prop('checked',true);
            $(`input[name=${name}]`).each(function (i, category) {
                categoryService.selectCategory(category);
            });
        } else {
            categorys.prop('checked',false);
            $(`input[name=${name}]`).each(function (i, category) {
                categoryService.unSelectCategory(category);
            });
        }
        viewMainPage();
    });

    // 전체선택 checkbox
    categoryListDiv.on('click', 'input[data-type^="small"]', function(event) {
        var categorys = $(this).parent().parent().find('input');
        var select =  $(this);
        var name = select.data('type');
        if(!select.prop('checked')) {
            categorys.prop('checked',true);
            $(`input[name=${name}]`).each(function (i, category) {
                categoryService.selectCategory(category);
            });
        } else {
            categorys.prop('checked',false);
            $(`input[name=${name}]`).each(function (i, category) {
                categoryService.unSelectCategory(category);
            });
        }
        viewMainPage();
    });

    // 개별 선택 div
    categoryListDiv.on('click', '.category', function(event) {
        var select =  $(this).find('input');
        
        if(!select.prop('checked')) {
            select.prop('checked',true);
            categoryService.selectCategory(select);
        } else {
            select.prop('checked',false);
            categoryService.unSelectCategory(select);
        }
        viewMainPage();
    });

    // 개별 선택 checkbox
    categoryListDiv.on('click', 'input[name^="small"]', function(event) {
        var select =  $(this);
        event.stopPropagation();
        if(!select.prop('checked')) {
            select.prop('checked',true);
            categoryService.selectCategory(select);
        } else {
            select.prop('checked',false);
            categoryService.unSelectCategory(select);
        }
        viewMainPage();
    });

});