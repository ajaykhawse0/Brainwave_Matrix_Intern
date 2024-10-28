// Select elements
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const blogForm = document.getElementById('blog-form');
const mainContainer = document.getElementById('main-container');
const blogPostsContainer = document.getElementById('blog-posts');
const foot=document.querySelector("footer");
const sms=document.getElementById("login-sms");
// Show blog form only if user is logged in
function checkLogin() {
  const loggedIn = localStorage.getItem('loggedIn');
  if (loggedIn) {
    blogForm.style.display = 'block';
    mainContainer.style.display = 'block';
    foot.style.position="static";
    sms.style.display="none";
  } else {
   
    blogForm.style.display = 'none';
    mainContainer.style.display = 'none';
  }
}

// Sign up function
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Check if the user is already signed up
      const existingUser = JSON.parse(localStorage.getItem('user'));
      if (existingUser && existingUser.email === email) {
          alert('You have already signed up with this email address.');
          window.location.href = 'login.html';
          return;
      }

      // Store user details in local storage
      localStorage.setItem('user', JSON.stringify({ username, email, password }));
      alert('Sign up successful! Please log in.');
      window.location.href = 'login.html'; // Redirect to login page
  });
}

// Login function
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Validate credentials
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      localStorage.setItem('loggedIn', 'true');
      // alert('Login successful!');
      window.location.href = 'blogs.html'; // Redirect to home page
    } else {
      alert('Invalid username or password!');
    }
  });
}

// Logout function
function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
}

// Add, edit, delete blog posts
if (blogForm) {
  blogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const postId = new Date().getTime(); // Unique ID based on timestamp
    const blogPost = { id: postId, title, content };
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    blogPosts.push(blogPost);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

    displayBlogPosts();
    blogForm.reset();
  });
}

// Display blog posts
function displayBlogPosts() {
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  blogPostsContainer.innerHTML = '';

  blogPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="editPost(${post.id})" class="edit">Edit</button>
      <button onclick="deletePost(${post.id})" class="delete">Delete</button>
    `;
    blogPostsContainer.appendChild(postElement);
  });
}

// Edit blog post
function editPost(id) {
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts'));
  const post = blogPosts.find(p => p.id === id);
  if (post) {
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
    deletePost(id);
  }
}

// Delete blog post
function deletePost(id) {
  let blogPosts = JSON.parse(localStorage.getItem('blogPosts'));
  blogPosts = blogPosts.filter(post => post.id !== id);
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  displayBlogPosts();
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  checkLogin();
  displayBlogPosts();
});



// Select the logout button
const logoutButton = document.getElementById('logout-button');

// Show or hide the logout button based on login status
function toggleLogoutButton() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
        logoutButton.style.display = 'inline-block';
    } else {
        logoutButton.style.display = 'none';
    }
}

// Logout function to clear login status
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    // alert('You have successfully logged out.');
    window.location.href = 'login.html'; // Redirect to login page
});

// Call toggleLogoutButton on page load to set initial state
document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    toggleLogoutButton();
    displayBlogPosts();
});
