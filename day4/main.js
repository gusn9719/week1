import questions from './data.js';

const questionCountEl = document.getElementById('question-count');
const questionEl = document.getElementById('question');
const answerBoxesEl = document.getElementById('answer-boxes');
const resultEl = document.getElementById('result');
const nextButton = document.getElementById('next-button');

let score = 0;
let currIndex = 0;

function renderQuestion() {
    const question = questions[currIndex];
    questionEl.textContent = question.question;

    // 현재 질문 번호 / 전체 질문 개수 표시
    questionCountEl.textContent = `${currIndex + 1} / ${questions.length}`;

    // 답변 박스들 초기화
    answerBoxesEl.innerHTML = '';
    question.option.forEach((option, index) => {
        const answerBox = document.createElement('div');
        answerBox.classList.add('answer-box');
        answerBox.textContent = option;
        answerBox.dataset.value = option;

        // 박스 클릭 이벤트 추가
        answerBox.addEventListener('click', () => {
            checkAnswer(option, answerBox);
        });

        answerBoxesEl.appendChild(answerBox);
    });

    // 결과 및 다음 버튼 초기화
    resultEl.textContent = '';
    nextButton.disabled = true;
}

function checkAnswer(selectedValue, answerBox) {
    const correctAnswer = questions[currIndex].answer;

    // 정답 체크
    if (selectedValue === correctAnswer) {
        answerBox.classList.add('correct');
        resultEl.textContent = '정답입니다!';
        score++;
    } else {
        answerBox.classList.add('incorrect');
        resultEl.textContent = `틀렸습니다. 정답은 ${correctAnswer} 입니다.`;

        // 오답시 정답 박스 표시
        Array.from(answerBoxesEl.children).forEach((box) => {
            if (parseInt(box.dataset.value) === correctAnswer) {
                box.classList.add('correct');
            }
        });
    }

    // 모든 박스 클릭 비활성화
    const allBoxes = document.querySelectorAll('.answer-box');
    allBoxes.forEach((box) => {
        box.style.pointerEvents = 'none';
    });

    // 다음 버튼 활성화
    nextButton.disabled = false;
}

// 다음 버튼 클릭 시 다음 질문으로 이동하거나 퀴즈 재시작
nextButton.addEventListener('click', (e) => {
    e.preventDefault(); // 기본 동작 방지

    if (nextButton.classList.contains('restart')) {
        // 재시작 버튼 클릭 시
        resetQuiz();
    } else {
        // 다음 질문으로 이동
        currIndex++;
        if (currIndex < questions.length) {
            renderQuestion();
        } else {
            // 퀴즈가 끝났을 때
            resultEl.textContent = `퀴즈가 끝났습니다! 점수: ${score} / ${questions.length}`;
            nextButton.textContent = 'Restart';
            nextButton.classList.add('restart');
        }
    }
});

function resetQuiz() {
    // 퀴즈 초기화
    score = 0;
    currIndex = 0;
    nextButton.textContent = 'Next';
    nextButton.classList.remove('restart');
    renderQuestion();
}

// 첫 번째 질문 렌더링
renderQuestion();
