-- Create the database
CREATE DATABASE DegreeMap;

-- Use the database
USE DegreeMap;

-- SQLite does not use CREATE DATABASE statement, just connect to the database
-- SQLite will create a new database file if it does not exist

-- Create tables

-- Create Student table
CREATE TABLE Student (
    UCID INTEGER PRIMARY KEY CHECK (UCID GLOB '30[0-9][0-9][0-9][0-9][0-9][0-9]'),  -- UCID as primary key with (30XX XXXX) digits
    GivenName TEXT NOT NULL,
    LastName TEXT NOT NULL CHECK (LENGTH(LastName) <= 20),  -- Last name with 20 character constraint
    Email TEXT NOT NULL CHECK (Email LIKE '%@ucalgary.ca'),  -- Email with @ucalgary.ca constraint
    DOB TEXT NOT NULL CHECK (DOB GLOB '[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]'),  -- DOB in yyyy-mm-dd format
    Intake TEXT NOT NULL CHECK (IntakeYear GLOB '[1-2][0-9][0-9][0-9]'),  -- Intake year in yyyy format
    Year INTEGER NOT NULL CHECK (Year BETWEEN 1 AND 4),  -- Year in range 1 to 4
    MajorsIn INTEGER,  -- MajorID as integer
    MinorsIn INTEGER,  -- MinorID as integer
    ConcentratesIn INTEGER,  -- ConcentrationID as integer
    FOREIGN KEY (MajorsIn) REFERENCES Major(MajorID),  -- Foreign key for MajorID
    FOREIGN KEY (MinorsIn) REFERENCES Minor(MinorID),  -- Foreign key for MinorID
    FOREIGN KEY (ConcentratesIn) REFERENCES Concentration(ConcentrationID)  -- Foreign key for ConcentrationID
);


-- Create Program table
CREATE TABLE Program (
    ProgramID TEXT PRIMARY KEY CHECK (ProgramID GLOB '[OBHMP][0-9]*'),  -- ProgramID starting with O = open, B = bachelors, H = honours, M = masters, P = Phd, or E = exchange
    Name TEXT NOT NULL,
    Description TEXT NOT NULL CHECK (LENGTH(Description) <= 50),  -- Description with a 50-word limit
    Type TEXT NOT NULL CHECK (Type IN ('open', 'bachelors', 'honours', 'masters', 'phd', 'exchange')),  -- Type with specific values
    RequiredUnits INTEGER NOT NULL CHECK (RequiredUnits IN (30, 60, 120, 150)),  -- Required Units as integers 30, 60, 120, 150
    OfferedByFaculty INTEGER,
    FOREIGN KEY (OfferedByFaculty) REFERENCES Faculty(FacultyID)  -- Foreign key for Faculty
);


-- Create Minor table
CREATE TABLE Minor (
    MinorID INTEGER PRIMARY KEY,  -- MinorID as unique primary key
    Name TEXT NOT NULL,
    ProgramID TEXT NOT NULL,  -- Reference to ProgramID
    FOREIGN KEY (ProgramID) REFERENCES Program(ProgramID)  -- Foreign key for ProgramID
);

-- Create Major table
CREATE TABLE Major (
    MajorID INTEGER PRIMARY KEY,  -- MajorID as unique primary key
    Name TEXT NOT NULL,
    ProgramID TEXT NOT NULL,  -- Reference to ProgramID
    FOREIGN KEY (ProgramID) REFERENCES Program(ProgramID)  -- Foreign key for ProgramID
);

-- Create Concentration table
CREATE TABLE Concentration (
    ConcentrationID INTEGER PRIMARY KEY,  -- ConcentrationID as unique primary key
    Name TEXT NOT NULL,
    ProgramID TEXT NOT NULL,  -- Reference to ProgramID
    FOREIGN KEY (ProgramID) REFERENCES Program(ProgramID)  -- Foreign key for ProgramID
);

-- Create Faculty table
CREATE TABLE Faculty (
    FacultyID INTEGER PRIMARY KEY,  -- FacultyID as primary key
    Name TEXT NOT NULL  -- Name of the faculty
);


-- Create Department table
CREATE TABLE Department (
    DepartmentCode TEXT PRIMARY KEY CHECK (LENGTH(DepartmentCode) = 4),  -- DepartmentCode as a 4-character unique code
    Name TEXT NOT NULL,
    ManagedByFaculty INTEGER,
    FOREIGN KEY (ManagedByFaculty) REFERENCES Faculty(FacultyID)  -- Foreign key for Faculty
);


