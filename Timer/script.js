const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let running = false;
let lapCount = 0;

// Format thời gian thành chuỗi hiển thị
function formatTime(time) {
  const milliseconds = time % 1000;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / (1000 * 60)) % 60;
  const hours = Math.floor(time / (1000 * 60 * 60));

  return (
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}.` +
    `${String(milliseconds).padStart(3, '0')}`
  );
}

// Cập nhật hiển thị đồng hồ
function updateDisplay(time) {
  display.textContent = formatTime(time);
}

// Bắt đầu đồng hồ
function startTimer() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
  }
}

// Tạm dừng đồng hồ
function pauseTimer() {
  if (running) {
    running = false;
    clearInterval(intervalId);
  }
}

// Reset toàn bộ
function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  updateDisplay(0);
  lapCount = 0;
  lapsList.innerHTML = ''; // Xóa danh sách thời gian đã lưu
}

// Lưu thời gian hiện tại vào danh sách
function saveLap() {
  if (!running) return; // Không lưu khi chưa chạy

  lapCount++;
  const li = document.createElement('li');
  li.textContent = `#${lapCount} - ${formatTime(elapsedTime)}`;
  lapsList.appendChild(li);
}

// Gán sự kiện
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', saveLap);

// Khởi tạo ban đầu
updateDisplay(0);
