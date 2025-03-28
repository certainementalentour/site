#!/usr/bin/env python3
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl


script_dir = os.path.dirname(os.path.abspath(__file__))

# Gestionnaire personnalisé pour définir la page d'accueil
class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    home_page = "index.html"  

    def do_GET(self):
        # Si la requête concerne la racine, redirige vers la page d'accueil (normalement on n'accède plus à ../../key.pem)
        if self.path == "/":
            self.path = "/" + self.home_page
        return super().do_GET()
    
    def send_error(self, code, message=None, explain=None):
        error_pages: dict = {
            404: os.path.join(script_dir, "../errors/404.html"),
            500: os.path.join(script_dir, "../errors/500.html")
        }
        if code in error_pages and os.path.exists(error_pages[code]):
            self.send_response(200)  # http 200 = OK, pour afficher la page plutôt que l'erreur
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            with open(error_pages[code], "rb") as f:
                self.wfile.write(f.read())
        else:  # sinon gestion par défaut des erreurs de SimpleHTTPRequestHandler
            super().send_error(code, message, explain)

def run(server_class=HTTPServer, handler_class=CustomHTTPRequestHandler):
    # fichiers de certificat et de clé
    cert_file = os.path.join(script_dir, './cert.pem')
    key_file = os.path.abspath(os.path.join(script_dir, '../../../key.pem'))

    server_address = ('', 8000)  # Le serveur écoute sur toutes les interfaces, port 8000
    httpd = server_class(server_address, handler_class)
    
    if os.path.exists(cert_file) and os.path.exists(key_file):
        try:
            # Créer un contexte SSL et charger le certificat et la clé
            context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
            context.load_cert_chain(certfile=cert_file, keyfile=key_file)

            httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
            protocol = "https"
        except Exception as e:
            print("Erreur lors du démarrage en HTTPS:", e)
            protocol = "http"
    else:
        protocol = "http"

    print(f"Serveur {protocol.upper()} démarré sur {protocol}://localhost:8000")
    httpd.serve_forever()

if __name__ == '__main__':
    run()

'''
 ad8888888888ba
dP'         `"8b,
8  ,aaa,       "Y888a     ,aaaa,     ,aaa,  ,aa,
8  8' `8           "8baaaad""""baaaad""""baad""8b
8  8   8              """"      """"      ""    8b
8  8, ,8         ,aaaaaaaaaaaaaaaaaaaaaaaaddddd88P
8  `"""'       ,d8""
Yb,         ,ad8" 
 "Y8888888888P"
'''
