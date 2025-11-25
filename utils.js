// utils.js - shared helpers for auto-approver scripts

import fs from "fs";
import path from "path";

/** ensure a folder exists */
export function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/** timestamp "YYYY-MM-DD HH-mm-ss" */
export function ts() {
  const d = new Date();
  const pad = (x) => String(x).padStart(2, "0");
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`
  );
}

/** sleep for ms */
export function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

/** read request IDs from CSV file */
export function readRequests(csvFile) {
  try {
    const raw = fs.readFileSync(csvFile, "utf8");
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((x) => x.length > 0);
  } catch (e) {
    console.error("Failed to read CSV:", e.message);
    return [];
  }
}

/** append a line to a log file */
export function appendLog(file, line) {
  try {
    fs.appendFileSync(file, line);
  } catch (e) {
    console.error("appendLog error:", e.message);
  }
}

/** save a text file inside logs/errors */
export function saveText(filename, content) {
  try {
    const dir = path.resolve("logs", "errors");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = path.join(dir, filename);
    fs.writeFileSync(file, content, "utf8");
    console.log("Saved:", file);
    return file;
  } catch (e) {
    console.error("saveText error:", e.message);
    return null;
  }
}
