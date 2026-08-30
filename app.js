// 초기 데모 데이터 생성 (관리자 계정 포함)
(function initStorage() {
    if (!localStorage.getItem('ml_users')) {
        const defaultUsers = [
            { id: '3imension', pw: '1234', name: '공방장(관리자)', email: 'admin@modellab.com', phone: '010-0000-0000', approved: true, classType: 'ADMIN', totalHours: 999, usedHours: 0 },
            { id: 'user01', pw: '1234', name: '홍길동', email: 'user01@test.com', phone: '010-1234-5678', approved: true, classType: 'BASIC_8', totalHours: 32, usedHours: 8 }
        ];
        localStorage.setItem('ml_users', JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem('ml_bookings')) {
        const defaultBookings = [
            { userId: 'user01', userName: '홍길동', date: '2026-09-01', time: '19:00 - 23:00 (평일 야간)', seat: 'M01', hours: 4 }
        ];
        localStorage.setItem('ml_bookings', JSON.stringify(defaultBookings));
    }
})();

// 현재 세션 유저 가져오기
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('ml_session'));
}

// 전체 유저 가져오기
function getUsers() {
    return JSON.parse(localStorage.getItem('ml_users')) || [];
}

// 전체 예약 가져오기
function getBookings() {
    return JSON.parse(localStorage.getItem('ml_bookings')) || [];
}

// 공통 헤더 로그인 상태 렌더링
function renderHeaderNav() {
    const nav = document.getElementById('nav-buttons');
    if (!nav) return;

    const session = getCurrentUser();
    if (session) {
        let navHtml = `<span style="font-size:0.85rem; font-weight:bold;">${session.name}님</span>`;
        if (session.id === '3imension') {
            navHtml += `<a href="admin.html" class="nav-btn btn-primary">관리자 페이지</a>`;
        } else {
            navHtml += `<a href="mypage.html" class="nav-btn btn-secondary">내 정보</a>`;
            if (session.approved) {
                navHtml += `<a href="reservation.html" class="nav-btn btn-primary">좌석 예약</a>`;
            }
        }
        navHtml += `<button onclick="logout()" class="nav-btn btn-danger">로그아웃</button>`;
        nav.innerHTML = navHtml;
    } else {
        nav.innerHTML = `
            <a href="login.html" class="nav-btn btn-secondary">로그인</a>
            <a href="register.html" class="nav-btn btn-primary">회원가입</a>
        `;
    }
}

function logout() {
    localStorage.removeItem('ml_session');
    alert('로그아웃 되었습니다.');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', renderHeaderNav);