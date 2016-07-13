game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update, render: render}) ;

// PRELOAD ---------------------------------------------------------

function preload() {

    game.load.image('bg', 'assets/bg1.jpg');
    game.load.image('laser', 'assets/laser.png');
    game.load.image('ship', 'assets/ship1.png');
    game.load.image('enemy', 'assets/enemy1.png');
    game.load.image('explosion', 'assets/explosion1.png');
    game.load.image('button', 'assets/restart.png');
}

// VARIABLES-------------------------------------------------------

var player;
var cursors;
var shootButton;
var enemy;
var laserTime = 0;
var laser;
var lasers;
var score = 0;
var scoreText;
var scoreString = '';
var explosions;
var timer=0;
var chrono;
var timerEnemies = 0;

// CREATE----------------------------------------------------------

// Function Create

function create() {

    chrono = game.time.events.add(Phaser.Timer.SECOND * 30, timeOut, this);

    //  Background
    game.add.sprite(0, 0, 'bg');

    // Score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    // Lasers
    lasers = game.add.physicsGroup();
    lasers.createMultiple(20 , 'laser', true);
    lasers.setAll('checkWorldBounds', true);
    lasers.setAll('outOfBoundsKill', true);

    // Cursors
    cursors = game.input.keyboard.createCursorKeys();
    shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    enemy = game.add.physicsGroup();

    // Player
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
    player.anchor.setTo(0, 0);
    laser = game.add.physicsGroup();
    laser.createMultiple(50, 'laser', false);
    laser.setAll('checkWorldBounds', true);
    laser.setAll('outOfBoundsKill', true);game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    game.physics.arcade.enable(player);

    //Explosion
    explosions = game.add.group();
    explosions.createMultiple(100, 'explosion');
    explosions.forEach(setupLaser, this);

    cursors = game.input.keyboard.createCursorKeys();
    shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    function setupLaser (laser) {
        laser.anchor.x = 0;
        laser.anchor.y = 0;
        laser.animations.add('explosion');
    }

    game.input.onDown.add(restartGame, self);
}

//Restart
function restartGame(){
    if (chrono === 0) {
        popup = game.add.sprite(25, 50, 'button');
        popup.inputEnabled = true;

        if (game.paused) {
            if (popup.getBounds().contains(this.game.input.x, this.game.input.y)) {
                this.game.paused = false;
                this.popup.visible = false;
                game.state.restart();
                score = 0;
            }
        }
    }
}

// UPDATE----------------------------------------------------------

// Update
function update() {

    createEnemies();

    enemy.forEach(checkPos, this);

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown){
        player.body.velocity.x = -500;

    }
    else if (cursors.right.isDown){
        player.body.velocity.x = 500;

    }

    if (cursors.up.isDown){
        player.body.velocity.y = -500;
    }

    else if (cursors.down.isDown){
        player.body.velocity.y = 500;
    }

    if (shootButton.isDown){
        fireLaser();
    }
    ///  Run collision
    game.physics.arcade.overlap(lasers, enemy, collisionHandler, null, this);

}

// checkPos
function checkPos (enemy) {

    if (enemy.y > 600)
    {
        enemy.y = -100;
    }

}

// fireLaser
function fireLaser () {
    console.log('fireLaser', timer);
    if (game.time.time > timer){
        laser = lasers.getFirstExists(false);

        if (laser){
            laser.reset(player.x + 4, player.y -10);
            laser.body.velocity.y = -500;
            timer = game.time.time + 50;
        }
    }
}

// collisions
function collisionHandler (laser, enemy) {

    enemy.kill();
    laser.kill();

    //  Increase score
    score += 157;
    scoreText.text = scoreString + score;

    //Explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(enemy.body.x, enemy.body.y);
    explosion.play('explosion', 20, false, true);
}

// timeOut
function timeOut() {
    var chrono = game.time.events.duration;
    if (chrono === 0) {
        setTimeout(function() {
            restartGame();
            game.paused = true;
        });
    }
}

//createEnemies

function createEnemies (){

    if (game.time.time > timerEnemies){
        var x =  game.rnd.between(30,730);
        enemies = enemy.create(x, -100, 'enemy');
        enemies.body.velocity.y = game.rnd.between(60, 160);
        timerEnemies = game.time.time +90;
    }
}

// RENDER ---------------------------------------------------------

function render () {
    chrono = game.time.events.duration;
    game.debug.text("Time : " + chrono, 64, 64);
}
