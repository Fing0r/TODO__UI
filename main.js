import {UI_ELEMENTS, STATUS} from "./view.js";

let list = [];

function addTask(e) {
  const inputValue = e.currentTarget.closest('.todo__info').querySelector('.todo__input');

  list.push({
    name: inputValue.value.trim(),
    priority: e.currentTarget.dataset.priority,
    status: STATUS.IN_PROGRESS
  });
}; 

function clearInputValue(e) {
  const inputValue = e.currentTarget.closest('.todo__info').querySelector('.todo__input');

  inputValue.value = '';
};

function removeTask(e) {
  const taskValue = e.currentTarget.closest('.todo__info').querySelector('.todo__text')

  list = list.filter((key) => key.name !== taskValue.textContent);
  e.currentTarget.closest('.todo__task').remove();
}

function addEventRemoveTask(btn) {
  btn.addEventListener('click', removeTask);
};

function checkForDuplicate(e) {
  const inputValue = e.currentTarget.closest('.todo__info').querySelector('.todo__input');
  const isKeyContainsValue = list.some((key) => key.name === inputValue.value.trim())
  if (isKeyContainsValue) {
    clearInputValue(e);
    return true
  };
};

function addEventChangeStatus(btn) {
  btn.addEventListener('click', changeStatus)
}

function changeStatus(e) {
  const taskValue = e.currentTarget.closest('.todo__info').querySelector('.todo__text')
  const nameIndex = list.findIndex((item) => item.name === taskValue.textContent);
  const checkStatus = e.currentTarget.closest(`.${STATUS.DONE}`);

  e.currentTarget.closest('.todo__task').classList.toggle(STATUS.DONE);
  list[nameIndex].status = checkStatus ? STATUS.IN_PROGRESS : STATUS.DONE;
}

function createTooltip() {
  const tooltip = template.content.cloneNode(true)
  return tooltip
}

function callTooltip(e) {
  const parent = e.currentTarget.closest('.todo__add')
  const todoInput = parent.querySelector('.todo__input')

  parent.append(createTooltip());
  todoInput.setAttribute('readonly', true)
  setTimeout(() => {
    todoInput.removeAttribute('readonly')
    document.querySelector('.tooltip').remove()
  }, 1000);
}

function createTaskElement() {
  const task = document.createElement('li');
  const taskLabel = document.createElement('label');
  const taskText = document.createElement('p');
  const taskBtn = document.createElement('button');

  task.className = 'todo__task';
  taskLabel.className = 'todo__checkbox';
  taskText.className = 'todo__text';
  taskBtn.className = 'todo__btn-close';

  taskLabel.innerHTML = `<input class="todo__field" type="checkbox" data-btn="check">
  <span class="todo__content"></span>`;
  taskText.textContent = list[list.length - 1].name;
  taskBtn.type = 'button';
  taskBtn.dataset.btn = 'del';

  task.append(taskLabel);
  task.append(taskText);
  task.append(taskBtn);

  addEventRemoveTask(taskBtn);
  addEventChangeStatus(taskLabel.querySelector('.todo__field'));
  return task;
};

function checkError(e) {
  const inputValue = e.currentTarget.closest('.todo__info').querySelector('.todo__input')
  const isEmpty = inputValue.value.trim() === '';

  try {
    if (isEmpty) {
      throw new SyntaxError("Пустое значение");
    }
    if (checkForDuplicate(e)) {
      callTooltip(e);
      throw new SyntaxError("Повторная задача");
    }
  } catch (e) {
    console.log(e.message);
    return true;
  }
};

UI_ELEMENTS.BTNS_ADD_TASK.forEach(btnAddTask => {
  btnAddTask.addEventListener('click', function (e) {
    e.preventDefault();
    if (checkError(e)) return;
    addTask(e);

    const hereInsert = e.currentTarget.closest(".todo__info").querySelector(".todo__list");

    hereInsert.append(createTaskElement());
    clearInputValue(e);
  });
});

UI_ELEMENTS.BTNS_DELET_TASK.forEach(btnDeletTask => {
  btnDeletTask.addEventListener('click', removeTask);
});

UI_ELEMENTS.BTNS_CHECK.forEach(btnCheck => {
  btnCheck.addEventListener('click', changeStatus);
});