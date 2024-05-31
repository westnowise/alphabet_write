// $(document).ready(function() {
//     console.log("Document is ready");
//     var video = document.querySelector('.background-video');
//     // 비디오의 재생 속도를 2배로 설정합니다. (기본값은 1입니다.)
//     video.playbackRate = 2;
//     $('.start-button').click(function() {
//         console.log("Button clicked");
//         window.location.href = '../connection/02_connection.html';
//     });
// });

//숫자 초기화 코드

// // 파일에서 숫자를 읽어오는 함수
// function readNumberFromFile(callback) {
//     // 로컬 스토리지에서 데이터를 가져옵니다.
//     var data = localStorage.getItem('number');
    
//     if (data === null) {
//         // 데이터가 없을 경우 기본값인 0으로 설정합니다.
//         callback(null, 0);
//     } else {
//         // 데이터를 정수로 변환하여 콜백 호출합니다.
//         callback(null, parseInt(data));
//     }
// }

// // 파일을 수정하는 함수
// function updateFileOnClient(data, callback) {
//     // 수정된 데이터를 로컬 스토리지에 저장합니다.
//     localStorage.setItem('number', data.toString());
//     callback(null, 'success');
// }

// // 숫자를 초기화하는 함수
// function resetNumber(callback) {
//     // 로컬 스토리지에서 해당 데이터를 제거합니다.
//     localStorage.removeItem('number');
//     callback(null, '숫자가 초기화되었습니다.');
// }

// // // 주요 로직: 파일에서 숫자를 읽어와 1을 증가시키고 파일을 수정하는 부분
// // readNumberFromFile(function(err, number) {
// //     if (err) {
// //         console.error('파일을 읽는 도중 오류 발생:', err);
// //         return;
// //     }

// //     // 숫자를 1 증가시킴
// //     const incrementedNumber = number + 1;
    
// //     console.log('현재 숫자:', number);
// //     console.log('1을 더한 숫자:', incrementedNumber);

// //     // 수정된 숫자를 로컬 스토리지에 저장하는 작업
// //     updateFileOnClient(incrementedNumber, function(err, response) {
// //         if (err) {
// //             console.error('파일을 수정하는 도중 오류 발생:', err);
// //             return;
// //         }
// //         console.log('파일이 성공적으로 수정되었습니다.');
// //     });
// // });

// // 숫자를 초기화합니다.
// resetNumber(function(err, message) {
//     if (err) {
//         console.error('숫자 초기화 중 오류 발생:', err);
//         return;
//     }
//     console.log(message);
// });





//현재 A, B만 하니까 2이상일 경우 초기화

$(document).ready(function() {
    console.log("Document is ready");
    var video = document.querySelector('.background-video');
    // 비디오의 재생 속도를 2배로 설정합니다. (기본값은 1입니다.)
    video.playbackRate = 2;
    

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
            
            // 숫자가 3 이상인 경우에만 초기화합니다.
            if (number >= 2) {
                // 로컬 스토리지에서 해당 데이터를 제거합니다.
                localStorage.removeItem('number');
                callback(null, '숫자가 초기화되었습니다.');
            } else {
                callback(null, '2 이상인 경우에만 초기화 가능합니다.');
            }
        });
    }
    // life1Color부터 life4Color까지의 값을 초기화
    for (var i = 1; i <= 4; i++) {
        localStorage.removeItem('life' + i + 'Color');
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
});
