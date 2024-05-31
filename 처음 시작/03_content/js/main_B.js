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
                $(".sliderWrapper1 .rangeslider").css("background", "green");
            }

            if (value === 0) {
                $(".sliderWrapper1 .rangeslider, .sliderWrapper1 .rangeslider__fill").css("background", "green");
                $(".sliderWrapper1 .rangeslider").css("pointer-events", "none");
                $(".sliderWrapper1 .rangeslider__handle").hide();
                $(".sliderWrapper1 .rangeslider__fill").css("width", "auto");
                $(".sliderWrapper1 .rangeslider__fill").css("height", "auto");
                $(".sliderWrapper1 .rangeslider").css("z-index", "6");
                
                $("#round-slider1").css("z-index", "8");
                $("#round-slider1").roundSlider("option", "readOnly", false);
                $("#round-slider1 .rs-handle").show();
                $(".rs-range-color").css("background", "green");

                $(".guideline-container1").show();
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
            handleSize: "+60",
            width: 100,
            radius: 145,
            value: 0,
            min: 0,
            max: 100,
            step: 1,
            circleShape: "half-right",
            startAngle: 225,
            lineCap: "square",
            animation: false,
            showTooltip: false,
            keyboardAction: false,
            mouseScrollAction: false,
            readOnly: true,
    
            // 이전 값으로 이동 금지
            change: function (args) {
                if (args.value < 100) {
                    $("#round-slider1").roundSlider("setValue", args.preValue);
                }
            },
            drag: function (args) {
                if (args.value >= args.preValue + 1) {
                    $("#round-slider1").roundSlider("setValue", args.value);
                    
                    
                    if (args.value <= 30) {
                        $(".guideline-container1").css("width", "280px");
                    } else if (args.value <= 40) {
                        $(".guideline-container1").css("width", "230px");
                    } else if (args.value <= 60) {
                        $(".guideline-container1").css("width", "150px");
                    } else if (args.value <= 80 ) {
                        $(".guideline-container1").hide();
                    }

                    if (args.value <= 30) {
                        $("#round-slider2").roundSlider("setValue", args.value * 2);
                    } 
                } else {
                    $("#round-slider1").roundSlider("setValue", args.preValue);
                }
            },
    
            // 현재값이 조건을 만족하면 더이상 움직이지 않음
            stop: function(args) {
                if (args.value >= 80) {
                    $(".guideline-container1").hide();

                    $("#round-slider1").roundSlider("option", "readOnly", true);
                    $("#round-slider1 .rs-handle").hide();
                    $("#round-slider1 .rs-range-color, #round-slider2 .rs-range-color").css("background-color", "green");
                    $("#round-slider1 .rs-path-color, #round-slider2 .rs-path-color").css("background-color", "green");
                    $("#round-slider1, #round-slider2").css("z-index", "6");
    
                    $(".guideline-container2").show();

                    $("#round-slider3").css("z-index", "8");
                    $("#round-slider3").roundSlider("option", "readOnly", false);
                    $("#round-slider3 .rs-handle").show();
                    $("#round-slider3 .rs-range-color, #round-slider4 .rs-range-color").css("background", "green");
                }
            }
        });
    
    
        $("#round-slider2").roundSlider({
            sliderType: "min-range",
            handleShape: "round",
            handleSize: "0",
            width: 100,
            radius: 145,
            value: 0,
            min: 0,
            max: 100,
            step: 1,
            circleShape: "pie",
            startAngle: 45,
            lineCap: "square",
            animation: false,
            showTooltip: false,
            keyboardAction: false,
            mouseScrollAction: false,
            readOnly: true,
        });
    
    
        $("#round-slider3").roundSlider({
            sliderType: "min-range",
            handleShape: "round",
            handleSize: "+60",
            width: 100,
            radius: 150,
            value: 0,
            min: 0,
            max: 100,
            step: 1,
            circleShape: "half-right",
            startAngle: 225,
            lineCap: "square",
            animation: false,
            showTooltip: false,
            keyboardAction: false,
            mouseScrollAction: false,
            readOnly: true,
    
            // 이전 값으로 이동 금지
            change: function(args) {
                if (args.value < 100) {
                    $("#round-slider3").roundSlider("setValue", args.preValue);
                }
            },
    
            drag: function (args) {
                if (args.value >= args.preValue + 1) {
                    $("#round-slider3").roundSlider("setValue", args.value);
                    
                    
                    if (args.value <= 30) {
                        $(".guideline-container2").css("width", "280px");
                    } else if (args.value <= 40) {
                        $(".guideline-container2").css("width", "230px");
                    } else if (args.value <= 60) {
                        $(".guideline-container2").css("width", "150px");
                    } else if (args.value <= 80 ) {
                        $(".guideline-container2").hide();
                    }
                    
                    if (args.value <= 30) {
                        $("#round-slider4").roundSlider("setValue", args.value * 2);
                    } 
                } else {
                    $("#round-slider3").roundSlider("setValue", args.preValue);
                }
            },
    
            // 현재값이 조건을 만족하면 더이상 움직이지 않음
            stop: function(args) {
                if (args.value >= 80) {
                    $(".guideline-container2").hide();

                    $("#round-slider3 .round-slider").roundSlider("option", "readOnly", true);
                    $("#round-slider3 .rs-handle").hide();
                    $("#round-slider3 .rs-range-color, #round-slider4 .rs-range-color").css("background-color", "green");
                    $("#round-slider3 .rs-path-color, #round-slider4 .rs-path-color").css("background-color", "green");
                }
            }
        });
    
        $("#round-slider4").roundSlider({
            sliderType: "min-range",
            handleShape: "round",
            handleSize: "0",
            width: 100,
            radius: 150,
            value: 0,
            min: 0,
            max: 100,
            step: 1,
            circleShape: "pie",
            startAngle: 45,
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
        var handle1Visible = document.querySelector('.sliderWrapper1 .rangeslider__handle').style.display !== 'none';
        var handle2Visible = document.querySelector('#round-slider1 .rs-handle').style.display !== 'none';
        var handle3Visible = document.querySelector('#round-slider3 .rs-handle').style.display !== 'none';

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
