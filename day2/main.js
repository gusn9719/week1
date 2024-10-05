document.addEventListener('DOMContentLoaded', () => {
    // const buttons = document.querySelectorAll('.menu-btn');
    // const menuItems = document.querySelectorAll('.menu-item');

    // buttons.forEach((button) => {
    //     button.addEventListener('click', () => {
    //         const category = button.getAttribute('data-category'); // data-category 속성 값 가져오기
    //         buttons.forEach((btn) => {
    //             btn.classList.remove('active');
    //         });
    //         button.classList.add('active');

    //         menuItems.forEach((item) => {
    //             const itemCategory = item.getAttribute('data-category'); // 메뉴 아이템의 data-category 값

    //             // 삼항연산자 버전
    //             item.style.display = category === 'all' || itemCategory === category ? 'flex' : 'none';

    //             // if문 버전
    //             // if (category === 'all') {
    //             //     item.style.display = 'flex';
    //             // } else {
    //             //     if (itemCategory === category) {
    //             //         item.style.display = 'flex';
    //             //     } else {
    //             //         item.style.display = 'none';
    //             //     }
    //             // }
    //         });
    //     });
    // });

    // 조금 간단한 버전
    const buttons = document.querySelectorAll('.menu-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            const filteredItems = [...menuItems].filter(
                (item) => category === 'all' || item.dataset.category === category
            );

            menuItems.forEach((item) => item.classList.add('hide'));

            filteredItems.forEach((item) => item.classList.remove('hide'));

            buttons.forEach((btn) => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
});
