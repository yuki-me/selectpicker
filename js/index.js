let listItems = [
  { key: "1", value: "Apple" },
  { key: "2", value: "Banana" },
  { key: "3", value: "Cherry" },
  { key: "4", value: "Date" },
  { key: "5", value: "Elderberry" },
  { key: "6", value: "Fig" },
  { key: "7", value: "Grape" },
  { key: "8", value: "Honeydew Honeydew Honeydew Honeydew Honeydew Honeydew" },
];
let isShow = false;
let clickCount = 0;

$(document).ready(function () {
  //   $("#searchInput").on("focus", function () {
  //     $("#dropdownList").addClass("show");
  //     clickCount++;
  //   });
  onLoad(listItems);

  $("#searchInput").on("click", function () {
    $("#dropdownList").addClass("show");
    $(".input-style").focus();
    clickCount++;
  });

  // $("#searchInput span").on("click", function () {
  //   $("#dropdownList").addClass("show");
  //   clickCount++;
  // });

  $(window).click(function (e) {
    console.log($(e.target).closest(".search-click"));
    if (
      e.target.className.includes("list-items") ||
      e.target.className.includes("input-style") ||
      (e.target.className.includes("search-click") && clickCount < 2) ||
      ($(e.target).closest(".search-click").length > 0 && clickCount < 2) ||
      $(e.target).closest(".list-items").length > 0
    ) {
      let target = e.target;
      let text = $(target).closest(".list-items").find("span").text();
      if (text !== "") {
        $("#searchInput").find(".text").text(text);
        clickCount = 0;
        $(".isActive").removeClass("isActive");
        $("#dropdownList").removeClass("show");
      }
    } else {
      clickCount = 0;
      $(".isActive").removeClass("isActive");
      $("#dropdownList").removeClass("show");
    }
  });

  $("#search").on("keyup", function (e) {
    //38 key up
    //40 key down
    let isActive = $(".isActive").length;
    let items = $(".list-items");
    if (e.keyCode === 38) {
      let result = isActive !== 0 ? findActiveIndex(items, "up") : items.length;
      $(items).removeClass("isActive");
      $(items[result !== 0 ? result - 1 : items.length - 1]).addClass(
        "isActive"
      );
    } else if (e.keyCode === 40) {
      let result = isActive !== 0 ? findActiveIndex(items, "down") : -1;
      $(items).removeClass("isActive");
      $(items[result !== items.length - 1 ? result + 1 : 0]).addClass(
        "isActive"
      );
    } else if (e.keyCode === 13) {
      let text = $(".isActive").find("span").text();
      if (text !== "" && text !== undefined) {
        $("#searchInput").find(".text").text(text);
        clickCount = 0;
        $(".isActive").removeClass("isActive");
        $("#dropdownList").removeClass("show");
      }
    } else {
      filterFunction();
    }
  });

  // Filter function
  function filterFunction() {
    let input = $("#search").val().toLowerCase();
    let result =
      listItems.length > 0
        ? listItems.filter(function (item) {
            if (item.value.toLowerCase().includes(input)) {
              return item;
            }
          })
        : [];
    onLoad(result);
  }

  function onLoad(data) {
    let length = data.length > 10 ? 10 : data.length;
    $(".list-items").remove();
    for (let i = 0; i < length; i++) {
      $("#dropdownList").append(
        $(
          `<div class="list-items"
                title="${data[i].value}"
                data-value="${data[i].key}">
                    <span>${data[i].value}</span>
            </div>`
        )
      );
    }
  }

  function findActiveIndex(data, type) {
    let index = 0;
    for (let i = 0; i < data.length; i++) {
      if ($(data[i]).hasClass("isActive")) {
        index = i;
      }
    }
    return index;
  }
});
