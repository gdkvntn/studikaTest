import { City } from "./city";

const btnCity = document.querySelector(".city");
const popUp = document.querySelector(".city-popUp");
const popUpList = document.querySelector(".city-list");
const preloader = document.querySelector(".preloader");
const cityInp = document.querySelector(".city-input");
const resetInp = document.querySelector(".resetInp");
const citySelected = document.querySelector(".city-selected");
const cityBtn = document.querySelector(".city-btn");
const regionBtn = document.querySelector(".region-btn");

let arrCity = [];

let headerCity = new City(popUpList);

btnCity.addEventListener("click", () => {
  popUp.classList.toggle("popup-active");
  if (!headerCity.json.length) {
    headerCity.getData(headerCity.json).then(() => {
      preloader.style.display = "none";
      headerCity.addData(headerCity.json);
    });
  }
});

document.addEventListener("click", (e) => {
  if (
    !e.composedPath().includes(popUp) &&
    !e.composedPath().includes(btnCity)
  ) {
    popUp.classList.remove("popup-active");
  }
});

cityInp.addEventListener("input", (e) => {
  const val = e.target.value;
  val.length
    ? (resetInp.style.display = "block")
    : (resetInp.style.display = "none");
  while (popUpList.firstChild) {
    popUpList.removeChild(popUpList.firstChild);
  }
  headerCity.addData(headerCity.json);
  headerCity.filterData(val);
  while (popUpList.firstChild) {
    popUpList.removeChild(popUpList.firstChild);
  }
  headerCity.listFilter.forEach((el) => popUpList.append(el));

  if (val.length) {
    popUpList.childNodes.forEach((el) => {
      let re = new RegExp(val, "gi");
      el.innerHTML = el.innerHTML.replace(re, (e) => {
        return `<span>${e}</span>`;
      });
    });
  }
});

resetInp.addEventListener("click", () => {
  cityInp.value = "";
  while (popUpList.firstChild) {
    popUpList.removeChild(popUpList.firstChild);
  }
  headerCity.addData(headerCity.json);
  headerCity.filterData("");
  resetInp.style.display = "none";
});

function deleteSelect(name) {
  let res = arrCity.filter((el) => name !== el);
  arrCity = res;
  reloadArrCity();
}
function reloadArrCity() {
  while (citySelected.firstChild) {
    citySelected.removeChild(citySelected.firstChild);
  }
  arrCity.forEach((el) => {
    const div = document.createElement("div");
    const close = document.createElement("span");
    close.classList.add("delete-city");
    close.innerHTML = "&#10006;";
    close.onclick = () => deleteSelect(el);
    div.innerText = el;
    citySelected.append(div);
    div.append(close);
  });
}
reloadArrCity();

popUpList.addEventListener("click", (e) => {
  if (e.target.classList.contains("city-item")) {
    if (e.target)
      if (!arrCity.includes(e.target.firstChild.textContent)) {
        arrCity.push(e.target.firstChild.textContent);
        reloadArrCity();
      } else {
        deleteSelect(e.target.firstChild.textContent);
      }
  }
  if (e.target.classList.contains("city-item_strong")) {
    if (e.target)
      if (!arrCity.includes(e.target.textContent)) {
        arrCity.push(e.target.textContent);
        reloadArrCity();
      } else {
        deleteSelect(e.target.textContent);
      }
  }
});

cityBtn.addEventListener("click", () => {
  let arrCookie = [];
  headerCity.json.forEach((el) => {
    arrCity.forEach((item) => {
      if (el.cities) {
        el.cities.find((city) => {
          city.name === item ? arrCookie.push(city) : null;
        });
      }
      el.name === item ? arrCookie.push(el) : null;
    });
  });
  regionBtn.textContent = arrCity.length ? arrCity : "Любой регион";
  arrCookie.forEach((el, i) => {
    setCookie(`city${i}`, el.name, { secure: true });
    setCookie(`city${i}id`, el.id);
  });
  console.log(1);
  fetch("/studika.com", {
    method: "POST",
    body: document.cookie,
  });
});

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

const toggle = document.querySelector(".nav-toggle");
const burger = document.querySelector(".burger-menu");
toggle.addEventListener("click", function (e) {
  this.classList.toggle("opened");
  burger.classList.toggle("open");
});

const btnBurgerCity = document.querySelector(".btnBurgerCity");

btnBurgerCity.addEventListener("click", () => {
  popUp.classList.toggle("popup-active_burger");
  if (!headerCity.json.length) {
    headerCity.getData(headerCity.json).then(() => {
      preloader.style.display = "none";
      headerCity.addData(headerCity.json);
    });
  }
});
