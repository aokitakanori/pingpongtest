// ボールのパラメータ
var r = 0;
var f = 1;
var ball_size = 30;
var col = ball_size / 2;

// ボールの座標
var x = 100;
var y = 100;

// 移動距離
var dx = 1000;
var dy = 1000;

// バーサイズ
var bar_width = 20;
var bar_height = 120;

// プレイヤーと相手のバーのX座標及びY座標
var player_bar_x = 750;
var enemy_bar_x = 50 - bar_width;
var enemy_bar_y = 100;
var enemy_bar_center_y = 0;

// Playerが粘った回数
var count = 0;

// ボールの中心点と相手のバーの中心点の差
var d_ball_bar = 0;

// 得点表示
var player_score = 0;
var enemy_score = 0;

function setup() {
    createCanvas(800, 600);
    background(0);
    smooth();
    frameRate(60);
}

// 試合の初期化
function init() {
    player_score = 0;
    enemy_score = 0;
    x = 100;
    y = 100;
    dx = 5;
    dy = 5;
}

function draw() {
    // 背景を真っ黒にして塗りつぶす。
    background(0);
    x += dx;
    y += dy;

    // 相手のバーの中心点のy座標とballの中心点のy座標の差を求める
    enemy_bar_center_y = enemy_bar_y + bar_height / 2;
    d_ball_bar = enemy_bar_center_y - y;

    // 相手のバーが自立して操作している様に見せかける。
    if (d_ball_bar >= 0) {
        enemy_bar_y -= 5;
        if (count % 5 == 0) { //5回に1回チャンス
            enemy_bar_y += 2;
        }
    }
    else {
        enemy_bar_y += 5;
    }

    // 相手のバーが画面の外に行くなら画面内に戻す
    if (enemy_bar_y <= 0) {
        enemy_bar_y = 0;
    }
    if (enemy_bar_y >= height - bar_height) {
        enemy_bar_y = height - bar_height;
    }

    // プレイヤーのバーにボールが当たったら跳ね返す
    if (player_bar_x <= x + col) {
        if (mouseY <= y - col && mouseY + bar_height >= y + col) {
            // 相手側へボールを弾き返す。
            x = player_bar_x - col;
            dx = -1 * dx;
            dx = dx / abs(dx) * random(5, 20);
            count += 1;
        }
    }

    // 相手のバーにボールが当たったら跳ね返す
    if (enemy_bar_x >= x - col) {
        if (enemy_bar_y <= y - col && enemy_bar_y + bar_height >= y + col) {
            // 相手側へボールを弾き返す。
            x = enemy_bar_x + col;
            dx = -1 * dx;
            dx = dx / abs(dx) * random(5, 20);
        }
    }

    // 相手の壁に当たったら自分の得点を加算する
    if (x < 0 + col) {
        player_score += 1;
        x = 0 + col + 300;
        dx = 5;
    }

    // 自分の壁に当たったら相手の得点を加算する
    if (x > width - col) {
        enemy_score += 1;
        x = width - col - 300;
        dx = -5;
    }

    if (y < 0 + col) {
        y = 0 + col;
        dy = abs(dy);
    }

    if (y > height - col) {
        y = height - col;
        dy = -1 * abs(dy);
    }

    fill(255, 255, 255)

    // ボールを表示する
    ellipse(x, y, ball_size, ball_size);

    // プレイヤー側のバーを表示する
    rect(player_bar_x, mouseY, bar_width, bar_height);

    // 対戦相手のバーを表示する
    rect(enemy_bar_x, enemy_bar_y, bar_width, bar_height);

    // 真ん中の線を表示する
    stroke(255, 255, 255);
    line(width / 2, 0, width / 2, height);

    // 得点を表示する
    textSize(50);
    text(enemy_score, 200, 100);
    text(player_score, 600, 100);

    if (player_score >= 10) {
        background(0);
        text("Player Win !", 250, 300);
        textSize(25);
        text("Thank You Playing ! Any Key Press Retry !", 150, 350);
        if (keyIsPressed == true) {
            init();
        }
    }
    else if (enemy_score >= 10) {
        background(0);
        text("Enemy Win !", 250, 300);
        textSize(25);
        text("Thank You Playing ! Any Key Press Retry !", 150, 350);
        if (keyIsPressed == true) {
            init();
        }
    } else {
        //　なし
    }
}
