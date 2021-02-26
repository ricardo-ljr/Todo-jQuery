
      $(document).ready(function() {
        // listen for todos
        var todoRef = firebase.database().ref("todos");
        todoRef.on("value", function(snapshot) {
          loadTodos(snapshot.val());
        });

        function loadTodos(todos) {
          $(".todos").html(""); // clear .todos

          for (key in todos) {
            var todoText = todos[key].text;
            var textDecoration = "none";
            if (todos[key].complete) {
              textDecoration = "line-through";
            }

            // add .todo for this item
            var todo = $("<div></div>", {
              class: "todo",
              id: key,
              text: todoText,
              style: "text-decoration: " + textDecoration
            }).prependTo(".todos");

            $("<img>", {
              class: "delete",
              src: "images/delete_icon.png",
              click: function() {
                deleteItem($(this));
              }
            }).appendTo(todo);

            $("<input></input>", {
              type: "checkbox",
              change: function() {
                checkItem($(this));
              },
              checked: todos[key].complete
            }).prependTo(todo);
          }
        }

        // when item is checked
        function checkItem(elem) {
          var updatedCompleteValue = true;
          if (elem.prop("checked")) {
            elem.parent().css("text-decoration", "line-through");
          } else {
            updatedCompleteValue = false;
            elem.parent().css("text-decoration", "none");
          }

          // update in db
          var updates = {};
          var id = elem.parent().attr("id");
          updates["/todos/" + id + "/complete"] = updatedCompleteValue;
          firebase
            .database()
            .ref()
            .update(updates);
        }

        // when item is deleted
        function deleteItem(elem) {
          var id = elem.parent().attr("id");
          firebase
            .database()
            .ref("/todos/" + id)
            .remove();
        }

        // when add icon is clicked
        $(".add").click(function() {
          $(".todo-add").fadeIn("fast");
          $("input[type='text']").focus();
          $(".todo").css("padding-top", "15px");
          $(".todo-add").css("padding-top", "50px");
        });

        // when item is added
        $("input[type='text']").keypress(function(e) {
          var parent = $(this).parent();

          if (e.which == 13) {
            // save to db
            var todoText = $("input[type='text']").val();
            firebase
              .database()
              .ref("todos")
              .push({ text: todoText, complete: false });

            // clear input and hide div
            $(this).val("");
            parent.hide();

            return false;
          }
        });
      });
