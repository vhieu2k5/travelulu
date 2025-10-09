/**
 * Fake data module for tours and user's booked tours.
 * Exposes a simple API on window.TourAPI for UI use and testing.
 */

/* --- Sample available tours --- */
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

/* --- Sample user's booked tours (subset of available tours with booking details) --- */
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

/** Helpers and API
 * Expose a small API on window.TourAPI so the HTML can consume fake data.
 */

function formatCurrency(v) {
  // format number with dot thousands separator and return HTML with a small currency span
  const num = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // include a non-breaking space before the currency and wrap currency for styling
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

// Attach to window for simple access from UI scripts
window.TourAPI = {
  getAllTours,
  getBookedTours,
  searchTours,
  filterBookedByStatus,
  bookTour,
  cancelBooking,
  formatCurrency,
  // raw arrays (use cautiously)
  _raw: {
    tours: fakeTours,
    bookings: fakeBookedTours,
  },
};

// quick debugging
console.info("TourAPI initialized", window.TourAPI);

/* ---------- UI rendering and event wiring ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const tourListEl = document.querySelector(".tour-list");
  const recListEl = document.querySelector(".recommendation-list");
  const searchInput = document.querySelector(".search-box input");
  const searchBtn = document.querySelector(".search-btn");
  // Exclude the non-selectable "Trạng thái" placeholder from interactive tabs
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
      // render a nice empty state box with icon and CTA
      tourListEl.innerHTML = "";
      const emptyWrap = document.createElement("div");
      emptyWrap.className = "empty-state-container";
      const emptyBox = document.createElement("div");
      emptyBox.className = "empty-box";
      const icon = document.createElement("img");
      icon.className = "empty-icon";
      // use a local placeholder if available, otherwise fallback to inline SVG
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

      // build a two-row card: main row (image + info) and footer (pricing)
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
      // put text and chevron inside the same pill so the arrow appears inside
      statusTag.textContent = b.status || "--";
      // simple chevron glyph so we don't depend on Font Awesome
      const chevron = document.createElement("span");
      chevron.className = "status-chevron";
      chevron.setAttribute("aria-hidden", "true");
      chevron.textContent = "›";
      // append chevron into the pill
      statusTag.appendChild(chevron);
      statusWrap.appendChild(statusTag);

      const pricing = document.createElement("div");
      pricing.className = "tour-pricing";
      pricing.innerHTML = `<span class="original-price">${formatCurrency(
        b.priceOriginal
      )}</span>
        <span class="final-price">${formatCurrency(b.priceFinal)}</span>`;

      // main row
      const mainRow = document.createElement("div");
      mainRow.className = "card-main";
      mainRow.appendChild(imgWrap);
      mainRow.appendChild(info);

      // divider
      const divider = document.createElement("hr");
      divider.className = "card-divider";

      // footer row
      const footer = document.createElement("div");
      footer.className = "card-footer";

      // if booking is upcoming, add a cancel button on the left
      if ((b.status || "").toLowerCase() === "sắp tới") {
        const cancelBtn = document.createElement("button");
        cancelBtn.className = "cancel-btn";
        cancelBtn.textContent = "Hủy";
        cancelBtn.addEventListener("click", (e) => {
          e.preventDefault();
          // show confirmation modal
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
            // perform cancel and re-render
            window.TourAPI.cancelBooking(b.id);
            closeModal();
            renderBookedTours(window.TourAPI.getBookedTours());
          });
        });
        footer.appendChild(cancelBtn);
      }

      // if booking is cancelled, offer a "Đặt lại" (rebook) button
      if ((b.status || "").toLowerCase() === "đã hủy") {
        const rebookBtn = document.createElement("button");
        rebookBtn.className = "rebook-btn";
        rebookBtn.textContent = "Đặt lại";
        rebookBtn.addEventListener("click", (e) => {
          e.preventDefault();
          // show an informational modal saying the tour is not available to rebook
          const overlay = document.createElement("div");
          overlay.className = "modal-overlay";
          const dialog = document.createElement("div");
          dialog.className = "info-dialog";
          // inline SVG warning icon + message + single close button
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
      // status is positioned absolutely in CSS, append to card so it sits over top-right
      card.appendChild(statusWrap);
      card.appendChild(divider);
      card.appendChild(footer);

      tourListEl.appendChild(card);
    });
  }

  function renderRecommendations(list) {
    if (!recListEl) return;
    recListEl.innerHTML = "";
    list.forEach((t) => {
      const card = document.createElement("div");
      card.className = "recommended-card";

      const imgWrap = document.createElement("div");
      imgWrap.className = "card-image-container";
      if (t.imageUrl) imgWrap.style.backgroundImage = `url('${t.imageUrl}')`;
      // use local heart image instead of font-awesome icon
      const heartImg = document.createElement("img");
      heartImg.src = "../pics/manegamentTour/heart.png";
      heartImg.alt = "Yêu thích";
      heartImg.className = "heart-img";
      imgWrap.appendChild(heartImg);

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

  // initial render
  renderBookedTours(window.TourAPI.getBookedTours());
  renderRecommendations(window.TourAPI.getAllTours());

  // tabs behavior: filter booked tours by status (or show all)
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const txt = (tab.textContent || tab.innerText || "").trim();
      if (txt === "Tất cả") renderBookedTours(window.TourAPI.getBookedTours());
      else {
        // try filter by matching status text
        const filtered = window.TourAPI.filterBookedByStatus(txt);
        renderBookedTours(filtered);
      }
    });
  });

  // search behavior: search booked tours by id or name
  function handleSearch() {
    const q =
      searchInput && searchInput.value
        ? searchInput.value.trim().toLowerCase()
        : "";
    if (!q) {
      renderBookedTours(window.TourAPI.getBookedTours());
      return;
    }
    const results = window.TourAPI.getBookedTours().filter((b) => {
      return b.id.toLowerCase().includes(q) || b.name.toLowerCase().includes(q);
    });
    renderBookedTours(results);
  }

  if (searchBtn) searchBtn.addEventListener("click", handleSearch);
  if (searchInput)
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") handleSearch();
    });
});
