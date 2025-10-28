document.addEventListener('DOMContentLoaded', function () {

    // 1. Lấy các phần tử
    const allCheckboxes = document.querySelectorAll('.filter-check');
    const allTours = document.querySelectorAll('.tour-item');
    // hien thi thong bao khong co ket qua
    const noResultsMessage = document.getElementById('no-results-message');

    // Hàm chuyển đổi "kebab-case" thành "camelCase"
    function kebabToCamel(s) {
        return s.replace(/-(\w)/g, (match, p1) => p1.toUpperCase());
    }

    function runFilter() {
        const selectedFilters = {};

        // HIEN THI THONG BAO KHONG CO KET QUA
        let visibleTourCount = 0; // Biến đếm các tour được hiển thị

        allCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const group = checkbox.dataset.filterGroup;
                const value = checkbox.value;

                if (!selectedFilters[group]) {
                    selectedFilters[group] = [];
                }
                selectedFilters[group].push(value);
            }
        });

        allTours.forEach(tour => {
            let shouldShow = true;

            for (const group in selectedFilters) {
                const activeGroupFilters = selectedFilters[group];
                const camelCaseGroup = kebabToCamel(group);
                const tourDataString = tour.dataset[camelCaseGroup];

                if (activeGroupFilters.length > 0) {
                    if (!tourDataString) {
                        shouldShow = false;
                        break;
                    }

                    const tourDataArray = tourDataString.replace(/, /g, ',').split(',');
                    const hasMatch = activeGroupFilters.some(selectedFilter => {
                        return tourDataArray.includes(selectedFilter);
                    });

                    if (!hasMatch) {
                        shouldShow = false;
                        break;
                    }
                }
            }

            // HIEN THI THONG BAO KHONG CO KET QUA
            if (shouldShow) {
                tour.classList.remove('hidden');
                visibleTourCount++; // Tăng biến đếm nếu tour được hiển thị
            } else {
                tour.classList.add('hidden');
            }
        });

        // HIEN THI THONG BAO KHONG CO KET QUA
        if (visibleTourCount === 0) {
            noResultsMessage.style.display = 'block'; // Hiện thông báo
        } else {
            noResultsMessage.style.display = 'none'; // Ẩn thông báo
        }
    }

    // Gắn sự kiện cho checkbox
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', runFilter);
    });

});