window.onload = function() {
    for (var i = 1; i <= 4; i++) {
        var savedColor = localStorage.getItem('life' + i + 'Color');
        if(savedColor) {
            document.querySelector('.life' + i).style.backgroundImage = 'url(' + savedColor + ')';
        }
    }
}


// 직접 쓰기 코드
document.addEventListener('DOMContentLoaded', () => {
    const canvas1 = document.getElementById('draw_canvas1');
    const canvas2 = document.getElementById('draw_canvas2');
    const canvas3 = document.getElementById('draw_canvas3');
    const canvas4 = document.getElementById('draw_canvas4');
    const canvases = [canvas1, canvas2, canvas3, canvas4];

    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    const ctx3 = canvas3.getContext('2d');
    const ctx4 = canvas4.getContext('2d');
    const contexts = [ctx1, ctx2, ctx3, ctx4];


    // 초기화
    let currentCanvasIndex = 0; // 현재 작업 중인 캔버스 인덱스
    let isDrawing = false;
    let x = 0;
    let y = 0;
    let strokeCount = 0;  // 획의 시작점, 끝점 및 해당 획의 벡터값을 저장할 리스트 초기화
    let alphabet = "b_lower";

    // Set line width, join to round, cap to round
    contexts.forEach(ctx => {
        ctx.lineWidth = 20;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
    });


    // 라디오 버튼에 대한 아이콘 색상 매핑
    const colorMap = {
        "1": "black",
        "2": "red",
        "3": "blue",
        "4": "green",
        "5": "orange",
    };


    const radioButtons = document.querySelectorAll('.wttools input[type="radio"]');
    
    radioButtons.forEach(button => {
        button.addEventListener('change', function() {
            if (this.checked) {
                const optionValue = this.value;

                contexts.forEach(ctx => {
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.strokeStyle = colorMap[optionValue]; // 선의 색상 설정
                });
            }
        });
    });

    canvases.forEach(addCanvasEventListeners);

    document.getElementById('rebtn_reset').addEventListener('click', resetCanvas);
    document.getElementById('rebtn_submit').addEventListener('click', submitCanvas);


    function addCanvasEventListeners(canvas) {
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing, { passive: true });
        canvas.addEventListener('touchmove', draw, { passive: true });
        canvas.addEventListener('touchend', stopDrawing, { passive: true });
        canvas.addEventListener('touchcancel', stopDrawing, { passive: true });
    }

    function disableDrawingOnCurrentCanvas() {
        const currentCanvas = getCurrentCanvas();
        currentCanvas.removeEventListener('mousedown', startDrawing);
        currentCanvas.removeEventListener('mousemove', draw);
        currentCanvas.removeEventListener('mouseup', stopDrawing);

        currentCanvas.removeEventListener('touchstart', startDrawing, { passive: true });
        currentCanvas.removeEventListener('touchmove', draw, { passive: true });
        currentCanvas.removeEventListener('touchend', stopDrawing, { passive: true });
        currentCanvas.removeEventListener('touchcancel', stopDrawing, { passive: true });
    }

    function startDrawing(event) {
        // passive 옵션 사용하지 않음
        isDrawing = true;
        
        strokeCount++;
    
        const currentCtx = getCurrentContext();
        currentCtx.beginPath();
        
        let rect = getCurrentCanvas().getBoundingClientRect();
        let scaleX = getCurrentCanvas().width / rect.width;
        let scaleY = getCurrentCanvas().height / rect.height;
    
        if (event.touches) {
            x = (event.touches[0].clientX - rect.left) * scaleX;
            y = (event.touches[0].clientY - rect.top) * scaleY;
        } else {
            x = (event.clientX - rect.left) * scaleX;
            y = (event.clientY - rect.top) * scaleY;
        }
    
        currentCtx.moveTo(x, y);
    }
    
    function draw(event) {
        // passive 옵션 사용하지 않음
        if (!isDrawing) return;
    
        const currentCtx = getCurrentContext();
        let rect = getCurrentCanvas().getBoundingClientRect();
        let scaleX = getCurrentCanvas().width / rect.width;
        let scaleY = getCurrentCanvas().height / rect.height;
        
        if (event.touches) {
            x = (event.touches[0].clientX - rect.left) * scaleX;
            y = (event.touches[0].clientY - rect.top) * scaleY;
        } else {
            x = (event.clientX - rect.left) * scaleX;
            y = (event.clientY - rect.top) * scaleY;
        }
        
        currentCtx.lineTo(x, y);
        currentCtx.stroke();
    }
    
    
    function stopDrawing() {
        isDrawing = false;

        const currentCtx = getCurrentContext();
        currentCtx.closePath();

        disableDrawingOnCurrentCanvas();
        moveNextCanvas();
    }

    function getCurrentCanvas() {
        return canvases[currentCanvasIndex];
    }

    function getCurrentContext() {
        return contexts[currentCanvasIndex];
    }

    function moveNextCanvas() {
        if (currentCanvasIndex < canvases.length - 1) {
            canvases[currentCanvasIndex].style.zIndex = '9'; // 현재 캔버스 숨기기
            currentCanvasIndex++;
            canvases[currentCanvasIndex].style.zIndex = '10'; // 다음 캔버스 표시
        }
    }
    
    function isCanvasDrawn(canvas) {
        const context = canvas.getContext('2d');
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] !== 0) { // Alpha 값이 0이 아닌 경우 그림이 그려진 것으로 간주
                return true;
            }
        }
        return false; // 그림이 그려지지 않은 캔버스인 경우
    }
    
    function submitCanvas() {
        const canvasWidth = 500;
        const canvasHeight = 500;

        // 각 캔버스의 내용을 이미지 파일로 저장 (사용된 캔버스만 저장)
        for (let i = 0; i < canvases.length; i++) {
            const canvas = canvases[i];

            if (isCanvasDrawn(canvas)) {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvasWidth;
                tempCanvas.height = canvasHeight;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);

                const imageName = `stroke_${alphabet}_${i + 1}.png`; // 파일명 설정
                const dataURL = tempCanvas.toDataURL("image/png"); // 캔버스를 이미지로 변환
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = imageName;
                link.click();
            }
        }

        // 각 캔버스를 레이어처럼 겹쳐서 하나의 이미지로 저장
        const tempMergedCanvas = document.createElement('canvas');
        tempMergedCanvas.width = canvasWidth; // 겹치는 이미지의 너비
        tempMergedCanvas.height = canvasHeight; // 겹치는 이미지의 높이

        const tempMergedCtx = tempMergedCanvas.getContext('2d');

        // 각 캔버스를 지정된 크기로 변환하여 레이어처럼 겹치기
        for (let i = 0; i < canvases.length; i++) {
            const canvas = canvases[i];
            if (isCanvasDrawn(canvas)) {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvasWidth;
                tempCanvas.height = canvasHeight;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);
                tempMergedCtx.drawImage(tempCanvas, 0, 0); // 캔버스를 겹치는 이미지에 그리기
            }
        }

        // 파일명 설정
        const mergedImageName = `stroke_${alphabet}.png`;

        // 겹치는 이미지 저장
        const tempMergedDataURL = tempMergedCanvas.toDataURL("image/png");
        const tempMergedLink = document.createElement('a');
        tempMergedLink.href = tempMergedDataURL;
        tempMergedLink.download = mergedImageName;
        tempMergedLink.click();


        var modal = document.getElementById("myModal");

        document.querySelector('.life4').style.backgroundImage = 'url("./images/0ed145.png")';
        localStorage.setItem('life4Color', './images/0ed145.png');
        
        modal.style.display = "block";
            
        setTimeout(function() {
            window.location.href = '../03_content/03_content.html';
        }, 5000);
    }
    
    function resetCanvas() {
        // 캔버스 지우기
        contexts.forEach(ctx => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        });
    
        // 현재 상태 초기화
        currentCanvasIndex = 0;
        isDrawing = false;
        x = 0;
        y = 0;
        strokeCount = 0;
    
        // 각 캔버스의 zIndex 초기화
        canvases.forEach((canvas, index) => {
            canvas.style.zIndex = index === 0 ? '10' : '9';
        });

        canvases.forEach(addCanvasEventListeners);
    }
});




