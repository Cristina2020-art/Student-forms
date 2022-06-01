"use strict";
// const vishal = document.querySelector("#roll-no");
// submit btn

const roll = document.querySelector("#roll-no");
const studentName = document.querySelector("#student-name");
const subject = document.querySelector("#subject");
const submitBtn = document
  .querySelector(".btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    // const roll = document.querySelector("#roll-no");
    // const studentName = document.querySelector("#student-name");
    // const subject = document.querySelector("#subject");
    var select = document.getElementById("store");
    var selectData = select.options[select.selectedIndex].text;
    let studentData = [];
    let allRollNumbers = [];
    allData().forEach((num) => {
      allRollNumbers.push(num.Roll);
    });
    // console.log(allRollNumbers);
    if (
      roll.value !== "" &&
      studentName.value !== "" &&
      subject.value !== "" &&
      !allRollNumbers.includes(roll.value)
    ) {
      var inputData = {
        Roll: roll.value,
        name: studentName.value,
        subjet: subject.value,
        storage: selectData,
      };
      if (inputData.storage === "localStorage") {
        let studentsLocal = JSON.parse(localStorage.getItem("student"));
        if (studentsLocal === null) {
          studentsLocal = [];
          studentsLocal.push(inputData);
          localStorage.setItem("student", JSON.stringify(studentsLocal));
        } else {
          studentsLocal.push(inputData);
          localStorage.setItem("student", JSON.stringify(studentsLocal));
        }
      } else if (inputData.storage === "SeasionStorage") {
        let studentsSession = JSON.parse(sessionStorage.getItem("student"));
        if (studentsSession === null) {
          studentsSession = [];
          studentsSession.push(inputData);
          sessionStorage.setItem("student", JSON.stringify(studentsSession));
        } else {
          studentsSession.push(inputData);
          sessionStorage.setItem("student", JSON.stringify(studentsSession));
        }
      } else {
        let studentsCookie = document.cookie;
        if (studentsCookie === "") {
          studentsCookie = [];
          studentsCookie.push(inputData);
          document.cookie = `student = ${JSON.stringify(studentsCookie)}`;
        } else {
          studentsCookie = studentsCookie.split("=");
          studentsCookie = JSON.parse(studentsCookie[1]);
          studentsCookie.push(inputData);
          document.cookie = `student = ${JSON.stringify(studentsCookie)}`;
        }
      }
    } else {
      alert("Please from fill properl and Check your RollNumber...!");
    }
    window.location.reload();
  });

const allData = function () {
  const localDataStorages = JSON.parse(localStorage.getItem("student")) || [];
  const secDataStoreages = JSON.parse(sessionStorage.getItem("student")) || [];
  const cookiesData = document.cookie;
  const cookiesDataSplit = cookiesData.split("=")[1];
  const jsonData = (cookiesDataSplit && JSON.parse(cookiesDataSplit)) || [];
  const localSecCookieData = [
    ...localDataStorages,
    ...secDataStoreages,
    ...jsonData,
  ];
  return localSecCookieData;
};
// console.log(allData());
// data rendring data function;;;;;;;
function showElem() {
  allData().map((itms) => {
    const textOnBrowser = document.querySelector(".all-txt");
    textOnBrowser.innerHTML += renderHTMLText(itms);
  });
}

const renderHTMLText = (detailObj) => {
  return `
  <div class="box">
          <p class="txt-roll">Roll - ${detailObj.Roll}</p>
          <p class="txt-name">Name - ${detailObj.name}</p>
          <p class="txt-subject">Course - ${detailObj.subjet}</p>
          <p class="txt-storage">Storage - ${detailObj.storage}</p>
          <div class="edit-delete-btn" id="edits">
              <button class="edit-btn" id="${detailObj.Roll}">edit</button>
              <button class="delete-btn" id="${detailObj.Roll}">Delete</button>
            </div>
        </div>
      </div>
  `;
};
showElem();


// edit btn
const editBtn = document.querySelectorAll(".edit-btn");
editBtn.forEach((allEditBtn) => {
  allEditBtn.addEventListener("click", function (e) {
      const removeDeleteBtn = document.querySelector(".delete-btn").remove()
    let localDataEdit = JSON.parse(localStorage.getItem("student"));
    let secDataEdit = JSON.parse(sessionStorage.getItem("student"));
    let cookieDataEdit = document.cookie;
    let splitOfCookieEdit =
      cookieDataEdit && JSON.parse(cookieDataEdit.split("=")[1]);
    const findIndex = allData().find((objEdit) => {
      return objEdit.Roll === e.target.id;
    });
    const typeEdit = findIndex.storage;
    roll.value = findIndex.Roll;
    studentName.value = findIndex.name;
    subject.value = findIndex.subjet;
    if (typeEdit === "localStorage") {
      const filteredLocalDataEdit = localDataEdit.filter((delEditItm) => {
        return delEditItm.Roll !== e.target.id;
      });
      localStorage.setItem("student", JSON.stringify(filteredLocalDataEdit));
    } else if (typeEdit === "SeasionStorage") {
      const filteredSecDataEdit = secDataEdit.filter((delSecEditItm) => {
        return delSecEditItm.Roll !== e.target.id;
      });
      sessionStorage.setItem("student", JSON.stringify(filteredSecDataEdit));
    } else {
      const filteredCookieDataEdit = splitOfCookieEdit.filter(
        (delCokieEditItm) => {
          return delCokieEditItm.Roll !== e.target.id;
        }
      );
      document.cookie = `student = ${JSON.stringify(filteredCookieDataEdit)}`;
    }
  });
});

// delete-btn from browser...!
const deleteBtn = document.querySelectorAll(".delete-btn");
deleteBtn.forEach((l) => {
  l.addEventListener("click", function (e) {
    console.log("i am clicked..!", e.target.id);
    let localData = JSON.parse(localStorage.getItem("student"));
    const vishal = sessionStorage.getItem("student");
    let secData = vishal && JSON.parse(vishal);
    let cookieData = document.cookie;
    let splitOfCookie = cookieData && JSON.parse(cookieData.split("=")[1]);
    const findIndex = allData().find((obj) => {
      return obj.Roll === e.target.id;
    });
    const type = findIndex.storage;
    if (type === "localStorage") {
      const filteredLocalData = localData.filter((delItm) => {
        return delItm.Roll !== e.target.id;
      });
      localStorage.setItem("student", JSON.stringify(filteredLocalData));
      window.location.reload();
    } else if (type === "SeasionStorage") {
      const filteredSecData = secData.filter((delSecItm) => {
        return delSecItm.Roll !== e.target.id;
      });
      sessionStorage.setItem("student", JSON.stringify(filteredSecData));
      window.location.reload();
    } else {
      const filteredCookieData = splitOfCookie.filter((delCokieItm) => {
        return delCokieItm.Roll !== e.target.id;
      });
      document.cookie = `student = ${JSON.stringify(filteredCookieData)}`;
      window.location.reload();
    }
  });
});
