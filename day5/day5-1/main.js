class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class BookManager {
    constructor() {
        this.bookForm = document.getElementById('book-submit');
        this.bookTableBody = document.getElementById('book-table-body');
        this.init();
    }

    init() {
        // 폼 제출 이벤트 리스너 등록
        this.bookForm.addEventListener('submit', (e) => this.addBook(e));
    }

    addBook(event) {
        event.preventDefault();

        // 입력 값 가져오기
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;

        // 새로운 책 객체 생성
        const book = new Book(title, author);

        // 테이블에 책 추가
        this.renderBook(book);

        // 입력 필드 초기화
        this.bookForm.reset();
    }

    renderBook(book) {
        // 새로운 행 생성
        const newBookRow = document.createElement('tr');

        // 제목 셀 생성
        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;

        // 글쓴이 셀 생성
        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;

        // 삭제 버튼 셀 생성
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.addEventListener('click', () => this.deleteBook(newBookRow, book.title));
        deleteCell.appendChild(deleteButton);

        // 행에 셀 추가
        newBookRow.appendChild(titleCell);
        newBookRow.appendChild(authorCell);
        newBookRow.appendChild(deleteCell);

        // 테이블에 새로운 행 추가
        this.bookTableBody.appendChild(newBookRow);
    }

    deleteBook(bookRow, title) {
        const isConfirmed = confirm(`"${title}"를 정말 삭제하시겠습니까?`);
        if (isConfirmed) {
            this.bookTableBody.removeChild(bookRow);
        }
    }
}

new BookManager();
