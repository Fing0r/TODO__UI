const btnsAddTask = document.querySelectorAll('[data-btn="add"]');
const btnsCheck = document.querySelectorAll('[type="checkbox"]');
const btnsDeletTask = document.querySelectorAll('[data-btn="del"]');
const todoInputs = document.querySelectorAll('.todo__input')

let list = [];

const STATUS = {
  DONE: "Done",
  IN_PROGRESS: "In progress",
}

function addTask(e) {
  list.push({
    name: e.currentTarget.previousElementSibling.value,
    priority: e.currentTarget.dataset.priority,
    status: STATUS.IN_PROGRESS
  });
};

function clearInputValue(e) {
  e.currentTarget.previousElementSibling.value = '';
};


function removeTask(e) {
  list = list.filter((item) => item.name !== e.currentTarget.previousElementSibling.textContent);
  e.currentTarget.parentElement.remove();
}

function addEventRemoveTask(btn) {
  btn.addEventListener('click', removeTask);
};

function checkForDuplicate(e) {
  const isKeysContainsValue = list.some((item) => item.name === e.currentTarget.previousElementSibling.value)
  if (isKeysContainsValue) {
    clearInputValue(e);
    return true
  };
};

function addEventChangeStatus(btn) {
  btn.addEventListener('click', changeStatus)
}

function changeStatus(e) {
  const nameIndex = list.findIndex((item) => item.name === e.currentTarget.parentElement.nextElementSibling.textContent);
  const checkStatus = e.currentTarget.closest(`.${STATUS.DONE}`);

  e.currentTarget.closest('.todo__task').classList.toggle(STATUS.DONE);
  list[nameIndex].status = checkStatus ? STATUS.IN_PROGRESS : STATUS.DONE;
  console.log(list);
}

function createTooltip() {
  const tooltip = template.content.cloneNode(true)
  return tooltip
}

function callTooltip(e) {
  e.currentTarget.parentElement.append(createTooltip());
  e.currentTarget.previousElementSibling.setAttribute('readonly', true)
  setTimeout(() => {
    todoInputs.forEach(todoInput => todoInput.removeAttribute('readonly'));
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
  addEventChangeStatus(taskLabel.firstElementChild)
  return task;
};

function checkError(e) {
  const isEmpty = e.currentTarget.previousElementSibling.value === '';
  if (isEmpty) return true;
  if (checkForDuplicate(e)) {
    callTooltip(e);
    return true;
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