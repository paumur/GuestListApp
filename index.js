let guestList = [];

const input = document.querySelector('input[name="guestFullName"]');

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "push":
        guestList.push(input.value);
        break;
      case "unshift":
        guestList.unshift(input.value);
        break;
      case "shift":
        guestList.shift();
        break;
      case "pop":
        guestList.pop();
        break;
      case "reverse":
        const reversedArray = guestList.reverse();
        guestList = reversedArray;
        break;
      case "removeFromTo":
        const removeFrom = Number(
          document.querySelector('input[name="removeFrom"]').value - 1
        );
        const removeTo = Number(
          document.querySelector('input[name="removeTo"]').value - 1
        );
        if (removeFrom >= 0 && removeTo >= 0) {
          guestList.splice(removeFrom, removeTo);
          updateGuestList();
        } else if (removeFrom >= 0 && removeTo <= 0) {
          guestList.splice(removeFrom, removeFrom);
          updateGuestList();
        }
        break;
      case "atCertainPoint":
        const insertAt =
          document.querySelector('input[name="certainPointInstertAt"]').value -
          1;
        const guestName = document.querySelector(
          'input[name="certainPointGuestName"]'
        ).value;
        guestList.splice(insertAt, 0, guestName);
        break;
      case "moveLastToFirst":
        guestList.unshift(guestList.pop());
        break;
      case "moveFirstToLast":
        guestList.push(guestList.shift());
        break;
    }
    updateGuestList();
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
  if (JSON.parse(window.localStorage.getItem("guestList"))) {
    const guestListData = JSON.parse(window.localStorage.getItem("guestList"));
    guestList = guestListData;
    updateGuestList();
  }
});
