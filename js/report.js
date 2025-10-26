document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reportForm");
    const input = document.getElementById("reportInput");
    const select = document.getElementById("reportSelect");
    const fileInput = document.getElementById("reportFile");
    const fileListDiv = document.querySelector(".file-list");
    const historyDiv = document.getElementById("reportHistory");
    const template = document.getElementById("historyItemTemplate");

    let reportHistory = [];
    let editingIndex = null;

    // Hiển thị tên file đã chọn lên giao diện
    fileInput.addEventListener("change", () => {
        fileListDiv.innerHTML = "";
        Array.from(fileInput.files).forEach(file => {
            const p = document.createElement("p");
            p.textContent = file.name;
            fileListDiv.appendChild(p);
        });
    });

    // Hiển thị tên file đã chọn lên giao diện
    [input, select].forEach(el => {
        el.addEventListener("focus", () => {
            el.classList.remove("input-error");
            const err = el.parentNode.querySelector(".error-message");
            if (err) err.remove();
        });
    });

    // Xử lý gửi phản hồi
    // Kiểm tra lỗi, thêm phản hồi mới hoặc cập nhật phản hồi đang chỉnh sửa
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        //Xóa lỗi cũ
        form.querySelectorAll(".error-message").forEach(el => el.remove());
        [input, select].forEach(el => el.classList.remove("input-error"));

        let hasError = false;

        // Kiểm tra select
        if (!select.value) {
            const msg = document.createElement("div");
            msg.className = "error-message";
            msg.textContent = "Vui lòng chọn loại phản hồi!";
            select.classList.add("input-error");
            select.parentNode.insertBefore(msg, select.nextSibling);
            hasError = true;
        }

        // Kiểm tra textarea
        if (!input.value.trim()) {
            const msg = document.createElement("div");
            msg.className = "error-message";
            msg.textContent = "Vui lòng nhập phản hồi!";
            input.classList.add("input-error");
            input.parentNode.insertBefore(msg, input.nextSibling);
            hasError = true;
        }
        if (hasError) return;

        const report = {
            type: select.value,
            content: input.value.trim(),
            files: Array.from(fileInput.files).map(f => f.name),
            time: new Date().toLocaleString()
        };

        // Cập nhật phản hồi đang chỉnh sửa
        if (editingIndex !== null) {
            reportHistory[editingIndex] = report;
            editingIndex = null;
        } else {
            // Thêm phản hồi mới
            reportHistory.unshift(report);
        }

        renderHistory();

        // Reset form
        input.value = "";
        select.value = "";
        fileInput.value = "";
        fileListDiv.innerHTML = "";
    });

    // Render danh sách lịch sử phản hồi lên giao diện
    // Bao gồm nút Chỉnh sửa và Xóa
    function renderHistory() {
        // Xóa lịch sử cũ
        historyDiv.querySelectorAll(".history-item").forEach(el => el.remove());

        reportHistory.forEach((report, index) => {
            const clone = template.content.cloneNode(true);

            // Cập nhật loại và thời gian
            clone.querySelector(".type").innerHTML = `${report.type} - <span class="time">${report.time}</span>`;

            // Cập nhật nội dung
            clone.querySelector(".content").textContent = report.content;

            // Cập nhật file nếu có
            if (report.files.length > 0) {
                clone.querySelector(".files").innerHTML =
                    `<strong>Files:</strong><ul>${report.files.map(f => `<li>${f}</li>`).join('')}</ul>`;
            } else {
                clone.querySelector(".files").innerHTML = '';
            }

            // Xóa
            clone.querySelector(".delete-btn").addEventListener("click", () => {
                reportHistory.splice(index, 1);
                renderHistory();
            });

            // Chỉnh sửa
            clone.querySelector(".edit-btn").addEventListener("click", () => {
                input.value = report.content;
                select.value = report.type;
                editingIndex = index;
                
                // Hiển thị tên file cũ
                fileListDiv.innerHTML = '';
                report.files.forEach(f => {
                    const p = document.createElement('p');
                    p.textContent = f + ' (cũ)';
                    fileListDiv.appendChild(p);
                });
            });

            historyDiv.appendChild(clone);
        });
    }
});
