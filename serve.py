#!/usr/bin/env python3
import os, sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 3001
DIR = os.path.dirname(os.path.abspath(__file__))

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)
    def log_message(self, format, *args):
        sys.stderr.write("Serving toys-for-talking on http://localhost:%d\n" % PORT if args[1] == '200' else '')

httpd = HTTPServer(('', PORT), Handler)
sys.stderr.write(f"Toys for Talking server running at http://localhost:{PORT}\n")
sys.stderr.flush()
httpd.serve_forever()
