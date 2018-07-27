$(".login_button").click(() => {
  $(".login_input").each(function() {
    if ($.trim($(this).val()) == "") {
      isValid = false;
      $(this).css({
        border: "1px solid red",
        "box-shadow": "0 0 2px 2px #FF6969"
      });
      $(this).keyup(function() {
        $(this).css({
          border: "",
          "box-shadow": ""
        });
      });
    } else {
      $(this).css({
        border: "",
        "box-shadow": ""
      });
    }
  });
});
