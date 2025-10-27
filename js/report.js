// report.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reportForm");
    const input = document.getElementById("reportInput");
    const select = document.getElementById("reportSelect");
    const fileInput = document.getElementById("reportFile");
    const fileListDiv = document.querySelector(".file-list");
    const historyDiv = document.getElementById("reportHistory");
    const template = document.getElementById("historyItemTemplate");

    // Popup elements
    const popup = document.getElementById("deletePopup");
    const confirmBtn = document.getElementById("confirmDelete");
    const cancelBtn = document.getElementById("cancelDelete");

    let reportHistory = [];
    let editingIndex = null;
    let deleteIndex = null;

    // ----- showSelectedFiles() -----
    // Hiển thị tên file đã chọn xuống .file-list
    function showSelectedFiles(files) {
        fileListDiv.innerHTML = "";
        if (!files || files.length === 0) return;
        Array.from(files).forEach(file => {
            const p = document.createElement("p");
            p.textContent = file.name || file; // file có thể là File object hoặc string (khi là file cũ)
            fileListDiv.appendChild(p);
        });
    }

    // ----- handleFileChange() -----
    // Bắt sự kiện chọn file mới từ input
    fileInput.addEventListener("change", () => {
        showSelectedFiles(fileInput.files);
    });

    // ----- clearFieldErrorOnFocus() -----
    // Gỡ class lỗi và message khi focus vào input/select
    [input, select].forEach(el => {
        el.addEventListener("focus", () => {
            el.classList.remove("input-error");
            const err = el.parentNode.querySelector(".error-message");
            if (err) err.remove();
        });
    });

    // ----- validateAndBuildReport() -----
    // Kiểm tra validate; trả về { valid, errors } hoặc built report object nếu valid
    function validateAndBuildReport() {
        // xóa lỗi hiện tại (UI)
        form.querySelectorAll(".error-message").forEach(el => el.remove());
        [input, select].forEach(el => el.classList.remove("input-error"));

        let hasError = false;

        if (!select.value) {
            const msg = document.createElement("div");
            msg.className = "error-message";
            msg.textContent = "Vui lòng chọn loại phản hồi!";
            select.classList.add("input-error");
            select.parentNode.insertBefore(msg, select.nextSibling);
            hasError = true;
        }

        if (!input.value.trim()) {
            const msg = document.createElement("div");
            msg.className = "error-message";
            msg.textContent = "Vui lòng nhập phản hồi!";
            input.classList.add("input-error");
            input.parentNode.insertBefore(msg, input.nextSibling);
            hasError = true;
        }

        if (hasError) return { valid: false };

        // build files list:
        let filesArr = Array.from(fileInput.files).map(f => f.name);

        // *** SỬA CHÍNH: nếu đang chỉnh sửa và user không chọn file mới,
        //              giữ lại file cũ thay vì ghi đè bằng mảng rỗng. ***
        if (editingIndex !== null && filesArr.length === 0) {
            // nếu có file cũ thì lấy từ lịch sử
            const existing = reportHistory[editingIndex];
            if (existing && existing.files && existing.files.length > 0) {
                filesArr = existing.files.slice(); // copy
            }
        }

        const report = {
            type: select.value,
            content: input.value.trim(),
            files: filesArr,
            time: new Date().toLocaleString()
        };

        return { valid: true, report };
    }

    // ----- handleSubmit() -----
    // Bắt submit form: tạo hoặc cập nhật phản hồi
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const result = validateAndBuildReport();
        if (!result.valid) return;

        const report = result.report;

        if (editingIndex !== null) {
            // cập nhật phản hồi đang chỉnh sửa (giữ vị trí)
            reportHistory[editingIndex] = report;
            editingIndex = null;
        } else {
            // thêm mới vào đầu danh sách
            reportHistory.unshift(report);
        }

        renderHistory();

        // reset form và file-list
        input.value = "";
        select.value = "";
        fileInput.value = "";
        fileListDiv.innerHTML = "";
    });

    // ----- renderHistory() -----
    // Hiển thị mảng reportHistory lên DOM bằng template
    function renderHistory() {
        // xoá các item cũ
        historyDiv.querySelectorAll(".history-item").forEach(el => el.remove());

        reportHistory.forEach((report, index) => {
            const clone = template.content.cloneNode(true);

            // set type + time
            clone.querySelector(".type").innerHTML = `${report.type} - <span class="time">${report.time}</span>`;

            // set content
            clone.querySelector(".content").textContent = report.content;

            // set files
            if (report.files && report.files.length > 0) {
                clone.querySelector(".files").innerHTML =
                    `<strong>Files:</strong><ul>${report.files.map(f => `<li>${f}</li>`).join('')}</ul>`;
            } else {
                clone.querySelector(".files").innerHTML = "";
            }

            // Xử lý nút Xóa: bật popup, lưu index để xóa sau khi confirm
            const delBtn = clone.querySelector(".delete-btn");
            delBtn.addEventListener("click", () => {
                deleteIndex = index;
                popup.style.display = "flex";
            });

            // Xử lý nút Chỉnh sửa
            const editBtn = clone.querySelector(".edit-btn");
            editBtn.addEventListener("click", () => {
                // populate form với dữ liệu hiện có
                input.value = report.content;
                select.value = report.type;
                editingIndex = index;

                // hiển thị file cũ trong file-list (ghi chú "(cũ)")
                fileListDiv.innerHTML = "";
                if (report.files && report.files.length > 0) {
                    report.files.forEach(f => {
                        const p = document.createElement('p');
                        p.textContent = f + ' (cũ)';
                        fileListDiv.appendChild(p);
                    });
                }
                // Note: fileInput.value stays empty until user selects new files
            });

            historyDiv.appendChild(clone);
        });
    }

    // ----- Popup -----
    // confirm delete
    confirmBtn.addEventListener("click", () => {
        if (deleteIndex !== null) {
            reportHistory.splice(deleteIndex, 1);
            deleteIndex = null;
            renderHistory();
        }
        popup.style.display = "none";
    });

    // cancel delete
    cancelBtn.addEventListener("click", () => {
        deleteIndex = null;
        popup.style.display = "none";
    });

    // đóng popup nếu click ngoài content (tùy chọn)
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            deleteIndex = null;
            popup.style.display = "none";
        }
    });

});
