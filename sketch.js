/*Link        https://tinyurl.com/CoolDonutRun         */


    /*------------------------------------------------------/
   /                                                       /
  /                      How to Play                      /
 /                                                       /
/------------------------------------------------------*/


/* <-------------- 2D Platformer Controls -------------->

    A                :  Move the Player Left
    D                :  Move the Player Right
    Spacebar or W    :  Jump
    Q                :  Melee Attack
    Mouse Click      :  Ranged Attack
    Hold Shift       :  Run faster
    + and -          :  Zoom in and out
    E                :  Enter/exit Editor Mode
    
    
 <-------------- Editor Mode Controls -------------->
 
    1-8              :  Switch which object is being placed
                        [ 1 ] Platform
                        [ 2 ] Coin
                        [ 3 ] Spike
                        [ 4 ] Monster Enemy
                        [ 5 ] Ranged Enemy
                        [ 6 ] Chaser Enemy
                        [ 7 ] Health Pack
                        [ 8 ] Power-Up Item
    Arrow Keys       :  Move the Camera
    V                :  Save the Level
    Click            :  Place an Object (only when zoomed in)
    Backspace + Click:  Delete an Object (only when zoomed in)
    X                :  Toggle Instructions On/Off

*/



    /*------------------------------------------------------/
   /                                                       /
  /                      Variables                        /
 /                                                       /
/------------------------------------------------------*/

// Music 
var song
// Game Information
var myGameTitle = "2D Platformer Game"; // Replace 2D Platformer Game with the title of your game
var myName = "Lee"; // Replace Eevee with your name
var debugGame = "off"; // "on" or "off"
var defaultValues = false; // To reset values, set to true

// Level to Load
var currentLevel = "Donut Land Adventure"; // Default
// Level Options: Blank Level, Donut Land Adventure, Donut Canyon, Ghost Heights, Hidden Donut, Spikey Spikers, Unreachable Goal, Invisible Path, Donut Mania

// The Canvas is just what the Camera sees
var canvasWidth = 600; //1280 is the full scene, 800 can provide a bit more space
var canvasHeight = 720;

// The Whole Scene
var SCENE_W = 1280;
var SCENE_H = 720;

  /*--------------------/
 /       PLAYER        /
/--------------------*/

// Player Variables
var playerIdleImage = "images/Idle.gif";
var idleFrames = 1;
var playerX = 75; // The starting position of the player sprite
var playerY = 580;
var playerWidth = 64; // The Width and Height should match the sprite size
var playerHeight = 64;
var directionFacing = "right"; // "right" or "left"
var playerColliderX = 40;
var playerColliderY = 64;

// Movement
var playerWalkImage = "images/Walk.gif";
var runFrames = 4;
var walkSpeed = 5; // The higher the number, the faster the player is
var runSpeed = 10; // When Shift is held, adjust how much it speeds up/slows down by: right now this is twice the player's speed

// Jumping & Gravity
var playerJumpImage = "images/Jump.gif";
var jumpFrames = 8;
var jump = -15; // How high the player jumps; it must always be negative
var GRAVITY = 1; // 1 (default), 2 (heavier)
var jumpMax = 1; // Maximum number of jumps, could be 2 if you want to implement a double-jump

var playerAttackType = "ranged"; // "ranged" or "melee"

// Player Melee Attack
var playerAttackImage = "images/player_attack.png";
var hitboxImage = "images/empty.png";
var playerWidthAttack = 70;
var attackFrames = 8;
var hitboxX = 50;
var hitboxColliderX = 40;
var hitboxColliderY = 40;

// Player Ranged Attack
var projectileImage = "images/projectile.png";
var projectileSpeed = 15; // Speed of the player attacks, for ranged weapons
var projectileColliderX = 20;
var projectileColliderY = 20;



  /*--------------------/
 /    MONSTER ENEMY    /
/--------------------*/

// Monster Enemy Variables (moves left and right)
var monsterWalkImage = "images/monster_run.png";
var monsterX = 700; // Moves right after reaching this point
var monsterY = 600;
var monsterWidth = 64;
var monsterHeight = 64;
var monsterFrames = 5;
var monsterSpeed = 3; // Higher numbers are faster, lower numbers are slower
var monsterLeft = 1100; // Moves left after reaching this point
var textMonster = "Monster Enemy";
var monsterColliderX = 40;
var monsterColliderY = 40;
var monsterHealth = 1;


  /*--------------------/
 /    CHASER ENEMY     /
/--------------------*/

// Ghost Enemy Variables (moves up and down, and chases)
var chaserMoveImage = "images/ghost.png";
var chaserX = 280;
var chaserY = 500;
var chaserWidth = 64;
var chaserHeight = 64;
var chaserFrames = 1;
var chaserSpeed = 2;
var chaserHigh = 400;
var chaserLow = 300;
var textChaser = "Ghost Enemy"; // Chaser Enemy
var chaserColliderX = 40;
var chaserColliderY = 40;
var chaserHealth = 1;


  /*--------------------/
 /    RANGED ENEMY     /
/--------------------*/

// Ranged Enemy Variables (sits still, throws projectiles)
var rangedEnemyAttackImage = "images/ranged_enemy.png";
var rangedEnemyIdleImage = "images/ranged_enemy.png";
var rangedEnemyX = 390;
var rangedEnemyY = 500;
var rangedWidth = 64;
var rangedHeight = 64;
var rangedAttackFrames = 8;
var rangedIdleFrames = 1;
var textRanged = "Ranged Enemy";
var rangedColliderX = 40;
var rangedColliderY = 50;
var rangedHealth = 1;
var rangedAttackRange = 200; // When the player is this close to the enemy, it attacks

// Attacks
var enemyProjectileImage = "images/enemy_projectile.png";
var enemyProjectileDestroyImage = "images/enemy_projectile_destroy.png";
var enemyProjectileWidth = 32;
var enemyProjectileHeight = 32;
var enemyProjectileFrames = 1;
var enemyProjectileDestroyFrames = 12;
var enemyProjectileColliderX = 20;
var enemyProjectileColliderY = 20;


  /*--------------------/
 /      SPIKES         /
/--------------------*/

// Spikes (created in Editor Mode, sits still)
var spikeImage = "images/spikes.png";
var spikeX = -80;
var spikeY = 360;
var spikeWidth = 64;
var spikeHeight = 64;
var spikeFrames = 1;
var textSpike = "Spike";
var spikeColliderX = 50;
var spikeColliderY = 55;


  /*--------------------/
 /       HEALTH        /
/--------------------*/

// Health Bar
var playerHp = 4;
var hpBarSprite = "on";
var HPBgImage = "images/hp_background.png";
var HP1Image = "images/hp_red.png";
var HP2Image = "images/hp_orange.png";
var HP3Image = "images/hp_yellow.png";
var HP4Image = "images/hp_green.png"; // Full HP
var HPBorderImage = "images/hp_border.png";
var hpPosX = 180;
var hpPosY = 320;

// Health Pack
var healthPackImage = "images/health_pack.png";
var healthPackX = 150;
var healthPackY = 500;
var healthPackWidth = 50;
var healthPackHeight = 50;
var healthPackFrames = 4;
var textHealthPack = "Health Pack";
var healthPackColliderX = 48;
var healthPackColliderY = 50;


  /*--------------------/
 /       WALLS         /
/--------------------*/

// Platform
var platformImage = "images/platform.png";
var platformX = 400;
var platformY = 600;
var platformWidth = 103;
var textPlatform = "Platform";

// Ground
var groundImage = "images/ground.png";
var groundX = 640;
var groundY = 675;

// Wall
var wall1Sprite = "on";
var wall2Sprite = "on";
var wallImage = "images/wall.png";
var wall1X = -200;
var wall2X = 1500;
var wallY = 560;

// Camera/Invisible Walls
var borderLeft = -63; // -336 is the edge of the left platform; decrease this number if you want your player to be able to move further left
var borderRight = 1362; // 1628 is the edge of the right platform; increase this number for further right


  /*--------------------/
 /     BACKGROUND      /
/--------------------*/

// Mountain
var mountainSprite = "on";
var mountainImage = "images/mountain.png";
var mountainX = 50;
var mountainY = 400;
var mountainWidth = 640;
var mountainHeight = 780;
var totalMountainImages = 3;

// Trees
var treeSprite = "on";
var treeImage = "images/trees.png";
var treeX = 50;
var treeY = 500;
var treeWidth = 640;
var treeHeight = 500;
var totalTreeImages = 3;


  /*--------------------/
 /        GOAL         /
/--------------------*/

// Goal
var goalSprite = "on";
var goalImage = "images/goal.png";
var goalX = 1200;
var goalY = 450;
var goalWidth = 110;
var goalHeight = 110;
var goalFrames = 1;


  /*--------------------/
 /        COIN         /
/--------------------*/

// Collectible Coin
var coinImage = "images/donut.png";
var coinX = 300;
var coinY = 500;
var coinWidth = 50;
var coinHeight = 50;
var coinFrames = 16;
var textCoin = "Donut"; // In your game, it should be "Coin" or whatever your collectible currency is
var coinColliderX = 60;
var coinColliderY = 60;


  /*--------------------/
 /     INTERFACE       /
/--------------------*/

// Graphical User Interface Text
var scoreVisible = "on";
var textScore = "Score: ";
var scoreX = 50;
var scoreY = 90;
var goldVisible = "on";
var goldX = 50;
var goldY = 120;
var colorGUI = "white";

// Score
var goldIncrease = 1;
var goldScore = 50;
var hpScore = 50;
var enemyScore = 100;
var powerScore = 50;


  /*--------------------/
 /      POWER-UP       /
/--------------------*/

// Power-up Item
var powerupImage = "images/cake.png";
var powerX = -50;
var powerY = 300;
var powerWidth = 50;
var powerHeight = 50;
var powerFrames = 5;
var textPowerUp = "Magical Cake"; // Power-Up Item
var powerupColliderX = 45;
var powerupColliderY = 50;
var powerPlayerWalkImage = "images/player_run_power.png";
var powerPlayerIdleImage = "images/player_power.png";
var powerPlayerAttackImage = "images/player_attack_power.png";
var powerPlayerJumpImage = "images/player_jumping_power.png";


  /*--------------------/
 /       SCENES        /
/--------------------*/

// Scene Background
var titleBackground = "orange";
var level1Background = "blue";
var youWinBackground = "green";
var gameOverBackground = "red";

// Title Button
var startSprite = "on";
var startButtonImage = "images/start_button.png";
var startButtonX = 295;
var startButtonY = 450;
var startWidth = 450; // Match the image file
var startHeight = 100;
var textTitle = "Start Game";
var colorTitle = "white";

// You Win Scene
var winbgSprite = "on";
var winBgImage = "images/youwin.png";
var winBgX = 300;
var winBgY = 360;
var textWin = "YOU WIN!";
var colorWin = "white";

