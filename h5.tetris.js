var canvas = null;
var ctx = null;
var anim = null;
var allHeight = 40;
var allWidth = 40;
var tickCount = 0;

//初始化
window.onload = function () {
    initCanvas();
    initBlocks();
    draw();
};

var maxBlockTypes = 0;
var maxBlockColors = 0;

//初始化
//=============================================

function initCanvas() {
    canvas = document.getElementById("gameCanvas");
    canvas.addEventListener('keydown', doKeyDown, true);
    canvas.focus();
    ctx = canvas.getContext("2d");

    allHeight = canvas.height;
    allWidth = canvas.height / 2;
}
function initBlocks() {
    maxBlockTypes = blockTypes.length - 1;
    maxBlockColors = blockColors.length - 1;

    nextBlockType = -1;
    nextBlockColor = -1;
    nextBlockDirection = -1;

    window.addEventListener('keydown', doKeyDown, true);
}
function initMap() {
    for (x = 0; x < blockMapMaxX; x++) {
        for (y = 0; y < blockMapMaxY; y++) {
            blockMapGlobal[y][x] = 0;
        }
    }
}

//Loop controlls
//=============================================

function clearCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

var gameRunning = false;
var gameEnd = false;
var loopRunning = false;

var score = 0;
var genBlockCount = 0;

//启停
//=============================================

function enableBtns(enable) {
    document.getElementById('btns').setAttribute('style',enable?'':'display:none;');
}
//开始
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gameEnd = false;
        score = 0;
        genBlockCount = 0;

        document.getElementById('btn-pause').removeAttribute('disabled');
        document.getElementById('btns-ctl').setAttribute('style','');
        enableBtns(true);
        initMap();
        runLoop();
        genBlock();
        //刷新一次
        draw();
    }
}
//暂停/继续
function switchGame() {
    if (gameEnd) return;
    if (loopRunning) {
        stopLoop();
    } else {
        runLoop();
    }
    //刷新一次
    draw();
}
//游戏结束
function endGame(){
    gameEnd = true;
    draw();
    document.getElementById('btn-pause').setAttribute('disabled','disabled');
    document.getElementById('btns-ctl').setAttribute('style','display:none;');
}
//重来
function restartGame(){
    if (gameRunning)  gameRunning = false;
    startGame();
}
//退出游戏
function quitGame() {
    if (gameRunning) {
        gameRunning = false;
        enableBtns(false);
        stopLoop();
        //刷新一次
        draw();
    }
}
function gameCanControl() {
    return gameRunning && loopRunning && !gameEnd;
}

function stopLoop() {
    clearInterval(anim);
    loopRunning = false;
}
function runLoop() {
    anim = setInterval(tick, 1000);
    loopRunning = true;
    tick();
}


//Amin loop
//=============================================

//主计时器
function tick() {

    if (!gameEnd) {
        tickCount++;

        //Deaily
        testFullAndMarkDelete();
        deleteFullBlocks();

        runBlockFall();
        draw();
    }

}

//Paints
//=============================================

