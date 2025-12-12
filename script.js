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

    //DELETE
    deleteBtn.addEventListener('click', function () {

        li.style.animation = 'rotateOutDown 0.5s forwards';
        li.addEventListener('animationend', function () {
            li.remove();

        });
    });

    //EDIT & SAVE
    editBtn.addEventListener('click', function () {
        const textSpan = li.querySelector('span');
        const oldText = textSpan.textContent;

        const input = document.createElement('input');
        input.setAttribute('class', 'edit-input');
        input.type = 'text';
        input.value = oldText;

        li.replaceChild(input, textSpan);

        // trigger transition
        setTimeout(() => input.classList.add('show'), 10); // slight delay to start CSS transition
        input.focus();

        // Change icon from pen to save
        editBtn.innerHTML = '<i class="fa fa-save"></i>';

        input.addEventListener('blur', function () {
            // remove transition class for smooth reverse
            input.classList.remove('show');

            // Wait for transition to finish before replacing element
            setTimeout(() => {
                textSpan.textContent = input.value || oldText;
                li.replaceChild(textSpan, input);

                // Change icon back from save to pen
                editBtn.innerHTML = '<i class="fa fa-pen"></i>';
            }, 300); // same as CSS transition duration
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
