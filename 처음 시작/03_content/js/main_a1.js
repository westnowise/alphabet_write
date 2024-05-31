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
    startRoundSlider();

    document.getElementById('rebtn_reset').addEventListener('click', resetCanvas);
    document.getElementById('rebtn_submit').addEventListener('click', submitCanvas);
    
    function startRangeSlider() {
        var preValue1 = parseInt($("#range-slider1").val(), 10);

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
    }

    function startRoundSlider() {
        $("#round-slider1").roundSlider({
            sliderType: "min-range",
            handleShape: "round",
            handleSize: "+40",
            width: 100,
            radius: 200,
            value: 100,
            min: 0,
            max: 100,
            step: 1,
            circleShape: "half-left",
            startAngle: 225,
            lineCap: "square",
            animation: false,
            showTooltip: false,
            keyboardAction: false,
            mouseScrollAction: false,

            // 이전 값으로 이동 금지
            change: function (args) {
                if (args.value > 0) {
                    $("#round-slider1").roundSlider("setValue", args.preValue);
                }
            },
            drag: function (args) {
                if (args.value <= args.preValue - 1) {
                    $("#round-slider1").roundSlider("setValue", args.value);
                    if (args.value >= 70) {
                        $("#round-slider2").roundSlider("setValue", args.value * 0.5);
                    } 
                } else {
                    $("#round-slider1").roundSlider("setValue", args.preValue);
                }
            },
            
            // 현재값이 조건을 만족하면 더이상 움직이지 않음
            stop: function(args) {
                if (args.value < 10) {
                    $("#round-slider1").roundSlider("option", "readOnly", true);
                    $(".rs-handle").hide();
                    $(".rs-range-color, .rs-path-color").css("background-color", "lightyellow");
                    $("#round-slider1, #round-slider2").css("z-index", "6");

                    $(".sliderWrapper1 .rangeslider").css("z-index", "8");
                    $(".sliderWrapper1 .rangeslider").css("pointer-events", "auto");
                    $(".sliderWrapper1 .rangeslider").css("background", "lightyellow");
                    $(".sliderWrapper1 .rangeslider__handle").show()
                    $(".rs-range-color").css("background-image", "none");

                    $(".rangeslider__fill").css("background-image", 'url("./images/guideline_4.png")');
                }
            }
        });


        $("#round-slider2").roundSlider({
            sliderType: "min-range",
            handleShape: "round",
            handleSize: "0",
            width: 100,
            radius: 200,
            value: 100,
            min: 0,
            max: 100,
            step: 1,
            circleShape: "pie",
            startAngle: 225,
            lineCap: "square",
            animation: false,
            showTooltip: false,
            keyboardAction: false,
            mouseScrollAction: false,
            readOnly: true,
        });
    }

    function resetCanvas() {
        location.reload();
    }
    
    function submitCanvas() {
        // 슬라이더 핸들이 화면에 보이는지 확인
        var handle1Visible = document.querySelector('.rangeslider__handle').style.display !== 'none';
        var handle2Visible = document.querySelector('.rs-handle').style.display !== 'none';
        // var handle3Visible = document.querySelector('.sliderWrapper3 .rangeslider__handle').style.display !== 'none';

        if (handle1Visible || handle2Visible) {
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
        document.querySelector('.life3').style.backgroundImage = 'url("./images/0ed145.png")';
        localStorage.setItem('life3Color', './images/0ed145.png');
    }
});


