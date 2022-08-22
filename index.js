let guestList = [];

const input = document.querySelector(
  "body > main > div.guest-management > div:nth-child(2) > input"
);

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.dataset.operator === "push") {
      guestList.push(input.value);
      updateGuestList();
    } else if (e.target.dataset.operator === "unshift") {
      guestList.unshift(input.value);
      updateGuestList();
    } else if (e.target.dataset.operator === "shift") {
      guestList.shift();
      updateGuestList();
    } else if (e.target.dataset.operator === "pop") {
      guestList.pop();
      updateGuestList();
    } else if (e.target.dataset.operator === "reverse") {
      const reversedArray = guestList.reverse();
      guestList = reversedArray;
      updateGuestList();
    } else if (e.target.dataset.operator === "removeFromTo") {
      const removeFrom = Number(
        document.querySelector(
          "body > main > div.guest-management > div.advanced-management > div:nth-child(2) > input:nth-child(1)"
        ).value - 1
      );
      const removeTo = Number(
        document.querySelector(
          "body > main > div.guest-management > div.advanced-management > div:nth-child(2) > input:nth-child(2)"
        ).value - 1
      );
      if (removeFrom >= 0 && removeTo >= 0) {
        guestList.splice(removeFrom, removeTo);
        updateGuestList();
      } else if (removeFrom >= 0 && removeTo <= 0) {
        guestList.splice(removeFrom, removeFrom);
        updateGuestList();
      }
    } else if (e.target.dataset.operator === "atCertainPoint") {
      const insertAt =
        document.querySelector(
          "body > main > div.guest-management > div.advanced-management > div:nth-child(4) > input:nth-child(2)"
        ).value - 1;
      console.log(insertAt);
      const guestName = document.querySelector(
        "body > main > div.guest-management > div.advanced-management > div:nth-child(4) > input:nth-child(1)"
      ).value;
      console.log(guestName);
      guestList.splice(insertAt, 0, guestName);
      updateGuestList();
    } else if (e.target.dataset.operator === "moveLastToFirst") {
      guestList.unshift(guestList.pop());
      updateGuestList();
    } else if (e.target.dataset.operator === "moveFirstToLast") {
      guestList.push(guestList.shift());
      updateGuestList();
    }
  });
});

function updateGuestList() {
  document.querySelector("body > main > div.guest-list > ol")
    ? document.querySelector("body > main > div.guest-list > ol").remove()
    : null;
  const guestListOl = document.createElement("ol");
  guestList.forEach((guest) => {
    const singleGuest = document.createElement("li");
    singleGuest.textContent = guest;
    guestListOl.appendChild(singleGuest);
  });

  document.querySelector(".guest-list").appendChild(guestListOl);
  window.localStorage.setItem("guestList", JSON.stringify(guestList));
}

window.addEventListener("load", () => {
  const guestListData = JSON.parse(window.localStorage.getItem("guestList"));
  console.log(guestListData);
  guestList = guestListData;
  updateGuestList();
});
