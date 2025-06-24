// Check authentication status when page loads
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('weather-app-current-user'));
    const authButtons = document.querySelector('.auth-buttons');
    
    // If user is logged in and on main page
    if (currentUser && authButtons) {
        authButtons.innerHTML = `
            <span class="welcome-msg">Welcome, ${currentUser.name}</span>
            <button id="logout-btn">Logout</button>
        `;
        
        // Add logout functionality
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('weather-app-current-user');
            window.location.reload();
        });
    }
    
    // Additional styling for welcome message
    const welcomeMsg = document.querySelector('.welcome-msg');
    if (welcomeMsg) {
        welcomeMsg.style.marginRight = '15px';
        welcomeMsg.style.fontWeight = '500';
    }
});