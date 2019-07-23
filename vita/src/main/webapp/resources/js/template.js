console.log('template.........');

var template = {
    feedSimple: function (feed) {

        var date = new Date(feed.feedUpdate);
        var feedDate = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-'
            + (date.getDay() < 9 ? '0' : '') + date.getDay() + ' '
            + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        var limitContent = feed.feedLimitContent.replace('/', '<br>');

        var feedImages = `<div class="carousel-item active">`;
        for(var i in feed.feedImages) {
            feedImages += `<img src="${feed.userImgUploadPath}/s_${feed.userImgUuid}_${feed.userImgFileName}" class="d-block w-100" alt="preview_${feed.userImgFileName}" style="height: 300px;">`;
        }
        feedImages += `</div>`;

        var goodBtn = feed.isGood == null ? 'btn-outline-primary' : 'btn-primary';
        var replyBtn = feed.isReply == null ? 'btn-outline-primary' : 'btn-primary';
        var favoriteBtn = feed.isFavorite == null ? 'btn-outline-primary' : 'btn-primary';

        return `
            <div class="col-xl-6">
                <div class="card bg-light mb-4">
                    <!-- 피드 헤더 -->
                    <div class="card-header">
                        <div class="d-inline-block rounded bg-secondary"><img src="${feed.userImgUploadPath}/s_${feed.userImgUuid}_${feed.userImgFileName}"/></div>
                        <div class="d-inline-block">
                            <label>${feed.userNick}(${feed.userId})</label>
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
                                data-toggle="modal" data-target="#feedDetailModal" data-feedno=${feed.feedNo}>
                                ${feedImages}
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
                        data-target="#feedDetailModal" data-feedno=${feed.feedNo}>
                        <label>
                        ${limitContent}
                        </label>
                    </div>
                    <div class="card-body row pt-2">
                        <div class="col">
                            <button class="btn w-100 ${goodBtn} good" data-feedno=${feed.feedNo}>
                                좋아요:<label class="m-0">${feed.feedGoodCnt}</label>
                            </button>
                        </div>
                        <div class="col">
                            <button class="btn ${replyBtn} w-100 reply"
                                data-toggle="modal" data-target="#feedDetailModal" data-feedno=${feed.feedNo}>
                                댓글:<label class="m-0">${feed.feedReplyCnt}</label>
                            </button>
                        </div>
                        <div class="col">
                            <button class="btn w-100 ${favoriteBtn} favorite" data-feedno=${feed.feedNo}>즐겨찾기</button>
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
        </button>
            ${bigCategory}
        </div>`;
    },
    userInfo: function (user, authUser) {
        var template = `<div class="card-header text-center">
                                <div class="d-inline-block rounded bg-secondary text-white">
                                    <h3>
                                        <img src=${user.userImgUploadPath}/s_${user.userImgUuid}_${user.userImgFileName}/>
                                    <h3>
                                </div>
                                <div class="d-inline-block ml-3">
                                    <h3>${user.userNick}(${user.userId})</h3>
                                </div>`;
        if (!authUser) {
            var isFollow = '';
            if (user.reqId == null && user.isFollow == null) {
                isFollow = '<button class="btn btn-outline-primary col col-sm-4 offset-sm-2">팔로우</button>'
            } else if (user.reqId == null && user.isFollow != null) {
                isFollow = '<button class="btn btn-primary col col-sm-4 offset-sm-2">팔로잉</button>'
            } else if (user.reqId != null && user.isFollow == null) {
                isFollow = '<button class="btn btn-outline-primary col col-sm-4 offset-sm-2">팔로워</button>'
            } else if (user.reqId != null && user.isFollow != null) {
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
    },
    feedDetail: function (feed) {
        var date = new Date(feed.feedUpdate);
        var feedDate = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-'
            + (date.getDay() < 9 ? '0' : '') + date.getDay() + ' '
            + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        var tags = '';
        for (var i = 0; i < feed.tags.length; i++) {
            tags += '#' + feed.tags[i] + ' ';
        }

        var feedImages = `<div class="carousel-item active">`;
        for(var i in feed.feedImages) {
            feedImages += `<img src="${feed.userImgUploadPath}/${feed.userImgUuid}_${feed.userImgFileName}" class="d-block w-100" alt="preview_${feed.userImgFileName}" style="height: 300px;">`;
        }
        feedImages += `</div>`;
        

        var goodBtn = feed.isGood == null ? 'btn-outline-primary' : 'btn-primary';
        var favoriteBtn = feed.isFavorite == null ? 'btn-outline-primary' : 'btn-primary';

        var template = `
            <div class="modal-dialog modal-xl" data-feedno=${feed.feedNo}>
                <div class="modal-content">
                    <div class="modal-body m-0 p-0">
                        <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body row">
                        <!-- 피드 상세보기 이미지 부분 -->
                        <div class="col-xl-8">
                            <div id="carouselControlDetail1" class="carousel slide"
                                data-interval="false" data-ride="carousel">
                                <div class="carousel-inner bg-dark text-white">
                                    ${feedImages}
                                </div>
                                <a class="carousel-control-prev" href="#carouselControlDetail1"
                                    role="button" data-slide="prev"> <span
                                    class="carousel-control-prev-icon" aria-hidden="true"></span> <span
                                    class="sr-only">Previous</span>
                                </a> <a class="carousel-control-next" href="#carouselControlDetail1"
                                    role="button" data-slide="next"> <span
                                    class="carousel-control-next-icon" aria-hidden="true"></span> <span
                                    class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <!-- 피드 상세보기 글 정보, 댓글 부분 -->
                        <div class="col-xl-4">
                            <div class="card">
                                <div class="card-body d-inline-block pt-2 pb-0">
                                    <label class="text-white bg-secondary mr-1 rounded">${feed.bigGroup}</label> <label
                                        class="text-white bg-secondary rounded">${feed.smallGroup}</label>
                                    <div class="d-inline-block float-right pt-0 mt-0">
                                        <button class="btn btn-outline-danger">신고</button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="d-inline-block rounded bg-secondary"><img src="${feed.userImgUploadPath}/s_${feed.userImgUuid}_${feed.userImgFileName}"/></div>
                                    <div class="d-inline-block">
                                        <label>${feed.userNick}(${feed.userId})</label>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="d-inline-block bg-secondary text-white p-0">
                                        ${tags}</div>
                                </div>
                                <div class="card-body pt-0">
                                    <div>${feed.feedContent}</div>
                                </div>
        
                                <div class="card-body row pt-2">
                                    <div class="col">
                                        <button class="btn ${goodBtn} w-100 good" data-feedNo="${feed.feedNo}">
                                            좋아요:<label class="m-0">0</label>
                                        </button>
                                    </div>
                                    <div class="col">
                                        <button class="btn ${favoriteBtn} w-100 favorite" data-feedNo="${feed.feedNo}">즐겨찾기</button>
                                    </div>
                                </div>
                                <!-- 댓글 부분 -->
                                <div class="card-header">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="reply..."
                                            aria-describedby="sendReplyBtn">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-primary" id="sendReplyBtn">댓글</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body pt-0">
                                    <div>
                                        댓글 <label>${feed.feedReplyCnt}</label>개
                                    </div>
                                    <ul class="list-group overflow-auto" style="height: 300px;" id="replyModal">
                                        <li class="list-group-item">
                                            <div class="d-inline-block rounded bg-secondary">프로필</div>
                                            <div class="d-inline-block">
                                                <label class="mb-0">닉네임(ID)</label>
                                            </div> <label class="d-inline ml-3"> initialize it yourself.
                                                It cannot be used in combinatio </label> <label class="text-secondary">
                                                (2019-07-21 18:32) </label>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="d-inline-block rounded bg-secondary">프로필</div>
                                            <div class="d-inline-block">
                                                <label class="mb-0">닉네임(ID)</label>
                                            </div> <label class="d-inline ml-3"> initialize it yourself.
                                                It cannot be used in combinatio,asdon she a initialize it
                                                yourself. It cannot be used in combinatio </label> <label
                                            class="text-secondary"> (2019-07-21 18:32) </label>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="d-inline-block rounded bg-secondary">프로필</div>
                                            <div class="d-inline-block">
                                                <label class="mb-0">닉네임(ID)</label>
                                            </div> <label class="d-inline ml-3"> initialize it yourself.
                                                It cannot be used in combinatio </label> <label class="text-secondary">
                                                (2019-07-21 18:32) </label>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="d-inline-block rounded bg-secondary">프로필</div>
                                            <div class="d-inline-block">
                                                <label class="mb-0">닉네임(ID)</label>
                                            </div> <label class="d-inline ml-3"> initialize it yourself.
                                                It cannot be used in combinatio </label> <label class="text-secondary">
                                                (2019-07-21 18:32) </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return template;
    },
    reply: function (reply) {
        var date = new Date(reply.replyDate);
        var replyDate = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-'
            + (date.getDay() < 9 ? '0' : '') + date.getDay() + ' '
            + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        return `
        <li class="list-group-item">
                <div class="d-inline-block rounded bg-secondary"><img src=${reply.userImgUploadPath}/s_${reply.userImgUuid}_${reply.userImgFileName}/></div>
                <div class="d-inline-block">
                    <label class="mb-0">${reply.userNick}(${reply.userId})</label>
                </div> <label class="d-inline ml-3">${reply.replyContent}</label>
                <label class="text-secondary">(${replyDate}) </label>
        </li>
        `;
    }
}