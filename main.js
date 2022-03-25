// 1.유저가 할일(값)을 입력한다.
// + 버튼을 클릭하면 아이템(할일)이 추가 된다.
// delete 버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만,진행중인 텝은 진행중인 아이템만 노출된다.
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
  const taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}
//  taskList 할일을 나타내주는 그려주는 함수
function render() {
  // 변수는 고정값이 아닌 let으로 선언 const는 상수 즉 고정값.
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `  <div class="task">
    <div>${taskList[i]}</div>
    <div>
      <button>Check</button>
      <button>Delete</button>
    </div>
  </div>`;
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}
