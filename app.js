window.addEventListener('load', ()=>{
    console.log('Ready to AJAX')
    const blogpostTitleListEl = document.querySelector('#blogpost-titles-list')
    axios.get(`http://localhost:3007/blogposts`)
    .then(response =>{ console.log(response)
        response.data.forEach(blogpost => {
            const blogpostTitleEl = document.createElement('li');
            blogpostTitleEl.innerHTML = blogpost.title;
            blogpostTitleListEl.appendChild(blogpostTitleEl)
        });
    })
    .catch(error => console.error(error))
})