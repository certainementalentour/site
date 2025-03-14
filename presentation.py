import requests
import random
import os
import subprocess

# Configuration
OWNER = "certainementalentour"
REPO = "site"
BRANCH = "main"

api_url = f"https://api.github.com/repos/{OWNER}/{REPO}/git/trees/{BRANCH}?recursive=1"

# Récupérer la liste des fichiers
response = requests.get(api_url)
if response.status_code != 200:
    print("Erreur lors de la récupération des fichiers :", response.json())
    exit()

files = [file['path'] for file in response.json().get('tree', []) if file['type'] == 'blob']
if not files:
    print("Aucun fichier trouvé dans le dépôt.")
    exit()

# Sélectionner un fichier aléatoire
random_file = random.choice(files)
filename = random_file.split("/")[-1]
print("Fichier sélectionné :", filename)

# Télécharger le fichier
file_url = f"https://raw.githubusercontent.com/{OWNER}/{REPO}/{BRANCH}/{random_file}"
file_response = requests.get(file_url)

if file_response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(file_response.content)
    print(f"Fichier {filename} téléchargé avec succès.")

    # Vérifier l'extension et ouvrir le fichier
    if filename.endswith((".py", ".bat", ".exe")):
        print(f"Ouverture de {filename} avec Notepad...")
        subprocess.run(["notepad.exe", filename])
    else:
        print(f"Ouverture de {filename} avec le programme par défaut...")
        os.startfile(filename)  # Ouvre avec l'application par défaut (Windows)

else:
    print("Erreur lors du téléchargement du fichier :", file_response.status_code)