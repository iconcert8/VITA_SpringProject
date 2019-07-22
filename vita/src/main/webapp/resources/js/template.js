console.log('template.........');

var template = {
    feed: function (feed) {
        var tags = '';
        var date = new Date(feed.feedUpdate);
        var feedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();
        for (var i = 0; i < feed.tags.length; i++) {
            tags += '#' + feed.tags[i] + ' ';
        }
        return `
            <div class="col-xl-6">
                <div class="card bg-light mb-4">
                    <!-- 피드 헤더 -->
                    <div class="card-header">
                        <div class="d-inline-block rounded bg-secondary"><img src="${feed.userImgUploadPath}/s_${feed.userImgUuid}_${feed.userImgFileName}"/></div>
                        <div class="d-inline-block">
                            <label>${feed.userId}</label>
                        </div>
                        <div class="d-inline-block float-right">
                            <button class="btn btn-outline-danger">신고</button>
                        </div>
                    </div>
                    <!-- 피드 바디 -->
                    <div class="card-body pt-2 pb-0">
                        <label class="text-white bg-secondary mr-1 rounded">${feed.bigGroup}</label> <label
                            class="text-white bg-secondary rounded">${feed.smallGroup}</label>
                        <!-- 카테고리 번호 -->
                        <p class="float-right">${feedDate}</p>
                        <input type="hidden" name="categoryNo" value=${feed.categoryNo}>
                    </div>
                    <div class="card-body pt-0">
                        <div id="carouselControl1" class="carousel slide"
                            data-interval="false" data-ride="carousel">
                            <div class="carousel-inner bg-dark text-white"
                                data-toggle="modal" data-target="#feedDetailModal">
                                <div class="carousel-item active">
                                    <img src="..." class="d-block w-100" alt="no image"
                                        style="height: 300px;">
                                </div>
                                <div class="carousel-item">
                                    <img src="..." class="d-block w-100" alt="no image"
                                        style="height: 300px;">
                                </div>
                                <div class="carousel-item">
                                    <img src="..." class="d-block w-100" alt="no image"
                                        style="height: 300px;">
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselControl1"
                                role="button" data-slide="prev"> <span
                                class="carousel-control-prev-icon" aria-hidden="true"></span> <span
                                class="sr-only">Previous</span>
                            </a> <a class="carousel-control-next" href="#carouselControl1"
                                role="button" data-slide="next"> <span
                                class="carousel-control-next-icon" aria-hidden="true"></span> <span
                                class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    <div class="card-body pt-2" data-toggle="modal"
                        data-target="#feedDetailModal">
                        <label>${tags}<br>
                            ${feed.feedLimitContent}
                        </label>
                    </div>
                    <div class="card-body row pt-2">
                        <div class="col">
                            <button class="btn btn-outline-primary w-100">
                                좋아요:<label class="m-0">${feed.feedGoodCnt}</label>
                            </button>
                        </div>
                        <div class="col">
                            <button class="btn btn-outline-primary w-100"
                                data-toggle="modal" data-target="#feedDetailModal">
                                댓글:<label class="m-0">${feed.feedReplyCnt}</label>
                            </button>
                        </div>
                        <div class="col">
                            <button class="btn btn-outline-primary w-100">즐겨찾기</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    filterAdd: function (filterName, big) {
        var bigCategory = '';
        if (big) bigCategory = '<br>(' + big + ')';
        return `<div class="d-inline-block text-center mx-1" data-filter="${filterName}">
        <span>${filterName}</span>
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>${bigCategory}
        </div>`;
    },
    userInfo: function (user, authUser) {
        var template = `<div class="card-header text-center">
                                <div class="d-inline-block rounded bg-secondary text-white">
                                    <h3>
                                        <img src="${user.userImgUploadPath}/s_${user.userImgUuid}_${user.userImgFileName}
                                        <h3>
                                </div>
                                <div class="d-inline-block ml-3">
                                    <h3>${user.userNick}(${user.userId})</h3>
                                </div>`;
        if (!authUser) {
            var isFollow = '';
            if(user.reqId == null && user.isFollow == null) {
                isFollow = '<button class="btn btn-outline-primary col col-sm-4 offset-sm-2">팔로우</button>'
            } else if(user.reqId == null && user.isFollow != null) {
                isFollow = '<button class="btn btn-primary col col-sm-4 offset-sm-2">팔로우</button>'
            } else if(user.reqId != null && user.isFollow == null) {
                isFollow = '<button class="btn btn-outline-primary col col-sm-4 offset-sm-2">맞 팔로우</button>'
            } else if(user.reqId != null && user.isFollow != null) {
                isFollow = '<button class="btn btn-primary col col-sm-4 offset-sm-2">맞 팔로우</button>'
            }
            template += `
            <div class="row mt-5">
                    ${isFollow}
                    <button class="btn btn-outline-primary col col-sm-4 ml-1">메세지</button>
            </div>
            `;
        }
        template += `</div>`;
        return template;
    }
}