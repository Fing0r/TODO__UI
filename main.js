import * as view from "./view.js";

view.btnsAddTask.forEach(btnAddTask => {
  btnAddTask.addEventListener('click', function (e) {
    e.preventDefault();
    if (view.checkError(e)) return;
    view.addTask(e);

    e.currentTarget
      .closest(".todo__info")
      .querySelector(".todo__list")
      .append(view.createTaskElement()); 

    view.clearInputValue(e);
  });
});

view.btnsDeletTask.forEach(btnDeletTask => {
  btnDeletTask.addEventListener('click', view.removeTask)
});


view.btnsCheck.forEach(btnCheck => {
  btnCheck.addEventListener('click', view.changeStatus)
});
