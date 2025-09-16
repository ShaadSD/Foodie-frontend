
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('review-form');


  form.addEventListener('submit', (e) => {
    e.preventDefault();


    const reviewTitle = document.getElementById('review_title').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const token = localStorage.getItem('token'); 

    if (!token) {
      alert('please log in again');
      window.location.href = 'login.html';
      return;
    }

 
    fetch('https://foodie-restaurent-3.onrender.com/api/review/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token 
  },
  body: JSON.stringify({
    review_title: reviewTitle,
    content: comment
  })
})
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((errorData) => {
          throw new Error('Not Submit correctly');
        });
      }
    })
    .then((data) => {
      alert(data.message || 'Review Succesfully');
      form.reset();
      window.location.href = 'home.html';
      
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Have any probleam in server');
    });
  });
});
