const cookieAccept = document.getElementById("cookie-accept");

cookieAccept.addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("hide-cookie").style.visibility = "hidden";
});