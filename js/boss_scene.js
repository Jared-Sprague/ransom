let BossScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function (data) {
        Phaser.Scene.call(this, {key: 'boss_scene'});
    },

    create: function (data) {
        this.life = data.life;

        // Background image
        this.background = this.add.image(0, 0, 'bossroom').setOrigin(0, 0);
        this.background.setInteractive();
        this.background.on('pointerdown', () => {
            this.playerDrawBow();
        });
        this.background.on('pointerup', () => {
            this.playerReleaseBow();
        });

        this.createLifeBar();

        // Add audio
        this.bossIntoMusic = this.sound.add('ost_boss_intro');
        this.bossBattleMainMusic = this.sound.add('ost_boss_battle_main', {loop: true});
        this.bowShootSfx = this.sound.add('sfx_bow_shoot');
        this.hitSfx = this.sound.add('sfx_hit');
        this.victorySfx = this.sound.add('sfx_power_up');
        this.bossBattleMainMusic.play();

        // start decrementing life
        this.lifeInterval = setInterval(() => {
            if (this.life > 0) {
                this.life--;
                if (this.life <= 0) {
                    // Player died, transition to end state
                    console.log("player died");
                    this.life = 0;
                    clearInterval(this.fireballInterval);
                    this.bossBattleMainMusic.stop();
                    this.scene.start('badend_scene', {fromScene: "boss"});
                }
            }
        }, 1000);

        this.events.on('shutdown', () => {
            console.log("shutdown");
            clearInterval(this.lifeInterval);
        });

        // State
        this.fireballs = [];
        this.bowCooldown = false;

        // boss particle death
        this.particles = this.add.particles('particles');
        this.particles.createEmitter({
            frame: ['purple', 'gray', 'black'],
            angle: { min: 0, max: 360, steps: 32 },
            lifespan: 2000,
            speed: 400,
            quantity: 32,
            scale: { start: 3, end: 0 },
            on: false
        });

        // this.bossIntoMusic.once("complete", () => {
        //     this.bossBattleMainMusic.play();
        // });
        //
        // this.bossIntoMusic.play();

        // Add boss
        this.boss = this.physics.add.sprite(1050, 500, 'boss');
        this.boss.setInteractive();
        this.boss.setCollideWorldBounds(true);
        this.boss.body.setSize(135, 300);
        this.boss.setData("hp", 35);

        this.boss.on('pointerdown', () => {
           this.playerDrawBow();
        });

        this.boss.on('pointerup', () => {
            this.playerReleaseBow();
        });

        // Add boy
        this.boy = this.physics.add.sprite(220, 500, 'boy_fight');
        this.boy.setScale(0.6);
        this.boy.setCollideWorldBounds(true);
        this.playerStand();

        // player input
        this.cursors = this.input.keyboard.createCursorKeys();

        setTimeout(() => {
            // Start boss firing
            this.fireballInterval = setInterval(() => {
                this.bossFire();
            }, 1000);
        }, 3000);
    },

    update: function (time, delta) {
        if (this.cursors.space.isDown && this.boy.getData("jumping") === "false") {
            this.playerJump();
        }

        if (this.cursors.shift.isDown && this.boy.getData("ducking") === "false") {
            this.playerDuck();
        }

        if (this.cursors.shift.isUp && this.boy.getData("ducking") === "true") {
            this.playerStand();
        }

        this.lifeBar.setScale(this.life / 100, 1);
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
            duration: 2250,
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
        boy.setTint(0xff0000);
        this.hitSfx.play();

        if (this.life > 0) {
            this.life -= 7;  // Fireball damage
            if (this.life <= 0) {
                // Player died, transition to end state
                this.life = 0;
                console.log("player died");
                clearInterval(this.fireballInterval);
                this.bossBattleMainMusic.stop();
                this.scene.start('badend_scene', {fromScene: "boss"});
            }
        }

        setTimeout(() => {
            boy.clearTint();
        }, 200);

        fireball.destroy();
    },

    doOverlapArrow: function (boss, arrow) {
        boss.setTint(0xff0000);
        let bossHP = boss.getData("hp");

        if (bossHP > 0) {
            bossHP--;
            console.log("boss hp: ", bossHP);
            boss.setData('hp', bossHP);
        } else {
            // boss is dead!  Do end game stuff
            clearInterval(this.fireballInterval);
            this.particles.emitParticleAt(this.boss.x, this.boss.y);
            this.boss.destroy();
            this.playerStand();
            this.bossBattleMainMusic.stop();
            this.victorySfx.once("complete", () => {
                // Go to end screen
                this.scene.start('goodend_scene', {life: this.life});
            });
            this.victorySfx.play();
        }

        setTimeout(() => {
            boss.clearTint();
        }, 200);

        arrow.destroy();
    },

    playerJump: function () {
        if (this.boy.getData("jumping") === "false" && this.boy.getData("standing") === "true") {
            // add tween for boy to jump
            this.tweens.add({
                targets: this.boy,
                y: 300,
                ease: 'Power1',
                duration: 400,
                yoyo: true,
                onStart: () => {
                    this.boy.setData("jumping", "true");
                    this.boy.setData("standing", "false");
                    this.boy.setData("ducking", "false");
                    this.boy.setFrame('jump');

                    // change the physics collision area
                    this.boy.body.setSize(90, 420, false);
                    this.boy.body.setOffset(120, 50);
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
            this.boy.body.setSize(70, 320, false);
            this.boy.body.setOffset(170, 300);
        }
    },

    playerStand: function () {
        this.boy.setData("standing", "true");
        this.boy.setData("jumping", "false");
        this.boy.setData("ducking", "false");
        this.boy.setFrame('000_standing');
        this.boy.body.setSize(70, 500, false);
        this.boy.body.setOffset(130, 90);
    },

    bossFire: function () {
        // test different pose
        let handPosition = Phaser.Math.Between(1, 3);
        this.boss.setFrame('boss' + handPosition);

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
    },

    playerShoot: function () {
        if (!this.bowCooldown) {
            let arrow = this.physics.add.sprite(320, 475, 'arrow');
            arrow.setCollideWorldBounds(true);
            this.physics.add.overlap(this.boss, arrow, this.doOverlapArrow, null, this);
            this.tweens.add({
                targets: arrow,
                x: 1400,
                duration: 1000,
                ease: 'linear',
                onComplete: () => {
                    // clean up sprite when it goes off screen
                    arrow.destroy();
                }
            });
            this.bowShootSfx.play();
            this.bowCooldown = true;
            setTimeout(() => {
                this.bowCooldown = false;
            }, 300);
        }
    },

    playerDrawBow: function () {
        // draw bow
        if (this.boy.getData("standing") === "true") {
            this.boy.setFrame('bowdrawn');
            this.boy.body.setOffset(140, 100);
        }
    },

    playerReleaseBow: function () {
        // shoot arrow at boss
        if (this.boy.getData("standing") === "true") {
            this.boy.setFrame('bowholding');
            this.playerShoot();
            this.boy.body.setOffset(140, 100);
        }
    },

    createLifeBar: function () {
        this.add.image(900, 40, 'emptybar').setOrigin(0, 0);
        this.lifeBar = this.add.image(908, 47, 'fullbar').setOrigin(0, 0);

        this.lifeBar.setScale(this.life / 100, 1);
    }
 });
