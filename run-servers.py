import subprocess

commands = [('python manage.py runserver','backend'), ('pnpm run dev', 'frontend')]

for j in range(len(commands)):
    procs = [subprocess.Popen(command, shell = True, cwd = path) for command, path in commands]
    for p in procs:
        p.wait()