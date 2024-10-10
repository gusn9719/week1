const searchName = document.getElementById('search-input');

function getUserInfo(username) {
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data); // 사용자 정보 출력
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

getUserInfo('gusn9719');