// Game Over Scene
var gameoverbgSprite = "on";
var gameoverBgImage = "images/gameover.png";
var gameoverBgX = 300;
var gameoverBgY = 360;
var textGameOver = "Game Over, But Nice Try";
var colorGameOver = "rgb(142,40,245)";


  /*--------------------/
 /      KEYBOARD       /
/--------------------*/

// Keyboard Controls - Find the numbers to use here: https://keycode.info/
var leftKey = 65; // A key
var rightKey = 68; // D key
var jumpKey = 87; // W key
var jumpKey2 = 32; // Spacebar key
var attackKey = 81; // Q key
var runKey = 16; // Shift key
var proceedKey = 13; // Enter key
var reloadKey = 82; // R key
var saveKey = 86; // V key
var editorKey = 69; // E key
var deleteKey = 8; // Backspace key
var instructKey = 88; // X key
var panUpKey = 38; // Up Arrow key
var panDownKey = 40; // Down Arrow key
var panLeftKey = 37; // Left Arrow key
var panRightKey = 39; // Right Arrow key
var zoomOutKey = 189; // - key
var zoomInKey = 187; // + key
var objectKey1 = 49; // 1 key
var objectKey2 = 50; // 2 key
var objectKey3 = 51; // 3 key
var objectKey4 = 52; // 4 key
var objectKey5 = 53; // 5 key
var objectKey6 = 54; // 6 key
var objectKey7 = 55; // 7 key
var objectKey8 = 56; // 8 key

// Editor Mode Directions
var keyPlatform = "1";
var keyCoin = "2";
var keySpike = "3";
var keyEnemy = "4";
var keyRanged = "5";
var keyChaser = "6";
var keyHealth = "7";
var keyPowerup = "8";
var keyDelete = "Backspace";
var keyCameraMove = "Arrow Keys";
var keySave = "V";
var keyEditorMode = "E";
var keyTurnOff = "X";
var keyReload = "R";













/**************************************************************************

                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    
                    
   !!!!!!!!!!!!!!!    DON'T CHANGE ANY CODE BELOW HERE    !!!!!!!!!!!!!!!
   
   
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx              

***************************************************************************/





// Variables with set values that shouldn't be changed

// Player & Abilities
var player;
var playerAttackStyle;
var playerSpeed = walkSpeed;
var moving = false;
var jumpCount = 0;
var jumpActive = "false";
var playerPower = false;
var powerup;
var healthPack;

// Enemy Declaration
var monster;
var monsterDirection;
var monsterRight = monsterX;
var chaserEnemy; // Ghost Chaser Enemy
var enemy;
var newEnemy;
var rangedEnemy;
var coolDown = false; // rangedEnemy can attack when this is false
var stopProjectiles;
var monsterMoveRadius = platformWidth - 5; // 100
var enemyProjectileRadiusX = 60; // When it starts the explosion animation (in relation to the player)
var enemyProjectileRadiusY = 60;

// Attacks
var projectiles;
var hitboxes;
var meleeAttack = false;

// Health Bar
var invincible = false;
var hpX;
var hpY;
var hpImg;
var hpBorder;
var hpBg;

// Wall & Platform Variables
var platform;
var ground;
var walls;
var allItems; // Groups of all objects from Editor Mode
var delPressed = false;

// Collectibles
var coin;
var collectibles;
var gold = 0;
var score = 0; // When the enemy is destroyed and when you collect coins, this number goes up

// Scenes & Camera
var canvas;
var camY;
var scene = "title"; // This determines what screen it's on (title, level1, youWin, or gameOver)
var gamePlay = false; // True if you're in a level, but false when it's a title screen or menu
var disableEditor = false; // Disables the Editor Mode
var zoomOut = false;

// Editor Mode
var editorMode = false; // Editor Mode will allow you to place sprites when it's on (or true)
var editObject = "Platform"; // The current object that you can place in Editor Mode
var editInstructX = 25; // 275
var editInstructItemX = editInstructX + 25;
var editInstructY = 100; // 175
var editorButtons = "Press " + keyPlatform + " for " + textPlatform + ", " + keyCoin + " for " + textCoin + ", " + keySpike + " for " + textSpike + ", " + keyEnemy + " for " + textMonster + ", " + keyRanged + " for " + textRanged + ", " + keyChaser + " for " + textChaser + ", " + keyHealth + " for " + textHealthPack + ", and " + keyPowerup + " for " + textPowerUp + ".";

// Text Variables
var font;
var showText = "";
var instructOn = true; // The Editor Mode instructions are on by default

// Enemy (created in Editor Mode, sits still)
var enemyImage = "images/enemy.png";
var enemyWidth = 64;
var enemyHeight = 64;
var enemyFrames = 1;
var newEnemyColliderX = 40;
var newEnemyColliderY = 60;


    /*------------------------------------------------------/
   /                                                       /
  /                      Load Assets                      /
 /                                                       /
/------------------------------------------------------*/


// <-------------- Preload: Define Images -------------->

function preload() {
    // Music
    song = loadSound("Music/ElectronicMusic.mp3", loaded);
    
    // Font
    font = loadFont("fonts/Poppins-Bold.ttf");
    
    // Still Images
    startImg = loadImage(startButtonImage);
    winbgImg = loadImage(winBgImage);
    gameoverbgImg = loadImage(gameoverBgImage);
    //titleBackground = loadImage("images/first_level.png"); // This is an example of changing the title screen to an image instead of a color
    
    // Player
    // Load Images
    playerWalkImg = loadSpriteSheet(playerWalkImage, playerWidth, playerHeight, runFrames);
    playerIdleImg = loadSpriteSheet(playerIdleImage, playerWidth, playerHeight, idleFrames);
    playerAttackImg = loadSpriteSheet(playerAttackImage, playerWidthAttack, playerHeight, attackFrames); // playerWidth, playerHeight, attackFrames
    playerJumpImg = loadSpriteSheet(playerJumpImage, playerWidth, playerHeight, jumpFrames);
    // Load Animations
    playerWalk = loadAnimation(playerWalkImg);
    playerIdle = loadAnimation(playerIdleImg);
    playerAttack = loadAnimation(playerAttackImg);
    playerJump = loadAnimation(playerJumpImg);

    // Enemies
    monsterImg = loadSpriteSheet(monsterWalkImage, monsterWidth, monsterHeight, monsterFrames);
    enemyImg = loadSpriteSheet(enemyImage, enemyWidth, enemyHeight, enemyFrames);
    rangedImg = loadSpriteSheet(rangedEnemyAttackImage, rangedWidth, rangedHeight, rangedAttackFrames);
    rangedIdleImg = loadSpriteSheet(rangedEnemyIdleImage, rangedWidth, rangedHeight, rangedIdleFrames);
    spikeImg = loadSpriteSheet(spikeImage, spikeWidth, spikeHeight, spikeFrames);
    chaserImg = loadSpriteSheet(chaserMoveImage, chaserWidth, chaserHeight, chaserFrames);
    // Load Animations
    monsterWalk = loadAnimation(monsterImg);
    rangedAttack = loadAnimation(rangedImg);
    rangedIdle = loadAnimation(rangedIdleImg);
    enemyWalk = loadAnimation(enemyImg);
    spikeAnim = loadAnimation(spikeImg);
    chaserMove = loadAnimation(chaserImg);
    
    // Level Background
    platformImg = loadImage(platformImage);
    groundImg = loadImage(groundImage);
    wallImg = loadImage(wallImage);
    mountainImg = loadImage(mountainImage);
    treeImg = loadImage(treeImage);

    // Attacks
    hitboxImg = loadImage(hitboxImage);
    projectileImg = loadImage(projectileImage);
    
    // Enemy Attacks
    enemyProjectileImg = loadSpriteSheet(enemyProjectileImage, enemyProjectileWidth, enemyProjectileHeight, enemyProjectileFrames);
    enemyProjectileDestroyImg = loadSpriteSheet(enemyProjectileDestroyImage, enemyProjectileWidth, enemyProjectileHeight, enemyProjectileDestroyFrames);
    enemyProjectileIdleAnim = loadAnimation(enemyProjectileImg);
    enemyProjectileDestroyAnim = loadAnimation(enemyProjectileDestroyImg);
    
    // Items
    // Load Item Images
    coinImg = loadSpriteSheet(coinImage, coinWidth, coinHeight, coinFrames);
    goalImg = loadSpriteSheet(goalImage, goalWidth, goalHeight, goalFrames);
    powerupImg = loadSpriteSheet(powerupImage, powerWidth, powerHeight, powerFrames);
    healthPackImg = loadSpriteSheet(healthPackImage, healthPackWidth, healthPackHeight, healthPackFrames);
    // Load Item Animations
    coinSpin = loadAnimation(coinImg);
    goalAnim = loadAnimation(goalImg);
    powerUp = loadAnimation(powerupImg);
    healthPack = loadAnimation(healthPackImg);

    // Power-up Images/Animations for the Player
    playerWalkPowerImg = loadSpriteSheet(powerPlayerWalkImage, playerWidth, playerHeight, runFrames);
    playerIdlePowerImg = loadSpriteSheet(powerPlayerIdleImage, playerWidth, playerHeight, idleFrames);
    playerAttackPowerImg = loadSpriteSheet(powerPlayerAttackImage, playerWidthAttack, playerHeight, attackFrames); // playerWidth, playerHeight, attackFrames
    playerJumpPowerImg = loadSpriteSheet(powerPlayerJumpImage, playerWidth, playerHeight, jumpFrames);
    
    playerWalkPower = loadAnimation(playerWalkPowerImg);
    playerIdlePower = loadAnimation(playerIdlePowerImg);
    playerAttackPower = loadAnimation(playerAttackPowerImg);
    playerJumpPower = loadAnimation(playerJumpPowerImg);
    
    // Health Bar
    hpBgImg = loadImage(HPBgImage);
    hp4Img = loadImage(HP4Image);
    hp3Img = loadImage(HP3Image);
    hp2Img = loadImage(HP2Image);
    hp1Img = loadImage(HP1Image);
    hpBorderImg = loadImage(HPBorderImage);
}


