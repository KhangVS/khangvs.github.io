document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle i');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            darkModeToggle.classList.remove('fa-moon');
            darkModeToggle.classList.add('fa-sun');
            darkModeToggle.style.color = '#dfa700';
        } else {
            darkModeToggle.classList.remove('fa-sun');
            darkModeToggle.classList.add('fa-moon');
            darkModeToggle.style.color = '';
        }
    });
});
