// Select the navigation menu and toggle button
const nav = document.querySelector("#nav-menu");
const toggle = document.querySelector("#nav-toggle");

// Toggle the navigation menu
if (toggle) {
    toggle.onclick = function () {
        if (nav) {
            nav.classList.toggle("show-nav"); // Add or remove the "show-nav" class
        }
    };
}

// Select all navigation links
const navLinks = document.querySelectorAll(".nav-link");

// Remove the navigation menu when a link is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (nav && nav.classList.contains("show-nav")) {
            nav.classList.remove("show-nav"); // Hide the menu
        }
    });
});

// Change the active link color
navLinks.forEach((link) => {
    link.addEventListener("click", function () {
        // Remove the "active" class from all links
        navLinks.forEach((link) => link.classList.remove("active"));
        // Add the "active" class to the clicked link
        this.classList.add("active");
    });
});


function scrollHeader(){
	const scrollHeader = document.getElementById("header");
	if(this.scrollY >=200){
		scrollHeader.classList.add('scroll-header')
	}
	else{
		scrollHeader.classList.remove('scroll-header')
	}
}
window.addEventListener('scroll',scrollHeader);