// <-------------- Setup: Place Assets -------------->

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);

    // Background
    mountains = new Group();
    if (mountainSprite == "on" || mountainSprite == true) {
        makeMountainTiles();
    }
    
    trees = new Group();
    if (treeSprite == "on" || treeSprite == true) {
        if (currentLevel !== "Donut Canyon") {
            makeTreeTiles();
        }
    }
    
    if (defaultValues == true) {
        loadDefault();
    }
    
    // Create Player
    player = createSprite(playerX, playerY);
    player.addAnimation("idle", playerIdle);
    player.addAnimation("walk", playerWalk);
    player.addAnimation("attack", playerAttack);
    player.addAnimation("jump", playerJump);
    player.setCollider("rectangle", 0, 0, playerColliderX, playerColliderY);
    player.visible = false;
    
    // Powered up Player
    player.addAnimation("idlePower", playerIdlePower);
    player.addAnimation("walkPower", playerWalkPower);
    player.addAnimation("attackPower", playerAttackPower);
    player.addAnimation("jumpPower", playerJumpPower);

    // Create Ground, Platforms, and Walls
    ground = createSprite(groundX, groundY);
    ground.addImage(groundImg);
    ground.setCollider("rectangle");
    ground.visible = true;

    wall1 = createSprite(wall1X, wallY);
    wall1.addImage(wallImg);
    wall1.setCollider("rectangle");
    wall1.visible = true;
    
    wall2 = createSprite(wall2X, wallY);
    wall2.addImage(wallImg);
    wall2.setCollider("rectangle");
    wall2.visible = true;

    walls = new Group();
    walls.add(ground);
    walls.add(wall1);
    walls.add(wall2);
    
    goal = createSprite(goalX, goalY);
    goal.addAnimation("animated", goalAnim);
    goal.visible = false;
    
    
    /*------------------------------------------------------/
   /                                                       /
  /                      Level Setup                      /
 /                                                       /
/------------------------------------------------------*/

    
    // Default Level
    if (currentLevel == "Default") {
        levelInformation = {
          "platforms": [
            {
              "x": platformX,
              "y": platformY
            }
          ],
          "enemies": [
            {
              "x": monsterX,
              "y": monsterY,
              "type": "monster",
              "start": monsterX,
              "left": monsterLeft
            },
            {
              "x": chaserX,
              "y": chaserY,
              "type": "chaser"
            },
            {
              "x": rangedEnemyX,
              "y": rangedEnemyY,
              "type": "ranged"
            },
            {
              "x": spikeX,
              "y": spikeY,
              "type": "spike"
            }
          ],
          "coins": [
            {
              "x": coinX,
              "y": coinY
            }
          ],
          "healths": [
            {
              "x": healthPackX,
              "y": healthPackY
            }
          ],
          "powerups": [
            {
              "x": powerX,
              "y": powerY
            }
          ]
        }
    } 
    
    // Blank Level
    if (currentLevel == "Blank Level") {
        levelInformation = {
            "platforms": [],
            "enemies": [],
            "coins": [],
            "healths": [],
            "powerups": []
        }
    }
    
    // Donut Land Adventure
    if (currentLevel == "Donut Land Adventure") {
        loadDefault();
        myGameTitle = "Donut Land Adventure";
        myName = "Lee";
        levelInformation = {
          "platforms": [
            {
              "x": platformX,
              "y": platformY
            }
          ],
          "enemies": [
            {
              "x": monsterX,
              "y": monsterY,
              "type": "monster",
              "start": monsterX,
              "left": monsterLeft
            },
            {
              "x": chaserX,
              "y": chaserY,
              "type": "chaser"
            },
            {
              "x": rangedEnemyX,
              "y": rangedEnemyY,
              "type": "ranged"
            },
            {
              "x": spikeX,
              "y": spikeY,
              "type": "spike"
            }
          ],
          "coins": [
            {
              "x": coinX,
              "y": coinY
            }
          ],
          "healths": [
            {
              "x": healthPackX,
              "y": healthPackY
            }
          ],
          "powerups": [
            {
              "x": powerX,
              "y": powerY
            }
          ]
        }
    } 
    
    // Donut Canyon
    if (currentLevel == "Donut Canyon") {
        loadDefault();
        myGameTitle = "Donut Canyon";
        myName = "Lee";
        player.position.x = 130;
        player.position.y = 500;
        goal.position.x = 1400;
        goal.position.y = 400;
        ground.position.y = -100;
        wall1.position.x = -400;
        wall2.position.x = 2000;
        scoreVisible = "off";
        goldVisible = "off";
        hpBarSprite = "off";
        playerHp = 1;
        disableEditor = true;
        titleBackground = "brown";
        level1Background = "skyblue";
        youWinBackground = "pink";
        playerAttackType = "";
        
        levelInformation = {
          "platforms": [
            {
              "x": 1203,
              "y": 563
            },
            {
              "x": 1008,
              "y": 559
            },
            {
              "x": 784,
              "y": 579
            },
            {
              "x": 556,
              "y": 565
            },
            {
              "x": 357,
              "y": 519
            },
            {
              "x": 132,
              "y": 579
            }
          ],
          "enemies": [],
          "coins": [
            {
              "x": 250,
              "y": 400
            },
            {
              "x": 460,
              "y": 300
            },
            {
              "x": 660,
              "y": 400
            },
            {
              "x": 880,
              "y": 450
            },
            {
              "x": 1100,
              "y": 450
            },
            {
              "x": 1260,
              "y": 350
            }
          ],
          "healths": [],
          "powerups": []
        }

    }
    
    // Ghost Heights
    if (currentLevel == "Ghost Heights") {
        loadDefault();
        myGameTitle = "Ghost Heights";
        myName = "Lee";
        player.position.x = 130;
        goal.position.x = 1400;
        goal.position.y = 200;
        hpBarSprite = "off";
        playerHp = 2;
        titleBackground = "black";
        level1Background = "orange";
        youWinBackground = "gray";
        playerAttackType = "";
        
        levelInformation = {
          "platforms": [
            {
              "x": 220,
              "y": 560
            },
            {
              "x": 370,
              "y": 485
            },
            {
              "x": 540,
              "y": 430
            },
            {
              "x": 750,
              "y": 340
            }, 
            {
              "x": 910,
              "y": 230
            },
            {
              "x": 1200,
              "y": 375
            }
              
          ],
          "enemies": [
            {
              "x": 470,
              "y": 600,
              "type": "monster"
            },
            {
              "x": 1100,
              "y": 600,
              "type": "monster"
            },
            {
              "x": 280,
              "y": 300,
              "type": "chaser"
            },
            {
              "x": 650,
              "y": 280,
              "type": "chaser"
            },
            {
              "x": 1060,
              "y": 280,
              "type": "chaser"
            },
            {
              "x": -55,
              "y": 360,
              "type": "ranged"
            },
            {
              "x": 1000,
              "y": 600,
              "type": "spike"
            }
          ],
          "coins": [
            {
              "x": 225,
              "y": 500
            },
            {
              "x": 370,
              "y": 420
            },
            {
              "x": 535,
              "y": 365
            },
            {
              "x": 750,
              "y": 280
            },
            {
              "x": 905,
              "y": 150
            },
            {
              "x": 1200,
              "y": 300
            }
          ],
          "healths": [],
          "powerups": []
        }
    }
    
    // Hidden Donut
    if (currentLevel == "Hidden Donut") {
        loadDefault();
        myGameTitle = "Hidden Donut";
        myName = "Lee";
        player.position.x = 130;
        goal.position.y = 320;
        titleBackground = "blue";
        level1Background = "pink";
        youWinBackground = "skyblue";
        playerAttackType = "";
        
        levelInformation = {
          "platforms": [
            {
              "x": 160,
              "y": 600
            },
            {
              "x": 325,
              "y": 495
            },
            {
              "x": 425,
              "y": 415
            },
            {
              "x": 575,
              "y": 380
            },
            {
              "x": 760,
              "y": 335
            },
            {
              "x": 950,
              "y": 360
            },
            {
              "x": 1095, // left
              "y": 330
            },

            {
              "x": 1195, // top
              "y": 250
            }, 
            {
              "x": 1195, // bottom
              "y": 400
            },
            {
              "x": 1300, // right
              "y": 330
            }
          ],
          "enemies": [
            {
              "x": 830,
              "y": 600,
              "type": "monster"
            },
            {
              "x": 480,
              "y": 600,
              "type": "ranged"
            },
            {
              "x": 645,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 1020,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 1200,
              "y": 200,
              "type": "spike"
            }
          ],
          "coins": [
            {
              "x": 220,
              "y": 455
            },
            {
              "x": 330,
              "y": 345
            },
            {
              "x": 470,
              "y": 315
            },
            {
              "x": 650,
              "y": 535
            },
            {
              "x": 655,
              "y": 275
            },
            {
              "x": 885,
              "y": 255
            },
            {
              "x": 1050,
              "y": 200
            },
            {
              "x": 1015,
              "y": 500
            },
            {
              "x": 1200,
              "y": 100
            }
          ],
          "healths": [],
          "powerups": []
        }
    }
    
    // Spikey Spikers
    if (currentLevel == "Spikey Spikers") {
        //loadDefault();
        myGameTitle = "Spikey Spikers";
        myName = "Lee";
        player.position.x = 130;
        goal.position.y = 220;
        //jumpMax = 3;
        disableEditor = true;
        scoreVisible = "off";
        goldVisible = "off";
        hpBarSprite = "off";
        playerHp = 1;
        titleBackground = "maroon";
        level1Background = "purple";
        youWinBackground = "yellow";
        playerAttackType = "";
        
        levelInformation = {
          "platforms": [],
          "enemies": [
            {
              "x": 360,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 440,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 530,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 790,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 870,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 960,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 1070,
              "y": 600,
              "type": "spike"
            }
              
          ],
          "coins": [
            {
              "x": 360,
              "y": 535
            },
            {
              "x": 440,
              "y": 535
            },
            {
              "x": 530,
              "y": 535
            },
            {
              "x": 780,
              "y": 535
            },
            {
              "x": 870,
              "y": 535
            },
            {
              "x": 955,
              "y": 535
            },
            {
              "x": 1065,
              "y": 535
            }
          ],
          "healths": [],
          "powerups": []
        }
    }
    
    // Unreachable Goal
    if (currentLevel == "Unreachable Goal") {
        //loadDefault();
        myGameTitle = "Unreachable Goal";
        myName = "Lee";
        player.position.x = 130;
        //goal.position.x = 800;
        disableEditor = true;
        titleBackground = "green";
        level1Background = "teal";
        youWinBackground = "blue";
        playerAttackType = "ranged";
        
        levelInformation = {
          "platforms": [
            {
              "x": 1030, // top (10)
              "y": 60
            },
            {
              "x": 1030, // 9
              "y": 120
            },
            {
              "x": 1030, // 8
              "y": 180
            },
            {
              "x": 1030, // 7
              "y": 240
            },
            {
              "x": 1030, // 6
              "y": 300
            },
            {
              "x": 1030, // 5
              "y": 360
            },
            {
              "x": 1030, // 4
              "y": 420
            },
            {
              "x": 1030, // 3
              "y": 480
            },
            {
              "x": 1030, // 2
              "y": 540
            },
            {
              "x": 1030, // bottom (1)
              "y": 600
            }
          ],
          "enemies": [
            {
              "x": 735,
              "y": 600,
              "type": "monster"
            },
            {
              "x": 360,
              "y": 600,
              "type": "ranged"
            },
            {
              "x": 1035,
              "y": 0,
              "type": "spike"
            }
          ],
          "coins": [],
          "healths": [],
          "powerups": []
        }

    }
    
    // Invisible Path
    if (currentLevel == "Invisible Path") {
        loadDefault();
        myGameTitle = "Invisible Path";
        myName = "Lee";
        player.position.x = 130;
        goal.position.x = 150;
        goal.position.y = 100;
        scoreVisible = "off";
        goldVisible = "off";
        hpBarSprite = "off";
        titleBackground = "plum";
        level1Background = "white";
        youWinBackground = "violet";
        playerAttackType = "";
        
        levelInformation = {
            "platforms": [],
            "enemies": [],
            "coins": [],
            "healths": [],
            "powerups": []
        }

    }
    
    // Donut Mania
    if (currentLevel == "Donut Mania") {
        loadDefault();
        myGameTitle = "Donut Mania";
        myName = "Lee";
        player.position.x = 200;
        goal.position.x = 40;
        goal.position.y = 100;
        disableEditor = true;
        titleBackground = "MEDIUMPURPLE";
        level1Background = "LIGHTGREEN";
        youWinBackground = "MEDIUMVIOLETRED";
        playerAttackType = "ranged";
        
        levelInformation = {
          "platforms": [
            /*{
              "x": 90,
              "y": 110
            },*/
            {
              "x": 240,
              "y": 180
            },
            {
              "x": 370,
              "y": 245
            },
            {
              "x": 500,
              "y": 315
            },
            {
              "x": 625,
              "y": 390
            },
            {
              "x": 765,
              "y": 460
            },
            {
              "x": 905,
              "y": 570
            },
            {
              "x": 1045,
              "y": 485
            },
            {
              "x": 1055,
              "y": 300
            },
            {
              "x": 1215,
              "y": 195
            },
            {
              "x": 1190,
              "y": 410
            }
          ],
            
          "enemies": [
            {
              "x": -5,
              "y": 300,
              "type": "chaser"
            },
            {
              "x": 1155,
              "y": 300,
              "type": "chaser"
            },
              
              
            {
              "x": 480,
              "y": 250,
              "type": "monster", // on the platform
              "start": 480,
              "left": 540
            },
            {
              "x": 600,
              "y": 600,
              "type": "monster",
              "start": 600,
              "left": 745
            },

            {
              "x": 235,
              "y": 125,
              "type": "ranged"
            },
            {
              "x": 755,
              "y": 400,
              "type": "ranged"
            },
            {
              "x": 1170,
              "y": 600,
              "type": "ranged"
            },
            {
              "x": 1055,
              "y": 245,
              "type": "ranged"
            },
              
            {
              "x": -10,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 50,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 300,
              "y": 600,
              "type": "spike"
            },
            {
              "x": 1300,
              "y": 600,
              "type": "spike"
            }
          ],
            
          "coins": [
            {
              "x": -10,
              "y": 530
            },
            {
              "x": 50,
              "y": 530
            },
            {
              "x": 90,
              "y": 240
            },
            {
              "x": 305,
              "y": 525
            },
            {
              "x": 370,
              "y": 180
            },
            {
              "x": 625,
              "y": 320
            },
            {
              "x": 810,
              "y": 550
            },
            {
              "x": 905,
              "y": 500
            },
            {
              "x": 1300,
              "y": 530
            }  
          ],
            
          "healths": [
            {
              "x": 1215,
              "y": 120
            }
          ],
          "powerups": [
            {
              "x": -5,
              "y": 400 //455
            }
          ]
        }
    }
    
    
    /*------------------------------------------------------/
   /                                                       /
  /                     Custom Level                      /
 /                                                       /
/------------------------------------------------------*/

    // Your Custom Level
    if (currentLevel == "myLevel") {
            levelInformation = {
                 // Paste your level information here (from the JSON file)!
                
                
            }   
    }
    
   

    
    
    
    
    
    
    
    

