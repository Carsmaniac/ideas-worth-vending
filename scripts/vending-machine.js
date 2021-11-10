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

let chosenZine = null;
let animStage = 0;
let animPosition = new p5.Vector();
let animPositionInitial = new p5.Vector();
let animScale = new p5.Vector();
let animScaleInitial = new p5.Vector();
let animMove = 0;
let animFall = 0;
let zineDropped = false;
let animPositionPopup = new p5.Vector();
let animScalePopup = new p5.Vector();

let machineHue = 0;

function preload() {
    // anarchistRadio = loadImage("https://i.imgur.com/ao7C6lT.jpeg");
    // anthropozine = loadImage("https://i.imgur.com/39Y0jFA.jpeg");
    // burnSomething = loadImage("https://i.imgur.com/V19R5AQ.jpeg");
    // f2020 = loadImage("https://i.imgur.com/Bvlsd5k.jpeg");
    // queerResistance = loadImage("https://i.imgur.com/HxWpCJW.jpeg");
    // starryCosmos = loadImage("https://i.imgur.com/edpbLiR.jpeg");

    projectFraming = loadImage("https://i.imgur.com/OrsGT45.png");
    stakeholderEngagement = loadImage("https://i.imgur.com/SNr4EMs.png");
    philosophy = loadImage("https://i.imgur.com/bW2goSB.png");
    diverseKnowledge = loadImage("https://i.imgur.com/lvFjsve.png");
    valuesEthos = loadImage("https://i.imgur.com/uJUDcxF.png");
    research = loadImage("https://i.imgur.com/E6xRdkd.png");

    openSansBold = loadFont("open-sans-bold.ttf");

    buttonPress = loadSound("sounds/button-press.mp3");
    buttonError = loadSound("sounds/button-error.mp3");
    zineDrop = loadSound("sounds/zine-drop.mp3");
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

    zines = [];
    // zines.push(new Zine(anarchistRadio, "101", 237, 154, "For an Anarchist Radio Relay League", 175, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_1f988a82398e46f48c712f0fef59bfae.pdf"));
    // zines.push(new Zine(anarchistRadio, "102", 322, 154, "For an Anarchist Radio Relay League", 175, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_1f988a82398e46f48c712f0fef59bfae.pdf"));
    // zines.push(new Zine(anarchistRadio, "103", 406, 154, "For an Anarchist Radio Relay League", 175, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_1f988a82398e46f48c712f0fef59bfae.pdf"));
    // zines.push(new Zine(anthropozine, "104", 492, 154, "Anthropozine #1", 75, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_ddafde5a87154b24b530eab3c3afa456.pdf"));
    // zines.push(new Zine(burnSomething, "201", 237, 289, "Burn Something Zine #2", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_cd8ba28e6a7d468185a31da19b40d365.pdf"));
    // zines.push(new Zine(burnSomething, "202", 322, 289, "Burn Something Zine #2", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_cd8ba28e6a7d468185a31da19b40d365.pdf"));
    // zines.push(new Zine(burnSomething, "203", 406, 289, "Burn Something Zine #2", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_cd8ba28e6a7d468185a31da19b40d365.pdf"));
    // zines.push(new Zine(anthropozine, "204", 492, 289, "Anthropozine #1", 75, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_ddafde5a87154b24b530eab3c3afa456.pdf"));
    // zines.push(new Zine(f2020, "301", 237, 424, "Fuck 2020 or the DIY Guide to Dealing with the Shit-Storming Dread of Life Right Now", 322, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_48019bb43efa4ec8ac3d158d4047694e.pdf"));
    // zines.push(new Zine(f2020, "302", 322, 424, "Fuck 2020 or the DIY Guide to Dealing with the Shit-Storming Dread of Life Right Now", 322, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_48019bb43efa4ec8ac3d158d4047694e.pdf"));
    // zines.push(new Zine(anthropozine, "303", 406, 424, "Anthropozine #1", 75, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_ddafde5a87154b24b530eab3c3afa456.pdf"));
    // zines.push(new Zine(anthropozine, "304", 492, 424, "Anthropozine #1", 75, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_ddafde5a87154b24b530eab3c3afa456.pdf"));
    // zines.push(new Zine(queerResistance, "401", 237, 559, "Los Angeles Queer Resistance", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_69d98a570b5e48c0b99cd36a0339d34d.pdf"));
    // zines.push(new Zine(queerResistance, "402", 322, 559, "Los Angeles Queer Resistance", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_69d98a570b5e48c0b99cd36a0339d34d.pdf"));
    // zines.push(new Zine(starryCosmos, "403", 406, 559, "The Odds Against a Starry Cosmos", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_e8f948a6c9844c829209876b14ddd583.pdf"));
    // zines.push(new Zine(starryCosmos, "404", 492, 559, "The Odds Against a Starry Cosmos", 125, "https://652f97d3-0da5-42f5-b04e-87f2bcf109d7.filesusr.com/ugd/8c0bf9_e8f948a6c9844c829209876b14ddd583.pdf"));

    zines.push(new Zine(projectFraming, "101", 237, 154, "Project Framing (Clancy)", 125, "https://drive.google.com/file/d/1fzJfbOHv1-6F-HaVjnueMPlEiJEh_CiX/view?usp=sharing"));
    zines.push(new Zine(projectFraming, "102", 322, 154, "Project Framing (Clancy)", 125, "https://drive.google.com/file/d/1fzJfbOHv1-6F-HaVjnueMPlEiJEh_CiX/view?usp=sharing"));
    zines.push(new Zine(projectFraming, "103", 406, 154, "Project Framing (Clancy)", 125, "https://drive.google.com/file/d/1fzJfbOHv1-6F-HaVjnueMPlEiJEh_CiX/view?usp=sharing"));
    zines.push(new Zine(stakeholderEngagement, "104", 492, 154, "Stakeholder Engagement (Georgia)", 175, "https://drive.google.com/file/d/1NiZePVNAgTr8unHavrQfkZClJFxi55SH/view?usp=sharing"));
    zines.push(new Zine(philosophy, "201", 237, 289, "Philosophy (Arlee)", 75, "https://drive.google.com/file/d/1sN3Lqii18Zo8uzZN5wnfmx_8jWrQwEf5/view?usp=sharing"));
    zines.push(new Zine(philosophy, "202", 322, 289, "Philosophy (Arlee)", 75, "https://drive.google.com/file/d/1sN3Lqii18Zo8uzZN5wnfmx_8jWrQwEf5/view?usp=sharing"));
    zines.push(new Zine(philosophy, "203", 406, 289, "Philosophy (Arlee)", 75, "https://drive.google.com/file/d/1sN3Lqii18Zo8uzZN5wnfmx_8jWrQwEf5/view?usp=sharing"));
    zines.push(new Zine(stakeholderEngagement, "204", 492, 289, "Stakeholder Engagement (Georgia)", 175, "https://drive.google.com/file/d/1NiZePVNAgTr8unHavrQfkZClJFxi55SH/view?usp=sharing"));
    zines.push(new Zine(diverseKnowledge, "301", 237, 424, "Diversity of Knowledge (Michael)", 175, "https://drive.google.com/file/d/1C5SubYqmtCm9HPbLO-fW8oIPsurOB49b/view?usp=sharing"));
    zines.push(new Zine(diverseKnowledge, "302", 322, 424, "Diversity of Knowledge (Michael)", 175, "https://drive.google.com/file/d/1C5SubYqmtCm9HPbLO-fW8oIPsurOB49b/view?usp=sharing"));
    zines.push(new Zine(diverseKnowledge, "303", 406, 424, "Diversity of Knowledge (Michael)", 175, "https://drive.google.com/file/d/1C5SubYqmtCm9HPbLO-fW8oIPsurOB49b/view?usp=sharing"));
    zines.push(new Zine(stakeholderEngagement, "304", 492, 424, "Stakeholder Engagement (Georgia)", 175, "https://drive.google.com/file/d/1NiZePVNAgTr8unHavrQfkZClJFxi55SH/view?usp=sharing"));
    zines.push(new Zine(valuesEthos, "401", 237, 559, "Values and Ethos (Annie)", 125, "https://drive.google.com/file/d/1UxPY6x7WKK3XMQ36lt9opVbSSAezl3E6/view?usp=sharing"));
    zines.push(new Zine(valuesEthos, "402", 322, 559, "Values and Ethos (Annie)", 125, "https://drive.google.com/file/d/1UxPY6x7WKK3XMQ36lt9opVbSSAezl3E6/view?usp=sharing"));
    zines.push(new Zine(research, "403", 406, 559, "Research (Jules)", 75, "https://drive.google.com/file/d/1elkmT4u4Aszdw6DCZ2WjGIKikFBs_rS5/view?usp=sharing"));
    zines.push(new Zine(research, "404", 492, 559, "Research (Jules)", 75, "https://drive.google.com/file/d/1elkmT4u4Aszdw6DCZ2WjGIKikFBs_rS5/view?usp=sharing"));
    // 1: 75, 2: 125, 3: 175, 6: 322

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

    controlPanel = [];
    controlPanel.push(new PanelButton(711, 306, 1));
    controlPanel.push(new PanelButton(791, 306, 2));
    controlPanel.push(new PanelButton(871, 306, 3));
    controlPanel.push(new PanelButton(711, 367, 4));
    controlPanel.push(new PanelButton(791, 367, 5));
    controlPanel.push(new PanelButton(871, 367, 6));
    controlPanel.push(new PanelButton(711, 428, 7));
    controlPanel.push(new PanelButton(791, 428, 8));
    controlPanel.push(new PanelButton(871, 428, 9));
    controlPanel.push(new PanelButton(791, 489, 0));

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
        textSize(40);
        rect(drawCanvasSize.x / 2 - 190 / 2 - 15 - 80, drawCanvasSize.y - 95, 190 + 30, 63, 10);
        rect(drawCanvasSize.x / 2 - 106 / 2 - 15 + 120, drawCanvasSize.y - 95, 106 + 30, 63, 10);
        fill(0);
        if (chosenItem.seeMore) {
            text("See more", drawCanvasSize.x / 2 - 80, drawCanvasSize.y - 50);
        } else {
            text("See artist", drawCanvasSize.x / 2 - 80, drawCanvasSize.y - 50);
        }
        text("Close", drawCanvasSize.x / 2 + 120, drawCanvasSize.y - 50);
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

function drawn() {
    background('rgb(240, 240, 240)');
    noStroke();

    let buttonsDisplayed = buttonsPressed.slice(0);
    for (let i = 0; i < 3 - buttonsPressed.length; i ++) {
        append(buttonsDisplayed, "-");
    }

    // Vending machine
    colorMode(HSB);
    strokeWeight(3);
    noStroke();
    fill(machineHue, 90, 70);
    rect(150, -5, 500, 760); // Body
    stroke(machineHue, 88, 25);
    rect(225, 640, 280, 75); // Collection door
    noStroke();
    fill(210, 100, 39);
    rect(185, 35, 360, 580); // Interior
    colorMode(RGB);

    // Shelves
    fill(70);
    rect(186.5, 154, 357, 15);
    rect(186.5, 289, 357, 15);
    rect(186.5, 424, 357, 15);
    rect(186.5, 559, 357, 15);

    // Big control panel
    fill(200);
    stroke(150);
    rect(683, 150, 280, 400);
    noStroke();
    fill(50, 150, 200);
    rect(711, 178, 224, 100);
    fill(25, 75, 100);
    textSize(70);
    text(buttonsDisplayed.join(" "), 823, 253);

    // Small control panel
    fill(200);
    stroke(150);
    strokeWeight(1);
    rect(560, 200, 70, 100);
    noStroke();
    strokeWeight(3);
    fill(50, 150, 200);
    rect(567, 207, 56, 25);
    fill(240);
    rect(567, 239, 16, 11);
    rect(587, 239, 16, 11);
    rect(607, 239, 16, 11);
    rect(567, 254, 16, 12);
    rect(587, 254, 16, 12);
    rect(607, 254, 16, 12);
    rect(567, 270, 16, 11);
    rect(587, 270, 16, 11);
    rect(607, 270, 16, 11);
    rect(587, 286, 16, 11);
    fill(25, 75, 100);
    textSize(18);
    text(buttonsDisplayed.join(" "), 595, 226);

    for (zine of zines) {
        zine.draw();
    }
    cursor(ARROW);
    for (panelButton of controlPanel) {
        panelButton.draw();
        if (panelButton.hovered) {
            cursor("pointer");
        }
    }

    if (animStage == 1) {
        // Zine moves forward
        if (animMove < 1.2) {
            animMove += 0.0015;
            animScale.x = animScaleInitial.x * animMove;
            animScale.y = animScaleInitial.y * animMove;
            animPosition.x = animPositionInitial.x + (animScaleInitial.x / 2) - (animScale.x / 2);
            animPosition.y = animPositionInitial.y + animScaleInitial.y - animScale.y;
        } else {
            animPositionInitial = new p5.Vector(animPosition.x, animPosition.y);
            animStage ++;
            animFall = 1;
        }
    } else if (animStage == 2) {
        // Zine falls
        animFall += (animFall + 100) * 0.05;
        animPosition.y = animPositionInitial.y + animFall - 1;
        if (animPosition.y > height && !zineDropped) {
            zineDrop.play();
            zineDropped = true;
        }
        if (animPosition.y > height + 50000) {
            animScaleInitial = new p5.Vector(animScaleInitial.x * 0.8, animScaleInitial.y * 0.8);
            animPositionInitial = new p5.Vector(364 - animScaleInitial.x / 2, 677 - animScaleInitial.y / 2)

            animScalePopup = new p5.Vector(animImage.width * 0.7, animImage.height * 0.7);
            animPositionPopup = new p5.Vector(300 - animScalePopup.x / 2, height / 2 - animScalePopup.y / 2);

            animScale = new p5.Vector(animScaleInitial.x, animScaleInitial.y);
            animPosition = new p5.Vector(animPositionInitial.x, animPositionInitial.y);

            animStage ++;
        }
    } else if (animStage == 3) {
        // Zine zooms into popup view
        animPosition.x = lerp(animPosition.x, animPositionPopup.x, 0.05);
        animPosition.y = lerp(animPosition.y, animPositionPopup.y, 0.05);
        animScale.x = lerp(animScale.x, animScalePopup.x, 0.05);
        animScale.y = lerp(animScale.y, animScalePopup.y, 0.05);

        if (animPosition.x - animPositionPopup.x < 0.7) {
            animPosition = new p5.Vector(animPositionPopup.x, animPositionPopup.y);
            animScale = new p5.Vector(animScalePopup.x, animScalePopup.y);
            animStage ++;
            interactivePopup = true;
        }
    }

    if (animStage != 0 || interactivePopup) {
        if (animStage == 3 || interactivePopup) {
            fill(150, 150, 150, map(animScale.x, animScaleInitial.x, animScalePopup.x, 0, 150, true));
            rect(0, 0, width, height);
        }
        image(animImage, animPosition.x, animPosition.y, animScale.x, animScale.y);
        if (animStage == 2) {
            colorMode(HSB);
            fill(machineHue, 90, 70);
            rect(153, 615, 496, 135);
            strokeWeight(3);
            stroke(machineHue, 88, 25);
            rect(225, 640, 280, 75);
            colorMode(RGB);
            noStroke();
        }
    }

    if (interactivePopup) {
        fill(255);
        rect(animPosition.x + animScale.x + 30, animPosition.y, width - (animPosition.x + animScale.x + 100) + 40, chosenZine.titleHeight);
        rect(animPosition.x + animScale.x + 30, animPosition.y + animScale.y - 150, width - (animPosition.x + animScale.x + 100) + 40, 60);
        rect(animPosition.x + animScale.x + 30, animPosition.y + animScale.y - 60, width - (animPosition.x + animScale.x + 100) + 40, 60);
        fill(100);
        textSize(30);
        text("Read zine", animPosition.x + animScale.x + 30 + (width - (animPosition.x + animScale.x + 100) + 40) / 2, animPosition.y + animScale.y - 150 + 39)
        text("Close", animPosition.x + animScale.x + 30 + (width - (animPosition.x + animScale.x + 100) + 40) / 2, animPosition.y + animScale.y - 60 + 39)
        fill(0);
        textSize(40);
        textWrap(WORD);
        textAlign(LEFT);
        text(chosenZine.title, animPosition.x + animScale.x + 50, animPosition.y + 50, width - (animPosition.x + animScale.x + 100));
        textAlign(CENTER);

        if (drawMousePos.x > animPosition.x + animScale.x + 30 && drawMousePos.x < animPosition.x + animScale.x + 30 + width - (animPosition.x + animScale.x + 100) + 40) {
            cursor(ARROW);
            if (drawMousePos.y > animPosition.y + animScale.y - 150 && drawMousePos.y < animPosition.y + animScale.y - 150 + 60) {
                cursor("pointer");
                fill(255, 255, 255, 150);
                rect(animPosition.x + animScale.x + 30, animPosition.y + animScale.y - 150, width - (animPosition.x + animScale.x + 100) + 40, 60);
            } else if (drawMousePos.y > animPosition.y + animScale.y - 60 && drawMousePos.y < animPosition.y + animScale.y - 60 + 60) {
                cursor("pointer");
                fill(255, 255, 255, 150);
                rect(animPosition.x + animScale.x + 30, animPosition.y + animScale.y - 60, width - (animPosition.x + animScale.x + 100) + 40, 60);
            }
        }
    }
}

function mouseClicked() {
    // if (interactiveButtons) {
    //     if (buttonsPressed.length < 3) {
    //         for (panelButton of controlPanel) {
    //             if (panelButton.hovered) {
    //                 append(buttonsPressed, panelButton.number);
    //                 buttonPress.play();
    //                 if (buttonsPressed.length == 3) {
    //                     interactiveButtons = false;
    //                     chosenZine = null;
    //                     for (zine of zines) {
    //                         if (zine.number == buttonsPressed.join("")) {
    //                             chosenZine = zine;
    //                             animImage = zine.image;
    //                             animScale = new p5.Vector(zine.width, zine.height);
    //                             animScaleInitial = new p5.Vector(animScale.x, animScale.y);
    //                             animPosition = new p5.Vector(zine.position.x - animScale.x / 2, zine.position.y - animScale.y);
    //                             animPositionInitial = new p5.Vector(animPosition.x, animPosition.y);
    //                         }
    //                     }
    //                     if (chosenZine != null) {
    //                         machineWhirr.play();
    //                         animStage = 1;
    //                         animMove = 1;
    //                         zineDropped = false;
    //                     } else if (buttonsPressed.join("") == "069" || buttonsPressed.join("") == "420") {
    //                         window.open("https://www.youtube.com/watch?v=CYqq9Ovz_9c");
    //                         interactiveButtons = true;
    //                         buttonsPressed = [];
    //                     } else {
    //                         buttonError.play();
    //                         interactiveButtons = true;
    //                         buttonsPressed = [];
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // } else if (interactivePopup) {
    //     if (drawMousePos.x > animPosition.x + animScale.x + 30 && drawMousePos.x < animPosition.x + animScale.x + 30 + width - (animPosition.x + animScale.x + 100) + 40) {
    //         if (drawMousePos.y > animPosition.y + animScale.y - 150 && drawMousePos.y < animPosition.y + animScale.y - 150 + 60) {
    //             window.open(chosenZine.link);
    //         } else if (drawMousePos.y > animPosition.y + animScale.y - 60 && drawMousePos.y < animPosition.y + animScale.y - 60 + 60) {
    //             buttonsPressed = [];
    //             interactiveButtons = true;
    //             interactivePopup = false;
    //             animStage = 0;
    //         }
    //     }
    // }

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

class Zine {
    constructor(image, number, xPos, yPos, title, titleHeight, link) {
        this.image = image;
        this.width = image.width / 10;
        this.height = image.height / 10;
        this.number = number;
        this.position = new p5.Vector(xPos, yPos);
        this.topCorner = new p5.Vector(xPos - this.width / 2, yPos - this.Height);
        this.bottomCorner = new p5.Vector(xPos + this.width / 2, yPos);
        this.title = title;
        this.titleHeight = titleHeight;
        this.link = link;
    }

    draw() {
        push();
        translate(this.position);
        fill(0, 20, 30);
        rect(-18, 0, 36, 25);
        fill(255);
        textSize(15);
        text(this.number, 0, 17);
        image(this.image, -this.width / 2, -this.height, this.width, this.height);
        pop();
    }

    drawDot() {
        fill(255, 0, 0);
        ellipse(this.position.x, this.position.y, 10);
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

class PanelButton {
    constructor(xPos, yPos, number) {
        this.position = new p5.Vector(xPos, yPos);
        this.number = number;
        this.bottomCorner = new p5.Vector(xPos + 64, yPos + 45);
        this.hovered = false;
    }

    draw() {
        this.hovered = false;
        if (drawMousePos.x > this.position.x && drawMousePos.x < this.bottomCorner.x && interactiveButtons) {
            if (drawMousePos.y > this.position.y && drawMousePos.y < this.bottomCorner.y) {
                this.hovered = true;
            }
        }

        if (this.hovered) {
            fill(248);
        } else {
            fill(240);
        }
        rect(this.position.x, this.position.y, 64, 45);
        textSize(40);
        if (this.hovered) {
            fill(150);
        } else {
            fill(100);
        }
        text(this.number, this.position.x + 32, this.position.y + 35)
    }
}
