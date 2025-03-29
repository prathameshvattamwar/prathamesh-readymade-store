// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('userToken') !== null;
}

// Login user
async function loginUser(email, password) {
    try {
        const data = await window.API.User.login(email, password);
        
        // Save user data and token to localStorage
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify({
            _id: data._id,
            name: data.name,
            email: data.email,
            isAdmin: data.isAdmin
        }));
        
        return true;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

// Register user
async function registerUser(name, email, password, phone) {
    try {
        const data = await window.API.User.register({
            name,
            email,
            password,
            phone
        });
        
        // Save user data and token to localStorage
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify({
            _id: data._id,
            name: data.name,
            email: data.email,
            isAdmin: data.isAdmin
        }));
        
        return true;
    } catch (error) {
        console.error('Registration error:', error);
        return false;
    }
}

// Logout user
function logoutUser() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Get logged in user data
function getLoggedInUser() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

// Update UI based on login status
function updateAuthUI() {
    const isUserLoggedIn = isLoggedIn();
    const userData = getLoggedInUser();
    
    // Update login/account links
    const userIcon = document.querySelector('.fa-user');
    if (userIcon) {
        if (isUserLoggedIn) {
            userIcon.parentElement.innerHTML = `
                <div class="dropdown">
                    <a class="text-dark dropdown-toggle" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-user"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><span class="dropdown-item-text">Hello, ${userData.name}</span></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="profile.html">My Profile</a></li>
                        <li><a class="dropdown-item" href="orders.html">My Orders</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="logout-btn">Logout</a></li>
                    </ul>
                </div>
            `;
            
            // Add logout event listener
            document.getElementById('logout-btn').addEventListener('click', function(e) {
                e.preventDefault();
                logoutUser();
            });
        } else {
            userIcon.setAttribute('data-bs-toggle', 'modal');
            userIcon.setAttribute('data-bs-target', '#loginModal');
        }
    }
    
    // Show/hide admin links
    const adminLinks = document.querySelectorAll('.admin-link');
    adminLinks.forEach(link => {
        if (isUserLoggedIn && userData.isAdmin) {
            link.style.display = 'block';
        } else {
            link.style.display = 'none';
        }
    });
    
    // Add login/register form submission handlers
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            const loginSuccess = await loginUser(email, password);
            
            if (loginSuccess) {
                // Close modal and reload page
                const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                loginModal.hide();
                location.reload();
            } else {
                alert('Login failed. Please check your credentials.');
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const phone = document.getElementById('register-phone').value;
            
            const registerSuccess = await registerUser(name, email, password, phone);
            
            if (registerSuccess) {
                // Close modal and reload page
                const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
                registerModal.hide();
                location.reload();
            } else {
                alert('Registration failed. Please try again.');
            }
        });
    }
}

// Call updateAuthUI when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
});

// Export auth functions to window
window.Auth = {
    isLoggedIn,
    loginUser,
    registerUser,
    logoutUser,
    getLoggedInUser
};