/**************************************************************************

                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    
                    
   !!!!!!!!!!!!!!!    DON'T CHANGE ANY CODE BELOW HERE    !!!!!!!!!!!!!!!
   
   
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx              

***************************************************************************/


    
    
    
    
    
    
    
    
    
    
    
    /*------------------------------------------------------/
   /                                                       /
  /              Load Assets (Continued)                  /
 /                                                       /
/------------------------------------------------------*/

    
// <-------------- Setup: Place Additional Assets -------------->
    
    // Enemy Groups
    enemies = new Group();
    monsters = new Group();
    chasers = new Group();
    ranged = new Group();
    spikes = new Group();
    obstacles = new Group();
    enemyProjectiles = new Group(); // Ranged Enemy

    
    // Item Groups
    platforms = new Group();
    collectibles = new Group();
    powerups = new Group();
    healths = new Group();

    allItems = new Group(); // Group for all Editor Mode objects
  
    loadLevelJSON(levelInformation); // Loads the currentLevel
    
    // Title Screen
    startButton = createSprite(startButtonX, startButtonY);
    startButton.addImage(startImg);
    startButton.setCollider("rectangle", 0, 0, startWidth, startHeight);
    startButton.visible = false;
    
    // You Win Screen
    winbg = createSprite(winBgX, winBgY);
    winbg.addImage(winbgImg);
    winbg.visible = false;
    
    // Game Over Screen
    gameoverbg = createSprite(gameoverBgX, gameoverBgY);
    gameoverbg.addImage(gameoverbgImg);
    gameoverbg.visible = false;
    
    // Player Attacks
    hitboxes = new Group(); // Melee
    projectiles = new Group(); // Ranged
    attacks = new Group(); // All types of player attacks

   // Create Health
    hpBg = createSprite(hpX, hpY);
    hpBg.addImage(hpBgImg);
    hpImg = createSprite(hpX, hpY); 
    hpImg.addImage("red", hp1Img);
    hpImg.addImage("orange", hp2Img);
    hpImg.addImage("yellow", hp3Img);
    hpImg.addImage("green", hp4Img);
    hpBorder = createSprite(hpX, hpY);
    hpBorder.addImage(hpBorderImg); 
    
    // Editor UI elements
    fileUploadInput = createFileInput(uploadLevel);
    fileUploadInput.position(25, 720 - fileUploadInput.size().height -10);
    fileUploadInput.hide();
}

function loaded() {
  song.play();
  song.loop();
}

    /*------------------------------------------------------/
   /                                                       /
  /                  Keyboard Inputs                      /
 /                                                       /
/------------------------------------------------------*/


// <-------------- Key Pressed & Released
//                  (Jumping, Deleting Objects, & Saving Levels) -------------->

function keyReleased() {
    if (keyCode == deleteKey && delPressed == true) { // Delete Key
        delPressed = false;
    }
}

function keyPressed() {
    // Jumping
    if (keyCode == jumpKey || keyCode == jumpKey2) { // Spacebar or W key
        if (gamePlay == true) {
            if (jumpCount < jumpMax) {
                jumping();
            }
        }
    }

    // Proceed past the title screen
    if (keyCode == proceedKey) { // Enter key
        if (scene == "title") {
            scene = "level1";
        }
    }
    
    if (keyCode == reloadKey) { // R key
        window.location.reload();
    }
    
    // This prevents the player from being able to hold down this button
    if (keyCode == attackKey && gamePlay == true && playerAttackStyle == "melee") {  // Q key 
        hitboxes.removeSprites();
        meleeAttack = true;
        attack();
    }
        
    // Delete Object
    if (keyCode == deleteKey && delPressed == false) { // Delete Key
        delPressed = true;
    }
    
    // Save Level
    if (keyCode == saveKey && editorMode == true) { // V key 
        var saveFile = prompt("Save your file as:");
        saveLevel(saveFile);
        console.log("Saved file as " + saveFile);
    }

    // Editor Mode
    if (keyCode == editorKey && gamePlay == true && disableEditor == false) { // E key
        if (editorMode == false) {
            editorMode = true;
            console.log("Current Object: " + editObject + ".");
            console.log(editorButtons);
            fileUploadInput.show();
        } else {
            camera.position.y = camY;
            editorMode = false;
            fileUploadInput.hide();
        }
        console.log("Editor Mode On: " + editorMode);
    }
    
    // Instructional Text On
    if (keyCode == instructKey && editorMode == true) {
        if (instructOn == true) {
            instructOn = false;
        } else {
            instructOn = true;
        }
        console.log("Instructions On: " + instructOn);
    }
}


    /*------------------------------------------------------/
   /                                                       /
  /                  Player Mechanics                     /
 /                                                       /
/------------------------------------------------------*/


// <-------------- Player Movements (Arrow Keys & More Mechanics) -------------->

function playerMovement() { // Moving left and right
    if (keyIsDown(leftKey)) { // A key, left
        if (player.position.x < borderLeft) {
            player.velocity.x = 0;
            moving = true;
        } else {
            player.velocity.x = -playerSpeed;
            player.mirrorX(-1); // If your character can't be flipped and you need another sprite, this needs to be replaced
            directionFacing = "left";
            moving = true;
        }
    } else if (keyIsDown(rightKey)) { // D key, right
        if (player.position.x > borderRight) {
            player.velocity.x = 0;
            moving = true;
            
        } else {
            player.velocity.x = playerSpeed;
            player.mirrorX(1);
            directionFacing = "right";
            moving = true;
        }
    } else {
        player.velocity.x = 0;
        moving = false;
    }
    
    // Jumping and Gravity
    var grounded = false;

    // for x of array.toArray()) {  }, x is basically just every value of the array that it loops through
    for (wall of walls.toArray()) {
        if (wall.overlapPixel(player.position.x, player.position.y + 28)) {
            player.velocity.y = 0;
            jumpActive = false;
            grounded = true;
            jumpCount = 0;
            break;
        }
    }
    if (grounded == false) {
        player.velocity.y += GRAVITY;
    }
    
    // Run
    if (keyIsDown(runKey)) { // When holding Shift, the player runs faster
        playerSpeed = runSpeed;
    } else {
        playerSpeed = walkSpeed;
    }
    
}


// <-------------- Player Sprite Animations -------------->

function playerSprite() {
    if (jumpActive == true) {
        if (playerPower == false) {
            player.changeAnimation("jump");
        } else {
            player.changeAnimation("jumpPower");
        }
    } else if (moving == true) {
        if (playerPower == false) {
            player.changeAnimation("walk");
        } else {
            player.changeAnimation("walkPower");
        }
    } else if (meleeAttack == true) {
        if (playerPower == false) {
            player.changeAnimation("attack");
        } else {
            player.changeAnimation("attackPower");
        }
    } else {
        if (playerPower == false) {
            player.changeAnimation("idle");
        } else {
            player.changeAnimation("idlePower");
        }
    }
}


// <-------------- Player Jumping -------------->
// * Refer back to the "Keyboard Inputs" section

function jumping() {
    jumpCount += 1;
    jumpActive = true;
    player.velocity.y = jump;
}


// <-------------- Player Attacks -------------->

function attack(){
    hitboxes.removeSprites();
    if (meleeAttack == true) {
        if (directionFacing == "right") {
            var hitbox = createSprite(player.position.x + hitboxX, player.position.y);
        } else if (directionFacing == "left") {
            var hitbox = createSprite(player.position.x - hitboxX, player.position.y);
        }
        hitbox.addImage(hitboxImg);
        //hitbox.addImage(projectileImg); // can change to projectileImg to show sprite (hitboxImg is invisible)
        hitbox.setCollider("rectangle", 0, 0, hitboxColliderX, hitboxColliderY);
        hitboxes.add(hitbox);
        attacks.add(hitbox);
        
        if (debugGame == "on" || debugGame == true) {
            hitbox.debug = true;
        } else {
            hitbox.debug = false;
        }
        
        setTimeout (attackOff, 400); // The hitbox projectile disappears after a certain amount of time
    }
}


