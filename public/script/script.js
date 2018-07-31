let arrowUp = document.getElementById("arrow_up");
let arrowDown = document.getElementById("down_arrow");

let amount = "";

stopScroll = () => {
  amount = "";
};

scroll = () => {
  $(".attr_listings").animate({ scrollTop: amount }, 50, "linear", () => {
    if (amount != "") {
      scroll();
    }
  });
};

$("#arrow_up").hover(
  () => {
    amount = "-=10";
    scroll();
  },
  function() {
    amount = "";
  }
);

$("#arrow_down").hover(
  () => {
    amount = "+=10";
    scroll();
  },
  function() {
    amount = "";
  }
);
