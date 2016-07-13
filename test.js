var enemyCount = 50;


// Create an object pool of bullets
ennemies = game.add.group();
for(var i = 0; i < enemyCount; i++) {
    // Create each bullet and add it to the group.
    var enemy = game.add.sprite(0, 0, 'enemy');
    ennemies.add(enemy);
    
    // Enable physics on the bullet
    game.physics.enable(enemy, Phaser.Physics.ARCADE);

    // Set its initial state to "dead".
    enemy.kill();





this.NUMBER_OF_BULLETS = 1;


// Create an object pool of bullets
this.bulletPool = this.game.add.group();
for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
    // Create each bullet and add it to the group.
    var bullet = this.game.add.sprite(0, 0, 'bullet');
    this.bulletPool.add(bullet);

    // Set its pivot point to the center of the bullet
    bullet.anchor.setTo(0.5, 0.5);

    // Enable physics on the bullet
    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

    // Set its initial state to "dead".
    bullet.kill();
}