const grid = new gridjs.Grid({
  fixedHeader: true,
  search: true,
  sort: true,
  resizable: true,
  pagination: {
    limit: 5,
  },
  style: {
    th: {
      "background-color": "#512da8",
      color: "white",
      "text-align": "center",
    },
    td: {
      "text-align": "center",
    },
  },
  columns: [
    "Id",
    "Title",
    "Price",
    "Category",
    {
      name: "Photo",
      formatter: (cell) =>
        gridjs.html(
          `<img src="${cell}" alt="photo" width="50" height="50" style="cursor: pointer;" onclick="showModal('${cell}')">`
        ),
    },
  ],
  server: {
    url: "https://fakestoreapi.com/products",
    then: (data) => {
      return data.map((item) => [
        item.id,
        item.title,
        item.price,
        item.category,
        item.image,
      ]);
    },
  },
}).render(document.getElementById("wrapper"));

// Modal logic
function showModal(src) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImage");

  modal.style.display = "block";
  modalImg.src = src;

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Add event listener for closing the modal with Esc or Enter key
  document.onkeydown = function (event) {
    if (event.key === "Escape" || event.key === "Enter") {
      span.click();
    }
  };
}

// Close the modal when clicking outside of the image
window.onclick = function (event) {
  var modal = document.getElementById("imageModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
