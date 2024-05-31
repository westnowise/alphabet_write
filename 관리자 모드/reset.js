
//현재 A, B만 하니까 2이상일 경우 초기화

$(document).ready(function() {
    console.log("Document is ready");
    
    // 파일에서 숫자를 읽어오는 함수
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
    // 파일을 수정하는 함수
    function updateFileOnClient(data, callback) {
        // 수정된 데이터를 로컬 스토리지에 저장합니다.
        localStorage.setItem('number', data.toString());
        callback(null, 'success');
    }
    // 숫자를 초기화하는 함수
    function resetNumber(callback) {
        // 로컬 스토리지에서 숫자를 읽어옵니다.
        readNumberFromFile(function(err, number) {
            if (err) {
                callback(err, null);
                return;
            }
            localStorage.removeItem('number');
            callback(null, '숫자가 초기화되었습니다.');
        });
    }


    // life1Color부터 life4Color까지의 값을 초기화
    for (var i = 1; i <= 4; i++) {
        localStorage.removeItem('life' + i + 'Color');
        console.log('life' + i + 'Color'+'초기화 되었습니다!');
    }


    // 초기화 작업이 완료된 후에 버튼을 활성화합니다.
    resetNumber(function(err, message) {
        if (err) {
            console.error('숫자 초기화 중 오류 발생:', err);
            return;
        }
        console.log(message);
        
        // 초기화가 완료된 후에 버튼 클릭 이벤트 리스너를 추가합니다.
        $('.start-button').click(function() {
            console.log("Button clicked");
            window.location.href = '../connection/02_connection.html';
        });
    });

    executeHTMLFileForAlphabet();

});


// 로컬 스토리지에서 숫자를 가져오는 함수
function readNumberFromFile(callback) {
    // 로컬 스토리지에서 데이터를 가져옵니다.
    var data = localStorage.getItem('index');
    
    if (data === null) {
        // 데이터가 없을 경우 기본값인 0으로 설정합니다.
        callback(null, 0);
    } else {
        // 데이터를 정수로 변환하여 콜백 호출합니다.
        callback(null, parseInt(data));
    }
}

// 로컬 스토리지에 숫자를 설정하는 함수
function setRecordNumber(index) {
    localStorage.setItem('index', index.toString());
}
// 스위치 문을 사용하여 index 값에 따라 동작을 정의하는 함수
function performActionBasedOnIndex(index) {
    console.log('index: ', index);
    setRecordNumber(0);

}


// 현재 알파벳에 따라 HTML 파일 실행
function executeHTMLFileForAlphabet() {
     // 숫자 불러오기 및 스위치 문에 따라 동작 수행
     readNumberFromFile(function(error, num) {
        if (error) {
            console.error('Error reading number:', error);
        } else {
            console.log('Number from local storage:', num);
            performActionBasedOnIndex(num);
        }
    });
}
