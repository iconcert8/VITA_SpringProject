$(document).ready(function () {

    var searchBarDiv = $('#searchBar');
    var searchForm = $('#searchForm');

    // enter키
    searchForm.on('keyup', function(event) {
    	var keyword = $(this).val().trim();
        if (event.keyCode == 13 && keyword) {
            searchAdd($(this).val());
        }
    });

    // 검색버튼
    $('#searchBtn').on('click', function(event) {
        if(searchForm.val().trim()) {
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
        viewMainPage();
    });

    // 검색 실행
    function searchAdd(keyword) {
        searchBarDiv.removeClass('d-none');
        $('#searchBar > div').append(template.filterAdd(keyword));
        searchForm.val('');
        viewMainPage();
    }

});