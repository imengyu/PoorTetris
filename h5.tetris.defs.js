var blockMapMaxX = 10;
var blockMapMaxY = 20;
var blockSize = 20;
var blockTypes = [
    {
        count: 2,
        maps: [
            {
                width: 4,
                height: 1,
                offestX: 0,
                offestY: 1,
                map: [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 1,
                height: 4,
                offestX: 2,
                offestY: 0,
                map: [
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                ]
            },
        ]
    },
    {
        count: 4,
        maps: [
            {
                width: 3,
                height: 2,
                offestX: 0,
                offestY: 0,
                map: [
                    [1, 1, 1, 0],
                    [1, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 2,
                height: 3,
                offestX: 0,
                offestY: 0,
                map: [
                    [1, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 3,
                height: 2,
                offestX: 0,
                offestY: 0,
                map: [
                    [0, 0, 1, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 2,
                height: 3,
                offestX: 0,
                offestY: 0,
                map: [
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
        ]
    },
    {
        count: 4,
        maps: [
            {
                width: 3,
                height: 2,
                offestX: 0,
                offestY: 0,
                map: [
                    [1, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 2,
                height: 3,
                offestX: 0,
                offestY: 0,
                map: [
                    [1, 1, 0, 0],
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 3,
                height: 2,
                offestX: 0,
                offestY: 0,
                map: [
                    [1, 1, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 2,
                height: 3,
                offestX: 0,
                offestY: 0,
                map: [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
        ]
    },
    {
        count: 4,
        maps: [
            {
                width: 3,
                height: 2,
                offestX: 0,
                offestY: 0,
                map: [
                    [1, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 2,
                height: 3,
                offestX: 0,
                offestY: 0,
                map: [
                    [0, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 3,
                height: 2,
                offestX: 0,
                offestY: 0,
                map: [
                    [0, 1, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 2,
                height: 3,
                offestX: 0,
                offestY: 0,
                map: [
                    [1, 0, 0, 0],
                    [1, 1, 0, 0],
                    [1, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
        ]
    },
    {
        count: 2,
        maps: [
            {
                width: 2,
                height: 3,
                offestX: 0,
                offestY: 0,
                map: [
                    [0, 1, 0, 0],
                    [1, 1, 0, 0],
                    [1, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 3,
                height: 2,
                offestX: 0,
                offestY: 0,
                map: [
                    [1, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
        ]
    },
    {
        count: 2,
        maps: [
            {
                width: 2,
                height: 3,
                offestX: 0,
                offestY: 0,
                map: [
                    [1, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
            {
                width: 3,
                height: 2,
                offestX: 0,
                offestY: 0,
                map: [
                    [0, 1, 1, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]
            },
        ]
    },
    {
        count: 1,
        maps: [
            {
                width: 2,
                height: 2,
                offestX: 1,
                offestY: 1,
                map: [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0],
                ]
            },
        ]
    },
]

var blockMapGlobal1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var blockMapGlobal = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
    [2, 5, 5, 0, 0, 0, 0, 2, 1, 0],
    [2, 5, 5, 1, 0, 0, 0, 1, 1, 2],
    [2, 2, 1, 1, 0, 1, 1, 1, 1, 3],
];
var blockColors = [
    '#fff',
    '#000',
    '#FF6666',
    '#FF0033',
    '#0099CC',
    '#009999',
    '#009933',
    '#FFCC33',
    '#CC0033',
    '#339933',
    '#333333',
    '#FF1493',
]
var blockCurrent = null;

function getBlockColor(i){
    return blockColors[i];
}
//获取方块转向位图
function getBlockRotateMap(type, direction) {
    if (type.count == 1) return type.maps[0];
    if (type.count == 2) {
        if (direction % 2 == 0) return type.maps[1];
        else return type.maps[0];
    }
    if (type.count == 4) return type.maps[direction];
    return null;
}
//检测方块与是否超出地图左右
function mapOut(reallMap, globalX, globalY) {
    if(globalX + reallMap.offestX < 0) return true;
    if(globalX + reallMap.offestX + reallMap.width > blockMapMaxX) return true;
    if(globalY + reallMap.offestY + reallMap.height > blockMapMaxY) return true;
    return false;
}
//检测方块与当前地图是否存在碰撞
function mapColl(reallMap, globalX, globalY) {
    var x, y;
    for (x = 0; x < 4; x++) {
        for (y = 0; y < 4; y++) {
            var oy = globalY + y;
            if (oy >=0 && reallMap.map[y][x] > 0 && blockMapGlobal[oy][globalX + x] > 0) {
                return true;
            }
        }
    }
    return false;
}
