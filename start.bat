@echo off
echo ========================================
echo   ForexMaster Pro Website Server
echo ========================================
echo.
echo Starting the website server...
echo.

REM Try to start with Python
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Python not found. Trying with simple HTTP server...
    echo.
    REM Fallback to basic HTTP server using Node.js if available
    where node >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Starting with Node.js...
        node -e "const http = require('http'); const fs = require('fs'); const path = require('path'); const server = http.createServer((req, res) => { const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url); const extname = path.extname(filePath); let contentType = 'text/html'; if (extname === '.css') contentType = 'text/css'; if (extname === '.js') contentType = 'text/javascript'; fs.readFile(filePath, (err, data) => { if (err) { res.writeHead(404); res.end('Not found'); } else { res.writeHead(200, { 'Content-Type': contentType }); res.end(data); } }); }); server.listen(8000, () => console.log('Server running at http://localhost:8000'));"
    ) else (
        echo.
        echo ❌ Neither Python nor Node.js found.
        echo Please install Python or Node.js to run the server.
        echo.
        echo Alternative: Open index.html directly in your browser
    )
)

pause

