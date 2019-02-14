//Variables
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    btnClearCart = document.querySelector('#clear-cart');


//Listeners
loadEventListeners();

function loadEventListeners(){

    //add course to cart
    courses.addEventListener('click', addCourse);

    //remove course from cart
    shoppingCartContent.addEventListener('click', removeCourse);

    //remove all course from cart
    btnClearCart.addEventListener('click', removeAllCourse);

    //load courses from local storage
    document.addEventListener('DOMContentLoaded', loadCourses)

}


//Funtions
function addCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-to-cart')) {
        const course = e.target.parentElement.parentElement;
        
        insertIntoCart(getCourseInfo(course));
    }
}

function getCourseInfo(course) {
    return {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
}

function createTemplateCart(course) {
    const row = document.createElement('tr');

    row.innerHTML = `
                <tr>
                    <td><img src="${course.image}" width="100" /></td>
                    <td>${course.title}</td>
                    <td>${course.price}</td>
                    <td><a href="#" class="remove" data-id="${course.id}">X</a></td>
                </tr>
    `;

    return row;
}

function insertIntoCart(course) {
    const row = createTemplateCart(course);
    
    shoppingCartContent.appendChild(row);

    saveIntoStorage(course);


}

function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();
    
    courses.push(course);

    localStorage.setItem('courses', JSON.stringify(courses) );

    console.log(courses);

}

function getCoursesFromStorage() {
    let courses = [];
    let coursesSaved = localStorage.getItem('courses');

    if(coursesSaved !== null ) {
        courses = JSON.parse(coursesSaved);
    }

    return courses;
}

function removeCourse(e) {
    e.preventDefault();

    if(e.target.classList.contains('remove')) {
        const course = e.target.parentElement.parentElement;
        course.remove();
        const courseId = course.querySelector('a').getAttribute('data-id');

        removeCourseLocalStorage(courseId);
    }
}

function removeCourseLocalStorage(courseId) {
    let courses = getCoursesFromStorage();

    courses.forEach(function(course, index) {
        if(course.id === courseId){
            //remove course from arrays courses
            courses.splice(index, 1);
        }
    });

    localStorage.setItem('courses', JSON.stringify(courses) );
}


function removeAllCourse(e) {
    e.preventDefault();

    //shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    //remove all course from local storage
    removeCoursesLocalStorage();
}

function removeCoursesLocalStorage(){
    localStorage.clear();
}

function loadCourses() {
    let courses = getCoursesFromStorage();

    courses.forEach(course => {
        let row = createTemplateCart(course);
        shoppingCartContent.appendChild(row);
    });
}