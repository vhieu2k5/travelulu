document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const notificationItems = document.querySelectorAll('.notification-item');
    const notificationDetails = document.querySelectorAll('.notification-detail');

    // Bộ lọc theo loại
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".filter-btn.active")?.classList.remove("active");
            btn.classList.add("active");

            const type = btn.dataset.type;

            notificationItems.forEach(item => {
                const types = item.dataset.type.split(" "); // hỗ trợ nhiều loại
                if (type === "all" || types.includes(type)) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                    // ẩn luôn chi tiết nếu đang hiển thị
                    const index = Array.from(notificationItems).indexOf(item);
                    notificationDetails[index].classList.remove('active');
                    item.classList.remove('active');
                }
            });
        });
    });

    // Hiện chi tiết khi click
    notificationItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const detail = notificationDetails[index];
            const isActive = detail.classList.contains('active');

            // Ẩn tất cả chi tiết
            notificationDetails.forEach(d => d.classList.remove('active'));
            notificationItems.forEach(i => i.classList.remove('active'));

            // Nếu item này chưa mở thì mở
            if (!isActive) {
                detail.classList.add('active');
                item.classList.add('active');
                // Ẩn icon chuông khi click (đánh dấu đã đọc)
                const bellIcon = item.querySelector('.noti-icon-bell');
                if (bellIcon) bellIcon.style.display = 'none';
            }
        });
    });
});
