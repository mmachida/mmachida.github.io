async function loadHeader() {
    const res = await fetch("components/header.html");
    const html = await res.text();
    document.getElementById("header").innerHTML = html;

    setActiveMenu();
}

function setActiveMenu() {
    const page = document.body.dataset.page;

    document.querySelectorAll(".navbar a").forEach(a => {
        a.classList.remove("active");
        if (a.dataset.page === page) {
            a.classList.add("active");
        }
    });
}

function toggleBrowseMenu() {
    document.getElementById("browseMenu").classList.toggle("open");
}

document.addEventListener("click", function(e) {
    const wrapper = document.querySelector(".browse-wrapper");
    if (wrapper && !wrapper.contains(e.target)) {
        const menu = document.getElementById("browseMenu");
        if (menu) menu.classList.remove("open");
    }
});

document.addEventListener("DOMContentLoaded", loadHeader);