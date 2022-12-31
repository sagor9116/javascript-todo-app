const darkMode = document.querySelector("#themeToggler")
const themeImg = document.querySelector(".theme-img")

darkMode.onclick = function () {
  document.body.classList.toggle("dark-theme")

  if (document.body.classList.contains("dark-theme")) {
    themeImg.src = "../images/icon-sun.svg"
  } else {
    themeImg.src = "../images/icon-moon.svg"
  }
}
