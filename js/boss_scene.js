let BossScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, {key: 'boss_scene'});
    },

    create: function () {
        // Background image
        this.add.image(0, 0, 'bossroom').setOrigin(0, 0);

        // Add sprites

        // Add audio
        this.bossIntoMusic = this.sound.add('ost_boss_intro');
        this.bossBattleMainMusic = this.sound.add('ost_boss_battle_main', {loop: true});

        this.bossIntoMusic.once("complete", () => {
            this.bossBattleMainMusic.play();
        });

        this.bossIntoMusic.play();
    },

    update: function (time, delta) {

    },

    movePlayer: function (dir) {

    },

    doBack: function () {
        this.scene.start('lobby');
    },

 });
