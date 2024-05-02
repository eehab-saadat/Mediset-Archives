----e:
--CREATE PROCEDURE handleTagRequest 
--    @UserID INT,
--    @RequestID INT,
--    @Flag BIT
--AS
--BEGIN
--    SET NOCOUNT ON;

--    DECLARE @TagName VARCHAR(20);

--    -- Get the requested tag name
--    SELECT @TagName = [Name]
--    FROM TagRequests
--    WHERE RequestID = @RequestID;

--    IF @Flag = 1 -- True flag ==  request approved
--    BEGIN
--        -- Check if the tag already exists
--        IF EXISTS (SELECT 1 FROM Tag WHERE [Name] = @TagName)
--        BEGIN
--            PRINT 'The requested tag "' + @TagName + '" is already present.';
--            RETURN;
--        END
--        ELSE -- if tag name not already present in the table
--        BEGIN
--            -- Add the tag to the Tag table
--            INSERT INTO Tag ([Name], CreatedBy)
--            SELECT @TagName, @UserID;

--            -- Delete the tag request
--            DELETE FROM TagRequests WHERE RequestID = @RequestID;

--            PRINT 'The requested tag "' + @TagName + '" has been added.';
--        END
--    END
--    ELSE -- False flag
--    BEGIN
--        -- Delete the tag request
--        DELETE FROM TagRequests WHERE RequestID = @RequestID;

--        PRINT 'The tag request has been rejected.';
--    END
--END;

----f:
--CREATE PROCEDURE AddTagsToDataset
--    @DatasetID INT,
--    @TagIDs VARCHAR(MAX) = NULL -- Comma-separated list of tag IDs
--AS
--BEGIN
--    SET NOCOUNT ON;
--	IF @TagIDs IS NOT NULL
--	BEGIN
--    DECLARE @TagID INT;
--    DECLARE @TagIDList TABLE (TagID INT);

--    -- Split the comma-separated list of tag IDs
--    INSERT INTO @TagIDList (TagID)
--    SELECT value FROM STRING_SPLIT(@TagIDs, ',');

--    -- Insert each tag ID into DatasetTag table
--    INSERT INTO DatasetTag (DatasetID, TagID)
--    SELECT @DatasetID, TagID FROM @TagIDList;

--    PRINT 'Tags added to the dataset successfully.';
--	END
--	ELSE
--	BEGIN
--		PRINT 'No tags to be added'
--	END
--END;

----g:
--CREATE PROCEDURE addDataset
--	@Name VARCHAR(20),
--    @Description VARCHAR(60) = NULL,
--    @OwnerID INT,
--    @StoragePath VARCHAR(50),
--    @TagIDs VARCHAR(MAX) = NULL, -- Comma-separated list of tag IDs
--    @IsPublic BIT,
--	@Status BIT OUTPUT
--AS
--BEGIN
--	SET NOCOUNT ON;

--	SET @Status = 0;
--	DECLARE @datasetID INT;
--	IF EXISTS (SELECT 1 FROM Dataset WHERE [Name] = @Name) 
--	   OR 
--	   EXISTS (SELECT 1 FROM Dataset WHERE StoragePath = @StoragePath)
--	BEGIN
--		 PRINT 'ERROR: Dataset already exists. You must use a unqiue dataset and file name.';
--		 RETURN;
--	END

--	-- else dataset is to be added
--	INSERT INTO Dataset ([Name], [Description], OwnerID, LastEditedBy, StoragePath, IsPublic)
--    VALUES (@Name, @Description, @OwnerID, @OwnerID, @StoragePath, @IsPublic);

--	-- inserting tags if provided
--	SET @DatasetID = SCOPE_IDENTITY(); -- Get the ID of the inserted dataset
--		 IF @TagIDs IS NOT NULL
--    BEGIN
--        EXEC AddTagsToDataset @DatasetID, @TagIDs;
--    END

--		SET @Status = 1; -- dataset successfully added
--		RETURN;
--END

----h:
--CREATE PROCEDURE AddCollaborator
--    @DatasetID INT,
--    @CollaboratorID INT,
--    @Status BIT OUTPUT
--AS
--BEGIN
--    SET NOCOUNT ON;

--    -- Initialize @Status as false by default
--    SET @Status = 0;

--    -- Check if the collaborator is not the owner and not already a collaborator
--    IF EXISTS (
--        SELECT 1
--        FROM Dataset
--        WHERE DatasetID = @DatasetID
--          AND OwnerID <> @CollaboratorID
--          AND NOT EXISTS (
--              SELECT 1
--              FROM DatasetCollaborator
--              WHERE DatasetID = @DatasetID
--                AND CollaboratorID = @CollaboratorID
--          )
--    )
--    BEGIN
--        -- Add the collaborator to DatasetCollaborator table
--        INSERT INTO DatasetCollaborator (DatasetID, CollaboratorID)
--        VALUES (@DatasetID, @CollaboratorID);

--        -- Set @Status to true indicating collaborator added successfully
--        SET @Status = 1;

--        PRINT 'Collaborator added to the dataset successfully.';
--    END
--    ELSE
--    BEGIN
--        PRINT 'Error: Collaborator cannot be added to the dataset.';
--    END;
--END;

----i:
--CREATE PROCEDURE RemoveCollaboratorFromDataset
--    @DatasetID INT,
--    @CollaboratorID INT,
--    @Status BIT OUTPUT
--AS
--BEGIN
--    SET NOCOUNT ON;

--     Initialize @Status as false by default
--    SET @Status = 0;

--     Check if the collaborator is already a collaborator of the dataset
--    IF EXISTS (
--        SELECT 1
--        FROM DatasetCollaborator
--        WHERE DatasetID = @DatasetID
--          AND CollaboratorID = @CollaboratorID
--    )
--    BEGIN
--         Remove the collaborator from DatasetCollaborator table
--        DELETE FROM DatasetCollaborator
--        WHERE DatasetID = @DatasetID
--          AND CollaboratorID = @CollaboratorID;

--         Set @Status to true indicating collaborator removed successfully
--        SET @Status = 1;

--        PRINT 'Collaborator removed from the dataset successfully.';
--    END
--    ELSE
--    BEGIN
--        PRINT 'Error: Collaborator is not associated with the dataset.';
--    END;
--END;

