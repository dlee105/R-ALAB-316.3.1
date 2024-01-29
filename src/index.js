//import "./styles.css";

//console.log(1);
const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.classList.add("flex-ctr");
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";

const topMenuEl = document.getElementById("top-menu");

topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = `var(--top-menu-bg)`;
topMenuEl.classList.add("flex-around");

var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

for (const obj of menuLinks) {
  let child = document.createElement("a");
  child.textContent = obj.text;
  child.setAttribute("href", obj.href);
  topMenuEl.appendChild(child);
}

const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

const topMenuLinks = document.getElementsByTagName("a");

function subMenuListener(event) {
  event.preventDefault();
  for (var child of topMenuLinks) {
    child.classList.remove("active");
  }
  if (event.target.tagName === "A") {
    console.log(event.target);
    subMenuEl.style.top = "0";
    mainEl.innerHTML = `<h1>${event.target.text}</h1>`;
  } else {
    return;
  }
}

// HELPER FUNCTIONS //

function buildSubmenu() {
  //console.log(subMenuEl);
  while (subMenuEl.firstElementChild) {
    subMenuEl.firstElementChild.remove();
  }
}

function stateChange() {
  if (subMenuEl.style.top === "100%") {
    return "0";
  } else {
    return "100%";
  }
}

///////////////////////

function clickEvent(event) {
  event.preventDefault();
  // removing active class loop
  if (event.target.tagName === "A") buildSubmenu();

  for (var child of topMenuLinks) {
    child.classList.remove("active");
  }

  if (event.target.text === "about") {
    mainEl.innerHTML = `<h1>ABOUT</h1>`;
  }

  if (event.target.tagName === "A") {
    event.target.classList.add("active");

    for (const i of menuLinks) {
      if (Object.keys(i).includes("subLinks") && i.text === event.target.text) {
        for (const y of i.subLinks) {
          let child = document.createElement("a");
          child.setAttribute("href", y.href);
          child.textContent = y.text;
          subMenuEl.appendChild(child);
          //console.log("child", child, subMenuEl);
        }
        subMenuEl.style.top = stateChange(); // helper functions allowing click to close
        //console.log(i.text);
        break;
      } else {
        stateChange();
      }
    }

    //console.log(event.target.text);

    //console.log(event.target);
  } else {
    return;
  }
}

topMenuEl.addEventListener("click", clickEvent);
subMenuEl.addEventListener("click", subMenuListener);
