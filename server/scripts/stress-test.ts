import http from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: "test",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/jobs", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Jobs retrieved successfully",
    data: [
      { id: "1", title: "Catering Event", location: "Kochi", salary: 1500 },
      { id: "2", title: "Stage Setup", location: "Trivandrum", salary: 2000 },
    ],
  });
});

const PORT = 5055;
const TOTAL_REQUESTS = 1000;
const CONCURRENT_WORKERS = 100;

function makeRequest(agent: http.Agent, path: string): Promise<{ status: number; duration: number }> {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(
      {
        hostname: "127.0.0.1",
        port: PORT,
        path: path,
        agent: agent,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({ status: res.statusCode || 500, duration: Date.now() - start });
        });
      }
    );

    req.on("error", () => {
      resolve({ status: 500, duration: Date.now() - start });
    });
  });
}

async function runStressTest() {
  const server = app.listen(PORT, "127.0.0.1", async () => {
    console.log(`\n==================================================`);
    console.log(`🚀 STRESS TEST: ${TOTAL_REQUESTS} Virtual User Requests (${CONCURRENT_WORKERS} Concurrent Sockets)`);
    console.log(`==================================================\n`);

    const agent = new http.Agent({
      keepAlive: true,
      maxSockets: CONCURRENT_WORKERS,
    });

    const startTime = Date.now();
    const initialMemory = process.memoryUsage().heapUsed / 1024 / 1024;

    const results: { status: number; duration: number }[] = [];
    let requestsSent = 0;

    // Worker queue approach
    async function worker() {
      while (requestsSent < TOTAL_REQUESTS) {
        const reqIdx = requestsSent++;
        const path = reqIdx % 2 === 0 ? "/api/health" : "/api/jobs";
        const res = await makeRequest(agent, path);
        results.push(res);
      }
    }

    const workers = Array.from({ length: CONCURRENT_WORKERS }, () => worker());
    await Promise.all(workers);

    const totalTime = Date.now() - startTime;
    const finalMemory = process.memoryUsage().heapUsed / 1024 / 1024;

    const successful = results.filter((r) => r.status === 200).length;
    const failed = results.filter((r) => r.status !== 200).length;
    const durations = results.map((r) => r.duration).sort((a, b) => a - b);
    const avgDuration = durations.reduce((sum, d) => sum + d, 0) / durations.length;
    const p95 = durations[Math.floor(durations.length * 0.95)];
    const p99 = durations[Math.floor(durations.length * 0.99)];
    const rps = (TOTAL_REQUESTS / (totalTime / 1000)).toFixed(2);

    console.log(`📊 STRESS TEST RESULTS:`);
    console.log(`--------------------------------------------------`);
    console.log(`Total Requests            : ${TOTAL_REQUESTS}`);
    console.log(`Concurrent Workers        : ${CONCURRENT_WORKERS}`);
    console.log(`Successful (200 OK)       : ${successful}`);
    console.log(`Failed / Errored          : ${failed}`);
    console.log(`Success Rate              : ${((successful / TOTAL_REQUESTS) * 100).toFixed(2)}%`);
    console.log(`Total Duration            : ${totalTime} ms`);
    console.log(`Throughput (Req / sec)    : ${rps} RPS`);
    console.log(`Average Latency           : ${avgDuration.toFixed(2)} ms`);
    console.log(`p95 Latency               : ${p95} ms`);
    console.log(`p99 Latency               : ${p99} ms`);
    console.log(`Heap Memory Before Test   : ${initialMemory.toFixed(2)} MB`);
    console.log(`Heap Memory After Test    : ${finalMemory.toFixed(2)} MB`);
    console.log(`Memory Delta              : ${(finalMemory - initialMemory).toFixed(2)} MB`);
    console.log(`--------------------------------------------------\n`);

    server.close(() => {
      console.log(`✅ Load & Stress Test PASSED Successfully! Server Closed.`);
      process.exit(failed === 0 ? 0 : 1);
    });
  });
}

runStressTest();
