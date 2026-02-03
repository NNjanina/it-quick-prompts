let allCategories = [];

async function loadMessages() {
  const res = await fetch("messages.json");
  const data = await res.json();
  allCategories = data.categories;
  render(allCategories);
}

function render(categories) {
  const container = document.getElementById("messages");
  container.innerHTML = "";

  categories.forEach(category => {
    const section = document.createElement("div");
    section.className = "category";

    const header = document.createElement("div");
    header.className = "category-header";
    header.textContent = category.name;
    header.onclick = () => {
      body.classList.toggle("hidden");
    };

    const body = document.createElement("div");
    body.className = "category-body";

    category.messages.forEach(msg => {
      const btn = document.createElement("button");
      btn.textContent = msg.title;
      btn.onclick = () => copyMessage(msg.text);
      body.appendChild(btn);
    });

    section.appendChild(header);
    section.appendChild(body);
    container.appendChild(section);
  });
}

function copyMessage(text) {
  navigator.clipboard.writeText(text);
  showToast("Message copied to clipboard");
}

function showToast(text) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}

document.getElementById("search").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();

  const filtered = allCategories
    .map(cat => ({
      ...cat,
      messages: cat.messages.filter(m =>
        m.title.toLowerCase().includes(term) ||
        m.text.toLowerCase().includes(term)
      )
    }))
    .filter(cat => cat.messages.length > 0);

  render(filtered);
});

document.addEventListener("DOMContentLoaded", loadMessages);











