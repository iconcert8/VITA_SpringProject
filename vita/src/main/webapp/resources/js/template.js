
var categoryFilter = [];
var searchFilter = [];
var viewMainPage;
var viewUserPage;

var template = {
    feedSimple: function (feed, authUser) {

        var date = new Date(feed.feedDate);
        var feedDate = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-'
            + (date.getDate() < 9 ? '0' : '') + date.getDate() + ' '
            + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        var limitContent = feed.feedLimitContent.replace('/', '<br>');
        limitContent = limitContent.replace(/#[^#\s,;]+/gm, function (tag) {
            return `<a class="tagSearch">${tag}</a>`;
        });

        var feedImages = "";
        var feedImagesIndicator = '';
        for (var i = 0; i < Object.keys(feed.feedImages).length; i++) {
            var feedImage = feed.feedImages[i];
            if (i == 0) {
                feedImages += `<div class="carousel-item active" style="height: 300px;">`;
                feedImages += `<img src="/display?fileName=${feedImage.feedImgUploadPath}/${feedImage.feedImgUuid}_${feedImage.feedImgFileName}" class="d-block w-100" alt="preview_${feedImage.feedImgFileName}" style="width:100%; height: 100%;">`;
                feedImages += `</div>`;
                feedImagesIndicator += `<li data-target="#feedNo${feed.feedNo}" data-slide-to="${i}" class="active"></li>`;
            } else {
                feedImages += `<div class="carousel-item">`;
                feedImages += `<img src="/display?fileName=${feedImage.feedImgUploadPath}/${feedImage.feedImgUuid}_${feedImage.feedImgFileName}" class="d-block w-100" alt="preview_${feedImage.feedImgFileName}" style="height: 300px;">`;
                feedImages += `</div>`;
                feedImagesIndicator += `<li data-target="#feedNo${feed.feedNo}" data-slide-to="${i}"></li>`;
            }
        }

        var goodBtn = feed.isGood == null ? 'btn-outline-primary nogood' : 'btn-primary good';
        var replyBtn = feed.isReply == null ? 'btn-outline-primary' : 'btn-primary';
        var favoriteBtn = feed.isFavorite == null ? 'btn-outline-primary nofavor' : 'btn-primary favor';
        var warnBtn = '';
        if (authUser !== feed.userId) {
            warnBtn = ` <button class="btn btn-outline-danger" data-toggle="modal" data-target="#warnModal"
            data-feedno=${feed.feedNo} data-limitcontent='${feed.feedLimitContent}'>신고</button>`
        } else {
            warnBtn = `<button class="btn btn-outline-danger deleteBtn" data-target="#deleteFeedBtn" data-feedno=${feed.feedNo}>삭제</button>`
        }

        return `
            <div class="col-xl-6" id="viewFeedDetailList">
                <div class="card bg-light mb-4" >
                    <!-- 피드 헤더 -->
                    <div class="card-header">
                        <div class="d-inline-block rounded goToUserFeed" data-contact="${feed.userId}"><img class="img-1" src="/display?fileName=${feed.userImgUploadPath}/${feed.userImgUuid}_${feed.userImgFileName}"/></div>
                        <div class="d-inline-block">
                            <label>${feed.userNick}(${feed.userId})</label>
                        </div>
                        <div class="d-inline-block float-right">
                            ${warnBtn}
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
                        <div id="feedNo${feed.feedNo}" class="carousel slide" data-ride="carousel" data-interval="5000">
                            <ol class="carousel-indicators">
                                ${feedImagesIndicator}
                            </ol>
                            <div class="carousel-inner bg-dark text-white"
                                data-toggle="modal" data-target="#feedDetailModal" data-feedno=${feed.feedNo}>
                                ${feedImages}
                            </div>
                            <a class="carousel-control-prev" href="#feedNo${feed.feedNo}"
                                role="button" data-slide="prev"> <span
                                class="carousel-control-prev-icon" aria-hidden="true"></span> <span
                                class="sr-only">Previous</span>
                            </a> <a class="carousel-control-next" href="#feedNo${feed.feedNo}"
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
                            <button class="btn w-100 ${goodBtn}" data-feedno="${feed.feedNo}" data-userid="${feed.userId}">
                                좋아요:<label class="m-0 cnt">${feed.feedGoodCnt}</label>
                            </button>
                        </div>
                        <div class="col">
                            <button class="btn ${replyBtn} w-100 reply"
                                data-toggle="modal" data-target="#feedDetailModal" data-target="#feedDetailModal" data-feedno=${feed.feedNo}>
                                댓글:<label class="m-0">${feed.feedReplyCnt}</label>
                            </button>
                        </div>
                        <div class="col">
                            <button class="btn w-100 ${favoriteBtn}" data-feedno="${feed.feedNo}" data-userid="${feed.userId}">즐겨찾기</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    filterAdd: function (filterName, big, categoryNo, btn) {

        var flag = false;
        if (categoryNo) {
            if (!categoryFilter.includes(categoryNo)) {
                categoryFilter.push(categoryNo);
                flag = true;
            }
        } else {
            if (filterName.charAt(0) === '#') {
                filterName = filterName.substring(1)
            }
            if (!searchFilter.includes(filterName) && !btn) {
                searchFilter.push(filterName);
                filterName = '#' + filterName;
                flag = true;
                // console.log(searchFilter);
            }
            if (btn) flag = true;
        }
        if (flag) {
            var bigCategory = '';
            if (big) bigCategory = '<br>(' + big + ')';
            return `<div class="d-inline-block text-center mx-1" data-categoryno="${categoryNo}" data-name="${filterName}">
                        <span>${filterName}</span>
                        <button type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        ${bigCategory}
                    </div>`;
        }
    },

    userInfo: function (user, authUserFlag) {
        var template = `<div class="card-header text-center">
                                <div class="d-inline-block rounded" >
                                    <h3 id="userImg">
                                        <img src="/display?fileName=${user.userImgUploadPath}/${user.userImgUuid}_${user.userImgFileName}" style="width:120px;">
                                    <h3></div>`;
        if (authUserFlag) {
            template += `<div class="custom-file rounded" style="position relative; left:4px; top:10px; font-size:15px; margin-bottom : 20px;">
                            <input type="file" class="d-none custom-file-input" id="prof-img" aria-describedby="inputGroupFileAddon01">
                            <label class="btn btn-outline-primary" for="prof-img" style="width:150px;">ProImg 바꾸기</label>
                        </div>`;
        }
        template += `<div class="d-inline-block ml-3">
                                    <h3>${user.userNick}(${user.userId})</h3>
                                </div>`;
        if (!authUserFlag) {
            var isFollow = '';
            if (user.reqId == null && user.isFollow == null) {
                isFollow = `<button class="btn btn-outline-primary col col-sm-3 nofln" data-userid="${user.userId}">팔로우</button>`;
            } else if (user.reqId == null && user.isFollow != null) {
                isFollow = `<button class="btn btn-primary col col-sm-3 fln" data-userid="${user.userId}">팔로잉</button>`;
            } else if (user.reqId != null && user.isFollow == null) {
                isFollow = `<button class="btn btn-outline-primary col col-sm-3 nofln" data-userid="${user.userId}">팔로워</button>`;
            } else if (user.reqId != null && user.isFollow != null) {
                isFollow = `<button class="btn btn-primary col col-sm-3 fln" data-userid="${user.userId}">맞 팔로우</button>`;
            }
            template += `
            <div class="row mt-5 justify-content-center">
                    ${isFollow}
                    <button class="btn btn-outline-primary col col-sm-3 ml-1" onclick="location.href='/messenger/${user.userId}'">메세지</button>
                    <button class="btn btn-outline-primary col col-sm-3 ml-1" id="userFeedHomeBtn">Home</button>
            </div>
            `;
        }
        template += `</div>`;
        return template;
    },
    feedDetail: function (feed, authUser) {
        var date = new Date(feed.feedDate);
        var feedDate = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-'
            + (date.getDate() < 9 ? '0' : '') + date.getDate() + ' '
            + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        var tags = '';
        for (var i = 0; i < feed.tags.length; i++) {
            tags += `<a class="tagSearch" data-feedno=${feed.feedNo}>#${feed.tags[i]}</a>`;
        }

        var feedImages = "";
        var feedImagesIndicator = '';
        for (var i = 0; i < Object.keys(feed.feedImages).length; i++) {
            var feedImage = feed.feedImages[i];
            if (i == 0) {
                feedImages += `<div class="carousel-item active">`;
                feedImages += `<img src="/display?fileName=${feedImage.feedImgUploadPath}/${feedImage.feedImgUuid}_${feedImage.feedImgFileName}" class="d-block w-100" alt="preview_${feedImage.feedImgFileName}">`;
                feedImages += `</div>`;
                feedImagesIndicator += `<li data-target="#feedNo${feed.feedNo}" data-slide-to="${i}" class="active"></li>`;
            } else {
                feedImages += `<div class="carousel-item">`;
                feedImages += `<img src="/display?fileName=${feedImage.feedImgUploadPath}/${feedImage.feedImgUuid}_${feedImage.feedImgFileName}" class="d-block w-100" alt="preview_${feedImage.feedImgFileName}">`;
                feedImages += `</div>`;
                feedImagesIndicator += `<li data-target="#feedNo${feed.feedNo}" data-slide-to="${i}"></li>`;
            }
        }
        // style="height: 800px;

        var goodBtn = feed.isGood == null ? 'btn-outline-primary nogood' : 'btn-primary good';
        var favoriteBtn = feed.isFavorite == null ? 'btn-outline-primary nofavor' : 'btn-primary favor';
        var warnBtn = '';
        if (authUser !== feed.userId) {
            warnBtn = ` <button class="btn btn-outline-danger" data-toggle="modal" data-target="#warnModal"
            data-feedno=${feed.feedNo} data-limitcontent='${feed.feedLimitContent}'>신고</button>`;
        } else {
            warnBtn = `<button class="btn btn-outline-danger deleteBtn" data-target="#deleteFeedBtn" data-feedno=${feed.feedNo}>삭제</button>`
        }

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
                            <div id="feedNo${feed.feedNo}" class="carousel slide" data-ride="carousel" data-interval="5000">
                                <ol class="carousel-indicators">
                                    ${feedImagesIndicator}
                                </ol>
                                <div class="carousel-inner bg-dark text-white">
                                    ${feedImages}
                                </div>
                                 <a class="carousel-control-prev" href="#feedNo${feed.feedNo}"
                                    role="button" data-slide="prev"><span
                                    class="carousel-control-prev-icon" aria-hidden="true"></span> <span
                                    class="sr-only">Previous</span>
                                </a> <a class="carousel-control-next" href="#feedNo${feed.feedNo}"
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
                                        ${warnBtn}
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="d-inline-block rounded goToUserFeed" data-contact="${feed.userId}">
                                        <img class="img-1" src="/display?fileName=${feed.userImgUploadPath}/${feed.userImgUuid}_${feed.userImgFileName}"/></div>
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
                                        <button class="btn ${goodBtn} w-100" data-feedno="${feed.feedNo}" data-userid="${feed.userId}">
                                            좋아요:<label class="m-0 cnt">${feed.feedGoodCnt}</label>
                                        </button>
                                    </div>
                                    <div class="col">
                                        <button class="btn ${favoriteBtn} w-100" data-feedno="${feed.feedNo}" data-userid="${feed.userId}">즐겨찾기</button>
                                    </div>
                                </div>
                                <!-- 댓글 부분 -->
                                <div class="card-header">
                                    <div class="input-group">
                                        <input  id="replyContent"  type="text" class="form-control"  placeholder="reply..."
                                            aria-describedby="sendReplyBtn">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-primary" data-target="#send" data-feedno="${feed.feedNo}" id="sendReplyBtn">댓글</button>
                                        </div> 
                                    </div>
                                </div> 
                                <div class="card-body pt-0">
                                    <div>
                                        댓글 <label>${feed.feedReplyCnt}</label>개
                                       
                                        <i id="returnBtn" data-feedno=${feed.feedNo} class="fas fa-sync-alt float-right pt-2"></i>
                                       
                                    </div> 
                                    
                                    <ul class="list-group overflow-auto" style="height: 300px;" id="replyModal" data-feedno="${feed.feedNo}">
        									
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
    reply: function (reply, authUser) {
        var templateLi = '';
        $.each(reply, function (index, item) {
            var date = new Date(item.replyDate);
            var replyDate = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-'
                + (date.getDate() < 9 ? '0' : '') + date.getDate() + ' '
                + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            var deleteBtn = '';

            if (authUser == item.isMyReply) {
                deleteBtn = `<button type="button" data-target="#RemoveBtn" class="close float-right" aria-label="Close"  data-feedno=${item.feedNo} data-replyno=${item.replyNo}>
                            <span aria-hidden="true">&times;</span>
                        </button>`;
            }

            templateLi += `<li class="list-group-item">
            <div class="d-inline-block rounded goToUserFeed" data-contact="${item.userId}"><img class="img-0" src="/display?fileName=${item.userImgUploadPath}/${item.userImgUuid}_${item.userImgFileName}"/></div>
            <div class="d-inline-block">
                <label class="mb-0">${item.userNick}(${item.userId})</label>
            </div> <label class="d-inline ml-3">${item.replyContent}</label>
            <label class="text-secondary">(${replyDate}) </label>
            ${deleteBtn}
            </li>`;
        });
        return templateLi;
    },

    warnModal: function () {

        return `<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <!-- 신고 모달창 헤더-->
                <div class="modal-header">
                    <h5 class="modal-title" id="modalWriteTitle">신고</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!-- 신고 모달창 바디-->
                <div class="modal-body">
                    
                    <!-- 신고 모달창 대소분류 선택 부분-->
                    <div class="card mt-2" >
                        <div class="card-body">
                            <!-- 신고 모달창 대분류 선택 부분-->
                            <div class="form-group">
                                <label>신고분류</label> 
                                <select class="form-control warnCategory">
                                    <option selected>[신고 선택]</option>
                                    <option>욕설</option>
                                    <option>광고</option>
                                    <option>음란</option>
                                    <option>사기</option>
                                    <option>도배</option>
                                </select>
                            </div>
                        </div>
                        
                        
                        <!-- 신고 모달창 내용 입력 부분-->
                        <div class="card-body pt-0">
                            <div class="form-group">
                                <label for="content-write-textarea">내용</label>
                                <textarea class="form-control warnMsg" placeholder="내용을 입력하여 주세요" rows="4"></textarea>
                            </div>
                        </div>
                        <p class="text-danger font-weight-bolder pl-4 warnCheckMsg"></p>
                    </div>
                </div>
                
                <!-- 신고 모달창 푸터, 작성/취소버튼-->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                    <button type="button" class="btn btn-danger" id="warnActionBtn" data-feedno='' data-limitcontent='' aria-label="Close">신고하기</button>
                </div>
            </div>
        </div>`;
    },

    warnfeedDetail: function (feed) {
        var date = new Date(feed.feedDate);
        var feedDate = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-'
            + (date.getDate() < 9 ? '0' : '') + date.getDate() + ' '
            + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        var tags = '';
        for (var i = 0; i < feed.tags.length; i++) {
            tags += '#' + feed.tags[i] + ' ';
        }

        var feedImages = "";
        for (var i = 0; i < Object.keys(feed.feedImages).length; i++) {
            var feedImage = feed.feedImages[i];
            if (i == 0) {
                feedImages += `<div class="carousel-item active">`;
                feedImages += `<img src="/display?fileName=${feedImage.feedImgUploadPath}/${feedImage.feedImgUuid}_${feedImage.feedImgFileName}" class="d-block w-100" alt="preview_${feedImage.feedImgFileName}">`;
                feedImages += `</div>`;
            } else {
                feedImages += `<div class="carousel-item">`;
                feedImages += `<img src="/display?fileName=${feedImage.feedImgUploadPath}/${feedImage.feedImgUuid}_${feedImage.feedImgFileName}" class="d-block w-100" alt="preview_${feedImage.feedImgFileName}">`;
                feedImages += `</div>`;
            }
        }

        var goodBtn = feed.isGood == null ? 'btn-outline-primary' : 'btn-primary';
        var favoriteBtn = feed.isFavorite == null ? 'btn-outline-primary' : 'btn-primary';

        var warntemplate = `
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
                            <div id="feedNo${feed.feedNo}" class="carousel slide"
                                data-interval="false" data-ride="carousel">
                                <div class="carousel-inner bg-dark text-white">
                                    ${feedImages}
                                </div>
                                <a class="carousel-control-prev" href="#feedNo${feed.feedNo}"
                                    role="button" data-slide="prev"> <span
                                    class="carousel-control-prev-icon" aria-hidden="true"></span> <span
                                    class="sr-only">Previous</span>
                                </a> <a class="carousel-control-next" href="#feedNo${feed.feedNo}"
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
                                </div>
                                <div class="card-body">
                                    <div class="d-inline-block rounded"><img class="img-1" src="/display?fileName=${feed.userImgUploadPath}/${feed.userImgUuid}_${feed.userImgFileName}"/></div>
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
        
                                <!-- 댓글 부분 -->
                                <div class="card-header">
                                    <div>
                                    	신고글
                                    </div>
                                </div>
                                <div class="card-body pt-0">
                                    <ul class="list-group overflow-auto" style="height: 300px;" id="warnRequestModal">
          
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return warntemplate;
    },

    warnDelete: function (feedNo, feedLimitContent) {
        var deletetemplate = `
				<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div class="modal-content">
						<!-- 삭제 모달창 헤더-->
						<div class="modal-header">
							<h5 class="modal-title" id="modalWriteTitle">피드 삭제</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<!-- 신고 모달창 바디-->
						<div class="modal-body">
							
							<!-- 신고 모달창 대소분류 선택 부분-->
							<div class="card mt-2" >
								<div class="card-body">
									<!-- 신고 모달창 대분류 선택 부분-->
									<div class="form-group">
										<label>신고분류</label> 
										<select class="form-control deleteCategory">
											<option selected="selected" value="욕설">욕설</option>
											<option value="광고">광고</option>
											<option value="음란">음란</option>
											<option value="사기">사기</option>
											<option value="도배">도배</option>
										</select>
									</div>
									
								</div>
								
								
								<!-- 신고 모달창 내용 입력 부분-->
								<div class="card-body pt-0">
									<div class="form-group">
										<label for="content-write-textarea">사유</label>
										<textarea class="form-control deleteReason" placeholder="내용을 입력하여 주세요" rows="4"></textarea>
									</div>
								</div>
							</div>
						</div>
						<!-- 신고 모달창 푸터, 작성/취소버튼-->
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
							<button type="button" class="btn btn-danger deleteDecision" data-feedno="${feedNo}" data-feedlimitcontent="${feedLimitContent}">삭제하기</button>
						</div>
					</div>
				</div>`;
        return deletetemplate;
    },

    decisionAlertModal: function (text, btn) {
        var decisionAlertModalTemplate = `
			<!-- 카테고리 추가시 확인 모달창 -->
				<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div class="modal-content">
						<!-- 카테고리 추가 바디-->
						<div class="modal-body">
							${text}
						</div>
						<!-- 카테고리 모달창 푸터, 확인 버튼-->
						<div class="modal-footer">
							<button type="button" class="btn ${btn}" data-dismiss="modal">확인</button>
						</div>
					</div>
				</div>
		    </div>
    			`;
        return decisionAlertModalTemplate;
    },

    deletedfeedDetail: function (feed, warnCategory) {
        var date = new Date(feed.feedDate);
        var feedDate = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-'
            + (date.getDate() < 9 ? '0' : '') + date.getDate() + ' '
            + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        var tags = '';
        for (var i = 0; i < feed.tags.length; i++) {
            tags += '#' + feed.tags[i] + ' ';
        }

        var feedImages = "";

        for (var i = 0; i < Object.keys(feed.feedImages).length; i++) {
            var feedImage = feed.feedImages[i];
            if (i == 0) {
                feedImages += `<div class="carousel-item active">`;
                feedImages += `<img src="/display?fileName=${feedImage.feedImgUploadPath}/${feedImage.feedImgUuid}_${feedImage.feedImgFileName}" class="d-block w-100" alt="preview_${feedImage.feedImgFileName}">`;
                feedImages += `</div>`;
            } else {
                feedImages += `<div class="carousel-item">`;
                feedImages += `<img src="/display?fileName=${feedImage.feedImgUploadPath}/${feedImage.feedImgUuid}_${feedImage.feedImgFileName}" class="d-block w-100" alt="preview_${feedImage.feedImgFileName}">`;
                feedImages += `</div>`;
            }
        }

        var goodBtn = feed.isGood == null ? 'btn-outline-primary' : 'btn-primary';
        var favoriteBtn = feed.isFavorite == null ? 'btn-outline-primary' : 'btn-primary';

        var deletedDetailTemplate = `
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
                            <div id="feedNo${feed.feedNo}" class="carousel slide"
                                data-interval="false" data-ride="carousel">
                                <div class="carousel-inner bg-dark text-white">
                                    ${feedImages}
                                </div>
                                <a class="carousel-control-prev" href="#feedNo${feed.feedNo}"
                                    role="button" data-slide="prev"> <span
                                    class="carousel-control-prev-icon" aria-hidden="true"></span> <span
                                    class="sr-only">Previous</span>
                                </a> <a class="carousel-control-next" href="#feedNo${feed.feedNo}"
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
                                </div>
                                <div class="card-body">
                                    <div class="d-inline-block rounded"><img class="img-1" src="/display?fileName=${feed.userImgUploadPath}/${feed.userImgUuid}_${feed.userImgFileName}"/></div>
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
        
                                <!-- 댓글 부분 -->
                                <div class="card-header">
                                    <div>
                                    	${warnCategory}
                                    </div>
                                </div>
                                <div class="card-body pt-0">
                                    <ul class="list-group overflow-auto" style="height: 300px;" id="deletedFeedReasonBox">
          
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return deletedDetailTemplate;
    },
    messengerList: function (last, count) {
        var msg = '';
        if (last.msg) msg = last.msg;
        if (msg > 10) msg = msg.substring(0, 10) + '...';

        var readlessHide;
        var readless = 0;
        if (count) readless = count;
        else if (last.readless) readless = last.readless;

        if (readless === 0) {
            readlessHide = 'd-none';
        }

        return `<a href="#" class="list-group-item list-group-item-action" data-contact="${last.userId}">
                    <div class="d-inline-block rounded float-left">
                    <img class="img-1" src="/display?fileName=${last.userImgUploadPath}/${last.userImgUuid}_${last.userImgFileName}" class="d-block w-100" alt="preview_${last.userImgFileName}" style="width:50px; height:50px;">
                    </div>
                    <div class="d-inline-block float-left ml-2">
                        <label class="font-weight-bolder">${last.userNick}(${last.userId})</label><br>
                        <label class="text-secondary lastMsg">${msg}</label>
                    </div>
                    <div class="d-inline-block float-right mt-3">
                        <span class="badge badge-pill badge-danger ${readlessHide}" data-contact="${last.userId}">${readless}</span>
                    </div>
                </a>`;
    },
    notiMessengerList: function (last, count) {
        var msg = last.msg
        var readlessHide;
        if (msg > 7) {
            msg = msg.substring(0, 7) + '...';
        }
        var readless = 0;
        if (count) readless = count;
        else if (last.readless) readless = last.readless;

        if (readless === 0) {
            readlessHide = 'd-none';
        }
        return `<a href="/messenger/${last.userId}" class="list-group-item list-group-item-action dropdown-item" data-contact="${last.userId}">
                    <div class="d-inline-block rounded">
                    <img class="img-1" src="/display?fileName=${last.userImgUploadPath}/${last.userImgUuid}_${last.userImgFileName}" class="d-block w-100" alt="${last.userImgFileName}" style="width:20px; height:20px;">
                    </div>
                    <span class="badge badge-pill badge-danger float-right ml-2 mt-4 ${readlessHide}" data-contact="${last.userId}">${readless}</span>
                    <div class="d-inline-block mr-5">
                        <label class="font-weight-bolder" style="font-size: 15px;">${last.userNick}(${last.userId})</label><br>
                        <label class="text-secondary lastMsg" style="font-size: 14px;">${msg}</label>
                    </div>
				</a>`;
    },
    message: function (msg, contactUserId) {
        var authUserId = $('#authUserId').val();

        var date = new Date(msg.msgDate);
        var dateDay = date.getFullYear() + '년 ' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '월 ' + (date.getDate() < 9 ? '0' : '') + date.getDate() + '일';

        if (!msgDays.includes(dateDay)) {
            msgDays.push(dateDay);
            $('<div class="text-center font-weight-bolder msgDays"></div>').text(dateDay).appendTo('#messageView');
        }

        var dateTime = (date.getHours() < 12 ? '오전 ' : '오후 ') + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())
            + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        var whoIsLastSender = $('#messageView').children('div:last').data('user');

        var template;
        if (msg.reqId === contactUserId) {    // 상대방 일때
            var showProfile = '';

            if(whoIsLastSender === contactUserId) {
                var tempTime = $(`div[data-usertime="${dateTime}"]`).data('usertime');
                if (tempTime === dateTime) {
                    $('#messageView').children('div:last').find('.msgTime').hide();
                    showProfile = 'd-none';
                } else {
                    showProfile = 'd-block';
                }
            } else {
                showProfile = 'd-block';
            }
           
            template = `<!-- 상대방 채팅 -->
            <div class="mt-1 userMsg" data-user="${contactUserId}">
                <div class="clearfix"></div>
                <div class="rounded ${showProfile}" data-usertime="${dateTime}">
                    <img class="img-1" src="/display?fileName=${msg.userImgUploadPath}/${msg.userImgUuid}_${msg.userImgFileName}" class="d-block" alt="preview_${msg.userImgFileName}" style="width: 45px; height : 100%">
                    <div class="text-dark font-weight-bolder px-1 d-inline" style="font-size: 12px;" data-usertime="${dateTime}">${msg.userNick}(${msg.userId})</div>
                </div>
                <div class="d-inline-block float-left my-2">
                    <span class="msg ml-5">${msg.msg}</span>
                    <label class="msgTime pl-2 mb-0 text-muted" style="font-size: 10px;" data-usertime="${dateTime}">${dateTime}</label>
                </div>
            </div>`;


        } else if(msg.reqId === authUserId) {    // 내가 보낸 메세지
            if(whoIsLastSender === authUserId) {
                var tempTime = $(`label[data-mytime="${dateTime}"]`).data('mytime');
                
                if (tempTime === dateTime) {
                    $('#messageView').children('div:last').find('.msgTime').hide();
                }
            }
            // $(`label[data-mytime="${dateTime}"]`).hide();
            var readless = '';
            if (msg.msgChk === 'F') {
                readless = `<label class="readless pr-1 text-muted" style="font-size: 8px;" data-read="${msg.msgNo}">1</label>`;
            }
            template = `
            <div class="mt-1 myMsg" data-user="${authUserId}">
                <div class="clearfix"></div>
                <div class="text-right m-3">
                    ${readless}
                    <label class="msgTime pr-2 mb-0 text-muted" style="font-size: 10px;" data-mytime="${dateTime}">${dateTime}</label>
                    <span class="msg">${msg.msg}</span>
                </div>
            </div>`;
        }
        return template;
    },
    messengerContactInfo: function (user) {
        return `<div class="d-inline-block rounded">
            <img class="img-1" src="/display?fileName=${user.userImgUploadPath}/${user.userImgUuid}_${user.userImgFileName}" class="d-block" alt="preview_${user.userImgFileName}">
        </div>
        <div class="d-inline-block">
            <label>${user.userNick}(${user.userId})</label>
        </div>`;
    },
    messengerSearch: function (user) {
        return `<a href="#" class="list-group-item list-group-item-action" data-contact="${user.userId}">
                    <div class="d-inline-block rounded bg-secondary">
                    <img class="img-1" src="/display?fileName=${user.userImgUploadPath}/${user.userImgUuid}_${user.userImgFileName}" class="d-block" alt="preview_${user.userImgFileName}"></div>
                    <div class="d-inline-block">
                        <label>${user.userNick}(${user.userId})</label>
                     </div>
                </a>`;
    }
}