// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRecords {
    // Structure to hold student details
    struct Student {
        string name;
        uint256 learningTime; // in hours
        string[] courses; // list of course names
        mapping(string => string) courseMaterials; // course name to material
        mapping(string => uint8) grades; // course name to grade
    }

    // Mapping to store students using their USN as the key
    mapping(string => Student) private students;

    // Register a new student
    function registerStudent(string memory _usn, string memory _name) public {
        require(
            bytes(students[_usn].name).length == 0,
            "Student already registered."
        );
        students[_usn].name = _name;
    }

    // Add or update learning time for a student
    function updateLearningTime(
        string memory _usn,
        uint256 _learningTime
    ) public {
        require(
            bytes(students[_usn].name).length != 0,
            "Student not registered."
        );
        students[_usn].learningTime = _learningTime;
    }

    // Add or update course material for a student
    function updateCourseMaterial(
        string memory _usn,
        string memory _course,
        string memory _material
    ) public {
        require(
            bytes(students[_usn].name).length != 0,
            "Student not registered."
        );
        students[_usn].courseMaterials[_course] = _material;

        // Add course to student's course list if not already added
        bool courseExists = false;
        for (uint i = 0; i < students[_usn].courses.length; i++) {
            if (
                keccak256(abi.encodePacked(students[_usn].courses[i])) ==
                keccak256(abi.encodePacked(_course))
            ) {
                courseExists = true;
                break;
            }
        }
        if (!courseExists) {
            students[_usn].courses.push(_course);
        }
    }

    // Add or update grades for a student
    function updateGrade(
        string memory _usn,
        string memory _course,
        uint8 _grade
    ) public {
        require(
            bytes(students[_usn].name).length != 0,
            "Student not registered."
        );
        require(_grade <= 100, "Grade must be between 0 and 100.");
        students[_usn].grades[_course] = _grade;

        // Add course to student's course list if not already added
        bool courseExists = false;
        for (uint i = 0; i < students[_usn].courses.length; i++) {
            if (
                keccak256(abi.encodePacked(students[_usn].courses[i])) ==
                keccak256(abi.encodePacked(_course))
            ) {
                courseExists = true;
                break;
            }
        }
        if (!courseExists) {
            students[_usn].courses.push(_course);
        }
    }

    // Get student details
    function getStudent(
        string memory _usn
    ) public view returns (string memory, uint256) {
        require(
            bytes(students[_usn].name).length != 0,
            "Student not registered."
        );
        return (students[_usn].name, students[_usn].learningTime);
    }

    // Get course material for a student
    function getCourseMaterial(
        string memory _usn,
        string memory _course
    ) public view returns (string memory) {
        require(
            bytes(students[_usn].name).length != 0,
            "Student not registered."
        );
        return students[_usn].courseMaterials[_course];
    }

    // Get grade for a student in a specific course
    function getGrade(
        string memory _usn,
        string memory _course
    ) public view returns (uint8) {
        require(
            bytes(students[_usn].name).length != 0,
            "Student not registered."
        );
        return students[_usn].grades[_course];
    }

    // Get all courses registered by a student
    function getAllCourses(
        string memory _usn
    ) public view returns (string[] memory) {
        require(
            bytes(students[_usn].name).length != 0,
            "Student not registered."
        );
        return students[_usn].courses;
    }

    // Get all information of a student
    function getAllStudentInfo(
        string memory _usn
    ) public view returns (string memory, uint256, string[] memory) {
        require(
            bytes(students[_usn].name).length != 0,
            "Student not registered."
        );
        return (
            students[_usn].name,
            students[_usn].learningTime,
            students[_usn].courses
        );
    }

    // Get all grades of a student
    function getAllGrades(
        string memory _usn
    ) public view returns (string[] memory, uint8[] memory) {
        require(
            bytes(students[_usn].name).length != 0,
            "Student not registered."
        );
        uint length = students[_usn].courses.length;
        uint8[] memory grades = new uint8[](length);
        for (uint i = 0; i < length; i++) {
            grades[i] = students[_usn].grades[students[_usn].courses[i]];
        }
        return (students[_usn].courses, grades);
    }
}
