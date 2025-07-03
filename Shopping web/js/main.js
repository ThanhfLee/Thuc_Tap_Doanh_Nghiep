import { cart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cart-items");
  const addButtons = document.querySelectorAll(".add-to-cart");
  const cartCount = document.getElementById("cart-count");

  // Hiển thị danh sách sản phẩm trong giỏ
  function renderCart() {
    if (!cartList) return;
    cartList.innerHTML = "";
    cart.get().forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()}đ
      `;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Xoá";
      removeBtn.onclick = () => {
        cart.remove(index);
        renderCart();
        updateCount();
        updateCartBadge();
        showNotification(`🗑 Đã xoá "${item.name}"`);
      };

      li.appendChild(removeBtn);
      cartList.appendChild(li);
    });

    const totalBox = document.getElementById("cart-total");
    if (totalBox) {
      totalBox.textContent = `Tổng cộng: ${cart.total().toLocaleString()}đ`;
    }
  }

  // Cập nhật số lượng hiển thị
  function updateCount() {
    if (cartCount) {
      const totalQuantity = cart
        .get()
        .reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = `(${totalQuantity})`;
    }
  }

  // Gán sự kiện cho nút "Thêm vào giỏ"
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const name = product.querySelector("h3").textContent;
      const priceText = product
        .querySelector(".price .new")
        .textContent.replace(/[^\d]/g, "");
      const price = parseInt(priceText, 10);

      cart.add(name, price);
      renderCart();
      updateCount();
      updateCartBadge();
      showNotification(`✅ Đã thêm "${name}" vào giỏ hàng`);
    });
  });

  // Hiển thị thông báo nổi
  function showNotification(message) {
    let noti = document.getElementById("notification");
    if (!noti) {
      noti = document.createElement("div");
      noti.id = "notification";
      document.body.appendChild(noti);
    }
    noti.textContent = message;
    noti.className = "show";
    setTimeout(() => (noti.className = ""), 2000);
  }

  // Xoá toàn bộ giỏ
  const clearBtn = document.querySelector(".cart button");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      cart.clear();
      renderCart();
      updateCount();
      updateCartBadge();
      showNotification("🔔 Giỏ hàng đã được làm trống.");
    });
  }

  // Hiển thị badge giỏ hàng
  function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (badge) {
      const totalQty = cart.get().reduce((sum, item) => sum + item.quantity, 0);
      badge.textContent = totalQty;
    }
  }

  renderCart();
  updateCount();
  updateCartBadge();
});
