import subprocess
from time import time as current_time

subprocess.run(['pip3', 'install', 'colorama'], cwd='backend')

from colorama import Fore, Style

print(Fore.BLUE + "\nInstalling dependencies...", end='\n\n')

try:
    start_time = current_time()
    print(Fore.YELLOW + 'Installing node modules...', end='\n\n')
    subprocess.run(['pnpm', 'install'], shell=True, cwd='frontend')
    print(Fore.GREEN + '\nInstalling python packages...', end='\n\n')
    subprocess.run(['pip3', 'install', '-r', 'requirements.txt'], cwd='backend')
    end_time = current_time()
    total_time = end_time - start_time
    print(Fore.BLUE + f"\nDependencies installed successfully! \nProcess ended in {total_time:.2f} seconds. Exited with code 0.", end='\n\n')
except Exception as e:
    print(Fore.RED + f"An error occurred: {e}", end='\n\n')
    print("Process ended with code 1.", end='\n\n')
finally:
    print(Style.RESET_ALL)