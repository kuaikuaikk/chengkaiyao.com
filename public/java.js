
/*function onNavOne() {
    $("#navOne").css("border-bottom", "5px solid rgb(57,73,171)");
}

function leaveNavOne() {
    $("#navOne").css("border-bottom", "none");
}*/

/*$(function() {
    $("#navOne").hover(
        function(oEvent) {
            //第一个函数相当于mouseover事件监听
            $(oEvent.target).css("border-bottom", "5px solid rgb(57,73,171)");
        },
        function(oEvent) {
            //第二个函数相当于mouseover事件监听
            //$(oEvent.target).css("borderColor", "rgb(200, 200, 200)");
            $(oEvent.target).animate({borderColor: "transparent"}, 250);
        }
    );
});*/

function navHover(theNav) {
    theNav.hover(
        function () {
            //第一个函数相当于mouseover事件监听
            $(theNav).css("border-bottom", "5px solid rgb(57,73,171)");
        },
        function () {
            //第二个函数相当于mouseover事件监听
            //$(oEvent.target).css("borderColor", "rgb(200, 200, 200)");
            $(theNav).animate({ borderColor: "transparent" }, 250);
        }
    );
};

function picHover(pic) {
    console.log("here");
    pic.hover(
        function () {
            //第一个函数相当于mouseover事件监听
            //console.log("on");
            $(pic).css("border-bottom", "5px solid rgb(57,73,171)");
        },
        function () {
            //第二个函数相当于mouseover事件监听
            //$(oEvent.target).css("borderColor", "rgb(200, 200, 200)");
            //.log("off");
            $(pic).animate({ borderColor: "transparent" }, 250);

        }
    );
};

function onPicture(pic) {
    $(pic).css("boxShadow", "0px 4px 8px black");
}

function leavePicture(pic) {
    $(pic).css("boxShadow", "0px 3px 5px grey");
}


$(function () {
    navHover($("#navOne"));
    navHover($("#navTwo"));
    navHover($("#navThree"));
    navHover($("#navFour"));
});

function loadPageOne() {
    $("#navOne").addClass("lockedNav");
}

function loadPageTwo() {
    $("#navTwo").addClass("lockedNav");
}

function loadPageThree() {
    $("#navThree").addClass("lockedNav");
}

function loadPageFour() {
    $("#navFour").addClass("lockedNav");
}

function setNav() {
    $("#navOne").attr("href", "index.html");
    $("#navTwo").attr("href", "moment.html");
    $("#navThree").attr("href", "creativity.html");
    $("#navFour").attr("href", "about.html");

    $("#navOne").text("HOME");
    $("#navTwo").text("MOMENT");
    $("#navThree").text("CREATIVITY");
    $("#navFour").text("ABOUT");
}

function pullPic() {
    var text = [];

    $.ajax({
        dataType: "json",
        url: "/momentPic",
        success:
            function (data) {
                $.each(data, function (index, value) {
                    $("#gallery").append("<div class=\"photo\" onmouseover=\"onPicture(this);\" onmouseleave=\"leavePicture(this);\">+<img style=\"margin:0px;\" src=\"" + value.url + "\" width=\"100%\" /></div>");
                    $("#gallery").append("<center><div class=\"annotation\">" + value.date.substring(4, 10) + "," + value.date.substring(10, 15) + "</div></center>");
                    console.log(value.date);
                })

            }
    })
}