#!/usr/bin/env python3
# Simple serveur webhook qui affiche les alertes recues par Alertmanager
from http.server import BaseHTTPRequestHandler, HTTPServer


class AlertHandler(BaseHTTPRequestHandler):
    def _handle(self):
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length).decode("utf-8", "replace")
        print(f"ALERT RECEIVED -> {body}", flush=True)
        self.send_response(200)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(b'{"status":"ok"}')

    def do_POST(self):
        self._handle()

    def do_PUT(self):
        self._handle()

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    print("Alert-display ecoute sur :9999/alert", flush=True)
    HTTPServer(("0.0.0.0", 9999), AlertHandler).serve_forever()