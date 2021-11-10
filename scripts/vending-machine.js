let drawWidth = 0;
let drawHeight = 0;
let drawOffset = new p5.Vector();
let drawScale = 0;
let drawMousePos = new p5.Vector();
let drawCanvasSize = new p5.Vector(1000, 750);

let interactiveButtons = true;
let interactivePopup = false;
let interactiveZoom = true;

let items = [];
let keypad = [];
let chosenItem = null;
let buttonsPressed = [];
let invalidTimer = 0;

let vendStage = 0;
let vendStageDelay = 50;
let vendSizeInitial = new p5.Vector();
let vendSize = new p5.Vector();
let vendAnchorInitial = new p5.Vector();
let vendAnchor = new p5.Vector();

let zoomSizeInitial = new p5.Vector();
let zoomSize = new p5.Vector();
let zoomPositionInitial = new p5.Vector();
let zoomPosition = new p5.Vector();
let zoomPercent = 0;

let machineHue = 0;

function preload() {
    openSansBold = loadFont("open-sans-bold.ttf");

    buttonPress = loadSound("sounds/button-press.mp3");
    buttonError = loadSound("sounds/button-error.mp3");
    itemDrop = loadSound("sounds/item-drop.mp3");
    machineWhirr = loadSound("sounds/machine-whirr.mp3");
    bestGirl = loadSound("sounds/best-girl.mp3");
    bestBoy = loadSound("sounds/best-boy.mp3")

    imageAustralianGothic = loadImage("images/australian-gothic.jpg");
    imageCommie = loadImage("images/commie.jpg");
    imageGrrrls = loadImage("images/grrrls.jpg");
    imageEmojiThatDontExist = loadImage("images/emoji-that-dont-exist.jpg");
    imageItaly = loadImage("images/italy.jpg");
    imageLuckyDipFilms = loadImage("images/lucky-dip-films.jpg");
    imagePackOfPoems = loadImage("images/pack-of-poems.jpg");
    imagePostCards = loadImage("images/post-cards.jpg");
    imageQuestionsAboutGender = loadImage("images/questions-about-gender.jpg");
    imageMoonBoy = loadImage("images/moon-boy.jpg");
    imageStickerPack = loadImage("images/sticker-pack.jpg");
    imageTheScoobyDoos = loadImage("images/the-scooby-doos.jpg");

    imageMachineName = loadImage("images/machine-name.png");
    imageEmpty = loadImage("images/empty.png");
}

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);

    // Set draw sizes to the biggest drawCanvasSize-ratio rect that can fit on the screen.
    if ((height / drawCanvasSize.y) > (width / drawCanvasSize.x)) {
        drawWidth = width;
        drawHeight = width * drawCanvasSize.y / drawCanvasSize.x;
    } else {
        drawHeight = height;
        drawWidth = height * drawCanvasSize.x / drawCanvasSize.y;
    }
    drawOffset = new p5.Vector((width - drawWidth) / 2, (height - drawHeight) / 2);
    drawScale = drawWidth / drawCanvasSize.x;

    items.push(new ItemSlot("Corie Lange", "The Grrrls of the Riot", "$8", imageGrrrls, "A1", 152, 86, 41, 64, "https://www.instagram.com/c.a.lange/", false));
    items.push(new ItemSlot("Jules Rountree", "Titty Stickers", "$6", imageStickerPack, "A2", 197, 86, 41, 64, "beans", true));
    items.push(new ItemSlot("Annie Walker", "Questions About Gender", "$2", imageQuestionsAboutGender, "A3", 242, 86, 41, 64, "beans", true));
    items.push(new ItemSlot("Arlee Francis", "A Little Pack of Poems", "$6", imagePackOfPoems, "A4", 287, 56, 41, 94, "beans", true));
    items.push(new ItemSlot("Author", "Title", "Price", imageEmpty, "A5", 332, 86, 41, 64, "beans", true));
    items.push(new ItemSlot("Henry Indorato", "Australian Gothic", "$2", imageAustralianGothic, "A6", 377, 86, 41, 64, "https://www.instagram.com/localamity/", false));
    items.push(new ItemSlot("Author", "Title", "Price", imageEmpty, "A7", 422, 86, 41, 64, "beans", true));
    items.push(new ItemSlot("Jules Rountree", "Emoji That Don't Exist Yet Stickers", "$4", imageEmojiThatDontExist, "A8", 467, 86, 41, 64, "beans", true));
    items.push(new ItemSlot("Nick Brouggy", "Postcards from a Dying World", "$6", imagePostCards, "B1", 152, 189, 86, 101, "https://www.instagram.com/caffeinatedpolygon/", false));
    items.push(new ItemSlot("Bella Francis", "Photographs from Past Adventures", "$6", imageItaly, "B2", 242, 189, 86, 101, "https://www.instagram.com/", false));
    items.push(new ItemSlot("Georgia Plantzos", "Lucky Dip Films", "$6", imageLuckyDipFilms, "B3", 332, 189, 86, 101, "beans", true));
    items.push(new ItemSlot("Author", "Title", "Price", imageEmpty, "B4", 422, 189, 86, 101, "beans", true));
    items.push(new ItemSlot("Annie Walker", "Commie By Your Name", "$4", imageCommie, "C1", 152, 329, 86, 101, "beans", true));
    items.push(new ItemSlot("Chloe Kelly", "The Scooby Doos and the Scooby Doon'ts", "$6", imageTheScoobyDoos, "C2", 242, 329, 86, 101, "https://www.instagram.com/chloekellymcfadden/", false));
    items.push(new ItemSlot("Tatiana Davidson", "Moon Boy", "$4", imageMoonBoy, "C3", 332, 329, 86, 101, "https://www.instagram.com/", false));
    items.push(new ItemSlot("Author", "Title", "Price", imageEmpty, "C4", 422, 329, 86, 101, "beans", true));

    keypad.push(new KeypadButton(674, 232, "A"));
    keypad.push(new KeypadButton(748, 232, "1"));
    keypad.push(new KeypadButton(822, 232, "2"));
    keypad.push(new KeypadButton(896, 232, "3"));
    keypad.push(new KeypadButton(674, 293, "B"));
    keypad.push(new KeypadButton(748, 293, "4"));
    keypad.push(new KeypadButton(822, 293, "5"));
    keypad.push(new KeypadButton(896, 293, "6"));
    keypad.push(new KeypadButton(674, 354, "C"));
    keypad.push(new KeypadButton(748, 354, "7"));
    keypad.push(new KeypadButton(822, 354, "8"));
    keypad.push(new KeypadButton(896, 354, "9"));
    keypad.push(new KeypadButton(674, 415, "D"));
    keypad.push(new KeypadButton(748, 415, "E"));
    keypad.push(new KeypadButton(822, 415, "F"));
    keypad.push(new KeypadButton(896, 415, "10"));

    textFont(openSansBold);
    textAlign(CENTER);
}

