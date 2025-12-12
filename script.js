const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

const addTask = (event) => {
    if (event) event.preventDefault();

    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        <div class="task-btn">
            <button class="edit-btn">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    li.classList.add("animate");
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    // DELETE
    deleteBtn.addEventListener('click', function () {
        li.classList.add('delete-animate');

        // Remove only after animation finishes
        li.addEventListener('animationend', function () {
            li.remove();
        });
    });
    // EDIT
    editBtn.addEventListener('click', function () {
        const textSpan = li.querySelector('span');
        const oldText = textSpan.textContent;

        const input = document.createElement('input');
        input.setAttribute('class', 'edit-input')
        input.type = 'text';
        input.value = oldText;

        li.replaceChild(input, textSpan);

        input.addEventListener('blur', function () {
            textSpan.textContent = input.value || oldText;
            li.replaceChild(textSpan, input);
        });

    });


    taskList.appendChild(li);
    taskInput.value = "";
};

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTask(e);
    }
});
