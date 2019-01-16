
var UpArrow=38, DownArrow=40, LeftArrow=37, RightArrow=39;
var el1 = document.querySelector(".el1")
var currentKey; 
var colors = {0: '#bbada0', 2: '#ffffff', 4:'#eeeeee', 8:'#dddddd', 16:'#cccccc', 32: '#bbbbbb', 64:'#aaaaaa', 128:'#999999', 256:'#888888', 512:'#777777', 1024:'#666666', 2048:'#555555'}

var grid = [];

document.addEventListener("keydown", function(evt) {

    var code = evt.keyCode;
    if(code == 38){
        dir = 1;
    }else if(code == 39){
        dir = 2;
    }else if(code == 40){
        dir = 3;
    }else if(code == 37){
        dir = 4;
    }else{
        dir = 5;
    }
    if(dir != 5){
        getInPos(grid)
        moveValues(dir, grid)
        game(grid)
    }
});


generateRandom = function (grid) {
    var open = []
    grid.forEach((element, index) => {
        if (element.value == 0){
            open.push(index)
        }
    })
    var randPos = open[Math.floor(Math.random() * open.length)]
    grid[randPos].value = 2;
}

init = function(grid){
    for(var row = 0; row < 4; row++){
        for(var col = 0; col < 4; col++){ 
            grid.push({hasMerged: false, value: 0, initialPos:null, mergedPos:false})
        }
    }
    generateRandom(grid);
    generateRandom(grid);
    update(grid)
}

sameRow = function (el1, el2) {
    if(Math.floor(el1/4) == Math.floor(el2/4)){
        return true;
    }
    return false;
}

sameCol = function (el1, el2) {
    if(el1%4 == el2%4){
        return true;
    }
    return false;
}
getInPos = function (grid) {
    grid.forEach((element, index) => { 
        if(element.value != 0){
            element.initialPos = index;
        }else{
            element.initialPos = null;
        }
    })

}
moveValues = function (dir, grid) {
    if(dir == 3){
        distance = -4;
        spacing = -1
        sp = 15;
        ep = 12
    }else if (dir == 4){
        distance = 1;
        spacing = -4;
        sp = 12;
        ep = 0
    }else if (dir == 1) {
        distance = 4;
        spacing = -1;
        sp = 3;
        ep = 0;
    }else if (dir == 2) {
        distance = -1;
        spacing =-4;
        sp = 15;
        ep = 3;
    }
    for(var el = sp; el >= ep; el+=spacing){
        var group = [];
        for(var i = 0; i < 4; i++){
            group.push(el+distance*i)
        }
        for(var index = 1; index < 4; index++) {
            for(var snake = index; snake > 0; snake--){
                if(grid[group[snake-1]].value == 0){
                    grid[group[snake-1]].value = grid[group[snake]].value;
                    grid[group[snake-1]].initialPos = grid[group[snake]].initialPos;
                    grid[group[snake]].initialPos = null;
                    grid[group[snake]].value = 0;
                }
                else if(grid[group[snake-1]].value == grid[group[snake]].value && !grid[group[snake-1]].hasMerged && !grid[group[snake]].hasMerged){
                    grid[group[snake-1]].value *= 2;
                    grid[group[snake]].value = 0;
                    grid[group[snake-1]].mergedPos = grid[group[snake]].initialPos;
                    grid[group[snake]].initialPos = null;
                    grid[group[snake-1]].hasMerged = true;
                }
            }
        }

    }
}
update = function (grid) {
    grid.forEach((element, index)=> {
        cssClass = '.e' + index;
        htmlnode = document.querySelector(cssClass);
        htmlnode.classList.add('active')
        document.querySelector(cssClass).transform = 'none';
        if(element.value != 0){
            document.querySelector(cssClass).textContent = element.value;
        }else{
            document.querySelector(cssClass).textContent = '';
        }
        document.querySelector(cssClass).style.backgroundColor = colors[element.value];
        document.querySelector(cssClass).classList.remove('active')
    })
}
placeNum = function (grid, pos) {
    grid[pos] = 2;
}
reset = function (grid){
    grid.forEach((element) =>{
        element.hasMerged = false;
        element.mergedPos = false;
    })

}
moveCSSElements = function (grid) {
    grid.forEach((element, index) => {
        if(element.value != 0) {
            if(!element.mergedPos){
                diff = index - element.initialPos
                if(diff%4 == 0 && diff != 0){
                    document.querySelector('.e'+element.initialPos).style.zIndex = '1';
                    document.querySelector('.e'+element.initialPos).style.transform = 'translateY('+(diff/4*8.25)+'rem)';
                }else if(diff!=0){
                    document.querySelector('.e'+element.initialPos).style.zIndex = '1';
                    document.querySelector('.e'+element.initialPos).style.transform = 'translateX('+(diff*8.25)+'rem)';
                }
            }else{
                totalDiff = index - element.initialPos;
                mergedDiff = index - element.mergedPos;
                console.log(1)
                if(totalDiff%4 == 0 && mergedDiff%4 ==0){
                    document.querySelector('.e'+element.initialPos).style.zIndex = '2';
                    document.querySelector('.e'+element.initialPos).style.transform = 'translateY('+(totalDiff/4*8.25)+'rem)';
                    document.querySelector('.e'+element.mergedPos).style.transform = 'translateY(' + (mergedDiff/4*8.25)+'rem)';
                }else {
                    document.querySelector('.e'+element.initialPos).style.zIndex = '2';
                    document.querySelector('.e'+element.initialPos).style.transform = 'translateX('+(totalDiff*8.25)+'rem)';
                    document.querySelector('.e'+element.mergedPos).style.transform = 'translateX('+(mergedDiff*8.25)+'rem)';
                }
            }
        }
    })
}
game = function (grid){
    moveCSSElements(grid)
    setTimeout(() => {
        //generateRandom(grid);
        update(grid);
        //reset(grid);
    }, 500);
    
}

init(grid);


