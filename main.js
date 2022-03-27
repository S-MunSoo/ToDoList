// 유저가 값을 입력한다.
// +버튼을 클릭하면, 할일이 추가된다.
// delete 버튼을 누르면 할일이 제거된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 1.check 버튼을 클릭하면 true , false 표시( addEventListener 대신 바로 줄 수 있는 onclick 이벤트 활용)
// 2.true이면 끝난걸로 간주하고 밑줄표시
// 3.false 이면 안끝난걸로 간주
// 진행중 완료 탭을 누르면, 언더바가 이동한다.
// 완료탭은 완료목록만,진행중탭은 진행중인 목록만 보인다.
// 모두탭을 누르면 다시 모두 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
addButton.addEventListener("click", addTask);

// addTask함수는 +버튼이 클릭했을시 taskLIST목록에 taskInput값이 추가 된다.
// 추가 정보를 넣기위해 객체활용(필요한 정보를 하나로 묶어주는 역활)
// 아이템을 분리하기 위해 각각의 아이템에 id라는 속성을 부여해준다.
// querySelectorAll은 .task-tabs div 조건에 만족하는 모든것을 가져온다.

for (i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  // isComplete 끝났는지 안끝났는지 확인해주는 요소

  taskList.push(task);
  console.log(taskList);
  render();
}

// render 함수를 통해 tasklist을 목록에 나타내준다(UI역활)

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class = "task-done">${list[i].taskContent}</div>
      <div>
        <button onclick ="togleComplete('${list[i].id}')">Check</button>
        <button onclick ="DeleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHTML += ` <div class="task">
    <div>${list[i].taskContent}</div>
    <div>
      <button onclick="togleComplete('${list[i].id}')">Check</button>
      <button onclick ="DeleteTask('${list[i].id}')">Delete</button>
    </div>
  </div>`;
    }
    // ${taskList[i].taskContent 을 추가 해주므로써 객체를 프린트 해준다.
  } // addEventListener 대신 onclick 사용 onclick클릭 안에는 함수를 넣어주면 된다.(onclick="togleComplete())
  document.getElementById("task-borad").innerHTML = resultHTML;
}
//  !는 not이라는 뜻! !taskList[i].isComplete; !을 주무르써 밑줄표시를 됬다 안됬다 할 수 있다.
function togleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}
// randomIDGenerate 랜덤하게 id을 생성해주는 함수 호출

function filter(event) {
  mode = event.target.id;
  filterList = [];
  document.getElementById("under-line").style.width =
    event.target.offsetWidth + "px";
  document.getElementById("under-line").style.top =
    event.target.offsetTop + event.target.offsetHeight + "px";
  document.getElementById("under-line").style.left =
    event.target.offsetLeft + "px";
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
  console.log(filterList);
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
function DeleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}
// 배열에 있는 아이템을 삭제하는 방법 splic(시작점을 비릇해 몇개의 지점까지)을  사용해준다.
