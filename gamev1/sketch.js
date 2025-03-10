//Package Delivery Sim 2D LT Made with P5.JS & P5.PLAY.JS
//Stable Release V1.17.6

p5.disableFriendlyErrors = true;

var delvan, testimage, delvanbo, delvanta;
var backgroundHousesR1, backgroundHousesL1, backgroundHousesR2, backgroundHousesL2, backgroundHousesR4,
    backgroundHousesL3, backgroundHousesR3, backgroundHousesL4, backgroundHousesL5, backgroundHousesR5;
var mHouse1, mHouse2, mHouse3, mHouse4, mHouse5;
var treeG1, treeG2, treeG3, treeG4;

var dashboard, nav;
var road;
var upar, rightar, uparimage, rightarimage;
var ipath, ipathLT, ipathLL, ipathLB, ipathBlock;
var laneM, laneMGroup;
var PTraffic, OTraffic, TrafficGroup, OTrafficGroup;
var RoadworkGroup, roadworksL, roadworksL2, roadworksR, roadworksR2, roadworksR3, roadworksLB1Image, roadworksLB2Image, 
    roadworksRB1Image, roadworksRB2Image;

let fr = 40;
let DTtimer = 0;
let oppotimer = 0;
let timer = 40;
let timertaken = 0;
let packages = 5;
let packagedeli = 0;

var mHouse1PA, mHouse2PA, mHouse3PA, mHouse4PA, mHouse5PA;
var PA500x, PA400x; 

var htmlps;

var iPaths = [];
var allLanes = [];
var allRoadworks = [];
var TrafficAr = [];
var HousePA = [];
var mHouseBounds = [];
var spawntraf = true;
var spawnrw = true;

var Start = 0;
var Play = 1;
var End = 2;
var Due = 3;
var Win = 4;
var angrymode = 5;
var SS = 6;
var gameState = Start;

function preload() {
    testimage = loadImage("images/delvan/delivvan-yelloww.png");
    turnru = loadImage("images/delvan/delivvan-R.png");
    turnlu = loadImage("images/delvan/delivvan-L.png");

    backgroundHousesR1 = loadImage("images/houses/housesR.jpg");
    backgroundHousesR2 = loadImage("images/houses/housesR2.jpg")
    backgroundHousesR3 = loadImage("images/houses/housesR.jpg");
    backgroundHousesR4 = loadImage("images/houses/housesR2.jpg");
    backgroundHousesR5 = loadImage("images/houses/housesR.jpg");

    backgroundHousesL1 = loadImage("images/houses/housesL.jpg");
    backgroundHousesL2 = loadImage("images/houses/housesL2.jpg");
    backgroundHousesL3 = loadImage("images/houses/housesL.jpg");
    backgroundHousesL4 = loadImage("images/houses/housesL.jpg");
    backgroundHousesL5 = loadImage("images/houses/housesL2.jpg");

    mHouse1 = loadImage("images/houses/houseb.jpg");
    mHouse2 = loadImage("images/houses/houseg.jpg");
    mHouse3 = loadImage("images/houses/housey.jpg");
    mHouse4 = loadImage("images/houses/housep.jpg");
    mHouse5 = loadImage("images/houses/houser.jpg");

    treeG1 = loadImage("images/trees/treeG1.png");
    treeG2 = loadImage("images/trees/treeG2.png");
    treeG3 = loadImage("images/trees/treeG1.png");
    treeG4 = loadImage("images/trees/treeG2.png");

    roadworksLB1Image = loadImage("images/roadworks/roadworka.bmp");
    roadworksLB2Image = loadImage("images/roadworks/roadworkc.bmp");
    roadworksRB1Image = loadImage("images/roadworks/roadworkb.bmp");
    roadworksRB2Image = loadImage("images/roadworks/roadworkd.bmp");

    PA400x = loadImage("images/delivbounds/delivb-400 - .png");
    PA500x = loadImage("images/delivbounds/delivb-500-.png");

    uparimage = loadImage("images/directions/upar.bmp");
    rightarimage = loadImage("images/directions/rightar.bmp");

}

