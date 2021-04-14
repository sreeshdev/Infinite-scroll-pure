const APIs = [
  "http://run.mocky.io/v3/6f7a76ed-d6f5-4b54-be23-bf9a141c982a",
  "http://run.mocky.io/v3/07316365-b8d2-4574-9bc1-22b17b054e3b",
  "http://run.mocky.io/v3/1c56213e-1191-4b47-a54f-066736165ff3",
];
let page = 0;
let data = [];
let searchValue = "";
let html = "";
let mainContainer = document.getElementById("main");
let toggleButton = document.getElementById("toggle");
let tableElement;
let tableView = toggleButton.checked;
let sort = 1;

window.onload = async () => {
  toggleButton.checked = false;
  tableView = false;
  await initialFetch();
};

async function initialFetch() {
  data = await fetchData();
  appendData(data);
}

async function fetchData() {
  let data = await fetch(APIs[page])
    .then((data) => data.json())
    .then((data) => {
      if (page < 2) {
        page = page + 1;
      } else if (page === 2) {
        page = 0;
      }
      return data;
    });
  return data;
}

mainContainer.addEventListener("scroll", async function () {
  if (searchValue === "") {
    if (
      mainContainer.scrollTop + mainContainer.clientHeight >= //Down Scroll
      mainContainer.scrollHeight
    ) {
      let newData = await fetchData();
      data.push(...newData);
      if (data.length <= 80) {
        appendData(newData);
      } else {
        let sliceValue = data.length - 80;
        data.splice(0, sliceValue);
        appendData(newData);

        for (i = 1; i <= sliceValue; i++) {
          let j = 1;
          tableView
            ? tableElement.children[j].remove()
            : mainContainer.children[j].remove();
        }
      }
    } else if (mainContainer.scrollTop <= 0) {
      //Up Scroll
      let newData = await fetchData();
      data = [...newData, ...data];
      if (data.length <= 80) {
        prependData(newData);
      } else {
        prependData(newData);
        let sliceValue = data.length - 80;
        let length = data.length;
        data.splice(length - sliceValue, length);
        for (i = length - sliceValue; i < length; i++) {
          let j = length - sliceValue;
          tableView
            ? tableElement.children[j].remove()
            : mainContainer.children[j].remove();
        }
      }
    }
  }
});

function appendData(data) {
  data.forEach((data, i) => {
    let html = tableView ? createTableItem(data, i) : createCardItem(data, i);
    tableView
      ? tableElement.appendChild(html)
      : mainContainer.appendChild(html);
  });
}
function prependData(data) {
  data.forEach((data, i) => {
    let html = tableView ? createTableItem(data, i) : createCardItem(data, i);
    tableView
      ? tableElement.insertBefore(html, tableElement.childNodes[1])
      : mainContainer.insertBefore(html, mainContainer.childNodes[0]);
  });
}
function createCardItem(data, i) {
  let div = document.createElement("div");
  div.className = "card";
  div.id = i;
  let image = document.createElement("div");
  image.className = "image";
  image.style.backgroundImage = `url(${data.image})`;
  let title = document.createElement("h3");
  title.innerHTML = `${data.name}`;
  let discription = document.createElement("p");
  discription.className = "description";
  discription.innerHTML = `${data.description}`;
  div.appendChild(image);
  div.appendChild(title);
  div.appendChild(discription);
  return div;
}

function createTableItem(data, i) {
  let row = document.createElement("tr");
  let imageData = document.createElement("td");
  imageData.className="table-data-image"
  let imageDiv = document.createElement("div");
  imageDiv.className = "table-image";
  imageDiv.style.backgroundImage = `url(${data.image})`;
  imageData.appendChild(imageDiv);
  let title = document.createElement("td");
  title.className = "table-data-title";
  title.innerHTML = `${data.name}`;
  let discription = document.createElement("td");
  discription.innerHTML = `${data.description}`;
  row.appendChild(imageData);
  row.appendChild(title);
  row.appendChild(discription);
  return row;
}

