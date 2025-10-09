
const fakeTours = [
  {
    id: "TRG4N3D",
    name: "Tràng An 4N3Đ",
    location: "Ninh Bình",
    duration: "4N3Đ",
    dateFrom: "2025-08-15",
    seats: 20,
    priceOriginal: 3000000,
    priceFinal: 2790000,
    imageUrl: "../pics/manegamentTour/trangan.jpeg",
    tags: ["Di sản", "Tham quan"],
  },
  {
    id: "HLG4N3D",
    name: "Vịnh Hạ Long 4N3Đ",
    location: "Quảng Ninh",
    duration: "4N3Đ",
    dateFrom: "2025-09-02",
    seats: 30,
    priceOriginal: 7099000,
    priceFinal: 6799000,
    imageUrl: "../pics/manegamentTour/halong1.jpeg",
    tags: ["Biển", "Hành trình"],
  },
  {
    id: "HLG2N2D",
    name: "Vịnh Hạ Long 2N2Đ",
    location: "Quảng Ninh",
    duration: "2N2Đ",
    dateFrom: "2025-10-10",
    seats: 25,
    priceOriginal: 6700000,
    priceFinal: 5499000,
    imageUrl: "../pics/manegamentTour/halong2.jpeg",
    tags: ["Biển"],
  },
  {
    id: "TN12N",
    name: "Khám phá Tràng An 2N1Đ",
    location: "Ninh Bình",
    duration: "2N1Đ",
    dateFrom: "2025-07-20",
    seats: 15,
    priceOriginal: 4499000,
    priceFinal: 4099000,
    imageUrl: "../pics/manegamentTour/trangan2.jpeg",
    tags: ["Ngắn ngày"],
  },
  {
    id: "DN5N4D",
    name: "Đà Nẵng - Hội An 5N4Đ",
    location: "Đà Nẵng",
    duration: "5N4Đ",
    dateFrom: "2025-10-01",
    seats: 10,
    priceOriginal: 8000000,
    priceFinal: 7800000,
    imageUrl: "../pics/manegamentTour/trangan.jpeg",
    tags: ["Khám phá", "Văn hoá"],
  },
];

const fakeBookedTours = [
  {
    id: "D43PL2025",
    tourId: "TRG4N3D",
    name: "Tour Tràng An 4N3Đ",
    location: "Ninh Bình",
    date: "2025-08-15",
    guests: 2,
    priceOriginal: 3000000,
    priceFinal: 2500000,
    status: "Đã hoàn thành",
    imageUrl: "../pics/manegamentTour/trangan.jpeg",
  },
  {
    id: "HLG25112025",
    tourId: "HLG4N3D",
    name: "Vịnh Hạ Long 3N2Đ",
    location: "Quảng Ninh",
    date: "2025-11-25",
    guests: 4,
    priceOriginal: 5500000,
    priceFinal: 5000000,
    status: "Sắp tới",
    imageUrl: "../pics/manegamentTour/halong1.jpeg",
  },
  {
    id: "DNT20240901",
    tourId: "DN5N4D",
    name: "Khám phá Đà Nẵng - Hội An 5N4Đ",
    location: "Đà Nẵng",
    date: "2025-10-01",
    guests: 3,
    priceOriginal: 8000000,
    priceFinal: 7800000,
    status: "Sắp tới",
    imageUrl: "../pics/manegamentTour/trangan.jpeg",
  },
];

