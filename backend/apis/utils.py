from .models import User

def get_user_object(user_identifier):
    try:
        user = User.objects.get(Username=user_identifier)
    except User.DoesNotExist:
        try:
            user = User.objects.get(Email=user_identifier)
        except User.DoesNotExist:
            return None
    return user