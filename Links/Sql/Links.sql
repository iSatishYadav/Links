CREATE DATABASE Links;
GO

USE [Links];
GO

/****** Object: Table [dbo].[Link] Script Date: 10-06-2018 00:33:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Link](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OriginalLink] [nvarchar](max) NOT NULL,
	[CreatedBy] [nvarchar](200) NOT NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[Stats] [nvarchar](max) NULL,
 CONSTRAINT [PK_Link] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

CREATE TABLE [dbo].[Log]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
	[LinkId] INT NOT NULL,
    [IpAddress] NVARCHAR(50) NULL, 
    [UserAgent] NVARCHAR(10) NULL, 
    [Timestamp] DATETIME2 NULL, 
    [Browser] NVARCHAR(100) NULL, 
    [Os] NVARCHAR(50) NULL, 
    [Device] NVARCHAR(100) NULL
);

GO

ALTER TABLE [dbo].[Log] ADD CONSTRAINT FK_Log_Link FOREIGN KEY (LinkId) REFERENCES dbo.Link(Id);
GO

CREATE PROCEDURE [dbo].[UpdateStats] @Id int, @IpAddress NVARCHAR(50), @TimeStamp DATETIME2, @UserAgent NVARCHAR(MAX)
AS			
	UPDATE [dbo].Link SET Stats = JSON_MODIFY(JSON_MODIFY(Stats, '$.clicks', JSON_VALUE(Stats, '$.clicks') + 1), 'append $.log', JSON_MODIFY(JSON_MODIFY(JSON_MODIFY(JSON_MODIFY(JSON_MODIFY(JSON_MODIFY(JSON_MODIFY('{}', '$.id', CAST(NEWID() AS NVARCHAR(64))), '$.timestamp', CAST(@Timestamp AS NVARCHAR)), '$.ip', @IpAddress), '$.userAgent', @UserAgent), '$.browser', @Browser), '$.os', @Os), '$.device', @Device)) WHERE Id = @Id
	INSERT INTO [dbo].[Log] ([Id], [LinkId], [IpAddress], [UserAgent], [Timestamp], [Browser], [Os], [Device]) VALUES (NEWID(), @Id, @IpAddress, @UserAgent, @TimeStamp, @Browser, @Os, @Device)
RETURN 0

GO