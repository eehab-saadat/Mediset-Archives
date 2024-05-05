from django.db import models

class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    FName = models.CharField(max_length=10, null=False)
    LName = models.CharField(max_length=10, null=True)
    Username = models.CharField(max_length=30, null=False, unique=True)
    Password = models.BinaryField(max_length=60, null=False)
    Phone = models.CharField(max_length=15, null=True)
    Email = models.EmailField(max_length=30, unique=True)
    IsAdmin = models.BooleanField(default=False)

class Tag(models.Model):
    TagID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=20, null=False, unique=True)
    CreatedBy = models.ForeignKey(User, on_delete=models.CASCADE)
    CreatedAt = models.DateTimeField(auto_now_add=True)

class Dataset(models.Model):
    DatasetID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=20, null=False, unique=True)
    Description = models.CharField(max_length=60, null=True)
    OwnerID = models.ForeignKey(User, on_delete=models.CASCADE)
    StoragePath = models.CharField(max_length=50, null=False, unique=True)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    LastEditedBy = models.ForeignKey(User, related_name='editor', null=True, on_delete=models.SET_NULL)
    LastEditedAt = models.DateTimeField(auto_now=True)
    VoteCount = models.IntegerField(default=0)
    DownloadCount = models.IntegerField(default=0)
    CommentCount = models.IntegerField(default=0)
    IsPublic = models.BooleanField(default=False)

class TagRequests(models.Model):
    RequestID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=20, null=False)
    RequestedBy = models.ForeignKey(User, on_delete=models.CASCADE)
    RequestedAt = models.DateTimeField(auto_now_add=True)
    Status = models.BooleanField(null=True)

class DatasetCollaborator(models.Model):
    DatasetID = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    CollaboratorID = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('DatasetID', 'CollaboratorID')

class DatasetTag(models.Model):
    DatasetID = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    TagID = models.ForeignKey(Tag, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('DatasetID', 'TagID')

class DatasetVotes(models.Model):
    VoteID = models.AutoField(primary_key=True)
    DatasetID = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    VotedBy = models.ForeignKey(User, on_delete=models.CASCADE)
    Vote = models.BooleanField(default=True)

    class Meta:
        unique_together = ('DatasetID', 'VotedBy')

class DatasetComments(models.Model):
    CommentID = models.AutoField(primary_key=True)
    DatasetID = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    CommentedBy = models.ForeignKey(User, on_delete=models.CASCADE)
    Comment = models.CharField(max_length=100, null=False)
    CommentedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('DatasetID', 'CommentedBy')