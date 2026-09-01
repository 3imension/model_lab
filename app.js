// ⚠️ 아래 firebaseConfig에 본인의 실제 Firebase 키 정보를 넣으세요!
const firebaseConfig = {
  apiKey: "AIzaSyDkP5efJB5qvfs1zT8YGzHNLOdYxNRna0E",
  authDomain: "model-lab-52a15.firebaseapp.com",
  projectId: "model-lab-52a15",
  storageBucket: "model-lab-52a15.firebasestorage.app",
  messagingSenderId: "821315950387",
  appId: "1:821315950387:web:40bf594e89728c35fa5046",
  measurementId: "G-XVF5XF31BD"
};

// Firebase SDK 초기화
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('ml_session'));
}

function renderHeaderNav() {
    const nav = document.getElementById('nav-buttons');
    if (!nav) return;

    const session = getCurrentUser();
    if (session) {
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
