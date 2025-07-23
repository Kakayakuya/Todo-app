// 获取HTML元素
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list"); // 假设这是 <ul> 或 <ol> 元素

// --- 推荐的优化：将创建单个待办事项元素的逻辑封装成函数 ---
// 这个函数负责创建 li 元素、添加文本、按钮、设置类、绑定所有事件
function createTodoElement(taskText, isCompleted = false) {
    const li = document.createElement("li");
    // 创建一个 span 来包裹任务文本，以便后续更精确地保存文本
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    if (isCompleted) {
        li.classList.add("completed");
    }

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-btn");
    delBtn.textContent = "删除"; // 统一删除按钮文本
    delBtn.style.marginLeft = "auto"; // 将按钮推到最右边（需要 li 具有 display: flex; 样式）

    // 绑定删除按钮的点击事件
    delBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // 阻止事件冒泡到 li，避免触发 li 的点击事件
        li.remove(); // 移除整个 li 元素
        saveTodos(); // 更新本地存储
    });

    li.appendChild(delBtn); // 将删除按钮添加到 li 中

    // 绑定 li 的点击事件（切换完成状态）
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTodos(); // 更新本地存储
    });

    return li; // 返回创建好的 li 元素
}

// --- 点击按钮时的操作 (使用新的封装函数) ---
addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();

    if (taskText === "") return;

    // 直接调用封装函数创建任务元素
    const newTodoLi = createTodoElement(taskText);
    list.appendChild(newTodoLi);

    input.value = ""; // 清空输入框
    saveTodos(); // 保存新的待办事项
});

// --- 保存任务到本地 (需要适应 li 内部有了 span) ---
function saveTodos() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach((li) => {
        // 确保获取的是 span 中的任务文本
        const taskTextElement = li.querySelector("span");
        if (taskTextElement) {
            // 检查 span 是否存在
            todos.push({
                text: taskTextElement.textContent.trim(),
                completed: li.classList.contains("completed"),
            });
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// --- 优化后的加载本地任务 (使用新的封装函数) ---
function loadTodos() {
    const saved = localStorage.getItem("todos");
    if (saved) {
        const todos = JSON.parse(saved);
        todos.forEach((todo) => {
            // 直接调用封装函数创建任务元素，并传入其完成状态
            const loadedTodoLi = createTodoElement(todo.text, todo.completed);
            document.getElementById("todo-list").appendChild(loadedTodoLi);
        });
    }
}

// 页面加载完自动执行
window.addEventListener("DOMContentLoaded", loadTodos);