function toggleAction() {
  if (toggleButton.checked) {
    tableView = toggleButton.checked;
    document.getElementById(
      "viewType"
    ).innerHTML = `<svg class="toggle-icon" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 404.82 394.05"><g id="kb2EsJ"><path d="M325.45,459.24H217.68q-25,0-25-24.69,0-34.68,0-69.35c0-14.25,8.72-23.18,22.91-23.2q110.27-.11,220.53,0c13.6,0,22.64,8.89,22.73,22.44q.24,36.17,0,72.34c-.08,13.76-9.13,22.45-23.2,22.47Q380.57,459.31,325.45,459.24ZM214.23,363.71v73.7h223v-73.7Z" transform="translate(-54.2 -65.23)"/><path d="M325.62,182.28q-54.14,0-108.26,0c-16.64,0-24.62-8.07-24.63-24.86q0-34.42,0-68.85c0-14.6,8.67-23.29,23.24-23.3q110,0,220,0c13.92,0,22.85,8.73,22.93,22.65q.18,35.67,0,71.35c-.05,14.33-8.72,23-23.05,23Q380.76,182.35,325.62,182.28ZM437.2,160.81V86.86H214.31v74Z" transform="translate(-54.2 -65.23)"/><path d="M325.76,203.74q54.39,0,108.77,0c16.2,0,24.44,8.28,24.46,24.63q0,34.17,0,68.35c0,15.53-8.57,24-24.11,24h-218c-15.68,0-24.06-8.35-24.07-23.95q0-34.92,0-69.85c0-14.62,8.59-23.22,23.28-23.24q54.88-.06,109.76,0Zm111.43,21.5H213.94v5.15c0,21,.18,41.89-.08,62.83-.06,4.89,1,6.44,6.23,6.42q105.72-.27,211.44-.09h5.66Z" transform="translate(-54.2 -65.23)"/><path d="M112.76,459.24c-11.63,0-23.27,0-34.91,0-14.87-.07-23.54-8.71-23.58-23.59q-.1-34.9,0-69.82c0-15.1,8.77-23.85,23.87-23.87q34.91-.06,69.82,0c14.89,0,23.54,8.68,23.59,23.58q.11,34.9,0,69.81c0,15.09-8.8,23.84-23.88,23.9-11.63,0-23.27,0-34.91,0Zm37-21.72V363.84H76.06v73.68Z" transform="translate(-54.2 -65.23)"/><path d="M112.9,182.28c-12,0-23.94.06-35.9,0-14-.1-22.66-8.72-22.72-22.78q-.15-35.65,0-71.32c.07-14.24,8.9-22.87,23.19-22.89q35.67-.06,71.32,0c13.62,0,22.6,8.74,22.69,22.37q.24,36.17,0,72.32c-.08,13.62-9,22.19-22.7,22.34-6,.06-12,0-17.95,0ZM76,160.78h73.77V86.92H76Z" transform="translate(-54.2 -65.23)"/><path d="M112.88,203.74c12,0,23.94-.07,35.9,0,14,.1,22.65,8.75,22.71,22.8q.16,35.65,0,71.31c-.06,14.19-9,22.87-23.2,22.89q-35.4,0-70.81,0c-14.27,0-23.14-8.68-23.2-22.89q-.15-35.66,0-71.31c.06-14.07,8.72-22.7,22.7-22.8C89,203.67,100.91,203.74,112.88,203.74ZM75.94,299.2h73.8V225.32H75.94Z" transform="translate(-54.2 -65.23)"/></g></svg>`;
    html = "";
    mainContainer.innerHTML = html;
    mainContainer.className = "table";
    let Table = createTableHead();
    mainContainer.appendChild(Table);
    tableElement = document.getElementById("table");
    document.getElementById("myInput").value = "";
    appendData(data);
  } else {
    tableView = toggleButton.checked;
    document.getElementById(
      "viewType"
    ).innerHTML = `<svg class="toggle-icon" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382 382"><path d="M226.29,65H79.15A14.19,14.19,0,0,0,65,79.15V226.29a14.19,14.19,0,0,0,14.15,14.15H226.29a14.19,14.19,0,0,0,14.15-14.15V79.15A14.19,14.19,0,0,0,226.29,65ZM212.14,212.14H93.3V93.3H212.14Z" transform="translate(-65 -65)"/><path d="M432.85,65H285.71a14.19,14.19,0,0,0-14.15,14.15V226.29a14.19,14.19,0,0,0,14.15,14.15H432.85A14.19,14.19,0,0,0,447,226.29V79.15A14.19,14.19,0,0,0,432.85,65ZM418.7,212.14H299.86V93.3H418.7Z" transform="translate(-65 -65)"/><path d="M226.29,271.56H79.15A14.19,14.19,0,0,0,65,285.71V432.85A14.19,14.19,0,0,0,79.15,447H226.29a14.19,14.19,0,0,0,14.15-14.15V285.71A14.19,14.19,0,0,0,226.29,271.56ZM212.14,418.7H93.3V299.86H212.14Z" transform="translate(-65 -65)"/><path d="M432.85,271.56H285.71a14.19,14.19,0,0,0-14.15,14.15V432.85A14.19,14.19,0,0,0,285.71,447H432.85A14.19,14.19,0,0,0,447,432.85V285.71A14.19,14.19,0,0,0,432.85,271.56ZM418.7,418.7H299.86V299.86H418.7Z" transform="translate(-65 -65)"/></svg>`;
    document.getElementById("myInput").value = "";
    html = "";
    mainContainer.innerHTML = html;
    mainContainer.className = "grid";
    appendData(data);
  }
}

