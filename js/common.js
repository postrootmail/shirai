/* ===================================================================

 * ロールオーバー

=================================================================== */
$.fn.rollover = function() {
    return this.each(function() {
        // 画像名を取得
        var src = $(this).attr('src');
        //すでに画像名に「_on.」が付いていた場合、ロールオーバー処理をしない
        if (src.match('_on.')) return;
        // ロールオーバー用の画像名を取得（_onを付加）
        var src_on = src.replace(/^(.+)(\.[a-z]+)$/, "$1_on$2");
        // 画像のプリロード（先読み込み）
        $('').attr('src', src_on);
        // ロールオーバー処理
        $(this).hover(
            function() { $(this).attr('src', src_on); },
            function() { $(this).attr('src', src); }
        );
    });
};


/* ===================================================================

 * ページトップへの戻り

=================================================================== */
$(function(){
    // スクロールすると表示するエリア
    var element = $('#pageTop');
    // スクロール量の設定
    var position = 400; // 単位：px
    // スクロールすると表示するエリアを非表示
    element.hide();
    $(window).scroll(function(){
        // スクロールすると表示させる
        if ($(this).scrollTop() > position) {
            $(element).fadeIn();
        } else {
            $(element).fadeOut();
        }
    });
});


/* ===================================================================

 * スムーススクロール

=================================================================== */
$(function(){
    // #で始まるアンカーをクリックした場合に処理
    $('a[href^=#]').click(function() {
        // スクロールの速度
        var speed = 400;// ミリ秒
        // アンカーの値取得
        var href= $(this).attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を数値で取得
        var position = target.offset().top;
        // スムーススクロール
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });
});


