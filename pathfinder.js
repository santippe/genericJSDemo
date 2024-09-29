
function pathFinder(path) {
    let lastPoint = path[path.length - 1]
    let output = []
    let cPath = []
    for (let i = -1; i < 2; i += 2) {
        let c = { x: lastPoint.x, y: lastPoint.y + i }
        cPath.push(c)
    }
    for (let i = -1; i < 2; i += 2) {
        let c = { x: lastPoint.x + i, y: lastPoint.y }
        cPath.push(c)
    }
    for (let i = 0; i < cPath.length; i++) {
        let cx = cPath[i]
        if (cx.x >= 0 && cx.x < gridX && cx.y >= 0 && cx.y < gridY && path.filter(c => c.x == cx.x && c.y == cx.y).length == 0) {
            if (grid[cx.x][cx.y] == 0) {
                let newPath = path.slice()
                newPath.push(cx)
                output.push(newPath)
            }
        }
    }
    return output
}

function calculateDistance(startPoint, endPoint) {
    let cyclePaths = [[startPoint]]
    let checkPaths = checkArrive(cyclePaths, endPoint)
    let pathLength = 0
    while (checkPaths.length == 0 && cyclePaths.length > 0) {
        let tmpPaths = []
        for (let i = 0; i < cyclePaths.length; i++) {
            let path = cyclePaths[i]
            let paths = pathFinder(path)
            tmpPaths = tmpPaths.concat(paths)
        }
        cyclePaths = tmpPaths
        if (cyclePaths.length == 0) {
            console.log('No path to objective')
        }
        checkPaths = checkArrive(cyclePaths, endPoint)
        pathLength++
    }
    // for (let i = 0; i < checkPaths.length; i++) {
    //     let path = checkPaths[i]
    //     console.log(`Path ${i} -  ${path.map(x => JSON.stringify(x)).join(' ')} - Distance ${path.length - 1}`)
    // }
    return checkPaths.length > 0 ? checkPaths[0] : null
}

function checkArrive(paths, arrivePoint) {
    let output = []
    for (let i = 0; i < paths.length; i++) {
        let path = paths[i]
        let lastP = path[path.length - 1]
        if (lastP.x == arrivePoint.x && lastP.y == arrivePoint.y)
            output.push(path)
    }
    return output
}

//let distance = calculateDistance(startPoint, endPoint)
//console.log(distance)

let startPoint = {
    x: 0,
    y: 0
}

let pointsIndex = [1, 2]

let points = [{ x: 0, y: 1 }, { x: 4, y: 4 }]

// let endPoint = {
//     x: 2,
//     y: 5
// }

let grid = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]
let gridX = grid.length
let gridY = grid[0].length


Main()

function Main() {
    let pathsIndexArray = calculateProb(pointsIndex, [])
    calculateTotDist(pathsIndexArray)
}

function calculateProb(k, u) {
    let output = []
    if (k.length > u.length)
        for (let i = 0; i < k.length; i++) {
            if (u.filter(x => x == k[i]).length == 0) {
                let tm = u.slice()
                tm.push(k[i])
                let out2 = calculateProb(k, tm)
                for (let j = 0; j < out2.length; j++)
                    output.push(out2[j])
            }
        }
    else
        output.push(u)
    return output
}

function DemoProb() {
    let probResult = calculateProb(points, [])

    for (let i = 0; i < probResult.length; i++)
        console.log(JSON.stringify(probResult[i]))
}

function calculateTotDist(pathsArray) {
    let minPath = null
    for (let i = 0; i < pathsArray.length; i++) {
        let pathTmp = pathsArray[i]
        pathTmp.unshift(0)
        let tmpPoints = points.slice()
        tmpPoints.unshift(startPoint)
        let thisPath = [startPoint]
        for (let k = 1; k < pathTmp.length; k++) {
            let pathToAdd = calculateDistance(tmpPoints[pathTmp[k - 1]], tmpPoints[pathTmp[k]])
            pathToAdd.shift()
            thisPath = thisPath.concat(pathToAdd)
        }
        if (thisPath) {
            minPath = minPath || thisPath
            minPath = minPath.length > thisPath.length ? thisPath : minPath
        }
    }
    console.log(`${minPath.map(x => JSON.stringify(x)).join(' ')} - Distance ${minPath.length - 1}`)
    return minPath
}