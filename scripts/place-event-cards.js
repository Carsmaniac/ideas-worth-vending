var cards = document.getElementsByClassName("event");

for (i = 0; i < cards.length; i ++) {
    if (i % 2 == 0) {
        cards[i].style.marginLeft = "0";
    } else {
        cards[i].style.marginLeft = "2.5%";
    }
}
