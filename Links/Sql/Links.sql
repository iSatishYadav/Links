CREATE DATABASE Links;
GO

USE [Links];
GO

/****** Object: Table [dbo].[Link] Script Date: 10-06-2018 00:33:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Link] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [OriginalLink] NVARCHAR (MAX) NULL,
    [CreatedBy]    NVARCHAR (200) NOT NULL,
    [CreatedOn]    DATETIME2 (7)  NOT NULL,
    [Stats]        NVARCHAR (MAX) NULL
);

GO

CREATE PROCEDURE [dbo].[UpdateStats] @Id int, @IpAddress NVARCHAR(50), @TimeStamp DATETIME2, @UserAgent NVARCHAR(MAX)
AS			
	UPDATE [dbo].Link SET Stats = JSON_MODIFY(JSON_MODIFY(Stats, '$.clicks', JSON_VALUE(Stats, '$.clicks') + 1), 'append $.log', JSON_MODIFY(JSON_MODIFY(JSON_MODIFY(JSON_MODIFY('{}', '$.id', CAST(NEWID() AS NVARCHAR(64))), '$.timestamp', CAST(@Timestamp AS NVARCHAR)), '$.ip', @IpAddress), '$.userAgent', @UserAgent)) WHERE Id = @Id
RETURN 0

GO