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

// Function to handle registration of a new student
async function registerStudent() {
    const usn = document.getElementById('registerUSN').value;
    const name = document.getElementById('registerName').value;

    if (!usn || !name) {
        alert("Please provide both USN and name.");
        return;
    }

    if (!(await checkMetaMask())) return;

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x5F7d80d2c4CeFb6CfdBE2073f66A3bf8289c8EcE"; // Replace with your actual contract address
        const contractABI = await fetchContractABI();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Call the registerStudent function in the smart contract
        await contract.registerStudent(usn, name);
        alert("Student registered successfully.");
    } catch (error) {
        console.error("Error registering student:", error);
        alert("Failed to register student. Please try again.");
    }
}

// Function to handle updating learning time of a student
async function updateLearningTime() {
    const usn = document.getElementById('updateUSN').value;
    const learningTime = document.getElementById('learningTime').value;

    if (!usn || !learningTime) {
        alert("Please provide both USN and learning time.");
        return;
    }

    if (!(await checkMetaMask())) return;

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x5F7d80d2c4CeFb6CfdBE2073f66A3bf8289c8EcE"; // Replace with your actual contract address
        const contractABI = await fetchContractABI();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Call the updateLearningTime function in the smart contract
        await contract.updateLearningTime(usn, learningTime);
        alert("Learning time updated successfully.");
    } catch (error) {
        console.error("Error updating learning time:", error);
        alert("Failed to update learning time. Please try again.");
    }
}

// Function to handle updating course material for a student
async function updateCourseMaterial() {
    const usn = document.getElementById('updateCourseUSN').value;
    const course = document.getElementById('courseName').value;
    const material = document.getElementById('courseMaterial').value;

    if (!usn || !course || !material) {
        alert("Please provide USN, course name, and course material.");
        return;
    }

    if (!(await checkMetaMask())) return;

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x5F7d80d2c4CeFb6CfdBE2073f66A3bf8289c8EcE"; // Replace with your actual contract address
        const contractABI = await fetchContractABI();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Call the updateCourseMaterial function in the smart contract
        await contract.updateCourseMaterial(usn, course, material);
        alert("Course material updated successfully.");
    } catch (error) {
        console.error("Error updating course material:", error);
        alert("Failed to update course material. Please try again.");
    }
}

// Function to handle updating grade of a student
async function updateGrade() {
    const usn = document.getElementById('updateGradeUSN').value;
    const course = document.getElementById('gradeCourseName').value;
    const grade = document.getElementById('grade').value;

    if (!usn || !course || !grade) {
        alert("Please provide USN, course name, and grade.");
        return;
    }

    if (!(await checkMetaMask())) return;

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x5F7d80d2c4CeFb6CfdBE2073f66A3bf8289c8EcE"; // Replace with your actual contract address
        const contractABI = await fetchContractABI();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Call the updateGrade function in the smart contract
        await contract.updateGrade(usn, course, grade);
        alert("Grade updated successfully.");
    } catch (error) {
        console.error("Error updating grade:", error);
        alert("Failed to update grade. Please try again.");
    }
}

  
  // Event listener for Register Student button in register.html
  document.getElementById('registerButton').addEventListener('click', registerStudent);
  
  // Event listener for Update Learning Time button in register.html
  document.getElementById('updateLearningTimeButton').addEventListener('click', updateLearningTime);
  
  // Event listener for Update Course Material button in register.html
  document.getElementById('updateCourseMaterialButton').addEventListener('click', updateCourseMaterial);
  
  // Event listener for Update Grade button in register.html
  document.getElementById('updateGradeButton').addEventListener('click', updateGrade);
  
       
