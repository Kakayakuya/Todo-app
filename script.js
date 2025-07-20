// 获取HTML元素
const input=document.getElementById("todo-input");
const addBtn=document.getElementById("add-btn");
const list=document.getElementById("todo-list");


// 点击按钮时的操作
addBtn.addEventListener("click", () =>{
    const taskText=input.value.trim();//获取输入并去除空格

    if (taskText==="") return;//如果输入为空格，不添加

    //创建li元素
    const li=document.createElement("li");
    li.textContent=taskText;

    // 创建删除按钮
    const delBtn = document.createElement("button");
    delBtn.textContent="删除"
    delBtn.style.marginLeft=""

    delBtn.classList.add("delete-btn");

    // 给删除按钮绑定点击事件
    delBtn.addEventListener("click", () => {
        list.removeChild(li);// 从列表删除元素
    });

    //添加元素到列表中
    list.appendChild(li);

        // 把按钮加入到li里面
    list.appendChild(delBtn);

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTodos();
    });

    //清空输入框
    input.value="";
});

// 保存任务到本地
function saveTodos() {
  const todos = [];
  document.querySelectorAll("#todo-list li").forEach(li => {
    todos.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 加载本地任务
function loadTodos() {
  const saved = localStorage.getItem("todos");
  if (saved) {
    const todos = JSON.parse(saved);
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.text;

      if (todo.completed) {
        li.classList.add("completed");
      }

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.classList.add("delete-btn");

      delBtn.addEventListener("click", () => {
        li.remove();
        saveTodos();
      });

      li.appendChild(delBtn);

      li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTodos();
      });

      document.getElementById("todo-list").appendChild(li);
    });
  }
}

// 页面加载完自动执行
window.addEventListener("DOMContentLoaded",loadTodos);