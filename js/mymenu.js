var secondMenuTemp = null;
var indexTemp = null;
$(function() {
    menuController();
})

function menuController() {

    $('#host').children('*').each(function(index, item) {
        var fun = function(index, item) {
            //一级选项监听
            $(item).on('click', function(event) {
                event.stopPropagation();
                //隐藏首页，显示content内容区
                $('#index').addClass('div_hid');
                $('#mycontent').removeClass('div_hid');
                //修改 nav1级目录 
                var thisclickmenu = $(this).data('c');
                $("#breadnav").find('li').eq(0).text(thisclickmenu);

                //添加自身选中样式，恢复兄弟的默认样式
                $(this).addClass('myactive');
                $(this).siblings().removeClass('myactive');
                /////////////////////////////////////////////////////////////////////一级和2级目录处理区////////////////////////////

                // 是否包含二级目录，一级和二级的处理不同
                var len1 = $(this).children().eq(1).children().length;
                if (len1 < 1) {
                    $('#breadnav li').eq(1).addClass('div_hid');
                } else {
                    //如果这一次点击和上一次点击相同的一级选项，则不往下执行
                    if (index == indexTemp) return;
                    //如果是第一次点击 则添加默认显示包括content,移除兄弟样式
                    var fixElement = $(this).children().eq(0); //一级选项父div
                    var activeElement = $(this).children().eq(1); //二级选项 父div
                    secondMenuTemp = activeElement.children().eq(0).text(); //默认二级选项的第一个的值
                    $('#breadnav li').eq(1).removeClass('div_hid').text(secondMenuTemp); //nav2显示和值
                    activeElement.children().eq(0).css({
                        color: 'blue'
                    });
                    activeElement.children().eq(0).siblings().css({
                        color: 'white'
                    });
                    //切换为默认二级第一个选项对应的 内容区的显示，并移除已显示
                    $('#content').children().eq(index).children().eq(0).removeClass('div_hid');
                    $('#content').children().eq(index).children().eq(0).siblings().addClass('div_hid');

                }
                ////////////////////////////////////////////////////////////////////////////////////公共区不用动  
                //将兄弟还原到默认状态
                $(this).siblings().each(function(index, item) {
                    var len = $(item).children().length;
                    if (len > 1) {
                        $(item).children().eq(0).children('div:last').text('▶');
                        $(item).children().eq(1).addClass('div_hid');
                    }
                });
                //控制显示 content 的哪个 children
                $('#content').children().eq($(this).index()).removeClass('div_hid');
                $('#content').children().eq($(this).index()).siblings().addClass('div_hid');
                indexTemp = index;
            })

            //////////////////////////////////////////////////////////////////////////////////////////////
            //len:点击的选项是否包含向右箭头，如果包含，同时也包含二级目录，
            var len = $(item).children().length;
            if (len > 1) {
                //包含则监听当前选择按钮：
                $(item).children().eq(0).children('*').eq(2).on('click', function() {
                        console.log($(this).text())
                        if ($(this).text().trim() == '▶') {
                            $(this).parent().next().removeClass('div_hid');
                            $(this).text('▼');
                        } else {
                            $(this).parent().next().addClass('div_hid');
                            $(this).text('▶');

                        }
                    })
                    /**
                     *二级选项点击监听
                     */
                $(item).children().eq(1).children('*').on('click', function(event) {
                    event.stopPropagation();
                    //nav2目录显示值为当前选项
                    $('#breadnav li').eq(1).text($(this).data('c'));
                    secondMenuTemp = $(this).data('c');
                    //内容显示区切换为当前对应的选项显示，移除兄弟显示
                    var contentchild = $('#content').children('*').eq(index);
                    contentchild.children().eq($(this).index()).removeClass('div_hid');
                    contentchild.children().eq($(this).index()).siblings().addClass('div_hid');
                    //修改当前选项样式颜色
                    $(this).css({
                        color: 'blue'
                    });
                    $(this).siblings().css({
                        color: 'white'
                    });
                })
            }
        };
        fun(index, item);
    });
}