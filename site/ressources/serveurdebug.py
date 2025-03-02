#!/usr/bin/env python3
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

# Gestionnaire personnalisé pour définir la page d'accueil
class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    home_page = "index.html"  

    def do_GET(self):
        # Si la requête concerne la racine, redirige vers la page d'accueil
        if self.path == "/":
            self.path = "/" + self.home_page
        return super().do_GET()

def run(server_class=HTTPServer, handler_class=CustomHTTPRequestHandler):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # fichiers de certificat et de clé
    cert_file = os.path.join(script_dir, './cert.pem')
    key_file = os.path.abspath(os.path.join(script_dir, '../../../key.pem'))

    server_address = ('', 8000)  # Le serveur écoute sur toutes les interfaces, port 8000
    httpd = server_class(server_address, handler_class)
    
    # Vérifier si les fichiers existent pour activer HTTPS
    if os.path.exists(cert_file) and os.path.exists(key_file):
        try:
            # Créer un contexte SSL et charger le certificat et la clé
            context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
            context.load_cert_chain(certfile=cert_file, keyfile=key_file)
            # Envelopper le socket du serveur avec le contexte SSL
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
