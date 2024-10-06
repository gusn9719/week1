document.addEventListener('DOMContentLoaded', () => {
    const gameResult = document.querySelector('.result-view');
    const buttons = document.querySelectorAll('.game-btn');
    const countElement = document.querySelector('.game-count');
    const playerScoreElement = document.querySelector('#player-score');
    const computerScoreElement = document.querySelector('#computer-score');
    const resultMessage = document.querySelector('.result');
    const finalMessage = document.querySelector('#result-message');
    const mainGameView = document.querySelector('.player-choice');
    gameResult.classList.add('hide');

    let count = parseInt(countElement.textContent);
    let playerScore = parseInt(playerScoreElement.textContent);
    let computerScore = parseInt(computerScoreElement.textContent);

    // 선택 리스트
    const choiceList = ['rock', 'paper', 'scissors'];

    // 결과 비교 함수
    const getResult = (playerChoice, botChoice) => {
        const playerIndex = choiceList.indexOf(playerChoice); // indexOf로 플레이어 선택의 인덱스를 찾음
        const botIndex = choiceList.indexOf(botChoice); // indexOf로 컴퓨터 선택의 인덱스를 찾음

        if (playerIndex === botIndex) return 'tie'; // 무승부
        if ((playerIndex + 1) % 3 === botIndex) return 'computer'; // 컴퓨터 승리
        return 'player'; // 플레이어 승리
    };

    // 점수 및 메시지 업데이트 함수
    const updateScoreAndMessage = (result, botChoice) => {
        const resultMessages = {
            player: { message: 'Player wins!', color: 'green' },
            computer: { message: 'Computer wins!', color: 'red' },
            tie: { message: "It's a tie!", color: 'black' },
        };

        const { message, color } = resultMessages[result];
        resultMessage.style.color = color;
        resultMessage.innerHTML = `${message}
        <br> Computer chose ${botChoice}.`;

        // resultMessage.textContent = message;

        if (result === 'player') {
            playerScore++;
            playerScoreElement.textContent = playerScore;
        } else if (result === 'computer') {
            computerScore++;
            computerScoreElement.textContent = computerScore;
        }
    };

    // 게임 종료 처리 함수
    const checkGameEnd = () => {
        if (count === 0) {
            mainGameView.classList.add('hide');
            gameResult.classList.remove('hide');

            // 최종 결과 메시지 설정
            if (playerScore > computerScore) {
                finalMessage.textContent = 'You won the game!';
            } else if (playerScore < computerScore) {
                finalMessage.textContent = 'Computer won the game!';
            } else {
                finalMessage.textContent = "It's a tie!";
            }
        }
    };

    // 버튼 클릭 이벤트 처리
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const playerChoice = e.target.id;
            const botChoice = choiceList[Math.floor(Math.random() * 3)]; // 컴퓨터 랜덤 선택

            const result = getResult(playerChoice, botChoice); // 승패 결과 계산
            updateScoreAndMessage(result, botChoice); // 점수 및 메시지 업데이트

            // 남은 횟수 줄이기
            if (count > 0) {
                count--;
                countElement.textContent = count;
            }

            // 게임 종료 여부 확인
            checkGameEnd();
        });
    });

    // 초기화 버튼
    document.querySelector('#reset').addEventListener('click', () => {
        playerScore = 0;
        computerScore = 0;
        count = 10;

        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;
        countElement.textContent = count;

        resultMessage.textContent = '';
        finalMessage.textContent = '';

        gameResult.classList.add('hide');
        mainGameView.classList.remove('hide');
    });
});
