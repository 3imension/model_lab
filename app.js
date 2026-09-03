// ========================================================
// MOLAB - Firebase Cloud Firestore 설정 및 세션 처리
// ========================================================
const firebaseConfig = {
    apiKey: "AIzaSyDkP5efJB5qvfs1zT8YGzHNLOdYxNRna0E",
    authDomain: "model-lab-52a15.firebaseapp.com",
    projectId: "model-lab-52a15",
    storageBucket: "model-lab-52a15.firebasestorage.app",
    messagingSenderId: "821315950387",
    appId: "1:821315950387:web:40bf594e89728c35fa5046",
    measurementId: "G-XVF5XF31BD"
};

let db = null;
try {
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
    }
} catch (e) {
    console.error("Firebase 초기화 에러:", e);
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('ml_session'));
    } catch(e) {
        localStorage.removeItem('ml_session');
        return null;
    }
}

function renderHeaderNav() {
    const nav = document.getElementById('nav-buttons');
    if (!nav) return;

    const session = getCurrentUser();
    if (session && session.name) {
        let navHtml = `<span style="font-size:0.85rem; font-weight:bold; margin-right:8px;">${session.name}님</span>`;
        if (session.id === '3imension') {
            navHtml += `<a href="admin.html" class="nav-btn btn-primary">관리자 페이지</a>`;
        } else {
            navHtml += `<a href="mypage.html" class="nav-btn btn-primary">내 정보 & 좌석 예약</a>`;
        }
        navHtml += `<button onclick="logout()" class="nav-btn btn-danger" style="margin-left:8px;">로그아웃</button>`;
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHeaderNav);
} else {
    renderHeaderNav();
}