function windowResized() {
    resizeCanvas(windowWidth - 20, windowHeight - 20);
    if ((height / 3) > (width / 4)) {
        drawWidth = width;
        drawHeight = width * 3 / 4;
    } else {
        drawHeight = height;
        drawWidth = height * 4 / 3;
    }
    drawOffset = new p5.Vector((width - drawWidth) / 2, (height - drawHeight) / 2);
    drawScale = drawWidth / 1000;
}

function draw() {
    drawMousePos.set((mouseX - drawOffset.x) / drawScale, (mouseY - drawOffset.y) / drawScale);

    background(240, 240, 240);
    noStroke();

    push();
    translate(drawOffset.x, drawOffset.y);
    scale(drawScale);

    drawMachineBackground();
    drawKeypad();

    for (item of items) {
        item.draw();
    }
    if (vendStage > 0) {
        drawVendedItem();
    }

    drawMachineForeground();
    push();
    translate(358, 80);
    scale(0.26);
    drawKeypad();
    pop();

    if (vendStage > vendStageDelay) {
        drawZoomScreen();
    }

    pop();

    if (invalidTimer > 0) {
        invalidTimer -= 1;
    } else if (invalidTimer < 0) {
        invalidTimer += 1;
    }

    machineHue += 0.1;
    if (machineHue > 360) {
        machineHue = 0;
    }
}

