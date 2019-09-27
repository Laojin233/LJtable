    <script type="text/javascript">
        var currentindex = 1;
        var parentid;
        var columnid;
        var showpages = 5;

        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }

        $("#searchbtn").click(function () {
            ClassChange(parentid, columnid, 1);
        });

        $(document).ready(function () {
            $('#topmenu').load('top.html');
            $('#footer').load('footer.html');
            $('#calendar').load('calendar.html');
            parentid = getUrlParam("parentid");
            columnid = getUrlParam("columnid");

            if (parentid == null) {
                window.document.location.href = "index.html";
                return false;
            }
            ClassChange(parentid, columnid, 1);
           // BuildCale(0);
        });

        //新闻列表
        function ClassChange(parentid, columnid, index) {
            parentid = parentid;
            columnid = columnid;
            $("#ContentBody").show();
            $("#caption").html("文章列表");
            var frmdata = {
                pagesize: 15,
                pageindex: index,
                action: "contentlist",
                parentid: parentid,
                columnid: columnid,
                key: $("#key").val(),
                rand: Math.random()
            };

            $.ajax({
                type: 'POST',
                data: frmdata,
                url: "http://ustc.ahbys.com/API/Web/index10358.ashx?rd=" + Math.random(),
                success: function (data) {
                  
                    if (data.r == 0) {
                        currentindex = index;
                        $('#contentclass').html(data.Columnlist);
                        $('#columntitle').html(data.columntitle);

                        var model = data.model;
                        if (model == "1") {
                            var len = data.Content.RowsCount;

                            if (len > 0) {
                                var contenthtml = "";
                                for (var i = 0; i < len; i++)
                                    contenthtml += data.Content.Contentclass[i];
                                $("#bodylist").html(contenthtml);
                                $("#recordercount").html(data.Content.RecorderCount);
                                $("#pagecount").html(data.Content.PageCount);
                                if (data.Content.PageCount > 1) {
                                    console.log(12121212121);
                                    $("#navul").html(pagehtml1(parentid, columnid, index, data.Content.PageCount));
                                    $(".am-cf").show();
                                } else $(".am-cf").hide();
                                $("#caption").html("文章列表");
                            }
                            else {
                                $("#bodylist").html("<td colspan='4'>暂无数据</td>");
                                $(".am-cf").hide();
                            }
                        }
                        else if (model == "3") {
                            $("#caption").html("文章内容");
                            $("#bodylist").html("<div style='padding:25px;'>" + data.Content + "</div>");
                            $(".am-cf").hide();
                        }
                    }
                }
            });
        }

        function pagehtml1(type, classid, index, pagecount) {
            var begin = 1;
            for (var i = 1; i <= pagecount; i++) {
                if (index >= i && index < begin + showpages) break;
                else begin += showpages;
            }
            var end = parseInt(begin) + parseInt(showpages) - 1;

            if (parseInt(end) > parseInt(pagecount))
                end = pagecount;

            var navhtml = "";

            if (index == 1) {
                navhtml = "<li class='am-disabled'><a href='javascript:void(0)'>第一页</a></li>";
                navhtml += "<li class='am-disabled'><a href='javascript:void(0);'>上一页</a></li>";
            }
            else {
                navhtml = "<li><a href='javascript:ClassChange(" + type + "," + classid + ",1)'>第一页</a></li>";
                navhtml += "<li><a href='javascript:ClassChange(" + type + "," + classid + "," + (index - 1).toString() + ")'>上一页</a></li>";
            }

            for (var i = begin; i <= end; i++) {
                if (i == index)
                    navhtml += "<li  class='am-active'><a href='javascript:ClassChange(" + type + "," + classid + "," + i.toString() + ")'>" + i.toString() + "</a></li>";
                else navhtml += "<li><a href='javascript:ClassChange(" + type + "," + classid + "," + i.toString() + ")'>" + i.toString() + "</a></li>";
            }

            if (index == pagecount) {
                navhtml += "<li class='am-disabled'><a href='javascript:void(0);'>下一页</a></li>";
                navhtml += "<li class='am-disabled'><a href='javascript:void(0);'>最后一页</a></li>";
            }
            else {
                navhtml += "<li><a href='javascript:ClassChange(" + type + "," + classid + "," + (index + 1).toString() + ")'>下一页</a></li>";
                navhtml += "<li><a href='javascript:ClassChange(" + type + "," + classid + "," + pagecount + ")'>最后一页</a></li>";
            }
            return navhtml;
        }

    </script>