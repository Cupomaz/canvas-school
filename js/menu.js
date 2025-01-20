import { MenuItem } from "./menuItem.js";

class Menu {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.menuItems = [];
  }

  add() {
    this.menuItems.push(new MenuItem(this.parentElement));
  }

  render() {
    this.parentElement.innerHTML = "";

    for (let i = 0; i < this.menuItems.length; i++) {
      if (this.menuItems[i].remove) {
        this.menuItems.splice(i, 1);
        i -= 1;
      } else {
        this.menuItems[i].createElements();
      }
    }
  }

  setItems() {
    this.menuItems.forEach((e) => {
      e.createFirework();
    });
  }

  export() {
    const blob = new Blob([JSON.stringify(this.menuItems)], {
      type: "application/json",
    });
    const link = document.createElement("a");

    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "fireworks.json");
    link.click();
  }
}

export { Menu };
