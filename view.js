const btnsAddTask = document.querySelectorAll('[data-btn="add"]');
const btnsCheck = document.querySelectorAll('[type="checkbox"]');
const btnsDeletTask = document.querySelectorAll('[data-btn="del"]');
const todoInputs = document.querySelectorAll('.todo__input')

let list = [];

const STATUS = {
  DONE: "Done",
  IN_PROGRESS: "In progress",
}

btnsAddTask.forEach(element => {
  element.dataset.priority
});

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

  list = list.filter((item) => item.name !== taskValue.textContent);
  e.currentTarget.closest('.todo__task').remove();
}

function addEventRemoveTask(btn) {
  btn.addEventListener('click', removeTask);
};

function checkForDuplicate(e) {
  const inputValue = e.currentTarget.closest('.todo__info').querySelector('.todo__input');
  const isKeyContainsValue = list.some((item) => item.name === inputValue.value.trim())
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
  task.className = 'todo__task';

  const taskLabel = document.createElement('label');
  taskLabel.className = 'todo__checkbox';
  taskLabel.innerHTML = `<input class="todo__field" type="checkbox" data-btn="check">
  <span class="todo__content"></span>`;

  const taskText = document.createElement('p');
  taskText.className = 'todo__text';
  taskText.textContent = list[list.length - 1].name;

  const taskBtn = document.createElement('button');
  taskBtn.className = 'todo__btn-close';
  taskBtn.type = 'button';
  taskBtn.dataset.btn = 'del';

  task.append(taskLabel);
  task.append(taskText);
  task.append(taskBtn);

  addEventRemoveTask(taskBtn);
  addEventChangeStatus(taskLabel.querySelector('.todo__field'))
  return task;
};

function checkError(e) {
  const inputValue = e.currentTarget.closest('.todo__info').querySelector('.todo__input')
  const isEmpty = inputValue.value.trim() === '';
<<<<<<< HEAD

  try {
    if (isEmpty) {
      throw new SyntaxError("Пустое значение");
    }
    if (checkForDuplicate(e)) {
      callTooltip(e);
      throw new SyntaxError("Повторная задача");
    }
  } catch (e) {
    console.log(e.message)
    return true;
=======
  if (isEmpty) return true;
  if (checkForDuplicate(e)) {
    callTooltip(e);
    return true; 
>>>>>>> dev
  }
};

export {
  btnsCheck,
  btnsAddTask,
  btnsDeletTask,
  todoInputs,
  list,
  checkError,
  createTaskElement,
  addTask,
  clearInputValue,
  removeTask,
  addEventRemoveTask,
  checkForDuplicate,
  addEventChangeStatus,
  changeStatus,
  createTooltip,
  callTooltip,
};