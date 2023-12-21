const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

// hàm chuyển đổi danh sách các con đường trong (roads) thành cấu trúc dữ liệu
// đối với mỗi địa điểm sẽ cho chúng ta biết những didemr nào có thể đến được từ địa điểm đó

function buildGraph(edges) {
  let graph = {};
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

//tạo 1 lớp vô phỏng 1 làng đơn giản và việc di chuyển các kiện hàng trong làng đó
class VillageState {
  //hàm tạo với vị trí hiện tại trong làng và 1 mảng kiện hàng
  //mảng kiện hàng là 1 mảng gồm các đối tượng có 2 thuộc tính place và addres
  // place : địa điểm hiện tại
  // address : địa chỉ giao hàng tiếp theo

  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  // phương thức move : di chuyển của một người giao hàng
  // nó nhận một tham số là destination đại diện cho vị trí mục tiêu
  move(destination) {
    // kiểm tra xem từ địa điểm hiện tại có đi đến được destination hay không
    // Nếu không trả về trạng thái cũ vì đây không phải là 1 bước di chuyển hợp lệ
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      // nếu có thì sẽ thiết lập lại kiện hàng (parcels)
      let parcels = this.parcels
        // đầu tiên dùng map
        .map((p) => {
          // sửa lại địa điểm hiện tại trong kiện hàng thành destination
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        // loại bỏ phần tử đã được giao
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}
