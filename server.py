#!/usr/bin/env python3
"""
Simple HTTP Server for ForexMaster Pro Website
Run with: python server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

def main():
    try:
        # Change to the directory containing the website files
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        
        # Create the server
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 ForexMaster Pro website is running!")
            print(f"📱 Local URL: http://localhost:{PORT}")
            print(f"🌐 Network URL: http://127.0.0.1:{PORT}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print(f"⭐ Press Ctrl+C to stop the server")
            print("-" * 50)
            
            # Try to open the browser automatically
            try:
                webbrowser.open(f"http://localhost:{PORT}")
                print("✅ Opening website in your default browser...")
            except:
                print("ℹ️  Please open http://localhost:8000 in your browser")
            
            # Start the server
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use. Please stop other servers or use a different port.")
            print(f"💡 Try: python server.py --port 8001")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

