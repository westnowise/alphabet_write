// 이름 파라미터 받는 코드

$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name');

    console.log("받은 이름:", userName); 
    $('.explorer .blank').text(userName);
});



document.querySelector('.stamp').addEventListener('click', function() {
    // 다음 페이지로 넘어가는 코드 작성
    window.location.href = '../06_outro/outro.html'; // 다음 페이지 URL을 정확히 입력
});