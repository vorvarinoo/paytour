document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        first_name: document.getElementById('first-name').value,
        last_name: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        type: document.getElementById('type').value,
    };

    try {
        const response = await fetch('http://localhost:3000/api/profiles/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Ошибка сети');
        }

        const result = await response.json();
        console.log('Регистрация успешна:', result);
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
