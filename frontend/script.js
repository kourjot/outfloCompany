const BASE_URL = "https://outflocompany.onrender.com/compaign"; 

let editCompaignId = null; // Store the ID of the compaign being edited

document.getElementById("createForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;
  const leads = document.getElementById("leads").value.split(",");
  const accountIDs = document.getElementById("accountIDs").value.split(",");

  const method = editCompaignId ? "PUT" : "POST";
  const url = editCompaignId ? `${BASE_URL}/${editCompaignId}` : `${BASE_URL}/`;

  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, status, leads, accountIDs }),
  });

  const data = await res.json();
  alert(editCompaignId ? "Compaign Updated!" : "Compaign Created!");
  resetForm();
  fetchCompaigns();
});

async function fetchCompaigns() {
  const res = await fetch(`${BASE_URL}/`);
  const compaigns = await res.json();
  const list = document.getElementById("compaignList");
  list.innerHTML = "";

  compaigns.forEach((c) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${c.name}</strong> (${c.status})</p>
      <p>${c.description}</p>
      <button onclick="editCompaign('${c._id}', '${encodeURIComponent(c.name)}', '${encodeURIComponent(c.description)}', '${encodeURIComponent(c.status)}', '${encodeURIComponent(c.leads.join(","))}', '${encodeURIComponent(c.accountIDs.join(","))}')">Edit</button>
      <button onclick="deleteCompaign('${c._id}')">Delete</button>
    `;
    list.appendChild(div);
  });
  
}



async function editCompaign(id, name, description, status, leads, accountIDs) {
  document.getElementById("name").value = decodeURIComponent(name);
  document.getElementById("description").value = decodeURIComponent(description);
  document.getElementById("status").value = status;
  document.getElementById("leads").value = decodeURIComponent(leads);
  document.getElementById("accountIDs").value = decodeURIComponent(accountIDs);

  editCompaignId = id; // Set ID for editing
  document.getElementById("submitBtn").innerText = "Update";
  
}


async function deleteCompaign(id) {
  const confirmDelete = confirm("Are you sure you want to delete this?");
  if (!confirmDelete) return;

  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  const data = await res.json();
  alert(data.msg);
  fetchCompaigns();
}

async function resetForm() {
  document.getElementById("createForm").reset();
  editCompaignId = null; // Reset the edit ID
}

// Gemini form
document.getElementById("geminiForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("gname").value;
  const job_title = document.getElementById("gjob").value;
  const company = document.getElementById("gcompany").value;
  const location = document.getElementById("glocation").value;
  const summary = document.getElementById("gsummary").value;

  const res = await fetch(`${BASE_URL}/personalized-message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, job_title, company, location, summary }),
  });

  const data = await res.json();
  document.getElementById("geminiMessage").innerText = data.message;
});

window.onload = fetchCompaigns;
