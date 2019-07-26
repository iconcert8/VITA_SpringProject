$(document).ready(function () {

    var searchBarDiv = $('#searchBar');
    var searchForm = $('#searchForm');

    // enter키
    searchForm.on('keyup', function(event) {
    	var keyword = $(this).val();
        if (event.keyCode == 13 && keyword) {
            searchAdd($(this).val());
        }
    });

    // 검색버튼
    $('#searchBtn').on('click', function(event) {
        if(searchForm.val()) {
            searchAdd(searchForm.val());
        }
    });

    // 검색취소
    $('#cancelSearch').on('click',function() {
        searchFilter = [];
        searchBarDiv.find('div[data-name]').remove();
        searchBarDiv.addClass('d-none');
        viewMainPage();
    });

    // 검색어 삭제버튼
    searchBarDiv.on('click', '.close', function() {
        var search = $(this).parent()
        var keyword = search.data('name');
        search.remove();
        var filter = searchFilter.indexOf(keyword);
        searchFilter.splice(filter, 1);
        // if(searchFilter.length === 0) {
        //     searchBarDiv.addClass('d-none');
        // }
        viewMainPage();
    });


    function searchAdd(keyword) {
        searchBarDiv.removeClass('d-none');
        $('#searchBar > div').append(template.filterAdd(keyword));
        searchForm.val('');
        viewMainPage();
    }

});