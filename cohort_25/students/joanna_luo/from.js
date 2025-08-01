let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isPaused = false;

function startTimer() {
  if (!timer) {
    timer = setInterval(updateTimer, 1000);
  }
  document.getElementById("startButton").disabled = true;
  document.getElementById("pauseButton").disabled = false;
}

function pauseTimer() {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(timer);
    timer = null;
    document.getElementById("pauseButton").textContent = "Resume";
  } else {
    timer = setInterval(updateTimer, 1000);
    document.getElementById("pauseButton").textContent = "Pause";
  }
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  timeLeft = 1500;
  isPaused = false;
  document.getElementById("timer").textContent = "25:00";
  document.getElementById("startButton").disabled = false;
  document.getElementById("pauseButton").disabled = true;
}

function updateTimer() {
  if (!isPaused) {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("timer").textContent = minutes + ":" + seconds;

    if (timeLeft === 0) {
      clearInterval(timer);
      timer = null;
      alert("Time's up!");
      resetTimer();
    }

    timeLeft--;
  }
}


/*sticky note*/
document.addEventListener("DOMContentLoaded", function() {
  const addButton = document.getElementById('addButton');
  const stickyNotesContainer = document.querySelector('.sticky-notes-container');
  let noteCount = 0;

  addButton.addEventListener('click', function() {
    createStickyNote();
  });

  function createStickyNote() {
    noteCount++;

    const stickyNote = document.createElement('div');
    stickyNote.classList.add('sticky-note');

    const textarea = document.createElement('textarea');
    textarea.placeholder = "Write your note here...";
    stickyNote.appendChild(textarea);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', function() {
      stickyNotesContainer.removeChild(stickyNote);
      noteCount--;
    });
    stickyNote.appendChild(deleteButton);

    stickyNotesContainer.appendChild(stickyNote);
  }
});

