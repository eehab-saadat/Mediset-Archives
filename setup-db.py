from subprocess import run as execute
from colorama import Fore, Style
from time import sleep

commands = [
    ('python manage.py makemigrations apis', 'backend'),
    ('python manage.py migrate apis', 'backend'),
    ('python manage.py migrate', 'backend')
]


print(Fore.CYAN + "\nSetting up database...", end='\n\n')
try:
    print(Fore.BLUE + "Running migrations...", end='\n\n')
    for command, path in commands:
        execute(command, shell=True, cwd=path)
        sleep(2)


    print(Fore.LIGHTGREEN_EX + "\nDatabase setup completed successfully! Exited with code 0.", end='\n\n')

except Exception as e:
    print(Fore.RED + f"An error occurred: {e}", end='\n\n')
    exit(1)
finally:
    print(Style.RESET_ALL)