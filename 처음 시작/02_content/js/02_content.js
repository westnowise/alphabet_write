// 배열 저장
function saveArray(array) {
    localStorage.setItem('array', JSON.stringify(array));
}

// 배열 불러오기
function loadArray() {
    var storedArray = localStorage.getItem('array');
    if (storedArray) {
        return JSON.parse(storedArray);
    }
    return [];
}


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
        var alphabet = String.fromCharCode(65 + alphabetIndex); // ASCII 코드를 문자로 변환
        var alphabet_arr = [alphabet, alphabet.toLowerCase()];
        saveArray(alphabet_arr);
        var loadedalphabet = loadArray();
        console.log(alphabetIndex, alphabet);
        console.log(loadedalphabet);

        // 텍스트를 변경할 요소 선택
        var textElement = document.querySelector(".letter");
        if (recordNumber < 10){
            // 새로운 텍스트 설정
            textElement.textContent = "0"+(recordNumber+1)+". " + alphabet +", " + alphabet.toLowerCase();
        }
        else{
            // 새로운 텍스트 설정
            textElement.textContent = (recordNumber+1)+". " + alphabet +", " + alphabet.toLowerCase();
        }
    });
}

// 페이지 로드 시 자동 실행
$(document).ready(function() {
    // 로컬 스토리지에서 숫자를 읽어와 해당하는 알파벳에 따라 HTML 파일 실행
    executeHTMLFileForAlphabet();
});

// Redirect to a new page after 3 seconds
setTimeout(function() {
    window.location.href = '../03_content/03_content.html'; // Replace 'next_page.html' with your desired URL
}, 3000); // 3000 milliseconds = 3 seconds

