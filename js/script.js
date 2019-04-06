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
  }
  paginationDiv.appendChild(paginationList);
  page.appendChild(paginationDiv);
};
// Call Functions passing in "students" as arguments
showPage(students);
appendPageLinks(students);
// Event listener that will remove active class from all links, add active to link clicked and then calls the showPage function on the link clicked
document.querySelector('.pagination ul').addEventListener('click', e => {
  const links = [...document.querySelectorAll('a')];
  links.map(link => link.classList.remove('active'));

  e.target.className = 'active';
  showPage(students, e.target.textContent);
});

// Will come back one day and implement the filtering of app

// const searchComponent = students => {
//   const pageHeader = document.querySelector('.page-header');
//   const searchForm = document.createElement('form');
//   const searchLabel = document.createElement('label');
//   const searchInput = document.createElement('input');
//   const searchButton = document.createElement('button');
//   searchButton.textContent = 'Search';
//   searchInput.type = 'text';
//   searchInput.value = '';
//   searchInput.placeholder = 'Enter a name';
//   searchLabel.appendChild(searchInput);
//   searchForm.appendChild(searchLabel);
//   searchForm.appendChild(searchButton);
//   searchForm.className = 'student-search';
//   pageHeader.appendChild(searchForm);
// };

// document.querySelector('.student-search').addEventListener('submit', e => {
//   e.preventDefault();
//   const studentNames = students.map(student =>
//     student.children[0].children[1].textContent.toLowerCase()
//   );
//   const searchedName = document.querySelector('input').value.toLowerCase();
//   console.log(studentNames.indexOf(searchedName));
// });
