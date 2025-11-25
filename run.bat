@echo off
cd /d "%~dp0"
echo Current folder: %CD%
echo Running: node approve.js requests.csv
node approve.js requests.csv
echo.
echo ===============================
echo Script finished. Press any key.
pause >nul
