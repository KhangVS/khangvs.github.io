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

document.getElementById("send-email").addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    let content = document.getElementById("message").value;
    if (name && email && content) {
        let data = {
            name: name,
            email: email,
            content: content,
        }
        postGoogle(data);
        alert("Email sent successfully!");
        document.getElementById("contact-form").reset();
    }
});

async function postGoogle(data) {
    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSf4ZD_-Nn90mdQeljFi17PpxFAtDM2-WDujajuiCJDcabZkxQ/formResponse";
    const PostName = "entry.1082309334";
    const PostEmail = "entry.764353114";
    const PostContent = "entry.719523195";
    const formData = new FormData();
    formData.append(PostName, data.name);
    formData.append(PostEmail, data.email);
    formData.append(PostContent, data.content);
    try {
        await fetch(formURL, {
            method: "POST",
            body: formData,
        })
    }
    catch (error) {
        console.error("Error sending form data:", error);
    }
}