function attackOff() {
    hitboxes.removeSprites();
    meleeAttack = false;
}

// <-------------- Health Bar -------------->

var stopInvincible;

function damagePlayer() {    
    if (invincible == false) { // HP goes down by 1 if you're not invincible
        player.visible = false;
        invincible = true;
        playerHp = playerHp - 1;  
      
        if (directionFacing == "left") {
            player.position.x += 10;
        } else {
            player.position.x -= 10;
        }
      
        stopInvincible = frameCount + 60; // frameCount is how many seconds pass in the game 
    }
       
    if (playerHp <= 0) { // Game Over
        gameOver();
    }
}

function invincibleTimer() { // This adds time so the player isn't destroyed immediately
  if (frameCount > stopInvincible && invincible == true) { // Once the frameCount number of seconds pass, the Player's no longer invincible
      player.visible = true;
      playerPower = false;
      invincible = false;
  }
}

function healthBar() {
    if (playerHp >= 4) {
        hpImg.changeImage("green");
    } else if (playerHp == 3) {
        hpImg.changeImage("yellow");     
    } else if (playerHp == 2) {
        hpImg.changeImage("orange"); 
    } else if (playerHp == 1) {
        hpImg.changeImage("red");   
    } else {
      hpImg.remove();
    }
}


    /*------------------------------------------------------/
   /                                                       /
  /                  Game Objects                         /
 /                                                       /
/------------------------------------------------------*/


// <-------------- Enemies -------------->

function monsterMovement() {
    for (enemy of monsters) {
        enemy.maxSpeed = monsterSpeed;
        
        if (ground.overlapPixel(enemy.position.x, enemy.position.y + 28) == false) {
             enemy.velocity.y += GRAVITY;
        }
        
        for (wall of walls) {
            while (wall.overlapPixel(enemy.position.x, enemy.position.y + 28)) {
                enemy.position.y--;
                enemy.velocity.y = 0;
            }
        }
        
        while (ground.overlapPixel(enemy.position.x, enemy.position.y + 28)) {
            enemy.position.y--;
            enemy.velocity.y = 0;
        }
        
        if (enemy.position.x >= enemy.left && editorMode == false) { // Move Left
            enemy.direction = "left";
            enemy.velocity.x = -5;
            enemy.mirrorX(-1);
        } else if (enemy.position.x <= enemy.start && editorMode == false) { // Move Right
            enemy.direction = "right"
            enemy.velocity.x = 5;
            enemy.mirrorX(1);
        } else if (editorMode == true) {
            enemy.velocity.x = 0;
        }
        
        // Restart after Editor Mode or a bump
        if (Math.abs(enemy.velocity.x) < 5 && editorMode == false) {
            if (enemy.direction === "left") {
                enemy.velocity.x = -5
            } else {
                enemy.velocity.x = 5;
            }
        }
    }
}


function enemyMovement() {
    monsterMovement();
    chaserEnemies();
    rangedEnemies();
}

// Enemy (ghost) chases the player
function chaserEnemies() {
    for (chaser of chasers) {
        chaser.maxSpeed = chaserSpeed;
        if (player.position.x > chaser.position.x - 200 &&
            player.position.x < chaser.position.x + 200 &&
            player.position.y > chaser.position.y - 200 &&
            player.position.y < chaser.position.y + 200 &&
            editorMode == false) { // Only follows the player if you're not in Editor Mode
                chaser.attractionPoint(0.09, player.position.x, player.position.y);
        } else {
            if (chaser.position.y >= chaserHigh) { // Move Down
                chaser.velocity.y -= 5;
                chaser.position.y -= 5;
            } else if (chaser.position.y <= chaserLow) { // Move Up
                chaser.velocity.y += 5;
                chaser.position.y += 5;
            } else if (editorMode == true) { // Stops moving in Editor Mode
                chaser.velocity.y = 0;
            }
        }
    }
}


// <-------------- Ranged Enemy -------------->

// Enemy that shoots projectiles towards the player (rangedEnemy)
function rangedEnemies() {
    for (enemy of ranged) {
        if (enemy.removed == false && editorMode == false) {
            if (player.position.x > enemy.position.x - rangedAttackRange &&
                player.position.x < enemy.position.x + rangedAttackRange &&
                player.position.y > enemy.position.y - rangedAttackRange &&
                player.position.y < enemy.position.y + rangedAttackRange) {
                    
                    enemy.changeAnimation("attack");
                    if (coolDown == false) {
                        createEnemyProjectile(enemy);
                    } else {
                        setTimeout(enemyTimer, 400);
                    }
            } else {
                enemy.changeAnimation("idle");
            }
            
            if (ground.overlapPixel(enemy.position.x, enemy.position.y + 28) == false) {
                enemy.velocity.y += GRAVITY;
            }
            
            while (ground.overlapPixel(enemy.position.x, enemy.position.y + 28)) {
                enemy.position.y--;
                enemy.velocity.y = 0;
            }
        }
    }
}

var enemyProjectile;

function createEnemyProjectile(enemy) {
    playerX = player.position.x;
    playerY = player.position.y;
    if (editorMode == false) {  // The enemy won't shoot projectiles in Editor Mode
            if (enemy.removed == false) {
                if (playerX > rangedEnemyX) {
                    enemy.mirrorX(1);
                    //var 
                    enemyProjectile = createSprite(enemy.position.x + 15, enemy.position.y - 20);
                } else {
                    enemy.mirrorX(-1);
                    //var 
                    enemyProjectile = createSprite(enemy.position.x - 15, enemy.position.y - 20);
                }
                enemyProjectile.addAnimation("destroy", enemyProjectileDestroyAnim);
                enemyProjectile.addAnimation("idle", enemyProjectileIdleAnim);
                enemyProjectile.changeAnimation("idle");
                
                enemyProjectile.attractionPoint(projectileSpeed/5, playerX, playerY);
                enemyProjectile.setCollider("rectangle", 0, 0, enemyProjectileColliderX, enemyProjectileColliderY);
                enemyProjectiles.add(enemyProjectile);
                allItems.add(enemyProjectile);

                if (debugGame == "on" || debugGame == true) {
                    enemyProjectile.debug = true;
                } else {
                    enemyProjectile.debug = false;
                }        
                
                coolDown = true;
                stopProjectiles = frameCount + 40;
            }
    }
}


function enemyTimer() {
    if (frameCount > stopProjectiles && coolDown == true) { // Once the frameCount number of seconds pass, the enemy attacks again
        coolDown = false;
  }
}


// <-------------- Collectibles -------------->

function increaseGold(coinObject) {
    gold += goldIncrease;
    score += goldScore;
    coinObject.remove();
}

// <-------------- Powerups -------------->

function powerupItem(powerupObject) {
    stopInvincible = frameCount + 200;
    /*if (score == 0) {
        score -= 10;
    }*/
    playerPower = true;
    powerupObject.remove();
}


// <-------------- Health Pack -------------->

function healthPackItem(healthObject) {
    if (playerHp <= 3) {
        playerHp += 1;
    } else {
        score += hpScore;
    }
    healthObject.remove();
}


// <-------------- Background Sprites -------------->

function makeMountainTiles() {
  for (var i = 0; i < totalMountainImages; i++) {
      var mountain = createSprite(mountainWidth * i, mountainY);
      mountain.addImage(mountainImg);
      mountain.visible = false;
      mountains.add(mountain);
      if (debugGame == "on" || debugGame == true) {
          mountain.debug = true;
      }
  }
}

function makeTreeTiles() {
  for (var i = 0; i < totalTreeImages; i++) {
      var tree = createSprite(treeWidth * i, treeY);
      tree.addImage(treeImg);
      tree.visible = false;
      trees.add(tree);
      if (debugGame == "on" || debugGame == true) {
          tree.debug = true;
      }
  }
}

function parallax(image) { //  Mountains
  if (editorMode == false) {
    if (image == mountains) {
      for (let i = 0; i < mountains.size(); i++) {
       mountains.get(i).visible = true;
        mountains.get(i).position.x=player.position.x/2+ mountains.get(i).width*i; // /2 + 50
      }
    }
  }
}

function parallaxFront(image) { // Trees
  if (editorMode == false) {
    if (image == trees) {
      for (let i = 0; i < trees.size(); i++) {
       trees.get(i).visible = true;
        trees.get(i).position.x=player.position.x/4+ trees.get(i).width*i;
      }
    }
  }
}

/*
    
*/


    /*------------------------------------------------------/
   /                                                       /
  /                    Collisions                         /
 /                                                       /
/------------------------------------------------------*/

function collisions() {
    enemies.overlap(attacks, destroyOther); // Enemy destroyed by projectile or attack
    player.collide(walls);
    obstacles.collide(walls);
    attacks.collide(walls, destroySelf);
    enemyProjectiles.collide(walls, projectileHitWall);
    attacks.collide(spikes, destroySelf);
    collectibles.overlap(player, increaseGold);
    powerups.overlap(player, powerupItem);
    healths.overlap(player, healthPackItem);
    goal.overlap(player, endGame);

    
    if (playerPower == false) {
        player.overlap(enemyProjectiles, enemyProjectileDestroy);
        player.collide(obstacles, damagePlayer);
    } else {
        enemyProjectiles.overlap(player, destroySelfPower);
        obstacles.collide(player, destroySelfPower);
    }
}


function destroyOther (destroyed, attack) {
    destroyed.remove();
    attacks.removeSprites();
    projectiles.remove(attack);
    hitboxes.remove(attack);
    attacks.remove(attack);
    
    score += enemyScore;
}

function destroySelf (destroyed) {
    destroyed.remove();
}

function projectileHitWall(projectile){
      projectile.changeAnimation("destroy");
    projectile.velocity.x = 0;
    projectile.velocity.y = 0;
      finishAnimationThenDestroy(projectile);
}

function finishAnimationThenDestroy(destroyed){
  destroyed.life = destroyed.animation.getLastFrame();
}

function destroySelfPower (destroyed) {
    destroyed.remove();
    score += powerScore;
}

function enemyProjectileDestroy(player, projectile) {
    projectile.changeAnimation("destroy");
    projectile.velocity.x = 0;
    projectile.velocity.y = 0;
    damagePlayer();
    enemyProjectiles.remove(projectile);
    finishAnimationThenDestroy(projectile);
}


    /*------------------------------------------------------/
   /                                                       /
  /                   Mouse Pressed                       /
 /                                                       /
/------------------------------------------------------*/


