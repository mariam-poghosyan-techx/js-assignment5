document.addEventListener("DOMContentLoaded", () => {
    const withHeader = document.getElementById("fetch-with-header");
    const withoutHeader = document.getElementById("fetch-without-header");
    const message = document.getElementById("message");
    const store = document.getElementById("users");

    const delay = (s) => new Promise(resolve => setTimeout(resolve, s));

    async function fetchUser(header) {
        message.textContent = "Loading...";
        store.textContent = "";
        console.log("Fetching users...");

        const API_URL = "https://reqres.in/api/users?delay=1";
        const options = {
            method: "GET",
            headers: header ? { "x-api-key": "reqres-free-v1" } : {}
        };

        try {
            const response = await fetch(API_URL, options);
            if (!response.ok) {
                throw new Error("Network not responding");
            }

            const data = await response.json();

            if (!data || !Array.isArray(data.data) || data.data.length === 0) {
                throw new Error("Rejected");
            }

            await delay(1000);
            console.log(data);

            const names = data.data.map(user => `${user.first_name} ${user.last_name}`);
            names.forEach(name => {
                const p = document.createElement("p");
                p.textContent = name;
                store.appendChild(p);
            });

            message.textContent = "Users loaded.";
            console.log("Done");

        } catch (error) {
            message.textContent = "No users";
            console.error(error);
        }
    }

    withHeader.addEventListener("click", () => fetchUser(true));
    withoutHeader.addEventListener("click", () => fetchUser(false));
});
