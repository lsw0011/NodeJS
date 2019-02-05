
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
    grid[randPos].new = true;
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

checkForMove = function (grid) {
    for(var i = 0; i < 16; i++){
        if(grid[i].initialPos != i && grid[i].initialPos != null || grid[i].hasMerged){
            return true
        }
    }
    return false
}

update = function (grid) {
    grid.forEach((element, index)=> {
        cssClass = document.querySelector('.e' + index);
        if(element.value != 0){
            cssClass.textContent = element.value;
        }else{
            cssClass.textContent = '';
        }
        cssClass.style.backgroundColor = colors[element.value];
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

resetCSS = function (grid){
    grid.forEach((element, index) => {
        document.querySelector('.e'+index).classList.remove('inactive');
        document.querySelector('.e'+index).classList.remove('active');
        document.querySelector('.e'+index).classList.remove('merged');
        document.querySelector('.e'+index).style.animation = 'none';
    })
}
 
transform = function (grid){
    grid.forEach((element, index) => {
        cssElement =document.querySelector('.e'+element.initialPos);
        if(element.value != 0){
            cssElement.classList.add('active');
            diff = index-element.initialPos;
            if(element.hasMerged != true) {
                if(diff%4 == 0 && diff != 0){
                    cssElement.style.transform = 'translateY(' + 8.25 * diff / 4 + 'rem)';                    
                }else if(diff != 0){
                    cssElement.style.transform = 'translateX(' + 8.25 * diff + 'rem)'
                }
            }else{
                mergedElement = document.querySelector('.e'+element.mergedPos);
                mergedDiff = index-element.mergedPos
                if(mergedDiff < 0){
                    cssElement.classList.add('active');
                    mergedElement.classList.add('merged');
                }else{
                    mergedElement.classList.add('merged');
                    cssElement.classList.add('active')
                }
                if(diff%4 == 0 && mergedDiff%4 == 0){
                    cssElement.style.transform = 'translateY(' + 8.25 * diff / 4 + 'rem)';                    
                    mergedElement.style.transform = 'translateY(' + 8.25 * mergedDiff/4 + 'rem)'
                }else{
                    cssElement.style.transform = 'translateX(' + 8.25 * diff + 'rem)'
                    mergedElement.style.transform = 'translateX(' + 8.25 * mergedDiff + 'rem)'
                }
            }
            mergedDiff = index-element.mergedPos;
        }else{
            cssClass.classList.add('not-moving')
        }
    })
}

transformBack = function (grid){
    grid.forEach((element, index) => {
        cssElement = document.querySelector('.e'+index);
        cssElement.classList.add('inactive');
        cssElement.style.transform = "translateY(0)"
    })
}

popMerges = function (grid){
    grid.forEach((element, index) => {
        if(element.hasMerged){
            document.querySelector('.e'+index).style.animation = 'pop 0.2s'
        }else if (element.new){
            delete element.new;
            document.querySelector('.e'+index).style.animation = 'phase-in 0.1s'
        }
    })
}

game = function (grid){
    transform(grid);
    setTimeout(() => {
        console.log(checkForMove(grid))
        if(checkForMove(grid)){
            generateRandom(grid);
        };
        update(grid);
        transformBack(grid);
        popMerges(grid);
        //console.log(, grid)
        setTimeout(()=>{
            reset(grid);
            resetCSS(grid);
        }, 200)
        
    }, 100)

    
    
}

init(grid);


