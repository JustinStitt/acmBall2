DROP TABLE IF EXISTS Submissions;

CREATE TABLE Submissions (
  name CHAR(64),
  code LONGTEXT,
  version INT,
  approved BOOLEAN,
  denied BOOLEAN
);


