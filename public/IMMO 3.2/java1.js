var date = new Date();  //创建对象                
var h = date.getHours();  //时                
var name = "Kk";
var search;  

function textchange() {
    search = document.getElementById("search-text").value;
    document.getElementById("search-text2").value = search;
}

function textchange2() {
    search = document.getElementById("search-text2").value;
    document.getElementById("search-text").value = search;
}

function getkey () {
    if(event.keyCode==13){
        document.getElementById("search-purpose").action="https://www.baidu.com/s";
        document.getElementById("search-text-no").name="wd";
        document.getElementById("search-text-no").value=search; 
        document.getElementById("pp1").click();  
        //alert('click enter');
       }   
}

function time(h){                
    if (6<=h & h<9) {
        return "早上好，"
    }
    if (9<=h & h<13)    {
        return "中午好，"
    }
    if (13<=h & h<17)   {
        return "下午好，"
    }
    else    {
        return "晚上好，"
    }
    }

//pp=purpose
function pp1() {
        document.getElementById("search-purpose").action="https://www.baidu.com/s";
        document.getElementById("search-text-no").name="wd";
        document.getElementById("search-text-no").value=search; 
}

function pp2() {
        document.getElementById("search-purpose").action="https://www.google.com/search";
        document.getElementById("search-text-no").name="q";
        document.getElementById("search-text-no").value=search;
}

function pp3() {
        document.getElementById("search-purpose").action="https://www.zhihu.com/search?type=content";
        document.getElementById("search-text-no").name="q";
        document.getElementById("search-text-no").value=search;
}

function pp4() {
        document.getElementById("search-purpose").action="https://www.youtube.com/results";
        document.getElementById("search-text").name="search_query";
        document.getElementById("search-text-no").value=search;
        
}

function grandsearch() {
        document.getElementsByClassName("page").style="display: none;";
        document.getElementById("page2").style="display: inline;";
        document.getElementById("card1").src=encodeURI("https://m.baidu.com/s?wd="+search);
        document.getElementById("card2").src=encodeURI("https://m.bilibili.com/search.html?keyword="+search);
        document.getElementById("card3").src=encodeURI("https://zh.wikipedia.org/wiki/"+search);
        document.getElementById("search-text2").focus();

}

function back_click() {
        document.getElementById("page2").style="display: none;";
        document.getElementsByClassName("page").style="display: inline;";
        document.getElementById("search-text").focus();
}

function getkey2() {
    if(event.keyCode==13){ 
        document.getElementById("grandsearch").click();  
       }   
}

function mouseOn(that) {
    that.hover(
        function() {
            //第一个函数相当于mouseover事件监听
            $(that).css("box-shadow", "0px 2px 12px rgb(85, 85, 85)");
        },
        function() {
            //第二个函数相当于mouseover事件监听
            //$(oEvent.target).css("borderColor", "rgb(200, 200, 200)");
            $(that).css("box-shadow", "0px 1px 5px rgb(85, 85, 85)");
        }
    );
};

$(function() {
    mouseOn($(".search-text"));
    mouseOn($("#selectionOne"));
    mouseOn($("#selectionTwo"));
    mouseOn($("#selectionThree"));
    mouseOn($("#selectionFour"));
    mouseOn($("#grandsearch"));
});