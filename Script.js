const createNewBtn = document.querySelector(".create-new");
const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const saveBtn = document.querySelector(".save-note");
const deleteBtn = document.querySelector(".delete-note");
const notesList = document.querySelector(".notes-list");

createNewBtn.addEventListener("click", function () {
  titleInput.value = "";
  contentInput.value = "";
});

saveBtn.addEventListener("click", function () {
  const title = titleInput.value;
  const content = contentInput.value;
  if (title === "" || content === "") {
    alert("Bitte Überschrift als auch Inhalt ausfüllen");
    return;
  }

  const timestamp = new Date().toLocaleString("de-DE");

  const noteData = {
    content: content,
    timestamp: timestamp,
  };

  localStorage.setItem(title, JSON.stringify(noteData));

  loadNotes();
});

loadNotes();

function loadNotes() {
  notesList.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const title = localStorage.key(i);
    const noteData = JSON.parse(localStorage.getItem(title));

    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");
    noteItem.textContent = title + " - " + noteData.timestamp;
    noteItem.addEventListener("click", function () {
      titleInput.value = title;
      contentInput.value = noteData.content;
    });

    notesList.appendChild(noteItem);
  }
}

deleteBtn.addEventListener("click", function () {
  const title = titleInput.value;
  localStorage.removeItem(title);

  titleInput.value = "";
  contentInput.value = "";

  loadNotes();
});