function setup() {
    createCanvas(1360, 630);

    console.log("%cPackage Delivery Sim 2D LT - Dev Console","color: lightgreen; font-family: Trebuchet MS; font-size: 25px");
    console.log("%cPaste codes here. Click below the empty area to type, SHIFT + ENTER to leave a line. Right click to clear console.", "color : lightblue");
    console.log("Click on Settings > Preferences > Toggle dark mode to turn on dark mode.")

    frameRate(fr);

    road = createSprite(400, height/2-20000, 500, 41000);
    road.shapeColor = rgb(70, 70, 70);

    laneR1 = createSprite(640, 3400, 5, 15000);
    laneR1.shapeColor = rgb(255, 255, 255);
    allLanes.push(laneR1);

    laneR2 = createSprite(640, -9000, 5, 9000);
    laneR2.shapeColor = rgb(255, 255, 255);
    allLanes.push(laneR2);

    laneR3 = createSprite(640, -18300, 5, 9000);
    laneR3.shapeColor = rgb(255, 255, 255);
    allLanes.push(laneR3);

    laneL1 = createSprite(160, -7380, 5, 13980);
    laneL1.shapeColor = rgb(255, 255, 255);
    allLanes.push(laneL1);

    laneL2 = createSprite(160, -19050, 5, 9000);
    laneL2.shapeColor = rgb(255, 255, 255);
    allLanes.push(laneL2);

    laneR4 = createSprite(640, -25600, 5, 5000);
    laneR4.shapeColor = rgb(255, 255, 255);
    allLanes.push(laneR4);

    laneL3 = createSprite(160, -25600, 5, 5000);
    laneL3.shapeColor = rgb(255, 255, 255);
    allLanes.push(laneL3);

    laneR5 = createSprite(640, -30500, 5, 5000);
    laneR5.visible = false;
    allLanes.push(laneR5);

    laneL4 = createSprite(160, -30500, 5, 5000);
    laneL4.visible = false;
    allLanes.push(laneL4);

    laneE = createSprite(width / 2, -32200, 5000, 5);
    laneE.visible = false;
    allLanes.push(laneE);

    ipath = createSprite(75, -100, 150, 600);
    ipath.shapeColor = rgb(70, 70, 70);

    ipathLT = createSprite(60, -390, 200, 5);
    ipathLT.shapeColor = rgb(255, 255, 255);
    iPaths.push(ipathLT);

    ipathLL = createSprite(0, -100, 5, 575);
    ipathLL.shapeColor = rgb(255, 255, 255);
    iPaths.push(ipathLL);

    ipathLB = createSprite(60, 190, 200, 5);
    ipathLB.shapeColor = rgb(255, 255, 255);
    iPaths.push(ipathLB);

    ipathLB2 = createSprite(width / 2, 190, 1200, 5);
    ipathLB2.visible = false;
    iPaths.push(ipathLB2);

    ipathBlock = createSprite(width / 2, height / 2, 1350, 200);
    ipathBlock.visible = false;
    iPaths.push(ipathBlock);

    iPathmHouse1BB = createSprite(width / 2 + 60, -4095, 200, 5);
    iPathmHouse1BB.visible = false;
    iPaths.push(iPathmHouse1BB);
    iPathmHouse1BT = createSprite(width / 2 + 60, -4485, 200, 5);
    iPathmHouse1BT.visible = false;
    iPaths.push(iPathmHouse1BT);
    iPathmHouse1BR = createSprite(width / 2 + 30, -4300, 5, 500);
    iPathmHouse1BR.visible = false;
    iPaths.push(iPathmHouse1BR);

    iPathmHouse2BB = createSprite(50, -14335, 200, 5);
    iPathmHouse2BB.visible = false;
    iPaths.push(iPathmHouse2BB);
    iPathmHouse2BT = createSprite(50, -14570, 200, 5);
    iPathmHouse2BT.visible = false;
    iPaths.push(iPathmHouse2BT);
    iPathmHouse2BR = createSprite(100, -14450, 5, 500);
    iPathmHouse2BR.visible = false;
    iPaths.push(iPathmHouse2BR);

    iPathmHouse3BB = createSprite(width / 2 + 60, -13480, 200, 5);
    iPathmHouse3BB.visible = false;
    iPaths.push(iPathmHouse3BB);
    iPathmHouse3BT = createSprite(width / 2 + 60, -13790, 200, 5);
    iPathmHouse3BT.visible = false;
    iPaths.push(iPathmHouse3BT);
    iPathmHouse3BR = createSprite(width / 2 + 30, -13600, 5, 500);
    iPathmHouse3BR.visible = false;
    iPaths.push(iPathmHouse3BR);

    iPathmHouse4BB = createSprite(width / 2 + 60, -22800, 200, 5);
    iPathmHouse4BB.visible = false;
    iPaths.push(iPathmHouse4BB);
    iPathmHouse4BT = createSprite(width / 2 + 60, -23100, 200, 5);
    iPathmHouse4BT.visible = false;
    iPaths.push(iPathmHouse4BT);
    iPathmHouse4BR = createSprite(width / 2 + 30, -23000, 5, 500);
    iPathmHouse4BR.visible = false;
    iPaths.push(iPathmHouse4BR);

    iPathmHouse5BB = createSprite(50, -31685, 200, 5);
    iPathmHouse5BB.visible = false;
    iPaths.push(iPathmHouse5BB);
    iPathmHouse5BB = createSprite(50, -32000, 200, 5);
    iPathmHouse5BB.visible = false;
    iPaths.push(iPathmHouse5BB);

    laneMGroup = new Group();
    for (var i = -32500; i < 32500; i = i + 600) {
        var laneM = createSprite(400, i, 10, 250);
        laneM.shapeColor = rgb(255, 255, 255);
        laneMGroup.add(laneM);
    }

    htmlps = new HTMLPSCHARS();

    mHouse1PA = createSprite(width/2, -4315, 500, 500);
    mHouse1PA.addImage(PA500x);
    HousePA.push(mHouse1PA);

    mHouse1Bound = createSprite(width/2, -4600, 2000, 5);
    mHouse1Bound.visible = false;
    mHouseBounds.push(mHouse1Bound);

    mHouse2PA = createSprite(width/2, -13620, 500, 500);
    mHouse2PA.addImage(PA500x);
    HousePA.push(mHouse2PA);
    
    mHouse2Bound = createSprite(width/2, -13900, 2000, 5);
    mHouse2Bound.visible = false;;
    mHouseBounds.push(mHouse2Bound);

    mHouse3PA = createSprite(width/2, -22920, 400, 400);
    mHouse3PA.addImage(PA400x);
    HousePA.push(mHouse3PA);
    
    mHouse3Bound = createSprite(width/2, -23200, 2000, 5);
    mHouse3Bound.visible = false;;
    mHouseBounds.push(mHouse3Bound);

    mHouse4PA = createSprite(0, -14500, 500, 500);
    mHouse4PA.addImage(PA500x);
    HousePA.push(mHouse4PA);
    
    mHouse4Bound = createSprite(width/2, -14750, 2000, 5);
    mHouse4Bound.visible = false;
    mHouseBounds.push(mHouse4Bound);

    mHouse5PA = createSprite(0, -31800, 500, 500);
    mHouse5PA.addImage(PA500x);
    HousePA.push(mHouse5PA);

    rightar2 = createSprite(80, -250, 60, 30);
    rightar2.addImage(rightarimage);

    rightar = createSprite(80, -150, 60, 30);
    rightar.addImage(rightarimage);

    upar = createSprite(280, -450, 60, 30);
    upar.addImage(uparimage);

    upar2 = createSprite(280, -650, 60, 30);
    upar2.addImage(uparimage);

    delvan = createSprite(80, 0, 25, 125);
    delvan.addImage(testimage);
    delvan.scale = 0.85;

    delvanta = createSprite(80, 0, 40, 10);
    delvanta.visible = false;

    dashboard = createSprite(1100, delvan.y - 165, 530, 700);
    dashboard.shapeColor = rgb(20, 20, 20);

    TrafficGroup = new Group();
    OTrafficGroup = new Group();
    RoadworkGroup = new Group();

    setInterval(alarm, 1000);
    setInterval(CountSeconds, 1000);
    setInterval(DTtimerCounter, 1000);
    setInterval(oppotimerCounter, 1000);
}