//绘制函数
function draw() {
    clearCanvas();
    if (gameRunning) {

        drawGrid();
        drawBlocks();

        if (!gameEnd){
            drawNextBlock();
            drawScore();
        }

        if (gameEnd) drawEnd();
        if (!loopRunning) drawPause();
    } else {
        drawGrid();
        drawStart();
    }

}
//绘制网格
function drawGrid() {
    ctx.strokeStyle = "#ddd";

    var x = 1, y = 1;
    for (; x <= blockMapMaxX; x++) {

        ctx.moveTo(x * blockSize, 0);
        ctx.lineTo(x * blockSize, allHeight);
        ctx.stroke();

        for (y = 1; y < blockMapMaxY; y++) {
            ctx.moveTo(0, y * blockSize);
            ctx.lineTo(allWidth, y * blockSize);
            ctx.stroke();
        }
    }
}
//绘制方块
function drawBlocks() {
    //绘制静态方块
    var x, y;
    for (x = 0; x < blockMapMaxX; x++) {
        for (y = 0; y < blockMapMaxY; y++) {
            var blockStat = blockMapGlobal[y][x];
            if (blockStat == 0) {
                ctx.fillStyle = "#ddd";
                ctx.fillRect(x * blockSize + 3, y * blockSize + 3, 14, 14);
            }
            else if (blockStat >= 1) {
                ctx.fillStyle = blockColors[blockStat];
                ctx.fillRect(x * blockSize + 2, y * blockSize + 2, 16, 16);
            }
            else if (blockStat < 0) {
                ctx.fillStyle = "#ccc";
                ctx.fillRect(x * blockSize + 2, y * blockSize + 2, 16, 16);
            }
        }
    }
    //绘制当前动态方块
    if (blockCurrent) {
        var offestX = blockCurrent.x;
        var offestY = blockCurrent.y;
        for (x = 0; x < 4; x++) {
            for (y = 0; y < 4; y++) {
                var stat = blockCurrent.map.map[y][x] * blockCurrent.color;
                if (stat >= 1) {
                    ctx.fillStyle = blockColors[stat];
                    ctx.fillRect((offestX + x) * blockSize + 2, (offestY + y) * blockSize + 2, 16, 16);
                }
            }
        }
    }
}
//绘制下一个的方块
function drawNextBlock() {
    if (nextBlockType != -1) {
        ctx.fillStyle = "#000";
        ctx.font = "12px 微软雅黑";
        ctx.fillText("下一个方块", 270, 30);
        ctx.strokeRect(225, 45, 90, 90);
        var currMap = getBlockRotateMap(blockTypes[nextBlockType], nextBlockDirection);
        for (x = 0; x < 4; x++) {
            for (y = 0; y < 4; y++) {
                var stat = currMap.map[y][x] * nextBlockColor;
                if (stat >= 1) {
                    ctx.fillStyle = blockColors[stat];
                    ctx.fillRect(230 + x * blockSize + 2, 50 + y * blockSize + 2, 16, 16);
                }else{
                    ctx.fillStyle = "#ddd";
                    ctx.fillRect(230 + x * blockSize + 2, 50 + y * blockSize + 2, 16, 16);
                }
            }
        }
    }
}
//绘制分数面板
function drawScore(){
    ctx.fillStyle = "#000";
    ctx.font = "12px 微软雅黑";
    ctx.fillText("当前分数", 270, 230);
    ctx.fillStyle = "#f00";
    ctx.font = "23px blod 微软雅黑";
    ctx.fillText(score, 260, 270);
}
//绘制开始界面
function drawStart() {
    drawFullMask("rgba(255,255,255,0.5)");

    ctx.fillStyle = "#000";
    ctx.font = "22px bold 微软雅黑";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("H5 俄罗斯方块", 170, 170);
    ctx.font = "16px 微软雅黑";
    ctx.fillText("点击屏幕开始", 170, 200);
}
//绘制游戏结束界面
function drawEnd() {
    drawFullMask("rgba(255,255,255,0.8)");

    ctx.fillStyle = "#000";
    ctx.font = "22px bold 微软雅黑";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("游戏结束！", 180, 150, 350);
    ctx.font = "16px 微软雅黑";
    ctx.fillText("您的分数", 170, 190, 350);
    ctx.fillStyle = "#f00";
    ctx.font = "23px blod 微软雅黑";
    ctx.fillText(score, 170, 220, 350);
}
//绘制暂停界面
function drawPause() {
    drawFullMask("rgba(255,255,255,0.5)");

    ctx.fillStyle = "#000";
    ctx.font = "18px bold 微软雅黑";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("游戏已暂停", 100, 170, 200);
    ctx.fillText("按空格键继续", 100, 205, 200);
}
function drawFullMask(a) {
    ctx.fillStyle = a;
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

//Block control
//=============================================

var nextBlockType = -1;
var nextBlockColor = -1;
var nextBlockDirection = -1;

//生成一块
function genBlock() {
    var blockTypeIndex = nextBlockType;
    if (blockTypeIndex == -1) blockTypeIndex = randomNum(0, maxBlockTypes);
    nextBlockType = randomNum(0, maxBlockTypes);

    var blockColorIndex = nextBlockColor;
    if (blockColorIndex == -1) blockColorIndex = randomNum(1, maxBlockColors);
    nextBlockColor = randomNum(1, maxBlockColors);

    var direction = nextBlockDirection;
    if (direction == -1) direction = randomNum(0, 3);
    nextBlockDirection = randomNum(0, 3);

    var blockType = blockTypes[blockTypeIndex];
    var currMap = getBlockRotateMap(blockType, direction);

    blockCurrent = {
        x: randomNum(0, blockMapMaxX - currMap.width - currMap.offestX - 1),
        y: 0 - currMap.height + currMap.offestY,
        direction: direction,
        data: blockType,
        map: currMap,
        color: blockColorIndex
    };
   
    if (testBlockCollYDis(blockCurrent)) {
        //新生成的方块也碰到了，认为游戏结束
        endGame();
    }

    genBlockCount++;
}

var lastCtlByUser = false;

//方块下落
function runBlockFall() {

    if (blockCurrent != null) {
        if (lastCtlByUser) {
            lastCtlByUser = false;
            return;
        }
        if (testBlockCollYDis(blockCurrent)) {
            //删除当前方块，并放置新的方块
            writeCurrentBlockToMap();//固化方块
            genBlock();//创建新方块
        }
        else {
            //继续移动方块
            blockCurrent.y++;
        }
    }


}
//检测方块y-1后是否碰撞
function testBlockCollYDis(block) {
    if (block.y + 1 + block.map.height + block.map.offestY > blockMapMaxY) return true;
    if (mapColl(block.map, block.x, block.y + 1)) return true;

    return false;
}
function testBlockCollXDis(block, xoffest) {
    var ofx = block.x + block.map.width + block.map.offestX + xoffest;
    if (ofx > blockMapMaxX || ofx - block.map.width < 0) return true;
    if (mapColl(block.map, block.x + xoffest, block.y)) return true;

    return false;
}
//检测方块旋转后是否碰撞
function testBlockCollR(block, direction) {
    var rotatedMap = getBlockRotateMap(block.data, direction);
    if (mapOut(rotatedMap, block.x, block.y)) return true;
    if (mapColl(rotatedMap, block.x, block.y)) return true;

    return false;
}
//写入活动方块到地图成为固定方块
function writeCurrentBlockToMap() {
    if (blockCurrent) {
        var map = blockCurrent.map.map;
        var offestX = blockCurrent.x;
        var offestY = blockCurrent.y;
        for (y = 0; y < 4; y++) {
            for (x = 0; x < 4; x++) {
                var stat = map[y][x] * blockCurrent.color;
                if (stat > 0) {
                    var ry = offestY + y;
                    if(ry < 0) {
                        //方块超出范围，认为结束
                        endGame();
                        return;
                    }
                    else blockMapGlobal[ry][offestX + x] = stat;
                }
            }
        }
    }
}
//检测是否填满空隙，并且删除完全填满的方块
function testFullAndMarkDelete() {
    var fixedLine = 0;
    var scoreBase = 20;

    for (var y = blockMapMaxY - 1; y >= 0; y--) {
        var lineHasBlank = false;
        var lineHasBlock = false;

        //检测当前行是否有空格
        for (var x = 0; x < blockMapMaxX; x++) {
            if (blockMapGlobal[y][x] == 0) lineHasBlank = true;
            else if (blockMapGlobal[y][x] > 0) lineHasBlock = true;
        }

        //完全空的格子
        if (!lineHasBlock) continue;
        //全满的格子
        if (!lineHasBlank) {
            //加分数
            fixedLine++;
            //当前行全部填充0
            for (var x = 0; x < blockMapMaxX; x++)
                blockMapGlobal[y][x] = -2;
        }

    }

    if(fixedLine==0) return;
    if(fixedLine>10) scoreBase=100 + 10 * parseInt(genBlockCount / 5);
    else if(fixedLine>8) scoreBase=80 + 10 * parseInt(genBlockCount / 10);
    else if(fixedLine>5) scoreBase=50 + 10 * parseInt(genBlockCount / 20);
    else if(fixedLine>3) scoreBase=30 + 10 * parseInt(genBlockCount / 30);

    score += scoreBase*fixedLine;
}
//检测是否填满空隙，并且删除完全填满的方块
function deleteFullBlocks() {
    for (var y = blockMapMaxY - 1; y >= 0; y--) 
    {
        if (blockMapGlobal[y][0] < -1) {
            blockMapGlobal[y][0]++;
            //当前行全部填充
            for (var x = 0; x < blockMapMaxX; x++)
                blockMapGlobal[y][x] = blockMapGlobal[y][0];
        }
        else if (blockMapGlobal[y][0] == -1) {
            //上方的格子下移
            for (var ny = y - 1; ny >= 0; ny--) {
                for (var x = 0; x < blockMapMaxX; x++) {
                    blockMapGlobal[ny + 1][x] = blockMapGlobal[ny][x];
                    blockMapGlobal[ny][x] = 0;
                }
            }
        }
    }
}

//快速放置方块
function fastDropBlock() {
    if (blockCurrent != null) {
        while (blockCurrent.y < 26) {
            if (testBlockCollYDis(blockCurrent)) {
                deleteFullBlocks();
                //删除当前方块，并放置新的方块
                writeCurrentBlockToMap();//固化方块
                genBlock();//创建新方块
                testFullAndMarkDelete();
                break;
            }
            else {
                //继续移动方块
                blockCurrent.y++;
            }
        }
        lastCtlByUser = true;
        //刷新一次
        draw();
    }
}
//旋转方块
function rotateCurrentBlock() {
    if (blockCurrent != null) {
        blockCurrent.direction += 1;
        if (blockCurrent.direction >= 4)
            blockCurrent.direction = 0;
        blockCurrent.map = getBlockRotateMap(blockCurrent.data, blockCurrent.direction);

        //检测是否超出边界，超出则移动一下
        var ol = blockCurrent.x + blockCurrent.map.offestX;
        var or = blockMapMaxX - (blockCurrent.x + blockCurrent.map.offestX + blockCurrent.map.width);
        if (ol < 0)
            blockCurrent.x -= ol;
        if (or < 0)
            blockCurrent.x += or;

        //刷新一次
        draw();
    }
}
//移动方块
function moveCurrentBlock(left) {
    if (left) {
        if (!testBlockCollXDis(blockCurrent, -1))
            blockCurrent.x--;
    } else {
        if (!testBlockCollXDis(blockCurrent, 1))
            blockCurrent.x++;
    }
    //刷新一次
    draw();
}

//
//==============================================


//用户事件
function doKeyDown(e) {
    var keyID = e.keyCode ? e.keyCode : e.which;
    switch (keyID) {
        case 32://空格
            switchGame();
            break;
        case 65://A
        case 37://左
            if (gameCanControl()) moveCurrentBlock(true);
            break;
        case 87://W
        case 38://上
            if (gameCanControl()) rotateCurrentBlock();
            break;

        case 39://右
            if (gameCanControl()) moveCurrentBlock(false);
            break;

        case 40://下
            if (gameCanControl()) fastDropBlock();
            break;
        case 81://Q
            quitGame();
            break;
    }
};