function drawMachineBackground() {
    // Machine base
    colorMode(HSB);
    fill(machineHue, 120, 100);
    colorMode(RGB);
    rect(87, 0, 533, 750);

    // Inside
    fill(30);
    rect(141, 75, 378, 366);

    // Shelves
    fill(50);
    rect(141, 150, 378, 15);
    rect(141, 290, 378, 15);
    rect(141, 430, 378, 15);
}

function drawMachineForeground() {
    // Edges of machine
    colorMode(HSB);
    fill(machineHue, 120, 75);
    rect(87, 0, 533, 75);
    rect(87, 0, 54, 750);
    rect(519, 0, 102, 750);
    rect(87, 445, 533, 305);

    // Collection door
    fill(machineHue, 105, 55);
    rect(146, 589, 418, 112, 5);
    colorMode(RGB);

    // IDEAS WORTH VENDING
    image(imageMachineName, 130, 15, imageMachineName.width * 0.23, imageMachineName.height * 0.23);
}

function drawKeypad() {
    // Base
    fill(175);
    rect(639, 75, 342, 433, 15);

    // Screen
    fill(83, 144, 151);
    rect(700, 130, 221, 75);

    // Screen text
    fill(25, 75, 100);
    textSize(30);
    if (buttonsPressed.length == 0) {
        if (invalidTimer > 0) {
            text("INVALID", 810, 160);
        } else if (invalidTimer < 0) {
            text("NICE", 810, 160);
        } else {
            text("INPUT", 810, 160);
        }
        text("SELECTION", 810, 193);
    } else {
        text(buttonsPressed.join(""), 810, 160);
        if (chosenItem != null) {
            text(chosenItem.price, 810, 193);
        }
    }


    cursor(ARROW);
    for (keypadButton of keypad) {
        keypadButton.mouseIsOver(drawMousePos);
        keypadButton.draw();
    }
}

function drawVendedItem() {
    if (vendStage == 1) {
        if (vendSize.x < vendSizeInitial.x * 1.25) {
            vendSize.x *= 1.0018;
            vendSize.y *= 1.0018;
        } else {
            vendStage = 2;
        }
    } else if (vendStage == 2) {
        if (vendAnchor.y < 725) {
            vendAnchor.y += (vendAnchor.y - vendAnchorInitial.y) * 0.05;
            vendAnchor.y += 3;
        } else {
            vendStage = 3;
            itemDrop.play();
        }
    } else if (vendStage > 2 && vendStage < vendStageDelay) {
        vendStage += 1;
    } else if (vendStage == vendStageDelay) {
        vendStage += 1;
        let safeZone = new p5.Vector(drawCanvasSize.x - 50, drawCanvasSize.y - 255);
        if (chosenItem.image.width / chosenItem.image.height > safeZone.x / safeZone.y) {
            zoomSize.x = min(chosenItem.image.width, safeZone.x);
            zoomSize.y = min(chosenItem.image.height, chosenItem.image.height / chosenItem.image.width * safeZone.x);
        } else {
            zoomSize.x = min(chosenItem.image.width, chosenItem.image.width / chosenItem.image.height * safeZone.y);
            zoomSize.y = min(chosenItem.image.height, safeZone.y)
        }
        zoomSizeInitial.set(vendSize.x * 0.8, vendSize.y * 0.8);
        zoomPosition.set(drawCanvasSize.x / 2 - zoomSize.x / 2, drawCanvasSize.y / 2 - zoomSize.y / 2 + 17);
        zoomPositionInitial.set(355 - vendSize.x / 2, 645 - vendSize.y / 2); // Middle of the collection door
    }

    if (vendStage < 3) {
        image(chosenItem.image, vendAnchor.x - vendSize.x / 2, vendAnchor.y - vendSize.y, vendSize.x, vendSize.y);
    }
}

