// =========================================================
// FNWEB — script.js
// Xử lý 2 việc chính:
// 1. Tô sáng mục menu đang active theo trang hiện tại
// 2. Lọc danh sách dự án theo tab (Tất cả / Web / Game) ở trang Dự Án
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNavLink();
  setupProjectFilter();
  setupMobileMenu();
  setupProjectCardSelection();
});

/**
 * Tự động thêm class "active" cho link nav trùng với trang hiện tại,
 * dựa vào tên file trong data-page của thẻ <body>.
 */
function highlightActiveNavLink() {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Mở/đóng menu điều hướng trên mobile (nút hamburger).
 * Bấm lại nút, bấm ra ngoài, hoặc chọn 1 link đều tự đóng menu.
 */
function setupMobileMenu() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggleBtn || !navLinks) return;

  const closeMenu = () => {
    toggleBtn.classList.remove("open");
    navLinks.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggleBtn.classList.toggle("open", isOpen);
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Đóng menu khi chọn 1 mục điều hướng
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Đóng menu khi bấm ra ngoài vùng header
  document.addEventListener("click", (event) => {
    const clickedInsideHeader = event.target.closest(".header");
    if (!clickedInsideHeader) closeMenu();
  });
}

/**
 * Khi bấm vào một khung dự án, thêm class "selected" để hiện viền màu
 * riêng theo từng dự án (đã định nghĩa theo data-theme trong CSS).
 * Bấm vào link con (Mã Nguồn / Xem Demo) thì không tính là chọn khung.
 */
function setupProjectCardSelection() {
  const cards = document.querySelectorAll(".project-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return; // bỏ qua khi bấm vào link

      const alreadySelected = card.classList.contains("selected");
      cards.forEach((c) => c.classList.remove("selected"));
      if (!alreadySelected) card.classList.add("selected");
    });
  });
}

/**
 * Bộ lọc dự án theo danh mục (Tất cả / Web / Game).
 * Chỉ chạy khi trang hiện tại có các phần tử .filter-tab và .project-card.
 */
function setupProjectFilter() {
  const tabs = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".project-card");

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Đổi trạng thái active giữa các tab
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter; // "all" | "web" | "game"

      cards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.hidden = !matches;
      });
    });
  });
}