// Whenever the mouse is pressed
function mousePressed() {
    // Editor Mode
    if (editorMode == true && delPressed == false && zoomOut == false) { // Check for Delete key here so a platform isn't added
        if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY <= (canvasHeight - 80)) {
            if (editObject == textPlatform) {
                addPlatform(camera.mouseX, camera.mouseY); // When you click, it adds a platform wherever you click (only do this when zoomed in)
                console.log(textPlatform + " Added");
            } else if (editObject == textMonster) {
                addEnemy(camera.mouseX, camera.mouseY, "monster");
                console.log(textMonster + " Added");
            } else if (editObject == textSpike) {
                addEnemy(camera.mouseX, camera.mouseY, "spike");
                console.log(textSpike + " Added");
            } else if (editObject == textCoin) {
                addCoin(camera.mouseX, camera.mouseY);
                console.log(textCoin + " Added");
            } else if (editObject == textRanged) {
                addEnemy(camera.mouseX, camera.mouseY, "ranged");
                console.log(textRanged + " Added");
            } else if (editObject == textChaser) {
                addEnemy(camera.mouseX, camera.mouseY, "chaser");
                console.log(textChaser + " Added");
            } else if (editObject == textHealthPack) {
                addHealth(camera.mouseX, camera.mouseY, "healthpack");
                console.log(textHealthPack + " Added");
            } else if (editObject == textPowerUp) {
                addPowerup(camera.mouseX, camera.mouseY, "powerup");
                console.log(textPowerUp + " Added");
            }
        }
    }
    
    // Ranged Attack
    if (editorMode == false && gamePlay == true && playerAttackStyle == "ranged") {
        var projectile = createSprite(player.position.x, player.position.y);
        projectile.addImage(projectileImg);
        projectile.attractionPoint(projectileSpeed, camera.mouseX, camera.mouseY);
        projectile.setCollider("rectangle", 0, 0, projectileColliderX, projectileColliderY);
        projectiles.add(projectile);
        allItems.add(projectile);
        attacks.add(projectile);
        if (debugGame == "on") {
            projectile.debug = true;
        } else {
            projectile.debug = false;
        }
    }
}

// Remove Objects in Editor Mode
function spriteMouseUpdates() { 
    // Checks if Mouse + Delete Key are pressed so it can remove objects from the group
    if (editorMode == true && delPressed && zoomOut == false) {
        if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY <= canvasHeight) {
            for (let i = 0; i < allItems.length; i++) {
                allItems.get(i).mouseUpdate();
                if (allItems.get(i).mouseIsPressed) {
                    allItems.get(i).remove();
                    console.log("Object Removed");
                }
            }
        }
    }
}


    /*------------------------------------------------------/
   /                                                       /
  /                      Editor Mode                      /
 /                                                       /
/------------------------------------------------------*/
// * Refer back to the "Keyboard Inputs" section


// <-------------- Add Objects -------------->

// This will let the player dynamically click and create their own platforms in the level for game design
function addPlatform(x, y) {
    var newPlatform = createSprite(x, y);
    newPlatform.addImage(platformImg);
    newPlatform.setCollider("rectangle");
    walls.add(newPlatform);
    platforms.add(newPlatform);
    allItems.add(newPlatform); // Items need to be added to this group as they're created, so they can be later removed - needs to be true for each item type
    if (debugGame == "on") {
        newPlatform.debug = true;
    } else {
        newPlatform.debug = false;
    }
}

function addEnemy(x, y, type = "monster", patrolStart = undefined, patrolEnd = undefined) {
    var newEnemy = createSprite(x, y);

    // Specific for each type
    if (type === "monster") {
        newEnemy.addAnimation("walk", monsterWalk);
        newEnemy.setCollider("rectangle", 0, 0, monsterColliderX, monsterColliderY);
        if (patrolStart != undefined && patrolEnd != undefined) {
          newEnemy.start = patrolStart;
          newEnemy.left = patrolEnd;
        }
        else {
          newEnemy.start = x;
          newEnemy.left = x + monsterMoveRadius;
        }
        newEnemy.direction = "left";
        monsters.add(newEnemy);
        enemies.add(newEnemy);
    } else if (type === "chaser") {
        newEnemy.addAnimation("move", chaserMove);
        newEnemy.setCollider("rectangle", 0, 0, chaserColliderX, chaserColliderY);
        chasers.add(newEnemy);
        enemies.add(newEnemy);
    } else if (type === "ranged") {
        newEnemy.addAnimation("attack", rangedAttack);
        newEnemy.addAnimation("idle", rangedIdle);
        newEnemy.setCollider("rectangle", 0, 0, rangedColliderX, rangedColliderY);
        ranged.add(newEnemy);
        enemies.add(newEnemy);
    } else if (type === "spike") {
        newEnemy.addAnimation("animation", spikeAnim);
        newEnemy.setCollider("rectangle", 0, 0, spikeColliderX, spikeColliderY);
        spikes.add(newEnemy);
    } else {
        newEnemy.addAnimation("walk", enemyWalk);
        newEnemy.setCollider("rectangle", 0, 0, newEnemyColliderX, newEnemyColliderY);
        enemies.add(newEnemy);
    }

    // Same for all enemies
    newEnemy.maxSpeed = 10;
    if (debugGame == "on") {
        newEnemy.debug = true;
    } else {
        newEnemy.debug = false;
    }
    
    if(gamePlay == true){
    for (wall of walls.toArray()) {
        if (wall.overlapPixel(newEnemy.position.x, newEnemy.position.y + 28)) {
            newEnemy.velocity.y = 0;
            break;
        } else {
            newEnemy.velocity.y += GRAVITY;
        }
      }
    }
    obstacles.add(newEnemy);
    allItems.add(newEnemy);
}


function addCoin(x, y) {
    var newCoin = createSprite(x, y);
    newCoin.addAnimation("spin", coinSpin);
    newCoin.setCollider("rectangle", 0, 0, coinColliderX, coinColliderY);
    if (debugGame == "on") {
        newCoin.debug = true;
    } else {
        newCoin.debug = false;
    }
    collectibles.add(newCoin);
    allItems.add(newCoin);
}
    
function addHealth(x, y) {
    var newHealthPack = createSprite(x, y);
    newHealthPack.addAnimation("heal", healthPackImg);
    newHealthPack.setCollider("rectangle", 0, 0, healthPackColliderX, healthPackColliderY);
    if (debugGame == "on") {
        newHealthPack.debug = true;
    } else {
        newHealthPack.debug = false;
    }
    healths.add(newHealthPack);
    allItems.add(newHealthPack);
}
    
function addPowerup(x, y) {
    var newPowerup = createSprite(x, y);
    newPowerup.addAnimation("glow", powerUp);
    newPowerup.setCollider("rectangle", 0, 0, powerupColliderX, powerupColliderY);
    if (debugGame == "on") {
        newPowerup.debug = true;
    } else {
        newPowerup.debug = false;
    }
    powerups.add(newPowerup);
    allItems.add(newPowerup);
}


// <-------------- Switching Objects & Instructional Text -------------->

// Switches which object is active for placing
function objectSwitch() {
    if (editorMode == true) {
        if (keyIsPressed == true) {
            if (keyCode == objectKey1) { // 1
                editObject = textPlatform;
                console.log("Object Switched to: " + editObject);
            } else if (keyCode == objectKey2) { // 2
                editObject = textCoin;
                console.log("Object Switched to: " + textCoin);
            } else if (keyCode == objectKey3) { // 3
                editObject = textSpike;
                console.log("Object Switched to: " + editObject);
            } else if (keyCode == objectKey4) { // 4
                editObject = textMonster;
                console.log("Object Switched to: " + editObject);
            } else if (keyCode == objectKey5) { // 5
                editObject = textRanged;
                console.log("Object Switched to: " + editObject);
            } else if (keyCode == objectKey6) { // 6
                editObject = textChaser;
                console.log("Object Switched to: " + editObject);
            } else if (keyCode == objectKey7) { // 7
                editObject = textHealthPack;
                console.log("Object Switched to: " + editObject);
            } else if (keyCode == objectKey8) { // 8
                editObject = textPowerUp;
                console.log("Object Switched to: " + editObject);
            }
        }
    }
}
    

// Instructions for how to use Editor Mode
function editorInstructions() {
    // If Editor Mode is on, it'll show this text
    if (editorMode == true) {
        camera.off();
        instructionText();
        text("EDITOR MODE [ACTIVE]", editInstructX + 300, editInstructY + 560);
        text("Current Object:  " + editObject, editInstructX + 275, editInstructY + 590);
        text("Upload a level JSON file:", editInstructItemX - 30, editInstructY + 570);
        
        // If Instructions are on, it'll show this text:
        if (instructOn == true) {
            instructionText();
            text("Editor Mode Controls:", editInstructX, editInstructY - 10);
            text(keyPlatform + "  to Change Object to " + textPlatform, editInstructItemX, editInstructY + 25); // 175
            text(keyCoin + "  to Change Object to " + textCoin, editInstructItemX, editInstructY + 50); // 150
            text(keySpike + "  to Change Object to " + textSpike, editInstructItemX, editInstructY + 75); // 125
            text(keyEnemy + "  to Change Object to " + textMonster, editInstructItemX, editInstructY + 100); // 100
            text(keyRanged + "  to Change Object to " + textRanged, editInstructItemX, editInstructY + 125); // 75
            text(keyChaser + "  to Change Object to " + textChaser, editInstructItemX, editInstructY + 150); // 50
            text(keyHealth + "  to Change Object to " + textHealthPack, editInstructItemX, editInstructY + 175); // 25 
            text(keyPowerup + "  to Change Object to " + textPowerUp, editInstructItemX, editInstructY + 200); // 0
            
            text("Click  to Place an Object", editInstructItemX, editInstructY + 225); // -25
            text(keyDelete + " + Click  to Delete an Object", editInstructItemX, editInstructY + 250); // -50
            text(keyCameraMove + "  to Move Camera", editInstructItemX, editInstructY + 275); // -100
            text(keySave + "  to Save the Level", editInstructItemX, editInstructY + 300); // -125
            text(keyEditorMode + "  to Exit Editor Mode", editInstructItemX, editInstructY + 325); // -175
            text("(" + keyTurnOff + "  to Turn off Instructions)", editInstructItemX, editInstructY + 375); // -225
            camera.on();
        }
    }
}


// <-------------- Saving & Loading the Level -------------->

function saveLevel(name) {
    let platformPositions = []; // Add a new position for each new object (must be a group)
    for (platform of platforms) {
        platformPositions.push({
            x: platform.position.x,
            y: platform.position.y
      });
    }

    let enemyPositions = [];
    
    for (enemy of monsters) {
        enemyPositions.push({
            x: enemy.position.x,
            y: enemy.position.y,
            type: "monster",
            start: enemy.start,
            left: enemy.left
      });
    }
    
    for (enemy of chasers) {
        enemyPositions.push({
            x: enemy.position.x,
            y: enemy.position.y,
            type: "chaser"
        });
    }
    
    for (enemy of ranged) {
        enemyPositions.push({
            x: enemy.position.x,
            y: enemy.position.y,
            type: "ranged"
        });
    }
    
    //let spikePositions = [];
    for (spike of spikes) {
        enemyPositions.push({
            x: spike.position.x,
            y: spike.position.y,
            type: "spike"
      });
    }

    let coinPositions = [];
    for (coin of collectibles) {
        coinPositions.push({
            x: coin.position.x,
            y: coin.position.y
      });
    }
    
    let healthPackPositions = [];
    for (healthPack of healths) {
        healthPackPositions.push({
            x: healthPack.position.x,
            y: healthPack.position.y
      });
    }
    
    let powerupPositions = [];
    for (powerup of powerups) {
        powerupPositions.push({
            x: powerup.position.x,
            y: powerup.position.y
      });
    }

    let levelData = {
        platforms: platformPositions,
        enemies: enemyPositions,
        coins: coinPositions,
        healths: healthPackPositions,
        powerups: powerupPositions
    };
    
    saveJSON(levelData, name + ".json"); // Saves level data to a json file
    //console.log(JSON.stringify(levelData));
    storeItem(name, levelData);
}