function drawZoomScreen() {
    if (zoomPercent < 50) {
        zoomPercent += 0.5 + zoomPercent * 0.06;
    } else if (zoomPercent < 100) {
        zoomPercent += 0.1 + (100 - zoomPercent) * 0.06;
    } else {
        zoomPercent = 100;
        interactiveZoom = true;
    }

    background(0, 0, 0, map(zoomPercent, 0, 100, 0, 125));
    image(chosenItem.image, map(zoomPercent, 0, 100, zoomPositionInitial.x, zoomPosition.x), map(zoomPercent, 0, 100, zoomPositionInitial.y, zoomPosition.y),
                            map(zoomPercent, 0, 100, zoomSizeInitial.x, zoomSize.x), map(zoomPercent, 0, 100, zoomSizeInitial.y, zoomSize.y));
    fill(255, 255, 255, map(zoomPercent, 0, 100, 0, 255));
    textSize(40);
    let namePlateWidth = textWidth(chosenItem.title);
    textSize(25);
    namePlateWidth = max(namePlateWidth, textWidth(chosenItem.author))
    rect(drawCanvasSize.x / 2 - namePlateWidth / 2 - 15, 30, namePlateWidth + 30, 100, 10);
    fill(0, 0, 0, map(zoomPercent, 0, 100, 0, 255));
    textSize(40);
    text(chosenItem.title, drawCanvasSize.x / 2, 75);
    textSize(25);
    text(chosenItem.author, drawCanvasSize.x / 2, 115);

    if (zoomPercent == 100) {
        fill(255);
        textSize(35);
        rect(drawCanvasSize.x / 2 - 190 / 2 - 15 - 80, drawCanvasSize.y - 95, 190 + 30, 63, 10);
        rect(drawCanvasSize.x / 2 - 106 / 2 - 15 + 120, drawCanvasSize.y - 95, 106 + 30, 63, 10);
        fill(0);
        if (chosenItem.seeMore) {
            text("See more", drawCanvasSize.x / 2 - 80, drawCanvasSize.y - 51);
        } else {
            text("See artist", drawCanvasSize.x / 2 - 80, drawCanvasSize.y - 51);
        }
        text("Close", drawCanvasSize.x / 2 + 120, drawCanvasSize.y - 51);
        cursor(ARROW);
        if (drawMousePos.y > drawCanvasSize.y - 95 && drawMousePos.y < drawCanvasSize.y - 32) {
            fill(255, 255, 255, 150);
            if (drawMousePos.x > drawCanvasSize.x / 2 - 190 / 2 - 15 - 80 && drawMousePos.x < drawCanvasSize.x / 2 + 190 / 2 - 15 - 80 + 30) {
                cursor("pointer");
                rect(drawCanvasSize.x / 2 - 190 / 2 - 15 - 80, drawCanvasSize.y - 95, 190 + 30, 63, 10);
            } else if (drawMousePos.x > drawCanvasSize.x / 2 - 106 / 2 - 15 + 120 && drawMousePos.x < drawCanvasSize.x / 2 + 106 / 2 - 15 + 120 + 30) {
                cursor("pointer");
                rect(drawCanvasSize.x / 2 - 106 / 2 - 15 + 120, drawCanvasSize.y - 95, 106 + 30, 63, 10);
            }
        }
    }
}

