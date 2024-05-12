from django.contrib.auth.backends import ModelBackend
from .models import User

class CustomUserAuthenticationBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        print(f"CUSTOM AUTH TRIGGERED BY {username} (Password: {password})")
        
        if username is None:
            username = kwargs.get(User.USERNAME_FIELD)
        
        try:
            user = User.objects.get(Username=username)
            print(f"{user} signing in via username...")
        except User.DoesNotExist:
            try:
                user = User.objects.get(Email=username)
                print(f"Failed. Trying {user} to signin in via email...")
            except User.DoesNotExist:
                return None
            else:
                if user is None: 
                    return None
                if user.password == password:
                    return user
            if user.password == password:
                print(f"Checking {user} password ({password})...")
                return user
        else:
            if user.password == password:
                print(f"Checking {user} password ({password})...")
                return user
            
        print(f"Failed to authenticate {username} (Password: {password})")
        return None
        
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
