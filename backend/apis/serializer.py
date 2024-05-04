from rest_framework import serializers # type: ignore
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = '__all__'

class TagRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagRequests
        fields = '__all__'

class DatasetCollaboratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetCollaborator
        fields = '__all__'

class DatasetTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetTag
        fields = '__all__'

class DatasetVotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetVotes
        fields = '__all__'

class DatasetCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetComments
        fields = '__all__'