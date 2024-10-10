const bookForm = document.getElementById('book-submit');
const bookTableBody = document.getElementById('book-table-body');

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const writer = document.getElementById('writer').value;

    const newBook = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = title;

    const writerCell = document.createElement('td');
    writerCell.textContent = writer;

    // 삭제 버튼 셀 생성
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => {
        const isConfirmed = confirm(`"${title}"를 정말 삭제하시겠습니까?`);

        if (isConfirmed) {
            bookTableBody.removeChild(newBook); // 해당 행 삭제
        }
    });

    deleteCell.appendChild(deleteButton);

    // 행에 셀 추가
    newBook.appendChild(titleCell);
    newBook.appendChild(writerCell);
    newBook.appendChild(deleteCell);

    // 테이블에 새로운 행 추가
    bookTableBody.appendChild(newBook);

    // 입력 필드 초기화
    bookForm.reset();
});