-- Create Courses table
CREATE TABLE Courses (
    CourseCode TEXT PRIMARY KEY,  -- CourseCode as the primary key
    DepartmentCode TEXT NOT NULL,  -- Reference to DepartmentCode
    CourseNumber INTEGER NOT NULL CHECK (CourseNumber BETWEEN 100 AND 799),  -- CourseNumber as an integer with three digits
    Title TEXT NOT NULL,
    Description TEXT,
    Keywords TEXT,  -- Tuple of words for topic/interest/keywords
    FOREIGN KEY (DepartmentCode) REFERENCES Department(DepartmentCode)  -- Foreign key for DepartmentCode
);


-- Create Admins table
CREATE TABLE Admins (
    EmployeeID INTEGER PRIMARY KEY,  -- EmployeeID as primary key
    GivenName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT NOT NULL CHECK (Email LIKE '%@ucalgary.ca')  -- Email with @ucalgary.ca constraint
);


-- Create Instructors table
CREATE TABLE Instructors (
    EmployeeID INTEGER PRIMARY KEY,  -- EmployeeID as primary key
    GivenName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT NOT NULL CHECK (Email LIKE '%@ucalgary.ca')  -- Email with @ucalgary.ca constraint
);


-- Create GraduationRequirement table
CREATE TABLE GraduationRequirement (
    ProgramID TEXT NOT NULL CHECK (ProgramID GLOB '[OBHMP][0-9]*'),  -- ProgramID with specific character and numbers format
    CourseCode TEXT NOT NULL,  -- Reference to CourseCode
    PRIMARY KEY (ProgramID, CourseCode),  -- Composite primary key
    FOREIGN KEY (ProgramID) REFERENCES Program(ProgramID),  -- Foreign key for ProgramID
    FOREIGN KEY (CourseCode) REFERENCES Courses(CourseCode)  -- Foreign key for CourseCode
);


-- Create StudentCourses table
CREATE TABLE StudentCourses (
    UCID INTEGER NOT NULL,  -- Reference to UCID in Student
    CourseCode TEXT NOT NULL,  -- Reference to CourseCode in Courses
    StudentCourseCode TEXT GENERATED ALWAYS AS (UCID || '_' || CourseCode) VIRTUAL,  -- Composite key as a combination of UCID and CourseCode
    PRIMARY KEY (UCID, CourseCode),  -- Composite primary key
    FOREIGN KEY (UCID) REFERENCES Student(UCID),  -- Foreign key for UCID
    FOREIGN KEY (CourseCode) REFERENCES Courses(CourseCode)  -- Foreign key for CourseCode
);


-- Create Completed table
CREATE TABLE Completed (
    StudentCourseCode TEXT NOT NULL,  -- Reference to composite key UCID + CourseCode from StudentCourses
    TransferCredit BOOLEAN NOT NULL,
    InUniversity BOOLEAN NOT NULL,
    PRIMARY KEY (StudentCourseCode),  -- Primary key for the combination of UCID and CourseCode
    FOREIGN KEY (StudentCourseCode) REFERENCES StudentCourses(StudentCourseCode)  -- Foreign key for StudentCourseCode
);


-- Create Enrolled table
CREATE TABLE Enrolled (
    StudentCourseCode TEXT NOT NULL,  -- Reference to composite key UCID + CourseCode from StudentCourses
    NotStarted BOOLEAN NOT NULL,
    InProgress BOOLEAN NOT NULL,
    PRIMARY KEY (StudentCourseCode),  -- Primary key for the combination of UCID and CourseCode
    FOREIGN KEY (StudentCourseCode) REFERENCES StudentCourses(StudentCourseCode)  -- Foreign key for StudentCourseCode
);

-- Create Planned table
CREATE TABLE Planned (
    StudentCourseCode TEXT NOT NULL,  -- Reference to composite key UCID + CourseCode from StudentCourses
    Wishlist BOOLEAN NOT NULL,
    Card BOOLEAN NOT NULL,
    Waitlist BOOLEAN NOT NULL,
    PRIMARY KEY (StudentCourseCode),  -- Primary key for the combination of UCID and CourseCode
    FOREIGN KEY (StudentCourseCode) REFERENCES StudentCourses(StudentCourseCode)  -- Foreign key for StudentCourseCode
);

-- Create Prerequisites table
CREATE TABLE Prerequisites (
    MainCourse INTEGER NOT NULL,  -- Reference to CourseID (MainCourse)
    PrereqCourse TEXT NOT NULL,  -- Reference to CourseCode (PrereqCourse)
    PRIMARY KEY (MainCourse, PrereqCourse),  -- Composite primary key
    FOREIGN KEY (MainCourse) REFERENCES Courses(CourseID),  -- Foreign key for MainCourse
    FOREIGN KEY (PrereqCourse) REFERENCES Courses(CourseCode)  -- Foreign key for PrereqCourse
);


