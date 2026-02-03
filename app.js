async function loadMessages() {
  const res = await fetch("messages.json");
  const data = await res.json();

  const container = document.getElementById("messages");
  container.innerHTML = "";

  data.categories.forEach(category => {
    const heading = document.createElement("h3");
    heading.textContent = category.name;
    container.appendChild(heading);

    category.messages.forEach(msg => {
      const btn = document.createElement("button");
      btn.textContent = msg.title;
      btn.onclick = () => copyMessage(msg.text);
      container.appendChild(btn);
    });
  });
}

function copyMessage(text) {
  navigator.clipboard.writeText(text);
  alert("Message copied to clipboard!");
}

document.addEventListener("DOMContentLoaded", loadMessages);










