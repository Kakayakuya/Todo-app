// 从新开始开发
const input = document.querySelector('input');
const button = document.querySelector("button");
const list = document.getElementById("todoList");

// click add button
button.onclick = function () {
    // get input text
    const text = input.value;

    // if text is not null
    if (text !== "") {
        // create new list item
        const li = document.createElement("li");
        li.textContent = text;

        // add item to list
        list.appendChild(li);

        // clear input text
        input.value = "";
    }
};
