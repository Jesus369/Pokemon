let activeUser = `
    <li><a class="login_anchor" href="/home/userlogout">Logout</a></li>
`;

let inactiveUser = `
  <li><a class="login_anchor" href="/home/registeruser">Register</a></li>
  <li><a class="login_anchor" href="/home/userlogin">Login</a></li>
`;

// Accessing username variabe in header
let username = document.getElementById("username_span");

if (username.innerText === "") {
  document.getElementById("user_accnts").innerHTML += inactiveUser;
} else {
  document.getElementById("user_accnts").innerHTML += activeUser;
}

// Scrolling element listings selection
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

$(".logo_items").click(() => {
  location.href = "/home";
});
