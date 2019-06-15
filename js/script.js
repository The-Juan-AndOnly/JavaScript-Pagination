/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Global variables for students and the resultsPerPage
const students = [...document.querySelectorAll('.student-item')];
const resultPerPage = 10;

// showPage function which takes in 2 parameters (the list of students and page to be display. By default page is set to be page 1)
const showPage = (students, page = 1) => {
  // calculate the first name and last name on page
  let firstOnPage = page * resultPerPage - resultPerPage;
  let lastOnPage = page * resultPerPage;
  // Initially hide all the students on the page
  students.map((student, index) => {
    student.style.display = 'none';
    // Conditional that checks to see which students should be unhidden/displayed
    if (index >= firstOnPage && index < lastOnPage) {
      student.style.display = '';
    }
  });
};
// Function that calculates max number of pages needed, creates and adds it to the page
const appendPageLinks = students => {
  if (document.querySelector('.pagination')) {
    document.querySelector('.pagination').remove();
  }
  const maxPages = Math.ceil(students.length / resultPerPage);
  const page = document.querySelector('.page');
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  const paginationList = document.createElement('ul');
  //   Loop through and assign pages and links
  for (x = 1; x <= maxPages; x++) {
    const paginationItem = document.createElement('li');
    const paginationLink = document.createElement('a');
    paginationLink.textContent = x;

    paginationItem.appendChild(paginationLink);
    paginationList.appendChild(paginationItem);
    x === 1 && (paginationLink.className = 'active');
  }
  paginationDiv.appendChild(paginationList);
  page.appendChild(paginationDiv);
};

// Call Functions passing in "students" as arguments
showPage(students);
appendPageLinks(students);

// Creat a Sorry Text for no matches
const sorryText = document.createElement('h2');
sorryText.textContent = 'Sorry there are 0 matches';

const handleInput = e => {
  // Set Each student to display none
  students.map(student => {
    return (student.style.display = 'none');
  });
  // Filter through the students which what is being inputted in the text field
  const filterNames = students.filter(student => {
    return student.children[0].children[1].textContent.includes(e.target.value);
  });
  // If there are 0 students that match a search then a sorry Text appears
  if (filterNames.length === 0) {
    document.querySelector('.student-list').appendChild(sorryText);
    sorryText.style.display = '';
  } else {
    sorryText.style.display = 'none';
  }
  // Creat Pagination links and display students based on filtered names
  appendPageLinks(filterNames);
  showPage(filterNames);
};

// const handleSubmit = e => {
//   e.preventDefault();
//   console.log(e.target[0].value);
// };

// Create Search Component for students
const searchComponent = students => {
  const pageHeader = document.querySelector('.page-header');
  const searchForm = document.createElement('form');
  const searchLabel = document.createElement('label');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  searchInput.type = 'text';
  searchInput.value = '';
  searchInput.placeholder = 'Enter a name';
  searchInput.addEventListener('keyup', handleInput);
  searchLabel.appendChild(searchInput);
  searchForm.appendChild(searchLabel);
  searchForm.appendChild(searchButton);
  searchForm.className = 'student-search';
  // searchForm.addEventListener('submit', handleSubmit);
  pageHeader.appendChild(searchForm);
};
searchComponent(); // invoke the function

// Event listener that will remove active class from all links, add active to link clicked and then calls the showPage function on the link clicked
document.querySelector('.pagination ul').addEventListener('click', e => {
  const links = [...document.querySelectorAll('a')];

  links.map(link => link.classList.remove('active'));

  if (e.target.nodeName === 'A') {
    e.target.className = 'active';
    showPage(students, e.target.textContent);
  }
});
