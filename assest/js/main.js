const search = document.getElementsByTagName("input")[0];
console.log(search);

function debounce(func, delay = 500) {
  let timerId;

  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func.apply(this, args);
      timerId = null;
    }, delay);
  };
}

const searchInput = () => {
  console.log(search.value);
  if (search.value != "") {
    displayData(search.value);
  }
};
const debouncedInput = debounce(searchInput, 800);
search.addEventListener("keyup", debouncedInput);

const getData = async (search) => {
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`
  );
  const data = await response.json();
  // console.log(data.query.search);
  return data.query.search;
};

const display = (data) => {

  if (data.length == 0) {
    document.querySelector(".result").innerHTML = `
        <div class="bg-secondary d-flex justify-content-center p-5">
        <p class="text-white">no results found ...</p>

      </div>
        `
  } else {
    let result = "";
    data.forEach((element) => {
      result += `
              <div class="item col-3 my-4">
                      <div class="card" >
                          <div class="card-body">
                            <h4 class="card-title my-3">${element.title}</h4>
                            <h5 class="card-subtitle mb-2 text-muted">${element.snippet}</h5>
                            <a href="https://en.wikipedia.org/wiki/${element.title}" class="card-link">Read </a>
                          </div>
                        </div>
                  </div>
              `;
    });

    document.querySelector(".result").innerHTML = result;
  }


};

const displayData = async (search) => {
  const data = await getData(search);
  console.log(data);
  display(data);
};
