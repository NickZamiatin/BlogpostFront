window.addEventListener('load', () => {
    console.log('Ready to AJAX')
    const blogpostTitleListEl = document.querySelector('#blogpost-titles-list');
    const mainPanelEl = document.querySelector('#main-panel');
    const baseURL = 'http://localhost:3007/blogposts';

    const createBlogpost = () => {
        event.preventDefault();
        const title = document.querySelector('#input-title').value
        const content = document.querySelector('#textarea-content').value
        // console.log({title, content})
        axios.post(baseURL, {
                title,
                content
            })
            .then(response => {
                loadTitle();
                showBlogpost(response.data);

            })
            .catch(error => console.error(error));
    }

    const newBlogpost = () => {
        mainPanelEl.innerHTML = `<form>
        <label for="title">Title</label>
         <input type = "text" name="title" id="input-title" ><br><br>
         <label for = "content" > Content </label>
          <textarea name = "content" id = "textarea-content"></textarea>
          <button  id="create-button">Create </button>
        </form>`;

        document.querySelector('#create-button').addEventListener('click', createBlogpost)
    }

    const editBlogpost = blogpost => {
        mainPanelEl.innerHTML = `<form>
        <label for="title">Title</label>
         <input type = "text" name="title" id="input-title-edit" ><br><br>
         <label for = "content" > Content </label>
          <textarea name = "content" id = "textarea-content-edit"></textarea>
          <button  id="update-button">Create </button>
        </form>`;

        document.querySelector('#input-title-edit').value = blogpost.title
        document.querySelector('#input-content-edit').value = blogpost.content
        document.querySelector('#pdate-button').addEventListener('click', () => {
            updeteBlogpost(blogpost)
        })
    }


    const deleteBlogpost = blogpost => {
        console.log(blogpost)
        axios.delete(`${baseURL}/${blogpost.id}`)
            .then(response => {
                loadTitle()
                mainPanelEl.innerHTML = ""
            })
            .catch(error => console.error(error));

    }


    const updeteBlogpost = blogpost => {
        const id = document.querySelector('#input-title').value
        const id2 = document.querySelector('#textarea-content').value
        axios.put(`${baseURL}/${blogpost.id}`)
            .then(result => {
                container.innerHTML = `
        <code>${JSON.stringify(result.data)}</code>
      `
            })
    }



    const showBlogpost = blogpost => {
        // console.log(blogpost.title)
        mainPanelEl.innerHTML = ""
        const focusTitleEl = document.createElement('h3')
        const focusContentEl = document.createElement('p')
        focusTitleEl.innerHTML = blogpost.title
        focusContentEl.innerHTML = blogpost.content

        const editButtonsEl = document.createElement('button')
        const deleteButtonsEl = document.createElement('button')
        editButtonsEl.id = "edit-button"
        deleteButtonsEl.id = "delete-button"
        editButtonsEl.innerHTML = "EDIT"
        deleteButtonsEl.innerHTML = 'DELETE'
        mainPanelEl.appendChild(focusTitleEl)
        mainPanelEl.appendChild(focusContentEl)
        mainPanelEl.appendChild(editButtonsEl)
        mainPanelEl.appendChild(deleteButtonsEl)

        document.querySelector('#edit-button').addEventListener('click', () => {
            editBlogpost(blogpost)
        });
        document.querySelector('#delete-button').addEventListener('click', () => {
            deleteBlogpost(blogpost)
        });



    }


    const loadTitle = () => {
        axios.get(baseURL)
            .then(response => {
                console.log(response)
                blogpostTitleListEl.innerHTML = ''
                response.data.forEach(blogpost => {
                    const blogpostTitleEl = document.createElement('li');
                    blogpostTitleEl.innerHTML = blogpost.title;
                    blogpostTitleListEl.appendChild(blogpostTitleEl)
                    blogpostTitleEl.addEventListener('click', () => {
                        showBlogpost(blogpost)
                    })
                });
            })
            .catch(error => console.error(error))
    }

    loadTitle()
    document.querySelector('#new-blogpost').addEventListener('click', newBlogpost)
})