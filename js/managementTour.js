/**
 * @type {BookedTour[]}
 */
const fakeBookedTours = [
    // 1. Tour Đã hoàn thành (Completed) - Giống ví dụ trong UI
    {
        id: "D43PL2025",
        name: "Tour Tràng An 4N3Đ",
        location: "Ninh Bình",
        date: "15/08/2025",
        guests: 2,
        priceOriginal: 3000000,
        priceFinal: 2500000,
        status: "Đã hoàn thành",
        imageUrl: "image_trang_an_4n3d.png"
    },
    
    // 2. Tour Sắp tới (Upcoming)
    {
        id: "HLG25112025",
        name: "Vịnh Hạ Long 3N2Đ",
        location: "Quảng Ninh",
        date: "25/11/2025",
        guests: 4,
        priceOriginal: 5500000,
        priceFinal: 5000000,
        status: "Sắp tới",
        imageUrl: "image_ha_long_3n2d.png"
    },
    
    // 3. Tour Trong thời (In Progress/Current)
    {
        id: "DNT20240901",
        name: "Khám phá Đà Nẵng - Hội An 5N4Đ",
        location: "Đà Nẵng",
        date: "01/10/2025", // Giả định hôm nay là 02/10/2025
        guests: 3,
        priceOriginal: 8000000,
        priceFinal: 7800000,
        status: "Trong thời",
        imageUrl: "image_da_nang_5n4d.no"
    },

    // 4. Tour Đã hủy (Cancelled)
    {
        id: "NTX9002026",
        name: "Nha Trang Lặn Biển 2N1Đ",
        location: "Khánh Hòa",
        date: "10/01/2026",
        guests: 1,
        priceOriginal: 2100000,
        priceFinal: 2100000,
        status: "Đã hủy",
        imageUrl: "image_nha_trang_2n1d.png"
    },
    
    // 5. Thêm một tour Sắp tới
    {
        id: "PQC042026",
        name: "Phú Quốc Nghỉ Dưỡng 3N2Đ",
        location: "Kiên Giang",
        date: "20/04/2026",
        guests: 5,
        priceOriginal: 12000000,
        priceFinal: 10500000,
        status: "Sắp tới",
        imageUrl: "image_phu_quoc_3n2d.png"
    }
];

// Để kiểm tra dữ liệu trong console
console.log(fakeBookedTours);