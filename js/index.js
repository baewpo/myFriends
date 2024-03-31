function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate friends inputs
function generateFriendsInputs(count) {
  const friendsInput = document.getElementById("friendsInput");
  for (let i = 0; i < count; i++) {
    const friendDiv = document.createElement("div");
    friendDiv.classList.add("friend-input");
    friendDiv.innerHTML = `
      <label for="friend${i + 1}">Friend ${i + 1}:</label>
      <input type="text" id="friendName${i + 1}" placeholder="Enter friend's nickname">
      <input type="number" id="friendAge${i + 1}" placeholder="Enter friend's age">
    `;
    friendsInput.appendChild(friendDiv);
  }
}

// Function to check if all friends' names are provided
function checkFriendNames() {
  const friendCount = parseInt(
    document.getElementById("friendCount").innerText
  );
  for (let i = 1; i <= friendCount; i++) {
    const friendName = document.getElementById(`friendName${i}`).value.trim();
    if (friendName === "") {
      return false;
    }
  }
  return true;
}

// Function to get friend's age
function getFriendAges() {
  const friendCount = parseInt(
    document.getElementById("friendCount").innerText
  );
  const ages = [];
  for (let i = 1; i <= friendCount; i++) {
    const friendAge = parseInt(
      document.getElementById(`friendAge${i}`).value.trim()
    );
    if (!isNaN(friendAge) && friendAge !== 0) {
      // Check if age is a valid number and not 0
      ages.push(friendAge);
    } else if (friendAge === 0) {
      // Alert if age is 0
      alert("Age cannot be 0. Please enter a valid age.");
      return false;
    } else {
      // Alert if age is not a valid number
      alert("Please enter a valid age for all friends.");
      return false;
    }
  }
  return ages;
}

// Function to calculate total age
function calculateTotalAge() {
  if (!checkFriendNames()) {
    alert("Please enter all friends' names.");
    return;
  }
  const ages = getFriendAges();
  if (!ages) {
    alert("Please enter valid ages for all friends.");
    return;
  }
  const totalAge = ages.reduce((acc, cur) => acc + cur, 0);
  document.getElementById("results").innerText = `Total Age: ${totalAge}`;
}

// Function to calculate average age
function calculateAverageAge() {
  if (!checkFriendNames()) {
    alert("Please enter all friends' names.");
    return;
  }
  const ages = getFriendAges();
  if (!ages) {
    alert("Please enter valid ages for all friends.");
    return;
  }
  const averageAge = ages.reduce((acc, cur) => acc + cur, 0) / ages.length;
  document.getElementById(
    "results"
  ).innerText = `Average Age: ${averageAge.toFixed(2)}`;
}

// Function to find youngest friend(s)
function findYoungestFriend() {
  if (!checkFriendNames()) {
    alert("Please enter all friends' names.");
    return;
  }
  const ages = getFriendAges();
  if (!ages) {
    alert("Please enter valid ages for all friends.");
    return;
  }
  const minAge = Math.min(...ages);
  const youngestFriends = [];
  ages.forEach((age, index) => {
    if (age === minAge) {
      const friendName = document.getElementById(
        `friendName${index + 1}`
      ).value;
      youngestFriends.push({ name: friendName, age: age });
    }
  });
  if (youngestFriends.length === 1) {
    document.getElementById(
      "results"
    ).innerText = `Youngest Friend: ${youngestFriends[0].name} (Age: ${youngestFriends[0].age})`;
  } else {
    let message = "Youngest Friends:";
    youngestFriends.forEach((friend) => {
      message += `\n${friend.name} (Age: ${friend.age})`;
    });
    document.getElementById("results").innerText = message;
  }
}

// Function to find oldest friend(s)
function findOldestFriend() {
  if (!checkFriendNames()) {
    alert("Please enter all friends' names.");
    return;
  }
  const ages = getFriendAges();
  if (!ages) {
    alert("Please enter valid ages for all friends.");
    return;
  }
  const maxAge = Math.max(...ages);
  const oldestFriends = [];
  ages.forEach((age, index) => {
    if (age === maxAge) {
      const friendName = document.getElementById(
        `friendName${index + 1}`
      ).value;
      oldestFriends.push({ name: friendName, age: age });
    }
  });
  if (oldestFriends.length === 1) {
    document.getElementById(
      "results"
    ).innerText = `Oldest Friend: ${oldestFriends[0].name} (Age: ${oldestFriends[0].age})`;
  } else {
    let message = "Oldest Friends:";
    oldestFriends.forEach((friend) => {
      message += `\n${friend.name} (Age: ${friend.age})`;
    });
    document.getElementById("results").innerText = message;
  }
}

function resetFriendInputs() {
  const friendCount = parseInt(document.getElementById("friendCount").innerText);
  const friendsInput = document.getElementById("friendsInput");
  friendsInput.innerHTML = ""; // Clear previous inputs
  generateFriendsInputs(friendCount); // Generate new friend inputs
}

// Function to reset page
function resetPage() {
  resetFriendInputs();
  document.getElementById("results").innerText = "";
}

// Function to reset friend inputs and generate new friends
function resetAndGenerateNewFriends() {
  const friendCount = getRandomInt(1, 9);
  document.getElementById("friendCount").innerText = friendCount;
  resetFriendInputs(); // Reset friend inputs
  document.getElementById("results").innerText = ""; // Clear previous results
}

// Initial setup
window.onload = resetAndGenerateNewFriends;