function createTableHead() {
  let table = document.createElement("table");
  table.id = "table";
  let head = document.createElement("tr");
  let image = document.createElement("th");
  image.innerHTML = "Image";
  let title = document.createElement("th");
  head.setAttribute("onclick", "sortTable()");
  title.innerHTML = `<div class="titleHeader">Title<i id="sortIcon" class="sort-by-default"></i></div>`;
  let description = document.createElement("th");
  description.innerHTML = "Description";
  head.appendChild(image);
  head.appendChild(title);
  head.appendChild(description);
  table.appendChild(head);
  return table;
}

function sortTable() {
  let sortData;
  if (sort !== 0) {
    sortData = data.slice().sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
      const moveSmaller = sort === 2 ? 1 : -1;

      const moveLarger = sort === 2 ? -1 : 1;

      if (fa < fb) {
        return moveSmaller;
      }
      if (fa > fb) {
        return moveLarger;
      }
      return 0;
    });
  } else {
    sortData = data;
  }
  html = "";
  mainContainer.innerHTML = html;
  mainContainer.className = "table";
  let Table = createTableHead();
  mainContainer.appendChild(Table);
  tableElement = document.getElementById("table");
  document.getElementById("myInput").value = "";
  appendData(sortData);

  if (sort === 0) {
    //Default
    sort = 1;
    let icon = document.getElementById("sortIcon");
    icon.className = "sort-by-default";
  } else if (sort === 1) {
    //ASC
    sort = 2;
    let icon = document.getElementById("sortIcon");
    icon.className = "sort-by-asc";
  } else if (sort === 2) {
    //DESC
    sort = 0;
    let icon = document.getElementById("sortIcon");
    icon.className = "sort-by-desc";
  }
}

