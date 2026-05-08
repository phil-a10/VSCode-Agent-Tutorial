document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const themeToggle = document.getElementById('theme-toggle');

    // --- Theme logic ---
    const THEME_KEY = 'todo-theme';
    const root = document.documentElement;

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        root.classList.remove('theme-light', 'theme-dark');
        root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
        // Update toggle icon/text
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
    }

    function setTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
        applyTheme(theme);
    }

    function initTheme() {
        let theme = localStorage.getItem(THEME_KEY);
        if (!theme) {
            theme = getSystemTheme();
        }
        applyTheme(theme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = root.classList.contains('theme-dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    initTheme();

    // --- Todo logic ---
    function createTodoItem(text) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span class="todo-text">${text}</span>
            <button class="delete-btn">Delete</button>
        `;
        const textSpan = li.querySelector('.todo-text');
        textSpan.addEventListener('click', function() {
            textSpan.classList.toggle('completed');
        });
        li.querySelector('.delete-btn').addEventListener('click', function() {
            todoList.removeChild(li);
        });
        return li;
    }

    addBtn.addEventListener('click', function() {
        const value = input.value.trim();
        if (value) {
            const todoItem = createTodoItem(value);
            todoList.appendChild(todoItem);
            input.value = '';
            input.focus();
        }
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });
});
