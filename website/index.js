const socket = io("/");

document.querySelector("form").addEventListener("submit", (e) => {
  // Stop the form from refreshing the page
  e.preventDefault();

  const message = JSON.stringify({
    user: document.getElementById("name").value,
    text: document.getElementById("formBody").value,
  });

  socket.emit("new message from client", message);
});

socket.on("server received a message", (string) => {
  const data = JSON.parse(string);
  document.getElementById(
    "output"
  ).innerHTML += `<div class="border-2 border-gray-500 rounded p-3 my-3"><p class="font-bold">${data.user}</p><p class="font-light">${data.text}</p></div>`;
});
