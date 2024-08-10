// Get  to DOM elements
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  icon = document.querySelector("#icon");
  icon2 = document.querySelector("#icon2");
  optionImages = document.querySelectorAll(".option_image");
  elevator = document.querySelector(".elevator");
  enterButton = document.getElementById("enterButton");
  closeButton = document.getElementById("closeButton");
  title = document.querySelector(".title");
  snikt = new Audio('snikt.mp3');
  pistol = new Audio('pistol.mp3');
  ding = new Audio('ding.mp3');
  btn = new Audio('btn.mp3');
  
// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");
    btn.play();
    userResult.src  = "images/rock.png";
    cpuResult.src = "images/rock2.png";
    result.textContent = "Hold On...";
    result.style.color = "#8B8B8B";
    result.style.webkitTextStroke = "1.5px black";
    icon.src = "images/wol1.png";
    icon2.src = "images/dea1.png";
    // Loop through each option image again
    optionImages.forEach((image2, index2) => {
      // If the current index doesn't match the clicked index
      // Remove the "active" class from the other option images
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      // Get the source of the clicked option image
      let imageSrc = e.target.querySelector("img").src;
      // Set the user image to the clicked option image
      userResult.src = imageSrc;

      // Generate a random number between 0 and 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Create an array of CPU image options
      let cpuImages = ["images/rock2.png", "images/paper2.png", "images/scissors2.png"];
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      let userValue = ["R", "P", "S"][index];

      // Create an object with all possible outcomes
      let outcomes = {
        RR: "Draw",
        RP: "Cpu",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "Cpu",
        SS: "Draw",
        SR: "Cpu",
        SP: "User",
      };
      
      // Look up the outcome value based on user and CPU options
      let outComeValue = outcomes[userValue + cpuValue];

      // Display the result
      if (userValue === cpuValue) {
      result.innerHTML = '<span style="color:#F5D601;-webkit-text-stroke: 1px #01538D;">Match</span> <span style="color:#B70000;-webkit-text-stroke: 1px #343339;">Draw</span>';
      } else if (outComeValue === "User") {
      result.textContent = "Wolverine Wins!!";
      result.style.color = "#F5D601";
      result.style.webkitTextStroke = "1.5px #01538D";
      } else {
      result.textContent = "Deadpool Wins!!";
      result.style.color = "#B70000";
      result.style.webkitTextStroke = "1.5px #343339";
      }
      
      // Set another timeout to delay the display of fight images
      setTimeout(() => {
      if (outComeValue === "User") {
      userResult.src = "images/fight.png";
      cpuResult.src = "images/flag2.png";
      icon.src = "images/wol2.png";
      icon2.src = "images/dea3.png";
      snikt.play();
      snikt.volume = 0.2;
      } else if(outComeValue === "Cpu") {
      cpuResult.src = "images/fight2.png";
      userResult.src = "images/flag.png";
      icon.src = "images/wol4.png";
      icon2.src = "images/dea2.png";
      pistol.play();
      pistol.volume = 0.2;
      }else if (userValue === cpuValue) {
      userResult.src = "images/fight.png";
      cpuResult.src = "images/fight2.png";
      icon.src = "images/wol3.png";
      icon2.src = "images/dea2.png";
      pistol.play();
      snikt.play();
      pistol.volume = 0.2;
      snikt.volume = 0.2;
      }
      }, 1000); // Adjust the delay as needed (1000ms = 1 second)
      }, 2500);
  });
});

// Add a click event listener to the enter button
enterButton.addEventListener("click", () => {
    // Add the "open" class to the elevator to trigger the door animation
    elevator.classList.add("open");
    setTimeout(() => {
    closeButton.style.display ="block";
    ding.play();
    ding.volume = 0.2;
    },300);
    enterButton.style.display ="none";
    title.style.display ="none";
    icon.src = "images/wol1.png";
    icon2.src = "images/dea1.png";
    userResult.src  = "images/rock.png";
    cpuResult.src = "images/rock2.png";
    result.textContent = "Let's Play!!";
    result.style.color = "#8B8B8B";
    result.style.webkitTextStroke = "1.5px black";
    btn.play();
});

// Add a click event listener to the close button
closeButton.addEventListener("click", () => {
    // Remove the "open" class from the elevator to close the doors
    elevator.classList.remove("open");
    closeButton.style.display ="none";
    setTimeout(() => {
    enterButton.style.display ="block";
    title.style.display ="block";
    },1000);
    btn.play();
    btn.volume = 0.1;
});

 