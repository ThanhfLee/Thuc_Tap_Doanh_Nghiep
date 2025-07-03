export const cart = {
  items: JSON.parse(localStorage.getItem("cart")) || [],

  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  },

  add(name, price) {
    const found = this.items.find((item) => item.name === name);
    if (found) {
      found.quantity += 1;
    } else {
      this.items.push({ name, price, quantity: 1 });
    }
    this.save();
  },

  remove(index) {
    this.items.splice(index, 1);
    this.save();
  },

  clear() {
    this.items = [];
    this.save();
  },

  get() {
    return this.items;
  },

  total() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
};