-- Create Antirequisites table
CREATE TABLE Antirequisites (
    MainCourse INTEGER NOT NULL,  -- Reference to CourseID (MainCourse)
    AntireqCourse TEXT NOT NULL,  -- Reference to CourseCode (AntireqCourse)
    PRIMARY KEY (MainCourse, AntireqCourse),  -- Composite primary key
    FOREIGN KEY (MainCourse) REFERENCES Courses(CourseID),  -- Foreign key for MainCourse
    FOREIGN KEY (AntireqCourse) REFERENCES Courses(CourseCode)  -- Foreign key for AntireqCourse
);


-- Create Maintains table
CREATE TABLE Maintains (
    AdminEmployeeID INTEGER NOT NULL,  -- Reference to EmployeeID in Admins
    CourseCode TEXT NOT NULL,  -- Reference to CourseCode
    PRIMARY KEY (AdminEmployeeID, CourseCode),  -- Composite primary key
    FOREIGN KEY (AdminEmployeeID) REFERENCES Admins(EmployeeID),  -- Foreign key for AdminEmployeeID
    FOREIGN KEY (CourseCode) REFERENCES Courses(CourseCode)  -- Foreign key for CourseCode
);


-- Create Teaches table
CREATE TABLE Teaches (
    InstructorEmployeeID INTEGER NOT NULL,  -- Reference to EmployeeID in Instructors
    CourseCode TEXT NOT NULL,  -- Reference to CourseCode
    PRIMARY KEY (InstructorEmployeeID, CourseCode),  -- Composite primary key
    FOREIGN KEY (InstructorEmployeeID) REFERENCES Instructors(EmployeeID),  -- Foreign key for InstructorEmployeeID
    FOREIGN KEY (CourseCode) REFERENCES Courses(CourseCode)  -- Foreign key for CourseCode
);


-- Create SBelongF table
CREATE TABLE SBelongF (
    UCID INTEGER NOT NULL,  -- Reference to UCID in Student
    FacultyID INTEGER NOT NULL,  -- Reference to FacultyID in Faculty
    PRIMARY KEY (UCID, FacultyID),  -- Composite primary key
    FOREIGN KEY (UCID) REFERENCES Student(UCID),  -- Foreign key for UCID
    FOREIGN KEY (FacultyID) REFERENCES Faculty(FacultyID)  -- Foreign key for FacultyID
);


-- Some queries 

-- Given a student's UCID find the courses that the student must complete to graduate the program the major in
SELECT 
    Courses.CourseCode, 
    Courses.Title, 
    Courses.Description
FROM 
    Student
JOIN 
    Major ON Student.MajorsID = Major.MajorID
JOIN 
    GraduationRequirement ON Major.ProgramID = GraduationRequirement.ProgramID
JOIN 
    Courses ON GraduationRequirement.CourseCode = Courses.CourseCode
WHERE 
    Student.UCID = '30192494';

-- Given a course name eg: CPSC481 find the courses that are the prerequisite of this course
SELECT 
    PrereqCourse 
FROM 
    Prerequisites 
WHERE 
    MainCourse = 'CPSC481';

-- Given a student's UCID find the courses that the student must complete to graduate the program
SELECT 
    Courses.CourseCode, 
    Courses.Title, 
    Courses.Description
FROM 
    GraduationRequirement
JOIN 
    Courses ON GraduationRequirement.CourseCode = Courses.CourseCode
WHERE 
    GraduationRequirement.ProgramID IN (
        SELECT 
            ProgramID
        FROM 
            (
                SELECT 
                    Major.ProgramID AS ProgramID
                FROM 
                    Student
                JOIN 
                    Major ON Student.MajorsIn = Major.MajorID
                WHERE 
                    Student.UCID = '30192494'
                UNION
                SELECT 
                    Minor.ProgramID AS ProgramID
                FROM 
                    Student
                JOIN 
                    Minor ON Student.MinorsIn = Minor.MinorID
                WHERE 
                    Student.UCID = '30192494'
                UNION
                SELECT 
                    Concentration.ProgramID AS ProgramID
                FROM 
                    Student
                JOIN 
                    Concentration ON Student.ConcentratesIn = Concentration.ConcentrationID
                WHERE 
                    Student.UCID = '30192494'
            ) AS ProgramIDs
    );


-- Find out all the course taught by professor Ahmed Marouf
SELECT 
    Courses.CourseCode, 
    Courses.Title 
FROM 
    Teaches 
JOIN 
    Instructors ON Teaches.InstructorEmployeeID = Instructors.EmployeeID 
JOIN 
    Courses ON Teaches.CourseCode = Courses.CourseCode 
WHERE 
    Instructors.GivenName = 'Ahmed' AND 
    Instructors.LastName = 'Marouf';


-- Give the list of all the courses offered by Department of Computer Science
SELECT 
    Courses.CourseCode, 
    Courses.Title 