function handleSearchChange() {
  searchValue = document.getElementById("myInput").value;
  if (searchValue.length > 0) {
    searchData = data.filter((data) => {
      return data.name
        .trim()
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase());
    });
    html = "";
    mainContainer.innerHTML = html;
    if (tableView) {
      mainContainer.className = "table";
      let Table = createTableHead();
      mainContainer.appendChild(Table);
      tableElement = document.getElementById("table");
    }
    if (searchData.length > 0) {
      appendData(searchData);
    } else {
      addNoData();
    }
  } else {
    html = "";
    appendData(data);
  }
}
function addNoData() {
  let html = "";
  html = `<div class="not-found"><svg class="not-found-img" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490"><defs><style>.cls-1,.cls-2{fill:#5eaaa8;}.cls-1{opacity:0.2;}.cls-3{fill:#e84545;}</style></defs><circle class="cls-1" cx="245" cy="245" r="245"/><path class="cls-2" d="M232,80h16V96H232Z" transform="translate(-11 -11)"/><path class="cls-2" d="M264,80h16V96H264Z" transform="translate(-11 -11)"/><path class="cls-3" d="M256,128a16,16,0,0,1,16,16h16a32,32,0,0,0-64,0h16A16,16,0,0,1,256,128Z" transform="translate(-11 -11)"/><path class="cls-2" d="M320,16H192V72a32,32,0,0,0,0,64v40H320V136a32,32,0,0,0,0-64ZM208,32h96V48H208Zm-32,72a16,16,0,0,1,16-16v32A16,16,0,0,1,176,104Zm160,0a16,16,0,0,1-16,16V88A16,16,0,0,1,336,104Zm-32,56H208V64h96Z" transform="translate(-11 -11)"/><path class="cls-2" d="M366.86,387.88a8,8,0,0,0-3.89-3.31l-35-14V267.31l6.76-6.75,42.58,63.88a8,8,0,0,0,5.31,3.44A7.61,7.61,0,0,0,384,328a8,8,0,0,0,4.8-1.6L450.66,280H464a24,24,0,0,0,0-48H432a8,8,0,0,0-5,1.75L393.82,260.3l-27.16-40.74a16,16,0,0,0-2.35-2.23,12.27,12.27,0,0,0-1.16-.68l-56-24A7.93,7.93,0,0,0,304,192H208a7.93,7.93,0,0,0-3.15.65l-56,24a12.27,12.27,0,0,0-1.16.68,16,16,0,0,0-2.35,2.23L118.18,260.3,85,233.75A8,8,0,0,0,80,232H48a24,24,0,0,0,0,48H61.34l61.86,46.4A8,8,0,0,0,128,328a7.61,7.61,0,0,0,1.35-.12,8,8,0,0,0,5.31-3.44l42.58-63.88,6.76,6.75V370.58l-35,14a8,8,0,0,0-3.89,3.31l-24.3,40.54a25.16,25.16,0,0,0,10.21,34.09c.45.24.91.47,1.37.69a20,20,0,0,0,8.87,2.11,30.64,30.64,0,0,0,22.78-13.07A87.66,87.66,0,0,0,172.7,440H184v48a8,8,0,0,0,8,8H320a8,8,0,0,0,8-8V440h11.3a87.28,87.28,0,0,0,8.63,12.2,30.64,30.64,0,0,0,22.78,13.07,20,20,0,0,0,8.87-2.11,25.28,25.28,0,0,0,12.13-33.62c-.26-.56-.55-1.12-.85-1.66Zm23.92-108a8,8,0,0,0,6.22-1.66L434.81,248H464a8,8,0,0,1,0,16H448a8,8,0,0,0-4.8,1.6L386,308.52,346.3,249l12.46-12.47,26.58,39.89a8,8,0,0,0,5.44,3.46ZM273.06,208,256,233.6,238.94,208ZM126,308.52,68.8,265.6A8,8,0,0,0,64,264H48a8,8,0,0,1,0-16H77.19L115,278.25A8,8,0,0,0,126.24,277c.15-.18.29-.37.42-.56l26.58-39.89L165.7,249Zm40-81.82L209.64,208h10.08l29.6,44.44a8,8,0,0,0,13.31,0L292.28,208H302.4L346,226.7l-27,27-18.54-12.36-8.88,13.32L312,268.28V368H200V268.28l20.44-13.6-8.88-13.31L193,253.73Zm-26.4,222.14a9,9,0,0,1-4.72-12.72l22.57-37.72L193.54,384H216v24a16,16,0,0,1-16,16H182.94l7.72-11.56-13.32-8.88s-31.83,48.25-37.76,45.28ZM200,440a32,32,0,0,0,32-32V384h16v96H200Zm112,40H264V384h16v24a32,32,0,0,0,32,32Zm60.42-31.2c-6.24,3.05-37.76-45.28-37.76-45.28l-13.32,8.88,7.72,11.6H312a16,16,0,0,1-16-16V384h22.46l36.07,14.4,22.31,37.14a9.19,9.19,0,0,1-3,12.62,9.7,9.7,0,0,1-1.37.68Z" transform="translate(-11 -11)"/><path class="cls-2" d="M472,332.69l-10.34-10.35-11.32,11.32,16,16a8,8,0,0,0,11.32,0l16-16-11.32-11.32Z" transform="translate(-11 -11)"/><path class="cls-2" d="M128,184a8,8,0,0,0,5.66-2.34l16-16-11.32-11.32L128,164.69l-10.34-10.35-11.32,11.32,16,16A8,8,0,0,0,128,184Z" transform="translate(-11 -11)"/><path class="cls-2" d="M77.66,205.66l16-16L82.34,178.34,72,188.69,61.66,178.34,50.34,189.66l16,16A8,8,0,0,0,77.66,205.66Z" transform="translate(-11 -11)"/><path class="cls-3" d="M464,368a62.27,62.27,0,0,1-5.47,28.18c-12.18-19.25-25.27-22-32.25-21.5a23.79,23.79,0,0,0-21.06,15.15,22.09,22.09,0,0,0,5.12,23.83,40.16,40.16,0,0,0,42.35,8.88,11.87,11.87,0,0,1-1.51,8.8c-6.52,9.38-31.32,9.93-42.31,8.72L407.12,456a112.81,112.81,0,0,0,11.91.59c13.87,0,35.71-2.35,45.27-16.06a29.83,29.83,0,0,0,2.3-27.9c7.16-8.12,13.4-21.76,13.4-44.6Zm-42.34,34.34a5.93,5.93,0,0,1-1.51-6.73,7.78,7.78,0,0,1,6.89-4.95h.42c6.14,0,13.17,6.24,19.31,17a24.08,24.08,0,0,1-25.11-5.35Z" transform="translate(-11 -11)"/><path class="cls-2" d="M248,272h16v16H248Z" transform="translate(-11 -11)"/><path class="cls-2" d="M248,304h16v16H248Z" transform="translate(-11 -11)"/><path class="cls-2" d="M248,336h16v16H248Z" transform="translate(-11 -11)"/></svg><h1 class="not-found-text">Search Not Found!</h1></div>`;
  mainContainer.innerHTML = html;
}
