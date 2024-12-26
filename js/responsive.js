let mymenu = document.getElementById("menu");
let mysidebar = document.getElementById("sidebar");
let mycontent = document.getElementById("content");
let mymenuout = document.getElementById("menuout");
mymenu.onclick = function () {
  mysidebar.style.display = "flex";
  mycontent.style.opacity = "0.2"
};

mymenuout.onclick = function () {
  mysidebar.style.display = "none";
  mycontent.style.opacity = "1";
};
