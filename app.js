let runningInTeams = false;

// Proper Teams detection
async function detectTeams() {
  try {
    await microsoftTeams.app.initialize();
    runningInTeams = true;
    console.log("Running inside Teams");
  } catch {
    runningInTeams = false;
    console.log("Running in browser");
  }
}

// Initialize app
async function init() {
  await detectTeams();
  await loadMessages();
}

// Load messages from JSON
async function loadMessages() {
  try {
    const res = await fetch("messages.json");
    const data = await res.json();
    renderCategories(data.categories);
  } catch (e) {
    console.error("Failed to load messages.json", e);
  }
}

// Render UI
function renderCategories(categories) {
  const container = document.getElementById("categories");
  container.innerHTML = "";

  categories.forEach(cat => {
    const h3 = document.createElement("h3");
    h3.textContent = cat.name;
    container.appendChild(h3);

    cat.items.forEach(msg => {
      const btn = document.createElement("button");
      btn.textContent = msg;
      btn.onclick = () => insertMessage(msg);
      container.appendChild(btn);
    });
  });
}

// Insert message
function insertMessage(message) {
  if (runningInTeams) {
    microsoftTeams.pages.task.submitTask(message); // ✅ Correct for v2
  } else {
    alert("Local test:\n\n" + message);
  }
}

document.addEventListener("DOMContentLoaded", init);






