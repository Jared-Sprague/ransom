let BossScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, {key: 'boss_scene'});
    },

    create: function () {
        // Background image
        this.add.image(0, 0, 'bossroom').setOrigin(0, 0);

        // Add sprites
        this.fireballs = [];

        // Add audio
        this.bossIntoMusic = this.sound.add('ost_boss_intro');
        this.bossBattleMainMusic = this.sound.add('ost_boss_battle_main', {loop: true});

        this.bossIntoMusic.once("complete", () => {
            this.bossBattleMainMusic.play();
        });

        this.bossIntoMusic.play();

        // Add boss
        let boss = this.add.sprite(1050, 500, 'boss');
        boss.setInteractive();

        boss.on('pointerdown', () => {
            // test different pose
            let handPosition = Phaser.Math.Between(1, 3);
            boss.setFrame('boss' + handPosition);

            if (handPosition === 1) {
                // no shoot
            }
            else if (handPosition === 2) {
                // high shoot
                this.createFireball(815, 400, 'high');
            }
            else if (handPosition === 3) {
                // low shoot
                this.createFireball(820, 560, 'low');
            }
        });

        // Add boy
        this.boy = this.physics.add.sprite(220, 500, 'boy_fight');
        this.boy.setScale(0.6);
        this.boy.setCollideWorldBounds(true);
        this.playerStand();

        // player input
        this.cursors = this.input.keyboard.createCursorKeys();
    },

    update: function (time, delta) {
        if (this.cursors.up.isDown && this.boy.getData("jumping") === "false") {
            this.playerJump();
        }

        if (this.cursors.down.isDown && this.boy.getData("ducking") === "false") {
            this.playerDuck();
        }

        if (this.cursors.down.isUp && this.boy.getData("ducking") === "true") {
            this.playerStand();
        }
    },

    movePlayer: function (dir) {

    },

    doBack: function () {
        this.scene.start('lobby');
    },

    addTween: function (sprite) {
        this.tweens.add({
            targets: sprite,
            x: -100,
            duration: 3000,
            ease: 'linear',
            onComplete: () => {
                // clean up sprite when it goes off screen
                sprite.destroy();
            }
        });
    },

    createFireball: function (x, y, type) {
        let fireball = this.physics.add.sprite(x, y, 'fireball');
        fireball.setCollideWorldBounds(true);
        fireball.setData("type", type);
        this.physics.add.overlap(this.boy, fireball, this.doOverlapFireball, null, this);
        this.addTween(fireball);
        this.fireballs.push(fireball);
    },

    doOverlapFireball: function (boy, fireball) {
        let fireballType = fireball.getData("type");

        boy.setTint(0xff0000);
        setTimeout(() => {
            boy.clearTint();
        }, 200);

        fireball.destroy();
    },

    playerJump: function () {
        if (this.boy.getData("jumping") === "false" && this.boy.getData("standing") === "true") {
            // add tween for boy to jump
            this.tweens.add({
                targets: this.boy,
                y: 250,
                ease: 'Power1',
                duration: 500,
                yoyo: true,
                onStart: () => {
                    this.boy.setData("jumping", "true");
                    this.boy.setData("standing", "false");
                    this.boy.setData("ducking", "false");
                    this.boy.setFrame('jump');

                    // change the physics collision area
                    this.boy.body.setSize(200, 420, false);
                    this.boy.body.setOffset(40, 50);
                },
                onComplete: () => {
                    this.playerStand();
                },
            });
        }
    },

    playerDuck: function () {
        if (this.boy.getData("ducking") === "false" && this.boy.getData("standing") === "true") {
            this.boy.setData("ducking", "true");
            this.boy.setFrame('duck');

            // change the physics collision area
            this.boy.body.setSize(200, 320, false);
            this.boy.body.setOffset(60, 300);
        }
    },

    playerStand: function () {
        this.boy.setData("standing", "true");
        this.boy.setData("jumping", "false");
        this.boy.setData("ducking", "false");
        this.boy.setFrame('000_standing');
        this.boy.body.setSize(180, 550, false);
        this.boy.body.setOffset(30, 50);
    }
 });
