let amount = "";

stopScroll = () => {
  amount = "";
};

scroll = () => {
  $("#attr_listings").animate({ scrollLeft: amount }, 50, () => {
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

$(".poke_logo").click(() => {
  location.href = "/home";
});
