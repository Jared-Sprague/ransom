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
        let boss = this.add.sprite(950, 500, 'boss');
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
                let fireball = this.add.sprite(820, 400, 'fireball');
                this.addTween(fireball);
                this.fireballs.push(fireball);
            }
            else if (handPosition === 3) {
                // low shoot
                let fireball = this.add.sprite(820, 570, 'fireball');
                this.addTween(fireball);
                this.fireballs.push(fireball);
            }
        });


    },

    update: function (time, delta) {
        // this.fireball.x -= 5;
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
    }

 });
