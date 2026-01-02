@echo off

echo === 1. Build project ===
call npm run build || exit /b 1

echo === 2. Zip thu muc out ===
powershell -Command "Compress-Archive -Path out -DestinationPath out.zip -Force" || exit /b 1

echo === 3. Upload len server ===
scp out.zip root@160.191.51.7:/www/wwwroot/frontend/ximangnamson || exit /b 1
echo ✅ DONE: Deploy thanh cong
pause
