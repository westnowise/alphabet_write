window.onload = function() {
    for (var i = 1; i <= 4; i++) {
        var savedColor = localStorage.getItem('life' + i + 'Color');
        if(savedColor) {
            document.querySelector('.life' + i).style.backgroundImage = 'url(' + savedColor + ')';
        }
    }
}


// 따라 쓰기 코드
$(document).ready(function() {
    startRangeSlider();

    document.getElementById('rebtn_reset').addEventListener('click', resetCanvas);
    document.getElementById('rebtn_submit').addEventListener('click', submitCanvas);

    function startRangeSlider() {
        var preValue1 = parseInt($("#range-slider1").val(), 10);
        var preValue2 = parseInt($("#range-slider2").val(), 10);
        var preValue3 = parseInt($("#range-slider3").val(), 10);
    
        $("#range-slider1").on('change', function() {
            var value = parseInt($(this).val(), 10);

            if (value < 100) {
                $(".sliderWrapper1 .rangeslider").css("background", "lightyellow");
            }
            if (value === 0) {
                $(".sliderWrapper1 .rangeslider, .sliderWrapper1 .rangeslider__fill").css("background", "lightyellow");
                $(".sliderWrapper1 .rangeslider").css("pointer-events", "none");
                $(".sliderWrapper1 .rangeslider__handle").hide();
                $(".sliderWrapper1 .rangeslider__fill").css("width", "auto");
                $(".sliderWrapper1 .rangeslider__fill").css("height", "auto");
                $(".sliderWrapper1 .rangeslider").css("z-index", "7");
    
                $(".sliderWrapper2 .rangeslider").css("z-index", "8");
                $(".sliderWrapper2 .rangeslider").css("pointer-events", "auto");
                $(".sliderWrapper2 .rangeslider__handle").show();

                $(".sliderWrapper2 .rangeslider__fill").css("background-image", 'url("./images/guideline_1.png")');
            }
            preValue1 = value;
        });
    
        $("#range-slider1").rangeslider({
            polyfill: false,
            onInit: function() {
                this.$range.wrap('<div class="sliderWrapper1" />');
            },
            onSlide: function(position, value) {
                var newValue = parseInt(value, 10);
    
                if (newValue <= preValue1) {
                    if (newValue >= preValue1 - 10) {
                        preValue1 = newValue;
                        this.$element.val(newValue).trigger('change');
                    } else {
                        $("#range-slider1").val(preValue1).trigger('change');
                    }
                } else {
                    $("#range-slider1").val(preValue1).trigger('change');
                }
            }
        });
    
    
    
        $("#range-slider2").on('change', function() {
            var value = parseInt($(this).val(), 10);

            if (value < 100) {
                $(".sliderWrapper2 .rangeslider").css("background", "lightyellow");
            }
            if (value === 0) {
                $(".sliderWrapper2 .rangeslider, .sliderWrapper2 .rangeslider__fill").css("background", "lightyellow");
                $(".sliderWrapper2 .rangeslider").css("pointer-events", "none");
                $(".sliderWrapper2 .rangeslider__handle").hide();
                $(".sliderWrapper2 .rangeslider__fill").css("width", "auto");
                $(".sliderWrapper2 .rangeslider__fill").css("height", "auto");
                $(".sliderWrapper2 .rangeslider").css("z-index", "7");

                $(".sliderWrapper3 .rangeslider").css("z-index", "8");
                $(".sliderWrapper3 .rangeslider").css("pointer-events", "auto");
                $(".sliderWrapper3 .rangeslider__handle").show();

                $(".sliderWrapper3 .rangeslider").css("background-image", 'url("./images/guideline_2.png")');
            }
            preValue2 = value;
        });
    
        $("#range-slider2").rangeslider({
            polyfill: false,
            onInit: function() {
                this.$range.wrap('<div class="sliderWrapper2" />');
            },
            onSlide: function(position, value) {
                var newValue = parseInt(value, 10);
                
                if (newValue <= preValue2) {
                    if (newValue >= preValue2 - 10) {
                        preValue2 = newValue;
                        this.$element.val(newValue).trigger('change');
                    } else {
                        $("#range-slider2").val(preValue2).trigger('change');
                    }
                } else {
                    $("#range-slider2").val(preValue2).trigger('change');
                }
            }
        });
    
    
        $("#range-slider3").on('change', function() {
            var value = parseInt($(this).val(), 10);

            if (value > 0) {
                $(".sliderWrapper3 .rangeslider__fill").css("background", "lightyellow");
            }
            if (value === 100) {
                $(".sliderWrapper3 .rangeslider__fill").css("background", "lightyellow");
                $(".sliderWrapper3 .rangeslider").css("background", "lightyellow");
                $(".sliderWrapper3 .rangeslider").css("pointer-events", "none");
                $(".sliderWrapper3 .rangeslider__handle").hide();
                $(".sliderWrapper3 .rangeslider").css("z-index", "6");
            }
            preValue3 = value;
        });
    
        $("#range-slider3").rangeslider({
            polyfill: false,
    
            onInit: function() {
                this.$range.wrap('<div class="sliderWrapper3" />');
            },
            onSlide: function(position, value) {
                var newValue = parseInt(value, 10);
                
                if (newValue >= preValue3) {
                    if (newValue <= preValue3 + 25) {
                        preValue3 = newValue;
                        this.$element.val(newValue).trigger('change');
                    } else {
                        $("#range-slider3").val(preValue3).trigger('change');
                    }
                } else {
                    $("#range-slider3").val(preValue3).trigger('change');
                }
            }
        });
    }

    function resetCanvas() {
        location.reload();
    }
    

    function submitCanvas() {
        // 슬라이더 핸들이 화면에 보이는지 확인
        var handle1Visible = document.querySelector('.sliderWrapper1 .rangeslider__handle').style.display !== 'none';
        var handle2Visible = document.querySelector('.sliderWrapper2 .rangeslider__handle').style.display !== 'none';
        var handle3Visible = document.querySelector('.sliderWrapper3 .rangeslider__handle').style.display !== 'none';

        if (handle1Visible || handle2Visible || handle3Visible) {
            // 핸들이 하나라도 화면에 보이면 실패 모달 표시
            var failModal = document.getElementById("failModal");
            failModal.style.display = "block";
        } else {
            // 핸들이 모두 화면에 없으면 성공 모달 표시
            var clearModal = document.getElementById("clearModal");
            clearModal.style.display = "block";
            animateLine();
        }
        setTimeout(function() {
            window.location.href = '../04_content/04_content.html';
        }, 5000); 
    }

    function animateLine() {
        document.querySelector('.life1').style.backgroundImage = 'url("./images/0ed145.png")';
        localStorage.setItem('life1Color', './images/0ed145.png');
    }
});
    
    
