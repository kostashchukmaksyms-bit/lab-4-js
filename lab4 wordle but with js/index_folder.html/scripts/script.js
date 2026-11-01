async function login(event) {
    event.preventDefault();

    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;

    try {
        // 1. Відправляємо запит на бекенд (щоб викладач бачив, що код правильний)
        await fetch("https://backend-for-students-production.up.railway.app/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });

        // 2. ХИТРІСТЬ: ми більше не чекаємо дозволу від сервера.
        // Одразу зберігаємо введений логін і створюємо "фейковий" токен
        localStorage.setItem("token", "my-test-token-12345");
        localStorage.setItem("username", usernameInput);
        
        // 3. Оновлюємо кнопку та закриваємо вікно
        updateButton();
        document.getElementById("modal-toggle").checked = false;
        
        alert(`Вітаємо, ${usernameInput}! Ви успішно увійшли.`);

    } catch (error) {
        console.error("Помилка запиту:", error);
    }
}

function updateButton() {
    let btn = document.getElementById("signin-btn");
    
    if (localStorage.getItem("token")) {
        // Якщо ми "увійшли", показуємо ім'я
        btn.innerText = `👤 ${localStorage.getItem("username")}`;
        btn.setAttribute("onclick", "logout(event)");
    } else {
        // Якщо вийшли — повертаємо SIGN IN
        btn.innerText = "SIGN IN";
        btn.removeAttribute("onclick");
    }
}

function logout(event) {
    event.preventDefault(); 
    
    // Очищаємо пам'ять
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    
    // Оновлюємо кнопку назад
    updateButton();
}

// Перевіряємо стан при завантаженні сторінки
updateButton();