/* ===================================================================

 * スライドショー

=================================================================== */
$.fn.slideshow = function (options) {
    // 初期値
    var o = $.extend({
        autoSlide    : true,
        type         : 'repeat',
        interval     : 3000,
        duration     : 500,
        easing       : 'swing',
        imgHoverStop : true,
        navHoverStop : true,
        prevPosition : 0,
        nextPosition : 0,
        baseWidth    : 0
    }, options);

    // セレクタ設定
    var $slider     = $(this),
        $container  = $slider.find('.slideInner'),
        $element    = $container.children(),
        $prevNav    = $slider.find('.slidePrev'),
        $nextNav    = $slider.find('.slideNext'),
        $prevImg    = $slider.find('.slidePrev img'),
        $nextImg    = $slider.find('.slideNext img'),
        $controlNav = $slider.find('.controlNav');

    // 変数設定
    var windowWidth,
        slideWidth,
        totalWidth,
        slidePosition,
        filterWidth,
        filterHeight,
        imgMargin,
        imgPadding,
        prevImgWidth,
        prevImgHeight,
        prevImgYPosition,
        prevImgXPosition,
        nextImgWidth,
        nextImgHeight,
        nextImgYPosition,
        nextImgXPosition,
        count = 1,
        imgNum = 1,
        slideCount = 1,
        stopFlag = false;

    // フィルター設置
    $slider.append('<div class="filterPrev"></div><div class="filterNext"></div>');
    var $filterPrev = $slider.find('.filterPrev'),
        $filterNext = $slider.find('.filterNext');

    // スライド画像複製
    $('li', $container).clone().prependTo($container);
    $('li', $container).clone().appendTo($container);

    // 最後の画像を最初に移動
    $('li:last-child', $container).prependTo($container);

    // スライドの標準サイズ設定
    if(o.baseWidth == 0) {
        o.baseWidth = $element.width();
    }

    // ストップモード時PREVボタン非表示
    if (o.type == 'stop') {
        $prevNav.hide();
    }

    // スライド設置
    $(window).on('load resize', function(){
        windowWidth = $(window).width();
        if(windowWidth < o.baseWidth){
            $slider.find('img').css({width : windowWidth});
       }

        // 各値取得
        slideWidth = $slider.find('li').outerWidth(true);
        totalWidth = ($slider.find('li').length * slideWidth);
        imgMargin = parseInt($element.find('img').css('margin-left'));
        imgPadding = parseInt($element.find('img').css('padding-left'));
        slidePosition = ((windowWidth - totalWidth ) / 2) - (slideWidth / 2);
        filterWidth = ((windowWidth - slideWidth) / 2) - (imgMargin + imgPadding);
        filterHeight = $slider.find('li').height();
        prevImgWidth = parseInt($prevImg.css('width'));
        prevImgHeight = parseInt($prevImg.css('height'));
        prevImgYPosition = (filterHeight- prevImgHeight) / 2;
        prevImgXPosition = filterWidth - prevImgWidth + o.prevPosition;
        nextImgWidth = parseInt($nextImg.css('width'));
        nextImgHeight = parseInt($nextImg.css('height'));
        nextImgYPosition = (filterHeight- nextImgHeight) / 2;
        nextImgXPosition = filterWidth - nextImgWidth + o.nextPosition;

        // CSS
        $slider.css({
            'width' : 100 + '%',
            'height' : filterHeight
        });
        $container.css({
            'float' : 'left',
            'width' : totalWidth,
            'top'   : '0',
            'left'  : slidePosition,
             'margin-left'  : -slideWidth
       });

        $element.css({'width' : slideWidth , 'height' : filterHeight});
        $prevNav.css({'width' : filterWidth , 'height' : filterHeight});
        $prevNav.css({'top' : '0' , 'left' : '0'});
        $prevImg.css({'top' : prevImgYPosition , 'left' : prevImgXPosition});
        $nextNav.css({'width' : filterWidth , 'height' : filterHeight});
        $nextNav.css({'top' : '0' , 'right' : '0'});
        $nextImg.css({'top' : nextImgYPosition , 'right' : nextImgXPosition});
        $filterPrev.css({'width' : filterWidth , 'height' : filterHeight});
        $filterNext.css({'width' : filterWidth , 'height' : filterHeight});

        // タッチパネルはPREV/NEXTボタン非表示
        if('ontouchstart' in document) {
            $prevNav.hide();
            $prevImg.hide();
            $nextNav.hide();
            $nextImg.hide();
        }
    });

    // コントールナビデザイン
    var controlNavDesign = function () {
        $controlNav.children('span').removeClass('current');
        $controlNav.children('span:eq(' + (count -1) + ')').addClass('current');
    };

    // 自動切り替えスタート
    var start;
    var startTimer = function () {
        start = setInterval(function(){
            nextSlide(slideCount);
        },o.interval);
    };

    // 自動切り替えストップ
    var stopTimer = function () {
         clearInterval(start);
    };

    // ストップ機能
    var slideStop = function () {
        if (o.type == 'stop') {
            if(count >= $element.length){
                $nextNav.hide();
                stopTimer();
                stopFlag = true;
            }else{
                $nextNav.show();
            }
            if(count == 1){
                $prevNav.hide();
            }else{
                $prevNav.show();
            }
        }
    };

    // カウンター
     var counter = function () {
        if(count > $element.length){
            count = 1;
        }
         if(count == 0){
            count = $element.length;
        }
        slideCount = 1;
    };

    // 左方向スライド
    var prevSlide = function (slideCount) {
        stopTimer();
        $container.not(':animated').animate({
            marginLeft:parseInt($container.css('margin-left')) + (slideWidth * slideCount) + 'px'
        },o.duration,o.easing,
        function(){
            for(i=0; i < slideCount; i++){
                $('li:last-child', $container).prependTo($container);
            }
            $container.css('margin-left',-slideWidth + 'px');
        });
        count = count - slideCount;
        counter();
        controlNavDesign();
        slideStop();
        if(!o.navHoverStop && !stopFlag && o.autoSlide) {
            startTimer();
        }
        if(!stopFlag && o.autoSlide) {
            startTimer();
        }
    }

    // 右方向スライド
    var nextSlide = function (slideCount) {
        stopTimer();
        $container.not(':animated').animate({
            marginLeft:parseInt($container.css('margin-left')) - (slideWidth * slideCount) + 'px'
        },o.duration,o.easing,
        function(){
            for(i=0; i < slideCount; i++){
                $('li:first-child', $container).appendTo($container);
            }
            $container.css('margin-left',-slideWidth + 'px');
        });
        count = count + slideCount;
        counter();
        controlNavDesign();
        slideStop();
        if(!o.navHoverStop && !stopFlag && o.autoSlide) {
            startTimer();
        }
        if(!stopFlag && o.autoSlide) {
            startTimer();
        }
    }

    // 戻るボタン
    $prevNav.click(function(){
        if($container.is(':animated')) {
            return false;
        }
        prevSlide(slideCount);
   });

    // 進むボタン
    $nextNav.click(function(){
        if($container.is(':animated')) {
            return false;
        }
        nextSlide(slideCount);
    });

    // コントローラー生成
    $element.each(function (e) {
        $('<span/>').text(e + 1).appendTo($controlNav)
        .click(function () {
            if($container.is(':animated')) {
                return false;
            }
            if((e + 1) == count) { return false; }
            // 左方向スライド
            if((e + 1) < count) {
                slideCount = count - (e + 1);
                prevSlide(slideCount);
            }
            // 右方向スライド
            if((e + 1) > count) {
                slideCount = (e + 1) - count;
                nextSlide(slideCount);
            }
        });
    });
    $controlNav.find('span:first-child').addClass('current');

    // タッチパネルはホバー動作無効
    if(!('ontouchstart' in document)) {
        // 画像にホバーした際の動作
        if(o.imgHoverStop){
            $container.hover(function() {
                stopTimer();
            },function() {
                if(!stopFlag && o.autoSlide) {
                    startTimer();
                }
            });
        }

        // ナビゲーションにホバーした際の動作
        if(o.navHoverStop){
            $prevNav.hover(function() {
                stopTimer();
            },function() {
                if(!stopFlag && o.autoSlide) {
                    stopTimer();
                    startTimer();
                }
            });

            $nextNav.hover(function() {
                stopTimer();
            },function() {
                if(!stopFlag && o.autoSlide) {
                    stopTimer();
                    startTimer();
                }
            });

            $controlNav.hover(function() {
                stopTimer();
            },function() {
                if(!stopFlag && o.autoSlide) {
                    stopTimer();
                    startTimer();
                }
            });
        }
    }

    // タッチパネル設定
    $slider.find('li').on('touchstart', touchStart);
    $slider.find('li').on('touchmove' , touchMove);

    // タップした位置をメモリーする
    function touchStart(e) {
        var pos = Position(e);
        $slider.find('li').data('memory',pos.x);
    }

    // スワイプ（タップした位置からプラスかマイナスかで左右移動を判断）
    function touchMove(e) {
        // 位置情報を取得
        var pos = Position(e);
        // 左から右へスワイプ
        if( pos.x > $slider.find('li').data('memory') ){
            if($container.is(':animated')) {
                return false;
            }
            prevSlide(slideCount);
        // 右から左へスワイプ
        }else{
            if($container.is(':animated')) {
                return false;
            }
            nextSlide(slideCount);
        }
    }

    // 現在位置を取得
    function Position(e){
        var x = Math.floor(e.originalEvent.touches[0].pageX)
        var y = Math.floor(e.originalEvent.touches[0].pageY);
        var pos = {'x' : x , 'y' : y};
        return pos;
    }

    // 自動スタート設定
    if(o.autoSlide){
        startTimer();
    }
};


/* ===================================================================

 * コンテンツの高さを揃える

=================================================================== */
$.fn.uniformHeight = function() {
    var maxHeight = 0;
    this.each(function() {
        var thisHeight = $(this).height();
        if(thisHeight > maxHeight){
            maxHeight = thisHeight;
        }
    });
    $(this).height(maxHeight);
};