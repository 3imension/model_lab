// 3imension님의 Firebase 발급 키
const firebaseConfig = {
    apiKey: "AIzaSyDkP5efJB5qvfs1zT8YGzHNLOdYxNRna0E",
    authDomain: "model-lab-52a15.firebaseapp.com",
    projectId: "model-lab-52a15",
    storageBucket: "model-lab-52a15.firebasestorage.app",
    messagingSenderId: "821315950387",
    appId: "1:821315950387:web:40bf594e89728c35fa5046",
    measurementId: "G-XVF5XF31BD"
};

// Firebase 초기화 예외 처리
let db = null;
try {
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
    }
} catch (e) {
    console.error("Firebase Initialize Error:", e);
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('ml_session'));
    } catch(e) {
        localStorage.removeItem('ml_session');
        return null;
    }
}

// 상단 네비게이션 버튼을 무조건 즉시 생성하도록 보장하는 함수
function renderHeaderNav() {
    const nav = document.getElementById('nav-buttons');
    if (!nav) return;

    const session = getCurrentUser();
    if (session && session.name) {
        let navHtml = `<span style="font-size:0.85rem; font-weight:bold; margin-right:8px;">${session.name}님</span>`;
        if (session.id === '3imension') {
            navHtml += `<a href="admin.html" class="nav-btn btn-primary">관리자 페이지</a>`;
        } else {
            navHtml += `<a href="mypage.html" class="nav-btn btn-secondary">내 정보</a>`;
            if (session.approved) {
                navHtml += `<a href="reservation.html" class="nav-btn btn-primary">좌석 예약</a>`;
            }
        }
        navHtml += `<button onclick="logout()" class="nav-btn btn-danger" style="margin-left:8px;">로그아웃</button>`;
        nav.innerHTML = navHtml;
    } else {
        // 로그인 안 된 상태 (기본 로그인 / 회원가입 버튼)
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

// DOM이 준비되는 즉시 헤더부터 강제로 출력
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHeaderNav);
} else {
    renderHeaderNav();
}