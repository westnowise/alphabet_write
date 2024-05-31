// document.querySelector('.n_click').addEventListener('click', function() {
//     const nameInput = document.querySelector('.name-input').value;
//     if (nameInput.trim() !== '') {
//         window.location.href = '05_content2.html';
//     } else {
//         alert('이름을 입력해주세요!');
//     }
// });


// 결과 화면

// 로컬 스토리지에서 숫자를 가져오는 함수
function readNumberFromFile(callback) {
    // 로컬 스토리지에서 데이터를 가져옵니다.
    var data = localStorage.getItem('number');
    
    if (data === null) {
        // 데이터가 없을 경우 기본값인 0으로 설정합니다.
        callback(null, 0);
    } else {
        // 데이터를 정수로 변환하여 콜백 호출합니다.
        callback(null, parseInt(data));
    }
}

// 로컬 스토리지에 숫자를 설정하는 함수
function setRecordNumber(number) {
    localStorage.setItem('number', number.toString());
}

// 현재 알파벳에 따라 HTML 파일 실행
function executeHTMLFileForAlphabet() {
    readNumberFromFile(function(err, recordNumber) {
        if (err) {
            console.error('숫자를 읽는 도중 오류 발생:', err);
            return;
        }

        // recordNumber를 인덱스로 사용하여 HTML 파일 실행
        var alphabetIndex = recordNumber % 26; // 알파벳은 26개이므로 나머지 연산 사용
        var lowerCaseAlphabet = String.fromCharCode(97 + alphabetIndex); // 소문자 알파벳
        var upperCaseAlphabet = String.fromCharCode(65 + alphabetIndex); // 대문자 알파벳
        console.log(alphabetIndex, lowerCaseAlphabet, upperCaseAlphabet);

        // 텍스트를 변경할 요소 선택
        var textElements = document.querySelectorAll(".text1");

        // 각 요소에 대소문자 알파벳 설정
        textElements[0].textContent = upperCaseAlphabet; // 따라쓰기 소문자
        textElements[1].textContent = lowerCaseAlphabet; // 따라쓰기 대문자
        textElements[2].textContent = upperCaseAlphabet; // 직접쓰기 소문자
        textElements[3].textContent = lowerCaseAlphabet; // 직접쓰기 대문자
    });
}







//이름 파라미터도 같이 보내기

$(document).ready(function(){
    executeHTMLFileForAlphabet();

    for (var i = 1; i <= 4; i++) {
        // 해당 요소의 저장된 색상을 가져옴
        var savedColor = localStorage.getItem('life' + i + 'Color');
        // 해당 결과 span 선택
        var resultSpan = document.querySelector('.results' + i);
    
        // 만약 저장된 색상이 노랑이면 성공 문자 출력, 아니면 실패 문자 출력
        if (savedColor === 'yellow') {
            resultSpan.textContent = '탐험 성공!';
        } else {
            resultSpan.textContent = '탐험 실패';
            resultSpan.style.color = 'red';
            
        }
    }
     
    



    $('.n_click').click(function(){
        var userName = $('#UserName').val();
        if (userName.trim() === '') { // 입력한 값이 비어 있는지 확인
            alert("이름을 입력해주세요!"); // 비어 있으면 알림 표시
        } else {
            console.log("전달된 이름:", userName); // 입력한 이름 콘솔에 출력
            window.location.href = "05_content2.html?name=" + encodeURIComponent(userName);
        }
    });
});