function draw() {
    background(185, 122, 87);

    htmlps.showTitle();

    delvanta.y = delvan.y+50;
    delvanta.x = delvan.x;

    dashboard.y = delvan.y - 240;

    image(backgroundHousesL1, -280, -5000, 392, 4520);
    image(backgroundHousesL2, -280, -9600, 392, 4520);
    image(backgroundHousesL3, -280, -14300, 392, 4520);
    image(backgroundHousesL4, -280, -19200, 392, 4520);
    image(backgroundHousesL5, -280, -24000, 392, 4520);

    image(backgroundHousesR1, width / 2, -4200, 392, 4520);
    image(backgroundHousesR2, width / 2, -9000, 392, 4520);
    image(backgroundHousesR3, width / 2, -13500, 392, 4520);
    image(backgroundHousesR4, width / 2, -18300, 392, 4520);
    image(backgroundHousesR5, width / 2, -22850, 392, 4520);

    image(mHouse1, width / 2 + 50, -4460, 300, 300);
    image(mHouse2, -120, -14650, 300, 300);
    image(mHouse3, width / 2 + 50, -13780, 300, 300);
    image(mHouse4, width / 2 + 50, -23175, 300, 300);
    image(mHouse5, -90, -32000, 300, 300);

    image(treeG1, width / 2 + 50, -31000, 100, 7500);
    image(treeG2, -20, -31700, 100, 7500);
    image(treeG3, width / 2 +50, -38500, 100, 7500);
    image(treeG4, -20, -39500, 100, 7500);

    camera.position.x = width / 2;
    camera.position.y = delvan.y - 240;

    delvan.collide(allLanes);
    delvan.collide(iPaths);

    if (gameState === Start) {
        htmlps.startDisplay();
    }

    if (keyDown("E") && gameState === Start || keyDown("E") && gameState === 6) {
        gameState = Play;
    }

    if (gameState === Play) {

        htmlps.startDisplayHide();
        htmlps.startTut();

        if (keyDown("UP_ARROW")) {
            delvan.y = delvan.y - 10;
            ipathBlock.y = delvan.y + 300;
        }

        if (keyDown("UP_ARROW") && keyDown("W")) {
            delvan.y = delvan.y - 7;
        }

        if (keyDown("DOWN_ARROW")) {
            delvan.y = delvan.y + 5;
        } 

        if (keyDown("RIGHT_ARROW")) {
            delvan.addImage(turnru);
        } else if (keyDown("LEFT_ARROW")) {
            delvan.addImage(turnlu)
        } else {
            delvan.addImage(testimage)
        }

        if (keyDown("LEFT_ARROW") && keyDown("UP_ARROW")) {
            delvan.x = delvan.x - 5;
        }

        if (keyDown("RIGHT_ARROW") && keyDown("UP_ARROW")) {
            delvan.x = delvan.x + 5;
        }

        if (keyDown("LEFT_ARROW") && keyDown("DOWN_ARROW")) {
            delvan.x = delvan.x - 5;
        }

        if (keyDown("RIGHT_ARROW") && keyDown("DOWN_ARROW")) {
            delvan.x = delvan.x + 5;
        }

        htmlps.Status();
        htmlps.status.html("Status : 🅿 Idle. Let's go!");

        if (delvan.y < -500 && gameState === Play) {
            htmlps.timeTakenShow();
            htmlps.startTutH();
            htmlps.startTutd();
            htmlps.mtimereas.position(10, 350);
            htmlps.status.html("Status :"+ " ➤ Delivering" +" 📦 To :"+ " Ram");
        }

        htmlps.dashDisplay();

        if (delvan.isTouching(HousePA)) {
            htmlps.DropPackageInstructShow();
        } else {
            htmlps.DropPackageInstructHide();
        }

        if (delvan.isTouching(mHouseBounds) && keyDown("UP_ARROW")) {
            htmlps.DropPackageInstructFirstShow();
        } else {
            htmlps.DropPackageInstructFirstHide();
        }

        var defFps = Math.round(frameRate());

        if (defFps < 20) {
            htmlps.framecounter.style('color', 'red');
        } else if (defFps < 30) {
            htmlps.framecounter.style('color', 'orange');
        } 
        if (defFps < 10) {
            htmlps.framecounter.style('background-color', 'red');
            htmlps.framecounter.style('color', 'black');
        }

        if (delvan.y < -2000) { htmlps.tutoria6.hide(); htmlps.tutoria8.hide(); }
        if (delvan.y < -3700) { htmlps.startDelTut(); }
        htmlps.mHouse1DashDisplay();
        htmlps.mHouse2DashDisplay();
        htmlps.mHouse3DashDisplay();
        htmlps.mHouse4DashDisplay();
        htmlps.mHouse5DashDisplay();

        delvan.collide(mHouseBounds);

        if (packagedeli == 0) {
            nav = Math.round(HousePA[0].y - HousePA[0].y - HousePA[0].y + delvan.y); 
            htmlps.nexthousen.html(" "+nav +" M");
        }

        if(packagedeli == 1) {
            nav = Math.round(HousePA[1].y - HousePA[1].y - HousePA[1].y + delvan.y); 
            htmlps.nexthousen.html(" "+nav +" M");
            htmlps.status.html("Status :"+ " ➤ Delivering" +" 📦 To :"+ " Chandan");
        }
        if(packagedeli == 2) {
            nav = Math.round(HousePA[3].y - HousePA[3].y - HousePA[3].y + delvan.y);
            htmlps.nexthousen.html(" "+nav + " M"); 
            htmlps.status.html("Status :"+ " ➤ Delivering" +" 📦 To :"+ " Ratan");
        }
        if(packagedeli == 3) {
            nav = Math.round(HousePA[2].y - HousePA[2].y - HousePA[2].y + delvan.y);
            htmlps.nexthousen.html(" "+nav +" M"); 
            htmlps.status.position(870, 75);
            htmlps.status.html("Status :"+ " ➤ Delivering" +" 📦 To :"+ " Gurpreet");
        }
        if(packagedeli == 4) {
            nav = Math.round(HousePA[4].y - HousePA[4].y - HousePA[4].y + delvan.y);
            htmlps.nexthousen.html(" "+nav + " M"); 
            htmlps.status.html("Status :"+ " ➤ Delivering" +" 📦 To :"+ " Darya");
        }

        if (nav < 1750) {
            htmlps.nexthousen.style('color', 'black');
            htmlps.nexthousen.style('background-color', 'rgb(207, 255, 196)');
        }
        if (nav < 950) {
            htmlps.nexthousen.style('color', 'rgb(250, 187, 40)');
            htmlps.nexthousen.style('background-color', 'rgb(0, 0, 0)');
            htmlps.nexthousen.position(730, 540);
        } else {
            htmlps.nexthousen.position(745, 540);
        }

        if(delvan.isTouching(HousePA[0]) && gameState === Play && keyDown("D")) {
            packages = packages-1;
            packagedeli = packagedeli+1;
            HousePA[0].remove();
            mHouseBounds[0].remove();
            htmlps.mHouse1DashDisplayDeliv();
            timer = timer+10;
            htmlps.tutoria3.hide();
            htmlps.startTutN();
            htmlps.tutoria7.hide();
        }

        if(delvan.isTouching(HousePA[1]) && gameState === Play && keyDown("D")) {
            packages = packages-1;
            packagedeli = packagedeli+1;
            HousePA[1].remove();
            mHouseBounds[1].remove();
            htmlps.mHouse2DashDisplayDeliv();
            timer = timer+20;
        }

        if (delvan.y < -7000) {
            htmlps.tutoria4.hide();
        }

        if(delvan.isTouching(HousePA[2]) && gameState === Play && keyDown("D")) {
            packages = packages-1;
            packagedeli = packagedeli+1;
            HousePA[2].remove();
            mHouseBounds[2].remove();
            htmlps.mHouse3DashDisplayDeliv();
            timer = timer+10;
        }

        if(delvan.isTouching(HousePA[3]) && gameState === Play && keyDown("D")) {
            packages = packages-1;
            packagedeli = packagedeli+1;
            HousePA[3].remove();
            mHouseBounds[3].remove();
            htmlps.mHouse4DashDisplayDeliv();
            timer = timer + 10;
        }

        if(delvan.isTouching(HousePA[4]) && gameState === Play && keyDown("D")) {
            packages = packages-1;
            packagedeli = packagedeli+1;
            HousePA[4].remove();
            htmlps.mHouse5DashDisplayDeliv();
        }

        if (keyDown("UP_ARROW") && frameCount % 110 === 0 && delvan.y < -200 && delvan.y > -10000 && spawnrw===true && RoadworkGroup.length < 7) {
            var roadworksimagesL = Math.round(random(1, 2))
            switch (roadworksimagesL) {
                case 1: roadworksL = createSprite(200, Math.round(random(delvan.y - 2000, -10000)), 50, 300);
                    roadworksL.addImage(roadworksLB1Image);
                    roadworksL.scale = 1.5;
                    break;
                case 2: roadworksL = createSprite(200, Math.round(random(delvan.y - 2000, -10000)), 50, 300);
                    roadworksL.addImage(roadworksLB2Image);
                    roadworksL.scale = 1.6;
                    roadworksL.x = roadworksL.x + 30;
                    break;
                default: break;
            }
            allRoadworks.push(roadworksL);
            RoadworkGroup.add(roadworksL);
        }

        if (keyDown("UP_ARROW") && frameCount % 130 === 0 && delvan.y < -1100 && delvan.y > -11000 && spawnrw===true  && RoadworkGroup.length < 7) {
            var roadworksimagesL2 = Math.round(random(1, 2))
            switch (roadworksimagesL2) {
                case 1: roadworksL2 = createSprite(200, Math.round(random(delvan.y - 2000, -11000)), 50, 300);
                    roadworksL2.addImage(roadworksLB1Image);
                    roadworksL2.scale = 1.5;
                    break;
                case 2: roadworksL2 = createSprite(200, Math.round(random(delvan.y - 2000, -11000)), 50, 300);
                    roadworksL2.addImage(roadworksLB2Image);
                    roadworksL2.scale = 1.6;
                    roadworksL2.x = roadworksL2.x + 30;
                    break;
                default: break;
            }
            allRoadworks.push(roadworksL2);
            RoadworkGroup.add(roadworksL2);
        }

        if (keyDown("UP_ARROW") && frameCount % 100 === 0 && delvan.y < -500 && delvan.y > -2300 && spawnrw===true  && RoadworkGroup.length < 7) {
            var roadworksimagesR = Math.round(random(1, 2))
            switch (roadworksimagesR) {
                case 1: roadworksR = createSprite(600, Math.round(random(delvan.y - 2000, -2000)), 50, 300);
                    roadworksR.addImage(roadworksRB1Image);
                    roadworksR.scale = 1.5;
                    break;
                case 2: roadworksR = createSprite(600, Math.round(random(delvan.y - 2000, -2000)), 50, 300);
                    roadworksR.addImage(roadworksRB2Image);
                    roadworksR.scale = 1.6;
                    roadworksR.x = roadworksR.x - 30;
                    break;
                default: break;
            }
            allRoadworks.push(roadworksR);
            RoadworkGroup.add(roadworksR);
        }

        if (keyDown("UP_ARROW") && frameCount % 110 === 0 && delvan.y < -3900 && delvan.y > -12000 && spawnrw===true  && RoadworkGroup.length < 7) {
            var roadworksimagesR1 = Math.round(random(1, 2));
            switch (roadworksimagesR1) {
                case 1: roadworksR1 = createSprite(600, Math.round(random(delvan.y - 2000, -12000)), 50, 300);
                    roadworksR1.addImage(roadworksRB1Image);
                    roadworksR1.scale = 1.5;
                    break;
                case 2: roadworksR1 = createSprite(600, Math.round(random(delvan.y - 2000, -12000)), 50, 300);
                    roadworksR1.addImage(roadworksRB2Image);
                    roadworksR1.scale = 1.6;
                    roadworksR1.x = roadworksR1.x - 30;
                    break;
                default: break;
            }
            allRoadworks.push(roadworksR1);
            RoadworkGroup.add(roadworksR1);
        }

        if (keyDown("UP_ARROW") && frameCount % 100 === 0 && delvan.y < -21000 && delvan.y > -32000 && spawnrw===true  && RoadworkGroup.length < 7) {
            var roadworksimagesR3 = Math.round(random(1, 2));
            switch (roadworksimagesR3) {
                case 1: roadworksR3 = createSprite(600, Math.round(random(delvan.y - 2000, -32000)), 50, 300);
                    roadworksR3.addImage(roadworksRB1Image);
                    roadworksR3.scale = 1.5;
                    break;
                case 2: roadworksR3 = createSprite(600, Math.round(random(delvan.y - 2000, -32000)), 50, 300);
                    roadworksR3.addImage(roadworksRB2Image);
                    roadworksR3.scale = 1.6;
                    roadworksR3.x = roadworksR3.x - 30;
                    break;
                default: break;
            }

            allRoadworks.push(roadworksR3);
            RoadworkGroup.add(roadworksR3);
        }

        if (keyDown("UP_ARROW") && frameCount % 110 === 0 && delvan.y < -15000 && delvan.y > -29000 && spawnrw===true  && RoadworkGroup.length < 7) {
            var roadworksimagesL3 = Math.round(random(1, 2));
            switch (roadworksimagesL3) {
                case 1: roadworksL3 = createSprite(200, Math.round(random(delvan.y - 2000, -29000)), 50, 300);
                    roadworksL3.addImage(roadworksLB1Image);
                    roadworksL3.scale = 1.5;
                    break;
                case 2: roadworksL3 = createSprite(200, Math.round(random(delvan.y - 2000, -29000)), 50, 300);
                    roadworksL3.addImage(roadworksLB2Image);
                    roadworksL3.scale = 1.6;
                    roadworksL3.x = roadworksL3.x + 30;
                    break;
                default: break;
            }

            allRoadworks.push(roadworksL3);
            RoadworkGroup.add(roadworksL3);
        }

        if (frameCount % 100 === 0 && spawntraf === true && TrafficGroup.length < 6) {
            PTraffic = createSprite(350, delvan.y - 800, 40, 80);
            var PTrafficvar = Math.round(random(1, 2));
            switch (PTrafficvar) {
                case 1: PTraffic.x = Math.round(random(330, 370));
                        PTraffic.width = 40;
                        PTraffic.height = 80;
                        PTraffic.velocityY = (Math.round(random(-10, -20)));
                        PTraffic.shapeColor = color(random(150, 255), random(150, 255), random(150, 255));
                    break;
                case 2: PTraffic.x = Math.round(random(340, 345));
                        PTraffic.width = Math.round(random(60, 70));
                        PTraffic.height = Math.round(random(150, 200));
                        PTraffic.velocityY = (Math.round(random(-5, -10)));
                        PTraffic.shapeColor = color(random(150, 255), random(150, 200), random(150, 150));
                    break;
                default: break;
            }
            TrafficAr.push(PTraffic);
            TrafficGroup.add(PTraffic);
        }

        if (frameCount % 100 === 0 && spawntraf === true) {
            OTraffic = createSprite(450, delvan.y - 800, 40, 80);
            OTraffic.lifetime = 200;
            var OTrafficvar = Math.round(random(1, 2));
            switch (OTrafficvar) {
                case 1: OTraffic.x = Math.round(random(445, 510));
                        OTraffic.width = 40;
                        OTraffic.height = 80;
                        OTraffic.velocityY = (Math.round(random(7, 20)));
                        OTraffic.shapeColor = color(random(150, 255), random(150, 255), random(150, 255));
                    break;
                case 2: OTraffic.x = Math.round(random(475, 490));
                        OTraffic.width = Math.round(random(60, 70));
                        OTraffic.height = Math.round(random(150, 200));
                        OTraffic.velocityY = (Math.round(random(5, 10)));
                        OTraffic.shapeColor = color(random(150, 255), random(150, 255), random(150, 255));
                    break;
                default: break;
            }
            TrafficAr.push(OTraffic);
            TrafficGroup.add(OTraffic);
            OTrafficGroup.add(OTraffic)
        }

        TrafficGroup.collide(delvanta);

        TrafficGroup.collide(TrafficAr);
        TrafficGroup.collide(RoadworkGroup);

        for(var i = 0; i < laneMGroup.length; i++) {
            if (laneMGroup.get(i).y > delvan.y+300) {
                laneMGroup.get(i).destroy();
            }
        }

        for(var i = 0; i < OTrafficGroup.length; i++) {
            if (OTrafficGroup.get(i).x < 420 ) {
                OTrafficGroup.get(i).destroy();
            }
        }

        for (var i = 0; i < OTrafficGroup.length; i++) {
            var a = Math.round(random(450, 500))
            if (delvan.x > 410 && delvan.x < 550 && OTrafficGroup.get(i).y > delvan.y-a) {
                OTrafficGroup.get(i).velocityY = 1;
            }
        }

        for(var i = 0; i < TrafficGroup.length; i++) {
            if (TrafficGroup.get(i).y > delvan.y+200) {
                TrafficGroup.get(i).destroy();
            }
        }

        for(var i = 0; i < RoadworkGroup.length; i++) {
            if (RoadworkGroup.get(i).y > delvan.y+400) {
                RoadworkGroup.get(i).destroy();
            }
        }

        for(var i = 0; i < HousePA.length; i++) {
            var cust = HousePA[i].y - delvan.y;
            if (cust > -2000) {
                TrafficGroup.collide(HousePA[i]);
            }
        }

        htmlps.pause.position(0, 0);
        htmlps.pause.style('z-index', '-5'); 
        
        document.addEventListener( 'visibilitychange' , function() {
            if (document.hidden && gameState === Play) {
                gameState = 6;
            } else {
                gameState = 6;
                htmlps.gamePause();
                htmlps.pause.position(250, 0);
                htmlps.pause.html("Welcome back. Press E to continue.");
                delvan.velocityY = 0;
            }
        }, false );

        if (keyDown("P") && gameState === Play) {
            gameState = 6;
            htmlps.gamePause();
            htmlps.pause.position(300, 0);
        } else if (keyDown("P") && gameState === 6) {
            gameState = Play;
            htmlps.pause.html(" ");
            htmlps.pause.position(0, 0);
        }

        if (gameState === 6) {
            for(var i = 0; i < TrafficGroup.length; i++) {
                if (TrafficGroup.get(i).y < delvan.y+200 || TrafficGroup.get(i).y > delvan.y-200) {
                    TrafficGroup.get(i).destroy();
                }
            }
            delvan.velocityY = 0;
        }

        if (timertaken < 60) {
            htmlps.timeTakenGreen();
        }

        if (timertaken > 59) {
            htmlps.timeTakenYellow();
        }

        if (timer > 20) {
            htmlps.goodtime();
        }

        if (timer < 15) {
            htmlps.mtimer.style('color', 'rgb(255, 71, 71)');
            htmlps.mtimereas.style('color', 'rgb(255, 71, 71)');
            htmlps.mtimereas.position(10, 270);
        } else if (delvan.y < -500) {
            htmlps.mtimereas.position(10, 300);
        }

        if (timer < 5) {
            htmlps.dueduetime();
        }

        if (timer < 1) {
            gameState = Due;
        }

        if (gameState === Due) {
            htmlps.dashDisplayForDue();
            TrafficGroup.setVelocityYEach(0);
            setTimeout(autoEnd, 5000);
        }

        if (gameState === Due && keyDown("E")) {
            window.location.reload();
        }

        if (delvan.isTouching(TrafficGroup)) {
            gameState = End;
        }
    
        if (delvan.isTouching(RoadworkGroup)) {
            gameState = End;
        }
    
        if (gameState === End) {
            htmlps.dashDisplayForEnd();
            htmlps.allHousesDisplayOff();
            htmlps.mTimerEasHide();
            TrafficGroup.setVelocityYEach(0);
            OTraffic.lifetime = 12000;
            PTraffic.lifetime = 12000;
    
            setTimeout(autoEnd, 5000);
        }
    
        if (gameState === End && keyDown("E")) {
            window.location.reload();
        }
    

    }

    if (packages === 0 && gameState === Play) {
        gameState = Win;
    }

    if (keyDown("X") && gameState === Play) {
        gameState = angrymode;
    }

    if (gameState === angrymode) {

        timer = 500;

        TrafficGroup.destroyEach();
        RoadworkGroup.destroyEach();

        htmlps.devmodeON();
        htmlps.dashHideWin();
        htmlps.dashDisplaydevMode();
        htmlps.allHousesDisplayOff();

        if (keyDown("UP_ARROW")) {
            delvan.addSpeed(0.2, delvan.rotation);
        }

        if (keyDown("UP_ARROW") && keyDown("W")) {
            delvan.y = delvan.y - 15;
            delvan.addSpeed(0.7, delvan.rotation);
        }

        if (keyDown("DOWN_ARROW")) {
            delvan.y = delvan.y + 10;
            delvan.addSpeed(-0.5, delvan.rotation);
        }

        if (keyDown("LEFT_ARROW") && keyDown("UP_ARROW")) {
            delvan.rotation -= 2;
        }

        if (keyDown("RIGHT_ARROW") && keyDown("UP_ARROW")) {
            delvan.rotation += 2;   
        }

        if (keyDown("LEFT_ARROW") && keyDown("DOWN_ARROW")) {
            delvan.rotation -= 2;
        }

        if (keyDown("RIGHT_ARROW") && keyDown("DOWN_ARROW")) {
            delvan.rotation += 2;
        }

    }

    if (keyDown("E") && gameState === angrymode) {
        window.location.reload();
    }

    drawSprites();

    if (gameState === Win) {
        background(0, 0, 0);
        htmlps.GameStateWin();
        htmlps.DropPackageInstructHide();
        htmlps.dashHideWin();
        htmlps.allHousesDisplayOff();
        htmlps.mTimerEasHide();
    }

    if (gameState === Win && keyDown("E")) {
        window.location.reload();
    }

}

function alarm() {
    if(delvan.y < -500 && gameState === Play) {
    timer--;
    }
}

function autoEnd() {
    if (gameState === End || gameState === Due) {
        window.location.reload();
        htmlps.restartinst.html("Restarting...")
    }
}

function CountSeconds() {
    if (gameState === Play && delvan.y < -500) {
        timertaken++;
    }
}

function DTtimerCounter() {
    if(keyDown("UP_ARROW") && gameState === Play && delvan.y > delvan.y-11) {
    DTtimer++;
    }
}

function oppotimerCounter() {    
    if (delvan.x > 400 && delvan.x < 550 && keyDown("UP_ARROW") && gameState === Play) {
        oppotimer++;
    }
}