function mouseClicked() {
    if (interactiveButtons) {
        for (keypadButton of keypad) {
            if (keypadButton.hovered) {
                append(buttonsPressed, keypadButton.value);
                buttonPress.play();
                if (buttonsPressed.length == 2) {
                    interactiveButtons = false;
                    chosenItem = null;
                    for (item of items) {
                        if (item.value == buttonsPressed.join("") && item.image != imageEmpty) {
                            chosenItem = item;
                        }
                    }
                    if (chosenItem != null) {
                        machineWhirr.play();
                        vendStage = 1;
                        vendSizeInitial.set(chosenItem.scaledSize);
                        vendSize.set(vendSizeInitial);
                        vendAnchorInitial.set(chosenItem.anchor);
                        vendAnchor.set(vendAnchorInitial);
                    } else if (buttonsPressed.join("") == "42") {
                        bestGirl.play();
                        interactiveButtons = true;
                        buttonsPressed = [];
                        invalidTimer = -100;
                    } else if (buttonsPressed.join("") == "69") {
                        bestBoy.play();
                        interactiveButtons = true;
                        buttonsPressed = [];
                        invalidTimer = -100;
                    } else {
                        buttonError.play();
                        interactiveButtons = true;
                        buttonsPressed = [];
                        invalidTimer = 60;
                    }
                }
            }
        }
    } else if (interactiveZoom) {
        if (drawMousePos.y > drawCanvasSize.y - 95 && drawMousePos.y < drawCanvasSize.y - 32) {
            if (drawMousePos.x > drawCanvasSize.x / 2 - 190 / 2 - 15 - 80 && drawMousePos.x < drawCanvasSize.x / 2 + 190 / 2 - 15 - 80 + 30) {
                // Open link
                if (chosenItem.seeMore) {
                    window.alert("This feature's not finished yet, sorry! You'll have to buy one from the physical machine instead :)");
                } else {
                    window.open(chosenItem.link);
                }
            } else if (drawMousePos.x > drawCanvasSize.x / 2 - 106 / 2 - 15 + 120 && drawMousePos.x < drawCanvasSize.x / 2 + 106 / 2 - 15 + 120 + 30) {
                // Close
                vendStage = 0;
                zoomPercent = 0;
                buttonsPressed = [];
                interactiveZoom = false;
                interactiveButtons = true;
                chosenItem = null;
            }
        }
    }
}

class ItemSlot {
    constructor(author, title, price, image, value, slotX, slotY, slotWidth, slotHeight, link, seeMore) {
        this.author = author;
        this.title = title;
        this.price = price;
        this.image = image;
        this.value = value;
        this.anchor = new p5.Vector(slotX + slotWidth / 2, slotY + slotHeight);
        this.link = link;
        this.seeMore = seeMore;

        if (this.image.width / this.image.height > slotWidth / slotHeight) {
            this.scaledSize = new p5.Vector(slotWidth, slotWidth * this.image.height / this.image.width);
        } else {
            this.scaledSize = new p5.Vector(slotHeight * this.image.width / this.image.height, slotHeight);
        }
    }

    draw() {
        image(this.image, this.anchor.x - this.scaledSize.x / 2, this.anchor.y - this.scaledSize.y, this.scaledSize.x, this.scaledSize.y)
        textSize(12);
        fill(150);
        text(this.value, this.anchor.x, this.anchor.y + 11.5);
    }
}

class KeypadButton {
    constructor(xPos, yPos, value) {
        this.size = 51;
        this.radius = 10;
        this.position = new p5.Vector(xPos, yPos);
        this.value = value;
        this.bottomCorner = new p5.Vector(xPos + this.size, yPos + this.size);
        this.hovered = false;
    }

    draw() {
        if (this.hovered && interactiveButtons) {
            fill(248);
        } else {
            fill(240);
        }
        rect(this.position.x, this.position.y, this.size, this.size, this.radius);

        textSize(40);
        if (this.hovered && interactiveButtons) {
            fill(150);
        } else {
            fill(100);
        }
        if (this.value == "C") {
            // The C of this font aligns visually with the B and D with a different offset
            text(this.value, this.position.x + 24.5, this.position.y + 39);
        } else {
            text(this.value, this.position.x + 26, this.position.y + 39);
        }
    }

    mouseIsOver(drawMousePos) {
        if (drawMousePos.x > this.position.x && drawMousePos.x < this.position.x + this.size &&
            drawMousePos.y > this.position.y && drawMousePos.y < this.position.y + this.size) {
            this.hovered = true;
            cursor("pointer");
        } else {
            this.hovered = false;
        }
    }
}
