let initTime = Date.now(); // 計測開始時間
let startTime = Date.now(); // 1つのFPSの計測開始時間
let frameCount = 0;
let fpsData = [];
let maxFps = 0;
let minFps = Infinity;

function countFPS() {
  const now = Date.now();
  const deltaTime = now - startTime;
  frameCount++;

  if (deltaTime >= 1000) {
    const fps = frameCount;
    fpsData.push({ fps, time: now }); // FPSとその記録時間を配列に追加
    maxFps = Math.max(maxFps, fps);
    minFps = Math.min(minFps, fps);

    // 60秒より古いデータを削除
    while (fpsData.length > 0 && (now - fpsData[0].time) > 60000) {
      fpsData.shift();
    }

    // 平均FPSの計算
    const averageFps = fpsData.length > 0 ? fpsData.reduce((a, b) => a + b.fps, 0) / fpsData.length : 0;

    // FPSとその他の情報を表示
    document.getElementById("fpsDisplay").textContent = "FPS: " + fps;
    document.getElementById("elapsedTime").textContent = Math.round((now - initTime) / 1000) + " sec";
    document.getElementById("averageFps").textContent = averageFps.toFixed(2);
    document.getElementById("maxFps").textContent = maxFps;
    document.getElementById("minFps").textContent = minFps;

    frameCount = 0;
    startTime = now;
  }

  requestAnimationFrame(countFPS);
}

countFPS();
