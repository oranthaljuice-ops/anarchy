function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user === 'admin' && pass === 'adminpass') {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('error').innerText = 'Invalid credentials';
    }
}
function logout() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}
if (window.location.pathname.endsWith('dashboard.html')) {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'index.html';
    } else {
        fetch('transcripts/')
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const links = [...doc.querySelectorAll('a')]
                    .map(a => a.href)
                    .filter(href => href.endsWith('.html'));
                const list = document.getElementById('transcript-list');
                links.forEach(link => {
                    const fileName = link.split('/').pop();
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="transcripts/${fileName}" target="_blank">${fileName}</a>`;
                    list.appendChild(li);
                });
            });
    }
}
