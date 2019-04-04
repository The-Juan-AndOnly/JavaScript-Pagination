/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const students = [...document.querySelectorAll('.student-item')];
const resultPerPage = 10;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

// showPage function which takes in 2 parameters (the list of students and page to be display. By default page is set to be page 1)
const showPage = (students, page = 1) => {
  let firstOnPage = page * resultPerPage - resultPerPage;
  let lastOnPage = page * resultPerPage;
  // Create a loop to hide every student on the page
  for (x = 0; x < students.length; x++) {
    students[x].style.display = 'none';

    if (x >= firstOnPage && x < lastOnPage) {
      students[x].style.display = '';
    }
  }
};

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = students => {
  const maxPages = Math.ceil(students.length / resultPerPage); // Determines the max amount of pages to be created
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
    //event listener when clicked will call the showpages function
  }
  paginationDiv.appendChild(paginationList);
  page.appendChild(paginationDiv);

  paginationList.addEventListener('click', e => {
    const links = document.querySelectorAll('a');
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
    }
    e.target.className = 'active';
    showPage(students, e.target.textContent);
  });
};

// Remember to delete the comments that came with this file, and replace them with your own code comments.

const searchComponent = students => {
  const pageHeader = document.querySelector('.page-header');
  const searchForm = document.createElement('form');
  const searchLabel = document.createElement('label');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  searchInput.type = 'text';
  searchInput.value = 'test';
  searchLabel.appendChild(searchInput);
  searchForm.appendChild(searchLabel);
  searchForm.appendChild(searchButton);
  searchForm.className = 'student-search';
  pageHeader.appendChild(searchForm);

  // Added Event Listener when user clicks on Search button or hit enter on keyboard
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const studentNames = students.map(
      student => student.children[0].children[1].textContent
    );
    studentNames.filter(student =>
      student == searchInput.value
        ? console.log('Found')
        : console.log('not Found')
    );
  });
};
//
//
//
//

document.addEventListener('DOMContentLoaded', () => {
  showPage(students);
  appendPageLinks(students);
  searchComponent(students);
});
