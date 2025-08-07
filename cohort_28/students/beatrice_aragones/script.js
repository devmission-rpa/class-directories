function toggleDarkMode() {
    var element = document.body;
    var modeIcon = document.getElementById("modeIcon").querySelector("i");
    var headshot = document.getElementById("beatrice-headshot");

    element.classList.toggle("dark-mode");

    if (element.classList.contains("dark-mode")) {
        modeIcon.classList.remove("fa-moon");
        modeIcon.classList.add("fa-sun");

        headshot.src = "./images/beatrice-dark-headshot.jpg";
    } else {
        modeIcon.classList.remove("fa-sun");
        modeIcon.classList.add("fa-moon");

        headshot.src = "./images/beatrice-light-headshot.jpeg";
    }
}