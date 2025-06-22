import WebSocket, { WebSocketServer } from 'ws';

const port = process.env.PORT || 8080;
const wss = new WebSocketServer({ port });
console.log(`✅ WebSocket server running on ws://localhost:${port}`);

function generateRandomStats() {
  return {
    totalMembers: 38 + Math.floor(Math.random() * 5),
    totalWriteups: 75 + Math.floor(Math.random() * 5),
    totalBlogs: 29 + Math.floor(Math.random() * 5),
    todayActivities: 10 + Math.floor(Math.random() * 5),
  };
}

function generateRandomActivity(id) {
  const users = ["Yuri08", "Elaina", "CyberTeam"];
  const actions = ["đăng write-up", "viết blog", "cập nhật giao diện"];
  const targets = ["CVE-2025-32433", "Hướng dẫn bảo mật", "Trang Dashboard"];
  return {
    id,
    user: users[Math.floor(Math.random() * users.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    target: targets[Math.floor(Math.random() * targets.length)],
    date: new Date().toISOString(),
  };
}

let activityId = 1;

wss.on('connection', (ws) => {
  console.log('⚡ Client connected');

  const interval = setInterval(() => {
    const stats = generateRandomStats();
    const activity = generateRandomActivity(activityId++);
    ws.send(JSON.stringify({ type: 'stats', data: stats }));
    ws.send(JSON.stringify({ type: 'activity', data: activity }));
  }, 5000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('❌ Client disconnected');
  });
});