FROM 
    Courses 
JOIN 
    Department ON Courses.DepartmentCode = Department.DepartmentCode 
WHERE 
    Department.Name = 'Computer Science';


-- Filter out all the courses in CPSC that are above 300 level
SELECT 
    CourseCode, 
    Title 
FROM 
    Courses 
WHERE 
    DepartmentCode = 'CPSC' AND 
    CourseNumber > 300;


-- Given a student's UCID find out the list of all the course completed by the student
SELECT 
    Courses.CourseCode, 
    Courses.Title 
FROM 
    Completed 
JOIN 
    StudentCourses ON Completed.StudentCourseCode = StudentCourses.StudentCourseCode 
JOIN 
    Courses ON StudentCourses.CourseCode = Courses.CourseCode 
WHERE 
    StudentCourses.UCID = '30192494';


-- Find how many students are currently enrolled in CPSC471
SELECT 
    COUNT(*) AS NumberOfStudents 
FROM 
    Enrolled 
JOIN 
    StudentCourses ON Enrolled.StudentCourseCode = StudentCourses.StudentCourseCode 
WHERE 
    StudentCourses.CourseCode = 'CPSC471';

-- Given a student's UCID find out the courses for which the student has recived TransferCredits and is till taking the course
SELECT 
    Courses.CourseCode, 
    Courses.Title, 
FROM 
    StudentCourses
JOIN 
    Courses ON StudentCourses.CourseCode = Courses.CourseCode
LEFT JOIN 
    Completed ON StudentCourses.StudentCourseCode = Completed.StudentCourseCode 
LEFT JOIN 
    Enrolled ON StudentCourses.StudentCourseCode = Enrolled.StudentCourseCode 
WHERE 
    StudentCourses.UCID = '30192494' AND 
    (
        (Completed.StudentCourseCode IS NOT NULL AND Completed.TransferCredit = 1 AND Completed.InUniversity = 1) OR 
        (Enrolled.StudentCourseCode IS NOT NULL AND Enrolled.TransferCredit = 1 AND Enrolled.InUniversity = 1)
    );


-- Given a student's UCID find out the courses for which the student has recived TransferCredits and is til enrolled in it.
SELECT 
    Courses.CourseCode, 
    Courses.Title
FROM 
    Courses
WHERE 
    CourseCode IN (
        SELECT 
            StudentCourses.CourseCode
        FROM 
            StudentCourses
        WHERE 
            StudentCourses.UCID = '30192494' AND 
            StudentCourses.StudentCourseCode IN (
                SELECT 
                    Completed.StudentCourseCode
                FROM 
                    Completed
                WHERE 
                    Completed.TransferCredit = 1
            ) AND 
            StudentCourses.StudentCourseCode IN (
                SELECT 
                    Enrolled.StudentCourseCode
                FROM 
                    Enrolled
            )
    );


-- Insert
INSERT INTO Student (UCID, GivenName, LastName, Email, DOB, Intake, Year, MajorsIn, MinorsIn, ConcentratesIn) 
VALUES (30192494, 'Ayman', 'Momin', 'ayman.momin@ucalgary.ca', '2004-03-14', '2023', 3, 23, 2, NULL);

INSERT INTO Program (ProgramID, Name, Description, Type, RequiredUnits, OfferedByFaculty) 
VALUES ('B001', 'Computer Science', 'Bachelor of Computer Science', 'bachelors', 120, 1);

INSERT INTO Courses (CourseCode, DepartmentCode, CourseNumber, Title, Description, Keywords) 
VALUES ('CPSC471', 'CPSC', 471, 'Database Management Systems', 'Introductino to DMBS', 'DBMS, SQL, Databases');

INSERT INTO Instructors (EmployeeID, GivenName, LastName, Email) 
VALUES (1, 'Ahmed', 'Marouf', 'ahmed.marouf@ucalgary.ca');


-- Update
UPDATE Student 
SET Email = 'ayman.momin1@ucalgary.ca' 
WHERE UCID = 30192494;

UPDATE Program 
SET Description = 'Bachelor of Science in Computer Science' 
WHERE ProgramID = 'B001';

UPDATE Courses 
SET Title = 'DBMS' 
WHERE CourseCode = 'CPSC471';

UPDATE Instructors 
SET Email = 'ahmed.marouf2@ucalgary.ca' 
WHERE GivenName = 'Ahmed' AND LastName = 'Marouf';


-- Delete
DELETE FROM Student 
WHERE UCID = 30192494;

DELETE FROM Program 
WHERE ProgramID = 'B001';

DELETE FROM Courses 
WHERE CourseCode = 'CPSC471';

DELETE FROM Instructors 
WHERE GivenName = 'Ahmed' AND LastName = 'Marouf';



