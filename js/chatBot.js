// chat.js
document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chatBox");
  const chatInput  = document.getElementById("inputLogger");
  const sendBtn    = document.getElementById("sendBtn");
  const STORAGE_KEY = "travelulu_chat_history";

  // Load history từ sessionStorage nếu có
  loadHistory();

  // Gửi khi click
  sendBtn.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if (!text) return;
    sendText(text);
  });

  // Gửi khi nhấn Enter (không shift)
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });

  // --- Hàm chính gửi message ---
  async function sendText(text) {
    // 1) Hiện bubble người dùng
    appendMessage("user", text);
    // Reset input, disable gửi tạm thời
    chatInput.value = "";
    chatInput.disabled = true;
    sendBtn.disabled = true;

    // Lưu lịch sử
    pushHistory({ who: "user", text, ts: Date.now() });

    // 2) Hiện typing indicator của bot
    const typingNode = showTyping();

    try {
      // 3) Gọi API (thay URL bằng endpoint thật của bạn)
      // Nếu chưa có backend, đoạn gọi dưới sẽ trả mock reply
      const reply = await fetchBotReply(text);

      // 4) Ẩn typing, hiện reply
      hideTyping(typingNode);
      appendMessage("bot", reply);
      pushHistory({ who: "bot", text: reply, ts: Date.now() });

    } catch (err) {
      hideTyping(typingNode);
      appendMessage("bot", "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.");
      console.error("Chat error:", err);
    } finally {
      // Re-enable input
      chatInput.disabled = false;
      sendBtn.disabled = false;
      chatInput.focus();
    }
  }

  // --- Hiện message lên UI ---
  function appendMessage(who, text) {
    const wrap = document.createElement("div");
    wrap.className = `msg-${who}`;
    const bubble = document.createElement("p");
    bubble.textContent = text;
    bubble.classList.add("text-box-size");
    wrap.appendChild(bubble);
    chatWindow.appendChild(wrap);
    scrollToBottom();
  }

  // --- Typing indicator ---
  function showTyping(){
    const node = document.createElement("div");
    node.className = "msg-bot typing-wrap";
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    const dots = document.createElement("span");
    dots.className = "typing";
    dots.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
    bubble.appendChild(dots);
    node.appendChild(bubble);
    chatWindow.appendChild(node);
    scrollToBottom();
    return node;
  }
  function hideTyping(node){
    if (node && node.parentNode) node.parentNode.removeChild(node);
  }

  // --- Scroll xuống cuối ---
  function scrollToBottom(){
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // --- Lưu lịch sử trong sessionStorage ---
  function pushHistory(item){
    try {
      const arr = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
      arr.push(item);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch(e){ console.warn("Storage error", e); }
  }

  // --- Load lịch sử khi bắt đầu phiên ---
  function loadHistory(){
    try {
      const arr = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
      arr.forEach(it => appendMessage(it.who, it.text));
    } catch(e){ console.warn("Load history error", e); }
  }

  // --- Hàm gọi API (nơi bạn đổi URL hoặc làm mock) ---
  async function fetchBotReply(userText){
    // --- OPTION A: Gọi backend API của bạn ---
    // return fetch("/api/chat", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message: userText })
    // }).then(r => r.json()).then(obj => obj.reply);

    // --- OPTION B: Mock trả lời (dùng khi chưa có server) ---
    await delay(700 + Math.random()*800); // simulate processing
    // Một vài logic trả lời đơn giản:
    if (/điểm|địa điểm|du lịch/i.test(userText)) return "Bạn muốn tìm điểm du lịch theo tỉnh/loại nào (biển/đồi/văn hóa)?";
    if (/giá|chi phí|giá cả/i.test(userText)) return "Bạn muốn xem khoảng giá nào? (ví dụ: <$1tr, 1-3tr, >3tr)";
    return "Mình đã nhận được câu hỏi của bạn: \"" + userText + "\". Mình sẽ liên hệ tư vấn sớm nhé!";
  }

  function delay(ms){ return new Promise(res => setTimeout(res, ms)); }
});
