// 載入 p5.js 後，請確認此檔案與 1/run/run.png 的相對路徑位置正確。

// 宣告精靈圖物件，用來保存載入的角色圖片。
let spriteSheet;
// 宣告角色目前在畫布上的水平座標。
let characterX;
// 宣告角色目前在畫布上的垂直座標。
let characterY;
// 宣告目前播放中的動畫影格編號。
let currentFrame = 0;
// 宣告角色移動方向；1 代表向右，-1 代表向左。
let moveDirection = 1;
// 宣告角色是否需要水平翻轉；向左時為 true。
let isFlipped = false;
// 宣告角色每秒移動的速度，數值越大移動越快。
let moveSpeed = 3;
// 宣告精靈圖的原始總寬度。
const SPRITE_SHEET_WIDTH = 471;
// 宣告精靈圖的原始總高度。
const SPRITE_SHEET_HEIGHT = 40;
// 宣告精靈圖包含的動畫影格總數。
const FRAME_COUNT = 17;
// 由整張圖片寬度除以影格數，計算單一影格的原始寬度。
const FRAME_WIDTH = SPRITE_SHEET_WIDTH / FRAME_COUNT;
// 宣告單一影格的原始高度。
const FRAME_HEIGHT = SPRITE_SHEET_HEIGHT;

// preload 會在 setup 執行前先載入圖片，避免圖片尚未準備好就開始繪製。
function preload() {
  // 載入位於 1/run/run.png 的橫向角色精靈圖。
  spriteSheet = loadImage("1/run/run.png");
}

// setup 只會執行一次，用來建立畫布與設定角色的初始狀態。
function setup() {
  // 建立符合瀏覽器視窗寬度與高度的全螢幕畫布。
  createCanvas(windowWidth, windowHeight);
  // 將角色的水平位置設定在畫布正中央。
  characterX = width / 2;
  // 將角色的垂直位置設定在畫布正中央。
  characterY = height / 2;
  // 將圖片的顯示模式設定為以座標作為圖片左上角。
  imageMode(CORNER);
  // 設定圖片縮放的取樣方式，讓像素風格角色保持清楚。
  noSmooth();
  // 設定動畫影格從第一格開始播放。
  currentFrame = 0;
}

// draw 會持續重複執行，用來更新畫面、角色位置與動畫影格。
function draw() {
  // 使用指定的粉紅色清除整個畫布背景。
  background("#ffafcc");

  // 計算角色單一影格的顯示寬度，這裡保留圖片原始比例。
  const displayWidth = FRAME_WIDTH;
  // 計算角色單一影格的顯示高度，這裡保留圖片原始比例。
  const displayHeight = FRAME_HEIGHT;
  // 依照目前方向更新角色的水平位置。
  characterX += moveDirection * moveSpeed;
  // 限制角色中心位置，避免角色完全離開畫面。
  characterX = constrain(characterX, displayWidth / 2, width - displayWidth / 2);
  // 限制角色的垂直位置，避免視窗尺寸改變後角色超出畫面。
  characterY = constrain(characterY, displayHeight / 2, height - displayHeight / 2);

  // 以畫面更新次數循環切換 17 張動畫影格。
  currentFrame = (currentFrame + 1) % FRAME_COUNT;
  // 計算目前影格在原始精靈圖中的水平起始位置。
  const sourceX = currentFrame * FRAME_WIDTH;
  // 計算角色圖片左上角的水平位置。
  const drawX = characterX - displayWidth / 2;
  // 計算角色圖片左上角的垂直位置。
  const drawY = characterY - displayHeight / 2;

  // 保存目前的繪圖狀態，避免翻轉影響其他畫面內容。
  push();
  // 將繪圖原點移到角色中心，方便以角色中心進行水平翻轉。
  translate(characterX, characterY);
  // 角色向左時將水平縮放設為 -1，角色向右時維持 1。
  scale(isFlipped ? -1 : 1, 1);
  // 使用同一張精靈圖的指定影格繪製角色。
  image(
    spriteSheet,
    -displayWidth / 2,
    -displayHeight / 2,
    displayWidth,
    displayHeight,
    sourceX,
    0,
    FRAME_WIDTH,
    FRAME_HEIGHT
  );
  // 還原繪圖狀態，避免翻轉設定影響下一次繪圖。
  pop();
}

// keyPressed 會在使用者按下鍵盤按鍵時執行一次。
function keyPressed() {
  // 判斷使用者是否按下鍵盤左方向鍵。
  if (keyCode === LEFT_ARROW) {
    // 設定角色向左移動。
    moveDirection = -1;
    // 設定角色水平翻轉，讓角色面向左方。
    isFlipped = true;
    // 阻止瀏覽器因方向鍵而捲動畫面。
    return false;
  }
  // 判斷使用者是否按下鍵盤右方向鍵。
  if (keyCode === RIGHT_ARROW) {
    // 設定角色向右移動。
    moveDirection = 1;
    // 取消水平翻轉，讓角色面向右方。
    isFlipped = false;
    // 阻止瀏覽器因方向鍵而捲動畫面。
    return false;
  }
}

// windowResized 會在瀏覽器視窗尺寸改變時執行。
function windowResized() {
  // 重新調整畫布大小，使畫布持續符合整個瀏覽器視窗。
  resizeCanvas(windowWidth, windowHeight);
  // 將角色的水平位置限制在新的畫布範圍內。
  characterX = constrain(characterX, FRAME_WIDTH / 2, width - FRAME_WIDTH / 2);
  // 將角色的垂直位置限制在新的畫布範圍內。
  characterY = constrain(characterY, FRAME_HEIGHT / 2, height - FRAME_HEIGHT / 2);
}