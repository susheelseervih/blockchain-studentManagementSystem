
// Function to fetch contract ABI from JSON file
async function fetchContractABI() {
    const response = await fetch('ABI.json');
    const data = await response.json();
    return data.abi; // Return only the ABI array
}


// Function to check if MetaMask is installed
async function checkMetaMask() {
    if (!window.ethereum) {
        alert("MetaMask is not installed. Please install MetaMask to interact with this website.");
        return false;
    }
    return true;
}

// Function to handle getting information of a student
async function getStudentInfo() {
    const usn = document.getElementById('infoUSN').value;

    if (!usn) {
        alert("Please provide the USN.");
        return;
    }

    if (!(await checkMetaMask())) return;

    try {
      // asking permission from metamask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // gettting contract
        const contractAddress = "0x5F7d80d2c4CeFb6CfdBE2073f66A3bf8289c8EcE"; // Replace with your actual contract address
        const contractABI = await fetchContractABI();
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        // Call the getAllStudentInfo function in the smart contract
        const studentInfo = await contract.getAllStudentInfo(usn);
        const [name, learningTime, courses] = studentInfo;

        // Format the courses as a string
        const coursesString = courses.join(", ");

        document.getElementById('print').innerHTML = `Name: ${name}<br>Learning Time: ${learningTime} hours<br>Courses: ${coursesString}`;
    } catch (error) {
        console.error("Error getting student info:", error);
        document.getElementById('print').innerHTML = "Failed to get student info. Please try again.";
    }
}

// Function to handle getting all courses
async function getAllCourses() {
    const usn = document.getElementById('allCoursesUSN').value;

    if (!usn) {
        alert("Please provide the USN.");
        return;
    }
  
    if (!(await checkMetaMask())) return;
  
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = "0x5F7d80d2c4CeFb6CfdBE2073f66A3bf8289c8EcE"; // Replace with your actual contract address
      const contractABI = await fetchContractABI();
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
  
      // Call the getAllCourses function in the smart contract
      const courses = await contract.getAllCourses(usn);
      document.getElementById('print').innerHTML = "Courses: " + courses.join(", ");
    } catch (error) {
      console.error("Error getting all courses:", error);
      document.getElementById('print').innerHTML = "Failed to get all courses. Please try again.";
    }
  }
  
  // Function to handle getting all grades
  async function getAllGrades() {
    const usn = document.getElementById('allGradesUSN').value;
  
    if (!usn) {
      alert("Please provide the USN.");
      return;
    }
  
    if (!(await checkMetaMask())) return;
  
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = "0x5F7d80d2c4CeFb6CfdBE2073f66A3bf8289c8EcE"; // Replace with your actual contract address
      const contractABI = await fetchContractABI();
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
  
      // Call the getAllGrades function in the smart contract
      const [courses, grades] = await contract.getAllGrades(usn);
      let gradeListHTML = "<b>Grades:</b><br>"; // Bold text for clarity
      for (let i = 0; i < courses.length; i++) {
        gradeListHTML += `${courses[i]} : ${grades[i]}<br>`;
      }
      document.getElementById('print').innerHTML = gradeListHTML;
  
    } catch (error) {
      console.error("Error getting all grades:", error);
      document.getElementById('print').innerHTML = "Failed to get all grades. Please try again.";
    }
  }
  
  // Function to handle getting course material
  async function getCourseMaterial() {
    const usn = document.getElementById('courseUSN').value;
    const course = document.getElementById('courseName').value;
  
    if (!usn || !course) {
      alert("Please provide both USN and course name.");
      return;
    }
  
    if (!(await checkMetaMask())) return;
  
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = "0x5F7d80d2c4CeFb6CfdBE2073f66A3bf8289c8EcE"; // Replace with your actual contract address
      const contractABI = await fetchContractABI();
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
  
      // Call the getCourseMaterial function in the smart contract
      const material = await contract.getCourseMaterial(usn, course);
      document.getElementById('print').innerHTML = `Course Material for ${course}:<br>${material}`;
    } catch (error) {
      console.error("Error getting course material:", error);
      document.getElementById('print').innerHTML = "Failed to get course material. Please try again.";
    }
  }


// Event listener for Get Student Info button in getinfo.html
document.getElementById('getStudentInfoButton').addEventListener('click', getStudentInfo);

// Event listener for Get All Courses button in getinfo.html
document.getElementById('getAllCoursesButton').addEventListener('click', getAllCourses);

// Event listener for Get All Grades button in getinfo.html
document.getElementById('getAllGradesButton').addEventListener('click', getAllGrades);

// Event listener for Get Course Material button in getinfo.html
document.getElementById('getCourseMaterialButton').addEventListener('click', getCourseMaterial);