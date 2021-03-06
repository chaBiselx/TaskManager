window.TaskManager = (() => {
  let module = {};

  module.Task = class Task {
    /*
    *constructor
    *
    */
    constructor(name = 'untitled', duration = 0, tags = null) {
      this.name = name;
      this.duration = duration;
      this.tags = tags;
    }

    display_item() {
      let properties = $('<ul>');
      properties.append(this.display_duration());
      properties.append(this.display_tags());
      return $('<li>')
             .addClass('task')
             .append(this.display_name())
             .append(properties);
    }

    display_name() {
      return $('<span>')
             .addClass('name')
             .text(this.name)
             .append(this.display_button());
    }

    display_button(){
      let buttonValid = $('<input>')
        .prop('type', 'button')
        .addClass('validButton')
        .prop('value', 'V');
      let buttonModify = $('<input>')
        .prop('type', 'button')
        .addClass('modifyButton')
        .prop('value', 'M');
      let buttonDelete = $('<input>')
        .prop('type', 'button')
        .addClass('deleteButton')
        .prop('value', 'X');
      return $('<div>')
        .addClass('class', 'formButton')
        .append(buttonValid)
        .append(buttonModify)
        .append(buttonDelete);
    }

    display_duration() {
      let item = $('<li>').addClass('duration').text(this.duration);
      if (this.duration <= 10) {
        item.addClass('short');
      } else if (this.duration >= 20) {
        item.addClass('long');
      }
      return item;
    }

    display_tags() {
      let container = $('<li>').addClass('tags').text(this.tags);
      let field = $('<input>').prop('type', 'text');
      let button = $('<input>').prop('type', 'submit');
      let editor = $('<form>').append(field).append(button);

      let task = this;

      let in_edit = false;

      container.click((event) => {
        event.stopPropagation();
        event.preventDefault();

        let target = $(event.target);

        if (target.is('li') && !in_edit) {
          container.empty();
          container.append(editor);
          in_edit = true;
        }

        if (target.is('input') && target.prop('type') === 'submit') {
          task.tags = field.val();
          container.empty();
          container.text(task.tags);
          in_edit = false;
        }

      });

      return container;
    }
  }

  module.tasks = [];

  module.display_tasks = (div_id) => {
    let container = $('<ul>').prop('id', 'tasks');
    $(div_id).append(container);

    for (let task of module.tasks) {
      $(container).append(task.display_item());
    }
  }

  return module;
})();


$(() => {
  div_hide();
  TaskManager.tasks.push(new TaskManager.Task('tache 1', 10, 'test1'));
  TaskManager.tasks.push(new TaskManager.Task('tache 2', 20, 'test2'));
  TaskManager.tasks.push(new TaskManager.Task('tache 3', 15, 'test1'));

  TaskManager.display_tasks('#taskmanager');

  /*
  *button
  */
  $( "#addTask" ).click( () => {
    $('#formPopupTitle').text("Nouvelle tâche ")
    div_show();
  });

  $( ".validButton" ).click( () => {
    //alert('validButton');
    //this.parentNode.parentNode.css('background-color' , 'red');
    //TODO verrouillé button et changer couleur fond
  });

  $( ".modifyButton" ).click( () => {
    $('#formPopupTitle').text("Modifier tâche")
    div_show('nom',50,'tags25');
  });

  $( ".deleteButton" ).click( () => {
    alert('deleteButton');
  });

  $( ".closePopUp" ).click( () => {
    div_hide("fast");
  });

  /*
  * function
  */
  //Function To Display Popup
  function div_show(name = '', duration = 1, tags = null) {
    $('#taskName').val(name);
    $('#taskDuration').val(duration);
    $('#taskMsg').empty();
    $('#taskMsg').append(tags);
    $('#popupNewTask').show("slow");

  }
  //Function to Hide Popup
  function div_hide( option ){
    $('#popupNewTask').hide(option);
  }
});
