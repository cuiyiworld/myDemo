/**
 * Created by zxm on 2017/3/31.
 */
$.fn.extend({
    "initPage":function(listCount,currentPage,fun){
        var maxshowpageitem = $(this).attr("maxshowpageitem");
        if(maxshowpageitem!=null&&maxshowpageitem>0&&maxshowpageitem!=""){
            page.maxshowpageitem = maxshowpageitem;
        }
        var pagelistcount = $(this).attr("pagelistcount");
        if(pagelistcount!=null&&pagelistcount>0&&pagelistcount!=""){
            page.pagelistcount = pagelistcount;
        }

        var pageId = $(this).attr("id");
        page.pageId=pageId;
        
        if(listCount<0){
            listCount = 0;
        }
        if(currentPage<=0){
            currentPage=1;
        }
        
        page.setPageListCount(pageId,listCount,currentPage,fun);

    }
});
var  page = {
    "maxshowpageitem":5,//最多显示的页码个数
    "pagelistcount":10,//每一页显示的内容条数
    /**
     * 初始化分页界面
     * @param pageId 页面列表id
     * @param listCount 列表总量
     * @param currentPage 当前页码
     */
    "initWithUl":function(pageId,listCount,currentPage){

        var pageCount = 1;
        if(listCount>0){
    	//              	列表总量       % 每一页显示的内容条数 如果大于0那么取每页总量除以每一页显示的内容条数加1岁			如果不是，那么取 	每页总量除以每一页显示的内容条数
            var pageCount = listCount%page.pagelistcount>0?parseInt(listCount/page.pagelistcount)+1:parseInt(listCount/page.pagelistcount);
        }
        var appendStr = page.getPageListModel(pageCount,currentPage);
        $("#"+pageId).html(appendStr);
    },
    /**
     * 设置列表总量和当前页码
     * @param pageId 页面id
     * @param listCount 列表总量
     * @param currentPage 当前页码
     * @param fun 回调函数
     */
    "setPageListCount":function(pageId,listCount,currentPage,fun){
        listCount = parseInt(listCount);
        currentPage = parseInt(currentPage);
        page.initWithUl(pageId,listCount,currentPage);
        page.initPageEvent(pageId,listCount,fun);
        if(typeof fun == "function"){
            fun(currentPage);
        }
    },
    "initPageEvent":function(pageId,listCount,fun){
        $("#"+pageId +">li[class='pageItem']").on("click",function(){
            page.setPageListCount(pageId,listCount,$(this).attr("page-data"),fun);
        });
    },
    "getPageListModel":function(pageCount,currentPage){
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var prePageClass ="pageItem";
        var nextPageClass = "pageItem";
        if(prePage<=0){
            prePageClass="pageItemDisable";
        }
        if(nextPage>pageCount){
            nextPageClass="pageItemDisable";
        }
        var appendStr ="";
        appendStr+="<li class='"+prePageClass+"' page-data='1' page-rel='firstpage'>首页</li>";
        appendStr+="<li class='"+prePageClass+"' page-data='"+prePage+"' page-rel='prepage'>&lt;上一页</li>";
        var miniPageNumber = 1		//设置最小页码数字
        //如果当前页码 - 最多显示的页码个数/2 大于0，并且当前页码 + 最多显示的页码个数/2 小于页码数量
        if(currentPage-parseInt(page.maxshowpageitem/2)>0 && currentPage+parseInt(page.maxshowpageitem/2)<=pageCount){
            miniPageNumber = currentPage-parseInt(page.maxshowpageitem/2);
        }else if(currentPage-parseInt(page.maxshowpageitem/2)>0 && currentPage+parseInt(page.maxshowpageitem/2)>pageCount){
            miniPageNumber = pageCount-page.maxshowpageitem+1;
            if(miniPageNumber<=0){
                miniPageNumber=1;
            }
        }
        var showPageNum = parseInt(page.maxshowpageitem);
        if(pageCount<showPageNum){
            showPageNum = pageCount
        }
        for(var i=0;i<showPageNum;i++){
            var pageNumber = miniPageNumber++;
            var itemPageClass = "pageItem";
            if(pageNumber==currentPage){
                itemPageClass = "pageItemActive";
            }

            appendStr+="<li class='"+itemPageClass+"' page-data='"+pageNumber+"' page-rel='itempage'>"+pageNumber+"</li>";
        }
        appendStr+="<li class='"+nextPageClass+"' page-data='"+nextPage+"' page-rel='nextpage'>下一页&gt;</li>";
        appendStr+="<li class='"+nextPageClass+"' page-data='"+pageCount+"' page-rel='lastpage'>尾页</li>";
       return appendStr;

    }
}