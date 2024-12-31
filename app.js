
const bookmarkNameInput = document.getElementById("bookmarkName");
const bookmarkUrlInput = document.getElementById("bookmarkUrl");
const addBookmarkButton = document.getElementById("addBookmarkButton");
const bookmarkTableBody = document.getElementById("bookmarkTableBody");
const urlErrorMessage = document.getElementById("urlErrorMessage");
const rulesDialog = document.getElementById("rulesDialog");
const closeDialogButton = document.getElementById("closeDialogButton");


let bookmarks = [];


function isValidUrl(url) {
  const regex = /^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  return regex.test(url);
}


addBookmarkButton.addEventListener("click", () => {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("Both fields are required!");
    return;
  }

  if (!isValidUrl(url)) {
    urlErrorMessage.style.display = "block";
    return;
  } else {
    urlErrorMessage.style.display = "none";
  }

  
  if (bookmarks.some((bookmark) => bookmark.name === name)) {
    alert("Bookmark with this name already exists!");
    return;
  }

  
  bookmarks.push({ name, url });
  renderBookmarks();

  
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
});

 
function renderBookmarks() {
  bookmarkTableBody.innerHTML = "";
  bookmarks.forEach((bookmark, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${bookmark.name}</td>
      <td>
        <button class="visit-btn" onclick="window.open('${bookmark.url}', '_blank')">Visit</button>
      </td>
      <td>
        <button class="delete-btn" onclick="deleteBookmark(${index})">Delete</button>
      </td>
    `;

    bookmarkTableBody.appendChild(row);
  });
}


function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  renderBookmarks();
}

bookmarkUrlInput.addEventListener("focus", () => {
  rulesDialog.showModal();
});


closeDialogButton.addEventListener("click", () => {
  rulesDialog.close();
});

 

function isValidUrl(url) {
  const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}


function isValidName(name) {
  return name.length >= 3;
}


function showErrorMessage() {
  Swal.fire({
    title: "Site Name or URL is not valid",
    text: "Please follow the rules below:",
    icon: "error",
    html: `
      <ul style="text-align: left;">
        <li>Site name must contain at least 3 characters.</li>
        <li>Site URL must be a valid one starting with http:// or https://</li>
      </ul>
    `,
    confirmButtonText: "OK",
  });
}


addBookmarkButton.addEventListener("click", () => {
  const bookmarkName = bookmarkNameInput.value.trim();
  const bookmarkUrl = bookmarkUrlInput.value.trim();

  
  if (!isValidName(bookmarkName) || !isValidUrl(bookmarkUrl)) {
    showErrorMessage();
    return;
  }

  
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${bookmarkTableBody.children.length + 1}</td>
    <td>${bookmarkName}</td>
    <td><a href="${bookmarkUrl}" target="_blank" class="visit-btn">Visit</a></td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  bookmarkTableBody.appendChild(row);

  
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";

  
  row.querySelector(".delete-btn").addEventListener("click", () => {
    row.remove();
  });
});