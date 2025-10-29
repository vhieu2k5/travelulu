
// Tour pho bien - drag to scroll//
const slider = document.querySelector('.tours-container');
let isDown = false; // Trạng thái xem chuột có đang được giữ không
let startX; // Vị trí X ban đầu của chuột khi click
let scrollLeft; // Vị trí cuộn ngang ban đầu của container

const imagesInSlider = slider.querySelectorAll('.tour-image'); // Chọn tất cả hình ảnh bên trong slider
// 2. Ngăn không cho hình ảnh bị kéo (drag)
imagesInSlider.forEach(img => {
    img.setAttribute('draggable', false);
});

// 3. Khi bắt đầu giữ chuột xuống (mousedown)
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active'); // Thêm class 'active' để đổi con trỏ chuột
    
    // Tính toán vị trí bắt đầu
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

// 4. Khi chuột di ra khỏi container (mouseleave)
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active'); // Bỏ class 'active'
});

// 5. Khi nhả chuột ra (mouseup)
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active'); // Bỏ class 'active'
});

// 6. Khi di chuyển chuột (mousemove)
slider.addEventListener('mousemove', (e) => {
    // Nếu chuột không được giữ xuống, không làm gì cả
    if (!isDown) return; 
    
    // Ngăn hành vi mặc định (như bôi đen text)
    e.preventDefault(); 
    
    // Tính toán vị trí X hiện tại
    const x = e.pageX - slider.offsetLeft;
    
    // Tính toán khoảng cách đã kéo (walk)
    // (x - startX) là khoảng cách chuột đã di chuyển
    // Nhân 2 hoặc 3 để tăng tốc độ cuộn, cho cảm giác nhạy hơn
    const walk = (x - startX) * 1; 
    
    // Cập nhật vị trí cuộn của slider
    slider.scrollLeft = scrollLeft - walk;
});


// SLider ảnh tự động
const imgs = document.querySelectorAll(".quangcao1");
const dots = document.querySelector(".dots").children;
imgs[0].style.opacity=1;
let timer = 3;
let i = 0;
const count = setInterval(()=>{
    timer--;
    if (timer <0 ){
        imgs[i].style.opacity = 0;
        dots[i].style.width= "10px";
        dots[i].style.background= "var(--main-color)";
        timer =5;
        i++;
        if (i >= imgs.length)
        {
            i=0;
        }
        imgs[i].style.opacity=1;
        dots[i].style.width="40px";
        dots[i].style.background= "white";
    }
},1000);