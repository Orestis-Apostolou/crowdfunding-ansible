// Flipping the card between login and register forms
document.querySelectorAll('.flip-button').forEach(button => {
    button.addEventListener('click', () => {
        const cardFlip = document.querySelector('.card-flip');
        cardFlip.classList.toggle('flipped');
    });
});

// Handling Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if(response.ok) {
            const data = await response.json();

            // Saving the accessToken into sessionStorage
            if (data.accessToken) {
                sessionStorage.setItem('token', data.accessToken);
                sessionStorage.setItem('username', data.username);

                // Checking roles and set isAdmin at sessionStorage
                const isAdmin = data.roles.includes("ROLE_ADMIN"); // Checking if roles array contains ROLE_ADMIN
                sessionStorage.setItem('isAdmin', isAdmin);

                alert('Login successful');
                window.location.href = "../index.html"; // Redirect to homepage
            } else {
                alert('Login failed: No access token received from the server.');
            }
        }else {
            const error = await response.json();
            alert(`Login failed: ${error.message || 'Invalid creds.'}`);
        }
    } catch {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in.');
    }
});

// Handling Register Form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collecting all form data
    const username = document.getElementById('regUsername').value;
    const firstName = document.getElementById('regFirstName').value;
    const lastName = document.getElementById('regLastName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        // Sending POST request to the signup endpoint
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                username,
                firstName,
                lastName,
                email,
                password,
            }),
        });

        if(response.ok) {
            alert('Registration successful! Please log in.');

            // Flipping the card to the login
            document.querySelector('.card-flip').classList.toggle('flipped');
        }else {
            const error = await response.json();
            alert(`Registration failed: ${error.message || 'Invalid input'}`);
        }
    } catch {
        console.error('Error registering:', error);
        alert('An error occured while registering.');
    }
});

console.log(window.location.href);