function loadLevel(name) {
    let loadLevel = getItem(name);
    loadLevelJSON(loadLevel);
}

function loadLevelJSON(loadLevel){
    if (loadLevel != null) {
        let platformPositions = loadLevel.platforms;
        let enemyPositions = loadLevel.enemies;
        let coinPositions = loadLevel.coins;
        let healthPackPositions = loadLevel.healths;
        let powerupPositions = loadLevel.powerups;
        
        allItems.removeSprites();
        
        for (position of platformPositions) {
            addPlatform(position.x, position.y);
        }
        
        for (position of enemyPositions) {
            addEnemy(position.x, position.y, position.type, position.start, position.left);
        }

        for (position of coinPositions) {
            addCoin(position.x, position.y);
        }
        
        for (position of healthPackPositions) {
            addHealth(position.x, position.y);
        }
        
        for (position of powerupPositions) {
            addPowerup(position.x, position.y);
        }
    }
}

function uploadLevel(file){
    loadJSON(file.data, loadLevelJSON); 
    console.log("Loaded file named " + file.name);
}


    /*------------------------------------------------------/
   /                                                       /
  /                      Screens/Scenes                   /
 /                                                       /
/------------------------------------------------------*/


// <-------------- Show Text -------------->

function instructionText () {
    textFont(font);
    strokeWeight(4);
    stroke("black");
    textSize(18);
}
    
// <-------------- Title Screen -------------->
// * Refer back to the "Keyboard Inputs" section

function title() {
    startButton.visible = true; //startButton();
    titleButton();
    drawSprites();
    
    if (startSprite == "off" || startSprite == false) {
        startButton.remove();
    }
    
    textFont(font);
    titleText();
}

function titleButton() {
    startButton.mouseUpdate();
    if (startButton.mouseIsPressed == true) {
        gamePlay = true;
        scene = "level1";
    }
}

function titleText() {
    rectMode(CORNER);
    fill(colorTitle);
    
    // Start Button Text
    strokeWeight(4);
    stroke("black");
    textSize(30);
    textAlign(CENTER);
    text(textTitle, 0, 425, canvasWidth, canvasHeight);

    // Title Text
    textSize(41);
    textAlign(CENTER);
    text(myGameTitle, 0, 200, canvasWidth, canvasHeight); // Title of your game here
}

// <-------------- You Win Screen -------------->

function endGame() {
    gamePlay = false;
    scene = "youWin";
}

function youWin() {
    camera.position.x = 300;
    camera.position.y = 360;
    winbg.visible = true;
    drawSprites();
    strokeWeight(3);
    stroke("black");
    textFont(font);
    winText();
    if (winbgSprite == "off" || winbgSprite == false) {
        winbg.remove();
    }
}

function winText() {
    rectMode(CORNER);
    fill(colorWin);
    textAlign(CENTER);

    // You Win
    textSize(41);
    textAlign(CENTER);
    text(textWin, 0, 130, canvasWidth, canvasHeight);
    textSize(30);
    text("Thank you for playing, you did AWSOME!!!!!", 0, 210, canvasWidth, canvasHeight);
    
    // Credits
    textSize(20);
    text("Game Created by: " + myName, 0, 310, canvasWidth, canvasHeight);
    text("Special Thanks: iD Tech Camps", 0, 350, canvasWidth, canvasHeight);
    
    // Score
    textSize(25);
    text("Your Final Score Is " + score + "! Congratualations!", 0, 410, canvasWidth, canvasHeight);
  
  // Hope you enjoyed
  textSize(25);
    text("Hope you enjoyed, to replay, click R on your keyboard or reload this page", 0, 450, canvasWidth, canvasHeight);
}

// <-------------- Game Over Screen -------------->

function gameOver() {
    gamePlay = false;
    scene = "gameOver";
}

function removePlayer() {
    if (player.position.y >= 850) {
        gameOver();
    }
}

function gameEnd() {
    camera.position.x = 300;
    camera.position.y = 360;
    
    gameoverbg.visible = true;
    drawSprites();
    strokeWeight(4);
    stroke("black");
    textFont(font);
    gameOverText();
    if (gameoverbgSprite == "off" || gameoverbgSprite == false) {
        gameoverbg.remove();
    }
}

function gameOverText() {
    rectMode(CORNER);
    fill(colorGameOver);
    textAlign(CENTER);

    // Game Over
    textSize(71);
    textAlign(CENTER);
    text(textGameOver, 0, 230, canvasWidth, canvasHeight);
    textSize(25);
    text("Press " + keyReload + " to reload the page and try again", 0, 310, canvasWidth, canvasHeight);
    
    // Score
    textSize(35);
    text("Your Score: " + score, 0, 410, canvasWidth, canvasHeight);
}


    /*------------------------------------------------------/
   /                                                       /
  /                 Camera & Interface                    /
 /                                                       /
/------------------------------------------------------*/


// <-------------- Camera -------------->

function cam() {
    if (editorMode == false) {
        camera.position.x = player.position.x;
    }

    // Zoom in and out with the + and - keys
    if (keyIsDown(zoomInKey)) { // + key
        camera.zoom = 1;
        zoomOut = false;
    }
    if (keyIsDown(zoomOutKey)) { // - key
        camera.zoom = 0.5;
        zoomOut = true;
    }
}

function moveCam() {
    if (editorMode == true) { // Arrow keys to move the Camera
        if (keyIsDown(panUpKey)) { 
            camera.position.y -= playerSpeed;
        } else if (keyIsDown(panLeftKey)) { 
            camera.position.x -= playerSpeed;
        } else if (keyIsDown(panDownKey)) { 
            camera.position.y += playerSpeed;
        } else if (keyIsDown(panRightKey)) {
            camera.position.x += playerSpeed;
        }
    }
}


// <-------------- Graphical User Interface -------------->

function gui() {
    if (editorMode == false) { // && scene == "level"
        hpBg.visible = true;
        hpImg.visible = true;
        hpBorder.visible = true;
        
        camera.off();
        fill(colorGUI);
        strokeWeight(2);
        stroke("black");
        textFont(font);
        textSize(20);
        if (scoreVisible == "on" || scoreVisible ==  true) {
            text(textScore + score, scoreX, scoreY);
        }
        if (goldVisible == "on" || goldVisible == true) {
            text(textCoin + "s: " + gold, goldX, goldY);
        }

        camera.on();

        // Health Bar Display
        hpX = camera.position.x - hpPosX;
        hpY = camera.position.y - hpPosY;

        hpBg.position.x = hpX;
        hpBg.position.y = hpY;
        hpImg.position.x = hpX;
        hpImg.position.y = hpY;
        hpBorder.position.x = hpX;
        hpBorder.position.y = hpY;
        
    } else {
        hpBg.visible = false;
        hpImg.visible = false;
        hpBorder.visible = false;
    }
}


    /*------------------------------------------------------/
   /                                                       /
  /                Sprite Visibility                      /
 /                                                       /
/------------------------------------------------------*/


// <-------------- Draw or Remove Sprites -------------->

function removeTitle() {
    startButton.visible = false;
}

function drawLevel1() {
    // Remove Sprites if they're turned off
    if (goalSprite == "off" || goalSprite == false) {
        goal.remove();
    }
    
    if (wall1Sprite == "off" || wall1Sprite == false) {
        wall1.remove();
    }
    
    if (wall2Sprite == "off" || wall2Sprite == false) {
        wall2.remove();
    }
    
    if (hpBarSprite == "off" || hpBarSprite == false) {
        hpBg.remove();
        hpImg.remove();
        hpBorder.remove();
    }
    
    // Draw Sprites
    player.visible = true;
    
    for (item of allItems) {
        item.visible = true; 
    }

    ground.visible = true;
    goal.visible = true;
    wall1.visible = true;
    wall2.visible = true;
    gamePlay = true;
    
    if (editorMode == false) {
        hpBg.visible = true;
        hpImg.visible = true;
        hpBorder.visible = true;
    }
}

function removeLevel1() {
    for (item of allItems) {
        item.visible = false; 
    }
    
    player.visible = false;
    ground.visible = false;
    goal.visible = false;
    wall1.visible = false;
    wall2.visible = false;
    
    hpBg.visible = false;
    hpImg.visible = false;
    hpBorder.visible = false;
}

function removeYouWin() {
    winbg.visible = false;
}

function removeGameOver() {
    gameoverbg.visible = false;
}


// <-------------- Debug Mode -------------->

function debugOn() {
    for (item of allItems) {
        item.debug = true; 
    }
    
    player.debug = true;
    ground.debug = true;
    goal.debug = true;
    wall1.debug = true;
    wall2.debug = true;
    
    hpBg.debug = true;
    hpImg.debug = true;
    hpBorder.debug  = true;
    
    startButton.debug = true;
    winbg.debug = true;
}

function debugOff() {
    for (item of allItems) {
        item.debug = false; 
    }
    
    player.debug = false;
    ground.debug = false;
    goal.debug = false;
    wall1.debug = false;
    wall2.debug = false;
    
    hpBg.debug = false;
    hpImg.debug = false;
    hpBorder.debug  = false;
    
    startButton.debug = false;
    winbg.debug = false;
}

    /*------------------------------------------------------/
   /                                                       /
  /                   Draw/Play Game                      /
 /                                                       /
/------------------------------------------------------*/


function draw() {
    // Title Screen
    if (scene === "title") { // Title screen
        background(titleBackground);
        title();
        camY = camera.position.y;
    } else {
        removeTitle();
    }
    
    // Level 1 Screen
    if (scene === "level1") { // Level 1
        drawLevel1();
        playerAttackStyle = playerAttackType;
        parallaxFront(trees);
        parallax(mountains);
        background(level1Background);
        playerMovement();
        playerSprite();
        enemyMovement();
        collisions();
        camera.on();
        cam();
        removePlayer();
        spriteMouseUpdates();
        
        healthBar();
        invincibleTimer();
        
        drawSprites();
        gui();

        if (editorMode == true) { // Editor Mode
            moveCam();
            objectSwitch();
            editorInstructions();
        }
    } else {
        removeLevel1();
    }
    
    // You Win Screen
    if (scene === "youWin") { // You Win
        allItems.removeSprites();
        trees.removeSprites();
        mountains.removeSprites();
        background(youWinBackground);
        youWin();
    } else {
        removeYouWin();
    }
    
    
    // Game Over Screen
    if (scene === "gameOver") { // You Win
        allItems.removeSprites();
        trees.removeSprites();
        mountains.removeSprites();
        background(gameOverBackground);
        gameEnd();
    } else {
        removeGameOver();
    }
    
    if (debugGame == "on" || debugGame == true) {
        debugOn();
    } else {
        debugOff();
    }
    
    //drawSprites(); // Need to add this to each level (right before the text is drawn!)
}


    /*------------------------------------------------------/
   /                                                       /
  /                   Default Values                      /
 /                                                       /
/------------------------------------------------------*/
// These values should be left alone so that the built-in levels work properly:


function loadDefault() {
    myGameTitle = "2D Platformer Game";
    myName = "Lee"
    debugGame = "off";

    // The Canvas is just what the Camera sees
    canvasWidth = 600;
    canvasHeight = 720;

    // The Whole Scene
    SCENE_W = 1280;
    SCENE_H = 720;

      /*--------------------/
     /       PLAYER        /
    /--------------------*/

    // Player Variables
    playerIdleImage = "images/player.png";
    idleFrames = 1;
    playerX = 75;
    playerY = 580;
     playerWidth = 64;
     playerHeight = 64;
     directionFacing = "right";
     playerColliderX = 40;
     playerColliderY = 64;

    // Movement
     playerWalkImage = "images/player_run.png";
     runFrames = 4;
     walkSpeed = 5;
     runSpeed = 10;

    // Jumping & Gravity
     playerJumpImage = "images/player_jumping.png";
     jumpFrames = 8;
     jump = -15;
     GRAVITY = 1;
     jumpMax = 1;

     playerAttackType = "ranged";

    // Player Melee Attack
     playerAttackImage = "images/player_attack.png";
     hitboxImage = "images/empty.png";
     playerWidthAttack = 70;
     attackFrames = 8;
     hitboxX = 50;
     hitboxColliderX = 40;
     hitboxColliderY = 40;

    // Player Ranged Attack
     projectileImage = "images/projectile.png";
     projectileSpeed = 15;
     projectileColliderX = 20;
     projectileColliderY = 20;



      /*--------------------/
     /    MONSTER ENEMY    /
    /--------------------*/

    // Monster Enemy iables (moves left and right)
     monsterWalkImage = "images/monster_run.png";
     monsterX = 700;
     monsterY = 600;
     monsterWidth = 64;
     monsterHeight = 64;
     monsterFrames = 5;
     monsterSpeed = 3;
     monsterLeft = 1100;
     textMonster = "Monster Enemy";
     monsterColliderX = 40;
     monsterColliderY = 40;
     monsterHealth = 1;


      /*--------------------/
     /    CHASER ENEMY     /
    /--------------------*/

    // Ghost Enemy iables (moves up and down, and chases)
     chaserMoveImage = "images/ghost.png";
     chaserX = 280;
     chaserY = 500;
     chaserWidth = 64;
     chaserHeight = 64;
     chaserFrames = 1;
     chaserSpeed = 2;
     chaserHigh = 400;
     chaserLow = 300;
     textChaser = "Ghost Enemy";
     chaserColliderX = 40;
     chaserColliderY = 40;
     chaserHealth = 1;


      /*--------------------/
     /    RANGED ENEMY     /
    /--------------------*/

    // Ranged Enemy iables (sits still, throws projectiles)
     rangedEnemyAttackImage = "images/ranged_enemy.png";
     rangedEnemyIdleImage = "images/ranged_enemy.png";
     rangedEnemyX = 390;
     rangedEnemyY = 500;
     rangedWidth = 64;
     rangedHeight = 64;
     rangedAttackFrames = 8;
     rangedIdleFrames = 1;
     textRanged = "Ranged Enemy";
     rangedColliderX = 40;
     rangedColliderY = 50;
     rangedHealth = 1;

    // Attacks
     enemyProjectileImage = "images/enemy_projectile.png";
     enemyProjectileDestroyImage = "images/enemy_projectile_destroy.png";
     enemyProjectileWidth = 32;
     enemyProjectileHeight = 32;
     enemyProjectileFrames = 1;
     enemyProjectileDestroyFrames = 12;
     enemyProjectileColliderX = 20;
     enemyProjectileColliderY = 20;
     enemyProjectileRadiusX = 60;
     enemyProjectileRadiusY = 60;


      /*--------------------/
     /      SPIKES         /
    /--------------------*/

    // Spikes (created in Editor Mode, sits still)
     spikeImage = "images/spikes.png";
     spikeX = -80;
     spikeY = 360;
     spikeWidth = 64;
     spikeHeight = 64;
     spikeFrames = 1;
     textSpike = "Spike";
     spikeColliderX = 50;
     spikeColliderY = 55;


      /*--------------------/
     /       HEALTH        /
    /--------------------*/

    // Health Bar
     playerHp = 4;
     hpBarSprite = "on";
     HPBgImage = "images/hp_background.png";
     HP1Image = "images/hp_red.png";
     HP2Image = "images/hp_orange.png";
     HP3Image = "images/hp_yellow.png";
     HP4Image = "images/hp_green.png";
     HPBorderImage = "images/hp_border.png";
     hpPosX = 180;
     hpPosY = 320;

    // Health Pack
     healthPackImage = "images/health_pack.png";
     healthPackX = 150;
     healthPackY = 500;
     healthPackWidth = 50;
     healthPackHeight = 50;
     healthPackFrames = 4;
     textHealthPack = "Health Pack";
     healthPackColliderX = 48;
     healthPackColliderY = 50;


      /*--------------------/
     /       WALLS         /
    /--------------------*/

    // Platform
     platformImage = "images/platform.png";
     platformX = 400;
     platformY = 600;
     platformWidth = 103;
     textPlatform = "Platform";

    // Ground
     groundImage = "images/ground.png";
     groundX = 640;
     groundY = 675;

    // Wall
     wall1Sprite = "on";
     wall2Sprite = "on";
     wallImage = "images/wall.png";
     wall1X = -200;
     wall2X = 1500;
     wallY = 560;

    // Camera/Invisible Walls
     borderLeft = -63;
     borderRight = 1362;


      /*--------------------/
     /     BACKGROUND      /
    /--------------------*/

    // Mountain
     mountainSprite = "on";
     mountainImage = "images/mountain.png";
     mountainX = 50;
     mountainY = 400;
     mountainWidth = 640;
     mountainHeight = 780;
     totalMountainImages = 3;

    // Trees
     treeSprite = "on";
     treeImage = "images/trees.png";
     treeX = 50;
     treeY = 500;
     treeWidth = 640;
     treeHeight = 500;
     totalTreeImages = 3;


      /*--------------------/
     /        GOAL         /
    /--------------------*/

    // Goal
     goalSprite = "on";
     goalImage = "images/goal.png";
     goalX = 1200;
     goalY = 450;
     goalWidth = 110;
     goalHeight = 110;
     goalFrames = 1;


      /*--------------------/
     /        COIN         /
    /--------------------*/

    // Collectible Coin
     coinImage = "images/donut.png";
     coinX = 300;
     coinY = 500;
     coinWidth = 50;
     coinHeight = 50;
     coinFrames = 16;
     textCoin = "Donut";
     coinColliderX = 60;
     coinColliderY = 60;


      /*--------------------/
     /     INTERFACE       /
    /--------------------*/

    // Graphical User Interface Text
     scoreVisible = "on";
     textScore = "Score: ";
     scoreX = 50;
     scoreY = 90;
     goldVisible = "on";
     goldX = 50;
     goldY = 120;
     colorGUI = "white";

    // Score
     goldIncrease = 1;
     goldScore = 50;
     hpScore = 50;
     enemyScore = 100;
     powerScore = 50;


      /*--------------------/
     /      POWER-UP       /
    /--------------------*/

    // Power-up Item
     powerupImage = "images/cake.png";
     powerX = -50;
     powerY = 300;
     powerWidth = 50;
     powerHeight = 50;
     powerFrames = 5;
     textPowerUp = "Magical Cake";
     powerupColliderX = 45;
     powerupColliderY = 50;
     powerPlayerWalkImage = "images/player_run_power.png";
     powerPlayerIdleImage = "images/player_power.png";
     powerPlayerAttackImage = "images/player_attack_power.png";
     powerPlayerJumpImage = "images/player_jumping_power.png";


      /*--------------------/
     /       SCENES        /
    /--------------------*/

    // Level to Load
     currentLevel = "Default";

    // Scene Background
     titleBackground = "orange";
     level1Background = "blue";
     youWinBackground = "green";
     gameOverBackground = "red";

    // Title Button
     startSprite = "on";
     startButtonImage = "images/start_button.png";
     startButtonX = 295;
     startButtonY = 450;
     startWidth = 450;
     startHeight = 100;
     textTitle = "Start Game";
     colorTitle = "white";

    // You Win Scene
     winbgSprite = "on";
     winBgImage = "images/youwin.png";
     winBgX = 300;
     winBgY = 360;
     textWin = "YOU WIN!";
     colorWin = "white";

    // Game Over Scene
     gameoverbgSprite = "on";
     gameoverBgImage = "images/gameover.png";
     gameoverBgX = 300;
     gameoverBgY = 360;
     textGameOver = "GAME OVER";
     colorGameOver = "white";


      /*--------------------/
     /      KEYBOARD       /
    /--------------------*/

    // Keyboard Controls - Find the numbers to use here: https://keycode.info/
     leftKey = 65; // A key
     rightKey = 68; // D key
     jumpKey = 87; // W key
     jumpKey2 = 32; // Spacebar key
     attackKey = 81; // Q key
     runKey = 16; // Shift key
     proceedKey = 13; // Enter key
     reloadKey = 82; // R key
     saveKey = 86; // V key
     editorKey = 69; // E key
     deleteKey = 8; // Backspace key
     instructKey = 88; // X key
     panUpKey = 38; // Up Arrow key
     panDownKey = 40; // Down Arrow key
     panLeftKey = 37; // Left Arrow key
     panRightKey = 39; // Right Arrow key
     zoomOutKey = 189; // - key
     zoomInKey = 187; // + key
     objectKey1 = 49; // 1 key
     objectKey2 = 50; // 2 key
     objectKey3 = 51; // 3 key
     objectKey4 = 52; // 4 key
     objectKey5 = 53; // 5 key
     objectKey6 = 54; // 6 key
     objectKey7 = 55; // 7 key
     objectKey8 = 56; // 8 key

    // Editor Mode Directions
     keyPlatform = "1";
     keyCoin = "2";
     keySpike = "3";
     keyEnemy = "4";
     keyRanged = "5";
     keyChaser = "6";
     keyHealth = "7";
     keyPowerup = "8";
     keyDelete = "Backspace";
     keyCameraMove = "Arrow Keys";
     keySave = "V";
     keyEditorMode = "E";
     keyTurnOff = "X";
     keyReload = "R";
    
}