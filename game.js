document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');

    var player = {
        x: canvas.width / 2,
        y: canvas.height - 30,
        width: 20,
        height: 20,
        speed: 2,
        dx: 0,
        bullets: []
    };

    var enemies = [];
    var enemyInterval = 100;
    var enemyTimer = 0;

    function drawPlayer() {
        ctx.fillStyle = 'gold';
        ctx.font = '16px Arial';
        ctx.fillText('CURRY', player.x, player.y + player.height);
    }

    function updatePlayer() {
        player.x += player.dx;

        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    }

    function moveRight() {
        player.dx = player.speed;
    }

    function moveLeft() {
        player.dx = -player.speed;
    }

    function shoot() {
        var bullet = {
            x: player.x + player.width / 2,
            y: player.y,
            width: 5,
            height: 10,
            speed: 4
        };
        player.bullets.push(bullet);
    }

    function drawBullets() {
        player.bullets.forEach(function(bullet, index) {
            ctx.fillStyle = 'red';
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            bullet.y -= bullet.speed;

            if (bullet.y + bullet.height < 0) {
                player.bullets.splice(index, 1);
            }
        });
    }

    function createEnemy() {
        var enemy = {
            x: Math.random() * (canvas.width - 30),
            y: -30,
            width: 30,
            height: 20,
            speed: 2
        };
        enemies.push(enemy);
    }

    function drawEnemies() {
        enemies.forEach(function(enemy) {
            ctx.fillStyle = 'saddlebrown';
            ctx.font = '16px Arial';
            ctx.fillText('せくしー', enemy.x, enemy.y + enemy.height);
        });
    }

    function updateEnemies() {
        enemies.forEach(function(enemy, index) {
            enemy.y += enemy.speed;

            if (enemy.y - enemy.height > canvas.height) {
                enemies.splice(index, 1);
            }
        });
    }

    function checkBulletEnemyCollisions() {
        player.bullets.forEach(function(bullet, bulletIndex) {
            enemies.forEach(function(enemy, enemyIndex) {
                if (bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y) {
                    player.bullets.splice(bulletIndex, 1);
                    enemies.splice(enemyIndex, 1);
                }
            });
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            moveRight();
        } else if (e.key === 'ArrowLeft') {
            moveLeft();
        } else if (e.key === ' ') {
            shoot();
        }
    });

    document.addEventListener('keyup', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            player.dx = 0;
        }
    });

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        updatePlayer();
        drawBullets();
        drawEnemies();
        updateEnemies();
        checkBulletEnemyCollisions();

        enemyTimer++;
        if (enemyTimer % enemyInterval === 0) {
            createEnemy();
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
