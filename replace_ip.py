'''Script cambiar ips y puertos, comando:
python3 /home/pc-26/Desktop/proyectos/proyecto\ react/app_chuletas_react/replace_ip.py . 192.168.144.33:8001 192.168.144.33:8000'''

import os
import sys

def replace_ip_in_file(file_path, old_ip, new_ip):
    with open(file_path, 'r') as file:
        content = file.read()
    
    if old_ip in content:
        content = content.replace(old_ip, new_ip)
        with open(file_path, 'w') as file:
            file.write(content)
        print(f"IP reemplazada en: {file_path}")

def replace_ip_in_project(project_path, old_ip, new_ip):
    for root, dirs, files in os.walk(project_path):
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx', '.json', '.html')):
                file_path = os.path.join(root, file)
                replace_ip_in_file(file_path, old_ip, new_ip)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Uso: python replace_ip.py <ruta_del_proyecto> <ip_antigua> <ip_nueva>")
        sys.exit(1)

    project_path = sys.argv[1]
    old_ip = sys.argv[2]
    new_ip = sys.argv[3]

    replace_ip_in_project(project_path, old_ip, new_ip)
    print("Proceso completado.")