const Graph = require("./Graph");

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.sort();
    }

    dequeue() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    sort() {
        this.elements.sort((a, b) => a.priority - b.priority);
    }
}

async function dijkstra(startNode, endNode) {
    const distances = {};
    const previousNodes = {};
    const priorityQueue = new PriorityQueue();

    // Khởi tạo distances và previousNodes
    for (let node in Graph) {
        distances[node] = Infinity;
        previousNodes[node] = null;
    }

    distances[startNode] = 0;
    priorityQueue.enqueue(startNode, 0);

    while (!priorityQueue.isEmpty()) {
        const { element: closestNode, priority: shortestDistance } = priorityQueue.dequeue();

        if (closestNode === endNode) {
            break; // Đã tìm thấy đỉnh kết thúc, dừng thuật toán
        }

        // Cập nhật khoảng cách tới các node lân cận
        for (let neighbor in Graph[closestNode]) {
            let currentDistance = shortestDistance + Graph[closestNode][neighbor];

            if (currentDistance < distances[neighbor]) {
                distances[neighbor] = currentDistance;
                previousNodes[neighbor] = closestNode;
                priorityQueue.enqueue(neighbor, currentDistance);
            }
        }
    }

    // Truy vết để tìm đường đi ngắn nhất từ startNode đến endNode
    const shortestPath = [endNode];
    let previousNode = previousNodes[endNode];
    while (previousNode) {
        shortestPath.unshift(previousNode);
        previousNode = previousNodes[previousNode];
    }

    return { distance: distances[endNode], path: shortestPath };
}

// const startNode = 'A';
// const endNode = 'F';
// const result = dijkstra(startNode, endNode);

module.exports = dijkstra;