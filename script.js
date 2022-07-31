const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];

getData();

filter.addEventListener("input", (eventObj) =>
  filterData(eventObj.target.value)
);

function filterData(searchTerm) {
  listItems.forEach((item) => {
    if (
      item.innerText.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

async function getData() {
  //fetch function -- API
  const response = await fetch(
    "https://randomuser.me/api?results=25"
  );

  //Instead of creating a variable with the response (const data = await response.json()),
  //I'm destructing so we can get the fetched data from the random user API

  const { results } = await response.json();

  //Need to clear results and then loop through the data:
  result.innerHTML = "";

  results.forEach((user) => {
    const list = document.createElement("li");

    listItems.push(list);

    list.innerHTML = `
       <img src="${user.picture.large}" alt"${user.name.first}>
        <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
        </div>
       `;
    result.append(list);
  });
}
