let data = null;

document.addEventListener("DOMContentLoaded", async () => {
    await loadMessages();

    microsoftTeams.app.initialize().then(() => {
        console.log("Teams initialized.");
    });

    document.getElementById("category").addEventListener("change", loadMessagesForCategory);
    document.getElementById("message").addEventListener("change", updatePreview);

    document.getElementById("insertBtn").addEventListener("click", insertMessage);
});

async function loadMessages() {
    const res = await fetch("messages.json");
    data = await res.json();

    const categoryDropdown = document.getElementById("category");

    data.categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.name;
        categoryDropdown.appendChild(opt);
    });

    loadMessagesForCategory();
}

function loadMessagesForCategory() {
    const categoryId = document.getElementById("category").value;

    const category = data.categories.find(c => c.id === categoryId);
    const messageDropdown = document.getElementById("message");

    messageDropdown.innerHTML = "";

    category.messages.forEach(msg => {
        const opt = document.createElement("option");
        opt.value = msg.id;
        opt.textContent = msg.title;
        messageDropdown.appendChild(opt);
    });

    updatePreview();
}

function updatePreview() {
    const categoryId = document.getElementById("category").value;
    const messageId = document.getElementById("message").value;
    
    const category = data.categories.find(c => c.id === categoryId);
    const msg = category.messages.find(m => m.id === messageId);

    document.getElementById("preview").value = msg.text;
}

function insertMessage(message) {
    microsoftTeams.pages.task.submitTask(message);
    });
}

