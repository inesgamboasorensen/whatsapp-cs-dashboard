import http.server
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

handler = http.server.SimpleHTTPRequestHandler
handler.extensions_map.update({
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
})

server = http.server.HTTPServer(('', 5173), handler)
print(f"Serving whatsapp-dashboard at http://localhost:5173")
server.serve_forever()