function formatCurrency(v) {

  const num = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${num}&nbsp;<span class="currency">VND</span>`;
}

function getAllTours() {
  return fakeTours.slice();
}

function getBookedTours() {
  return fakeBookedTours.slice();
}

function findTourById(id) {
  return fakeTours.find((t) => t.id === id) || null;
}

function searchTours(query) {
  if (!query || !query.trim()) return getAllTours();
  const q = query.trim().toLowerCase();
  return fakeTours.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q)
  );
}

function filterBookedByStatus(status) {
  if (!status) return getBookedTours();
  return fakeBookedTours.filter((b) => b.status === status);
}

function bookTour(tourId, { guests = 1, date = null } = {}) {
  const tour = findTourById(tourId);
  if (!tour) return null;
  const booking = {
    id: `${tourId}-${Date.now()}`,
    tourId: tour.id,
    name: tour.name,
    location: tour.location,
    date: date || tour.dateFrom,
    guests,
    priceOriginal: tour.priceOriginal,
    priceFinal: tour.priceFinal,
    status: "Sắp tới",
    imageUrl: tour.imageUrl,
  };
  fakeBookedTours.push(booking);
  return booking;
}

function cancelBooking(bookingId) {
  const idx = fakeBookedTours.findIndex((b) => b.id === bookingId);
  if (idx === -1) return false;
  fakeBookedTours[idx].status = "Đã hủy";
  return true;
}

window.TourAPI = {
  getAllTours,
  getBookedTours,
  searchTours,
  filterBookedByStatus,
  bookTour,
  cancelBooking,
  formatCurrency,
  _raw: {
    tours: fakeTours,
    bookings: fakeBookedTours,
  },
};

console.info("TourAPI initialized", window.TourAPI);

document.addEventListener("DOMContentLoaded", () => {
  const tourListEl = document.querySelector(".tour-list");
  const recListEl = document.querySelector(".recommendation-list");
  const searchInput = document.querySelector(".search-box input");
  const searchBtn = document.querySelector(".search-btn");
  const tabs = Array.from(
    document.querySelectorAll(".filter-tabs .tab-item")
  ).filter((t) => (t.textContent || t.innerText || "").trim() !== "Trạng thái");

  function getStatusClass(status) {
    switch ((status || "").toLowerCase()) {
      case "đã hoàn thành":
        return "status-completed";
      case "sắp tới":
        return "status-upcoming";
      case "trong thời":
      case "đang diễn ra":
        return "status-ongoing";
      case "đã hủy":
        return "status-cancelled";
      default:
        return "";
    }
  }

  function renderBookedTours(list) {
    if (!tourListEl) return;
    tourListEl.innerHTML = "";
    if (!list || list.length === 0) {
      const query =
        searchInput && searchInput.value ? searchInput.value.trim() : "";
      tourListEl.innerHTML = "";
      if (query) {
        const wrap = document.createElement("div");
        wrap.className = "empty-state-container search-empty";
        const box = document.createElement("div");
        box.className = "empty-box notfound-search";
        const icon = document.createElement("img");
        icon.className = "empty-icon";
        icon.src = "../pics/manegamentTour/canhbao.png";
        icon.alt = "not found";
        const text = document.createElement("div");
        text.className = "empty-text";
        text.textContent = "Không tìm thấy tour phù hợp";
        const hint = document.createElement("div");
        hint.className = "empty-hint";
        hint.textContent = `Từ khóa: "${query}"`;
        const btn = document.createElement("button");
        btn.className = "explore-btn";
        btn.textContent = "Xóa tìm kiếm";
        btn.addEventListener("click", () => {
          if (searchInput) searchInput.value = "";
          renderBookedTours(window.TourAPI.getBookedTours());
          renderRecommendations(window.TourAPI.getAllTours());
          if (searchInput) searchInput.focus();
        });
        box.appendChild(icon);
        box.appendChild(text);
        box.appendChild(hint);
        box.appendChild(btn);
        wrap.appendChild(box);
        tourListEl.appendChild(wrap);
        return;
      }

      const emptyWrap = document.createElement("div");
      emptyWrap.className = "empty-state-container";
      const emptyBox = document.createElement("div");
      emptyBox.className = "empty-box";
      const icon = document.createElement("img");
      icon.className = "empty-icon";
      icon.src = "../pics/manegamentTour/box.png";
      icon.alt = "empty";
      const text = document.createElement("div");
      text.className = "empty-text";
      text.textContent = "Bạn chưa có tour nào được đặt";
      const btn = document.createElement("button");
      btn.className = "explore-btn";
      btn.textContent = "Khám phá ngay các tour hot";
      btn.addEventListener("click", () => {
        const rec = document.querySelector(".recommendation-list");
        if (rec) rec.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      emptyBox.appendChild(icon);
      emptyBox.appendChild(text);
      emptyBox.appendChild(btn);
      emptyWrap.appendChild(emptyBox);
      tourListEl.appendChild(emptyWrap);
      return;
    }

    list.forEach((b) => {
      const card = document.createElement("div");
      card.className =
        "tour-card" + (b.status === "Đã hoàn thành" ? " completed" : "");

      const imgWrap = document.createElement("div");
      imgWrap.className = "tour-image-container";
      if (b.imageUrl) imgWrap.style.backgroundImage = `url('${b.imageUrl}')`;

      const info = document.createElement("div");
      info.className = "tour-info";
      info.innerHTML = `<h2>${b.name}</h2>
        <p class="date-guests"><strong>${b.date}</strong> · <strong>${b.guests} Khách</strong></p>
        <p class="tour-id">ID tour: <strong>${b.id}</strong></p>`;

      const statusWrap = document.createElement("div");
      statusWrap.className = "tour-status";
      const statusTag = document.createElement("span");
      const statusClass = getStatusClass(b.status);
      statusTag.className = `status-tag ${statusClass}`.trim();
      statusTag.setAttribute("role", "status");
      statusTag.textContent = b.status || "--";
      const chevron = document.createElement("span");
      chevron.className = "status-chevron";
      chevron.setAttribute("aria-hidden", "true");
      chevron.textContent = "›";
      statusTag.appendChild(chevron);
      statusWrap.appendChild(statusTag);

      const pricing = document.createElement("div");
      pricing.className = "tour-pricing";
      pricing.innerHTML = `<span class="original-price">${formatCurrency(
        b.priceOriginal
      )}</span>
        <span class="final-price">${formatCurrency(b.priceFinal)}</span>`;

      const mainRow = document.createElement("div");
      mainRow.className = "card-main";
      mainRow.appendChild(imgWrap);
      mainRow.appendChild(info);

      const divider = document.createElement("hr");
      divider.className = "card-divider";

      const footer = document.createElement("div");
      footer.className = "card-footer";

      if ((b.status || "").toLowerCase() === "sắp tới") {
        const cancelBtn = document.createElement("button");
        cancelBtn.className = "cancel-btn";
        cancelBtn.textContent = "Hủy";
        cancelBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const overlay = document.createElement("div");
          overlay.className = "modal-overlay";
          const dialog = document.createElement("div");
          dialog.className = "confirm-dialog";
          dialog.innerHTML = `
            <div class="confirm-title">Hủy chuyến sắp tới</div>
            <div class="confirm-body">Bạn có chắc chắn không?</div>
            <div class="confirm-actions">
              <button class="btn-cancel-dialog">Hủy</button>
              <button class="btn-confirm-dialog">Có</button>
            </div>
          `;
          overlay.appendChild(dialog);
          document.body.appendChild(overlay);

          const btnCancel = dialog.querySelector(".btn-cancel-dialog");
          const btnConfirm = dialog.querySelector(".btn-confirm-dialog");

          function closeModal() {
            if (overlay && overlay.parentNode)
              overlay.parentNode.removeChild(overlay);
          }

          btnCancel.addEventListener("click", () => {
            closeModal();
          });

          btnConfirm.addEventListener("click", () => {
            window.TourAPI.cancelBooking(b.id);
            closeModal();
            renderBookedTours(window.TourAPI.getBookedTours());
          });
        });
        footer.appendChild(cancelBtn);
      }

      if ((b.status || "").toLowerCase() === "đã hủy") {
        const rebookBtn = document.createElement("button");
        rebookBtn.className = "rebook-btn";
        rebookBtn.textContent = "Đặt lại";
        rebookBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const overlay = document.createElement("div");
          overlay.className = "modal-overlay";
          const dialog = document.createElement("div");
          dialog.className = "info-dialog";
          dialog.innerHTML = `
            <div style="text-align:center; padding:18px 22px;">
              <div class="warning-icon" aria-hidden="true">
                <img src="../pics/manegamentTour/canhbao.png" alt="cảnh báo" />
              </div>
              <div class="info-text" style="margin-top:8px; color:#1f2937; font-weight:700;">Tour không còn khả dụng để đặt lại</div>
              <div style="margin-top:14px; text-align:right;"><button class="btn-close-info">Quay lại</button></div>
            </div>
          `;
          overlay.appendChild(dialog);
          document.body.appendChild(overlay);

          const btnClose = dialog.querySelector(".btn-close-info");
          btnClose.addEventListener("click", () => {
            if (overlay && overlay.parentNode)
              overlay.parentNode.removeChild(overlay);
          });
        });
        footer.appendChild(rebookBtn);
      }

      footer.appendChild(pricing);

      card.appendChild(mainRow);
      card.appendChild(statusWrap);
      card.appendChild(divider);
      card.appendChild(footer);

      tourListEl.appendChild(card);
    });
  }

  function renderRecommendations(list) {
    if (!recListEl) return;
    recListEl.innerHTML = "";
    if (!list || list.length === 0) {
      const wrap = document.createElement("div");
      wrap.className = "notfound-wrap";
      const box = document.createElement("div");
      box.className = "notfound-box";
      const icon = document.createElement("div");
      icon.className = "notfound-icon";
      const img = document.createElement("img");
      img.src = "../pics/manegamentTour/delete.png";
      img.alt = "not found";
      icon.appendChild(img);
      const txt = document.createElement("div");
      txt.className = "notfound-text";
      txt.textContent = "Không có dữ liệu tour trên web";
      box.appendChild(icon);
      box.appendChild(txt);
      wrap.appendChild(box);
      recListEl.appendChild(wrap);
      return;
    }
    if (!window.__savedTours) window.__savedTours = new Set();

    list.forEach((t) => {
      const card = document.createElement("div");
      card.className = "recommended-card";

      const imgWrap = document.createElement("div");
      imgWrap.className = "card-image-container";
      if (t.imageUrl) imgWrap.style.backgroundImage = `url('${t.imageUrl}')`;
      const heartImg = document.createElement("img");
      heartImg.src = window.__savedTours.has(t.id)
        ? "../pics/manegamentTour/heart2.png"
        : "../pics/manegamentTour/heart.png";
      heartImg.alt = "Yêu thích";
      heartImg.className = "heart-img";
      imgWrap.appendChild(heartImg);
      const savedBadge = document.createElement("div");
      savedBadge.className = "saved-badge";
      const sbIcon = document.createElement("img");
      sbIcon.className = "saved-badge-icon";
      sbIcon.src = "../pics/manegamentTour/heart2.png";
      const sbText = document.createElement("div");
      sbText.className = "saved-badge-text";
      sbText.textContent = "Đã lưu vào: Chuyến đi của bạn";
      savedBadge.appendChild(sbIcon);
      savedBadge.appendChild(sbText);
      imgWrap.appendChild(savedBadge);
      imgWrap.addEventListener("mouseenter", () => {
        if (window.__savedTours.has(t.id)) savedBadge.classList.add("visible");
      });
      imgWrap.addEventListener("mouseleave", () => {
        savedBadge.classList.remove("visible");
      });

      heartImg.addEventListener("click", (e) => {
        e.stopPropagation();
        const saved = window.__savedTours.has(t.id);
        if (saved) {
          window.__savedTours.delete(t.id);
          heartImg.src = "../pics/manegamentTour/heart.png";
          sbText.textContent = "Đã bỏ lưu";
          savedBadge.classList.remove("visible");
        } else {
          window.__savedTours.add(t.id);
          heartImg.src = "../pics/manegamentTour/heart2.png";
          sbText.textContent = "Đã lưu vào: Chuyến đi của bạn";
          savedBadge.classList.add("visible");
          setTimeout(() => savedBadge.classList.remove("visible"), 1200);
        }
      });

      const title = document.createElement("h3");
      title.textContent = t.name;
      const location = document.createElement("p");
      location.className = "location";
      location.textContent = `Du lịch tại ${t.location}`;
      const price = document.createElement("div");
      price.className = "price";
      price.innerHTML = `<span class="original">${formatCurrency(
        t.priceOriginal
      )}</span>
        <span class="sale">${formatCurrency(t.priceFinal)}</span>`;

      card.appendChild(imgWrap);
      card.appendChild(title);
      card.appendChild(location);
      card.appendChild(price);
      recListEl.appendChild(card);
    });
  }

  renderBookedTours(window.TourAPI.getBookedTours());
  renderRecommendations(window.TourAPI.getAllTours());

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const txt = (tab.textContent || tab.innerText || "").trim();
      if (txt === "Tất cả") renderBookedTours(window.TourAPI.getBookedTours());
      else {
        const filtered = window.TourAPI.filterBookedByStatus(txt);
        renderBookedTours(filtered);
      }
    });
  });

  function handleSearch() {
    const q =
      searchInput && searchInput.value
        ? searchInput.value.trim().toLowerCase()
        : "";
    if (!q) {
      renderBookedTours(window.TourAPI.getBookedTours());
      renderRecommendations(window.TourAPI.getAllTours());
      return;
    }
    const results = window.TourAPI.getBookedTours().filter((b) => {
      return b.id.toLowerCase().includes(q) || b.name.toLowerCase().includes(q);
    });
    renderBookedTours(results);
    const recResults = window.TourAPI.searchTours(q);
    if (recResults && recResults.length > 0) {
      renderRecommendations(recResults);
    } else {
      renderRecommendations(window.TourAPI.getAllTours());
    }
  }

  if (searchBtn) searchBtn.addEventListener("click", handleSearch);
  if (searchInput)
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") handleSearch();
    });
});
