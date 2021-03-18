document.addEventListener("DOMContentLoaded", (event) => {
    if (event) {
        console.info("DOM loaded");
    }

    // UPDATE
    const changeEatenBtns = document.querySelectorAll(".change-eaten");

    // Set up the event listener for the create button
    if (changeEatenBtns) {
        changeEatenBtns.forEach((button) => {
            button.addEventListener("click", (e) => {
                // Grabs the id of the element - named "id"
                const id = e.target.getAttribute("data-id");
                const newEaten = e.target.getAttribute("data-neweaten");

                const newEatenState = {
                    eaten: newEaten,
                };

                fetch(`/api/burgers/${id}`, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },

                    // make sure to serialize the JSON body
                    body: JSON.stringify(newEatenState),
                }).then((response) => {
                // Check that the response is all good
                // Reload the page so the user can see the new burger
                if (response.ok) {
                    console.log(`Changed eaten to: ${newEaten}`);
                    location.reload("/");
                } else {
                    alert("Something went wrong!");
                }
                });
            });
        });
    }

    // CREATE
    const createBurgerBtn = document.getElementById("create-form");

    if (createBurgerBtn) {
        createBurgerBtn.addEventListener("submit", (e) => {
            e.preventDefault();

            // Grabs the value of the textarea that goes by the name, "bu"
            const newBurger = {
                name: document.getElementById("bu").value.trim(),
                eaten: document.getElementById("eaten").checked,
            };
            if (newBurger.name.length > 0) {
            // Send POST request to create a new burger
                fetch("/api/burgers", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },

                    // make sure to serialize the JSON body
                    body: JSON.stringify(newBurger),
                }).then(() => {
                    // Empty the form
                    document.getElementById("bu").value = "";
        
                    // Reload the page so the user can see the new burger
                    console.log("Created a new burger!");
                    location.reload();
                });
            }
        });
    }

    // DELETE BURGER
    const deleteBurgerBtns = document.querySelectorAll(".delete-burger");

    // Set up the event listeners for each delete button
    deleteBurgerBtns.forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");

            // Send the delete request
            fetch(`/api/burgers/${id}`, {
                method: "DELETE",
            }).then((res) => {
                console.log(res);
                console.log(`Deleted burger: ${id}`);
        
                // Reload the page
                location.reload();
            });
        });
    });
});