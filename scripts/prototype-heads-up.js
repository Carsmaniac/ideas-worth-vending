const button = document.getElementById("dismiss-heads-up");
const overlay = document.getElementById("prototype-heads-up");

button.addEventListener("click", acknowledgeHeadsUp);

function acknowledgeHeadsUp() {
    console.log("yep");
    overlay.style.display = "none";
    document.cookie += "AcknowledgedHeadsUp=Yes;SameSite=Strict;expires=Fri, 31 Dec 9999 23:59:59 GMT"
}

if (document.cookie.includes("AcknowledgedHeadsUp")) {
    overlay.style.display = "none";
} else {
    overlay.style.display = "absolute";
}
