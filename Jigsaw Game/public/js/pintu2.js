/**
 * Created by ali on 16-12-8.
 */
"use strict";

$(function () {
    /*
    * new PintTu($container, $start, num, width, height);
    * $container -> 装载拼图的容器
    * $start -> 开始按钮
    * $num -> 拼图的块数,需要设定为可开平方的
    * width -> 暂时使用默认值，请不要改变
    * height -> 暂时使用默认值，请不要改变
    * */
    var pintu = new PinTu($('#container'), $('#start'), 64);
    pintu.init();
});

var PinTu = function ($container, $start, num = 16, width = 960, height = 540) {
    //拼图容器的值
    this.width = width;
    this.height = height;
    this.$container = $container;
    this.num = num;

    //单个拼图的定义值
    this.xNum = "";
    this.xWidth = "";
    this.yHeight = "";

    //窗口的宽高
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;

    //拖动的元素
    this.$dragNode = "";

    this.src = "./public/img/3.jpg";
    this.$start = $('#start');
};

PinTu.prototype.init = function () {
    this.xNum = Math.sqrt(this.num);
    this.xWidth = this.width / this.xNum;
    this.yHeight = this.height / this.xNum;

    //把图片切分为各个大小一直的小块
    this.getSmallItem();
    this.start();
    return this;
};

PinTu.prototype.getSmallItem = function () {
    //存放拼图的数组
    var html = [];
    var css = "";
    //得到default样式
    var style = {
        "height": this.yHeight + "px",
        "width": this.xWidth + "px",
        "background-size": this.width + "px " + this.height + "px",
        "background-image": "url("+this.src+")",
        "background-repeat": "no-repeat",
        "display": "inline-block",
        "transition": "all 0.5s linear",
        "position": "absolute",
        "z-index": 2
    };

    //json对象的style转为字符串的内联css
    for(let key in style){
        css +=  key + ":" + style[key] + ";"
    }

    //最后拖动时放置每个拼图小块的容器
    var placeAreaCss = "";
    var placeAreaStyle = {
        "height": this.yHeight + "px",
        "width": this.xWidth + "px",
        "display": "inline-block",
        "box-sizing": 'border-box',
        "border": "dashed grey 1px",
        "z-index": 1
    };
    for(let key in placeAreaStyle){
        placeAreaCss +=  key + ":" + placeAreaStyle[key] + ";"
    }

    //拼图模板
    var template = "<div class='ping-tu' draggable='true' id='item-{i}' style='{css} background-position: {x}px {y}px; top: {top}px; left: {left}px'></div>";
    var placeAreaTemplate = "<div class='place-area' id='place-{i}' style='"+ placeAreaCss +"'></div>";

    for(let i = 0; i < this.xNum; i++){
        for(let j = 0; j< this.xNum; j++){
            let x = -j * this.xWidth;
            let y = -i * this.yHeight;
            let data = {
                "css": css,
                "i": i * this.xNum + j,
                "x": x,
                "y": y,
                "left": -x,
                "top": -y
            };

            html.push(
                formatTemplate(data, template)
            );
            html.push(
                formatTemplate({i: data.i}, placeAreaTemplate)
            )
        }
    }
    this.$container.html(html.join(""));
    return this;
};


PinTu.prototype.start = function () {
    var self = this;
    /*----计算边界----*/
    var place = ['top', 'bottom', 'left', 'right'];
    var border = {
        "top":  {top: [-(this.winHeight-this.height)/2, -this.yHeight], left: [-(this.winWidth-this.width)/2, this.winWidth-(this.winWidth-this.width)/2-this.xWidth]},
        "left": {top: [0, this.height - this.yHeight], left: [-this.xWidth, -(this.winWidth-this.width)/2]},
        "bottom":{bottom: [-(this.winHeight-this.height)/2, -this.yHeight], left: [-(this.winWidth-this.width)/2, this.winWidth-(this.winWidth-this.width)/2-this.xWidth]},
        "right": {top: [0, this.height - this.yHeight], right: [-this.xWidth, -(this.winWidth-this.width)/2]}
    };
    var items = this.$container.children();

    this.$start.click(function () {
        items.map(function (i, item) {
            let $node = $(item);
            $node.css('left','');
            $node.css('top','');
            $node.css('right','');
            $node.css('bottom','');

            let area = Math.floor(Math.random()*4);
            let obj = border[place[area]];
            for(let key in obj){
                $node.css(key, getRandom(obj[key][0], obj[key][1]));
            }
        });
    });

    //拖拽事件
    $('.ping-tu').on('dragstart', function (e) {
        console.log('drag start');
        self.$dragNode = $(this);
        self.$dragNode.css('z-index', 10);
    }).dblclick(function (ev) {
        console.log('move start');
        ev = ev || event;
        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;

        var $node = $(this);
        $node.css('z-index', 10);
        $(document).on('mousemove', function (ev) {
            //这里为什么使用document，是因为快速拖拽的话会鼠标丢失，
            ev = ev || event;
            $node.css("left", ev.clientX - disX);
            $node.css("top", ev.clientY - disY);
        });
        $(document).click(function (ev) {
            console.log("move end");
            $node.unbind('click');
            $(document).unbind('mousemove').unbind('dblclick');
        });
    });



    $('.place-area').on('dragenter', function (e) {
        if(!$(this).html()){
            $(this).append(self.$dragNode);

            self.$dragNode.css('left','');
            self.$dragNode.css('top','');
            self.$dragNode.css('right','');
            self.$dragNode.css('bottom','');
        }
    });

    return this;
};



//得到一定范围的随机数
function getRandom(num1, num2) {
    if(num1*num2 > 0){
        return ((Math.random()*(num2-num1))+num1);
    }else{
        return Math.random()*num1 + Math.random()*num2;
    }
}

//js模板替换
function formatTemplate(dta, tmpl) {
    var format = {
        name: function(x) {
            return x
        }
    };
    return tmpl.replace(/{(\w+)}/g, function(m1, m2) {
        if (!m2)
            return "";
        return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];
    });
}