export class City {
  constructor(list) {
    this.list = list;
    this.json = [];
    this.listFilter = [];
  }

  async getData() {
    let res = await fetch("https://studika.ru/api/areas", {
      method: "POST",
    });
    this.json = await res.json();
  }

  addData(array) {
    array.forEach((item) => {
      let li = document.createElement("li");
      let pEl = document.createElement("strong");
      li.classList.add("city-item");
      pEl.classList.add("city-item_strong");
      pEl.innerText = item.name;
      this.list.append(li);
      li.append(pEl);
      if (item.cities) {
        item.cities.forEach((el) => {
          let li = document.createElement("li");
          li.classList.add("city-item");
          let pEl = document.createElement("strong");
          pEl.classList.add("city-item_strong");
          let pItem = document.createElement("p");
          pItem.innerText = item.name;
          pEl.innerText = el.name;
          this.list.append(li);
          li.append(pEl);
          li.append(pItem);
        });
      }
    });
  }

  filterData(query) {
    this.listFilter = [];
    this.list.childNodes.forEach((el) => {
      el.textContent.toLowerCase().indexOf(query.toLowerCase()) > -1
        ? this.listFilter.push(el)
        : null;
    });
  }
}
