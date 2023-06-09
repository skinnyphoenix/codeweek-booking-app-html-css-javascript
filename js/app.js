import { GET } from "./http.js";

const qS = (el) => document.querySelector(el);
const cE = (el) => document.createElement(el);

const wrapperEl = qS("#wrapper");
const wrapperPendingResEl = qS(".wrapperPendingRes");
const wrapperCompletedResEl = qS(".wrapperCompletedRes");
const searchInputEl = qS(".searchInput");
const pendingButton = qS(".pendingBtn");
const completedButton = qS(".completedBtn");
const searchInfoDivEl = qS(".searchInfoDiv");
const allReservations = [];

const createRes = (list) => {
  const wrapRes = cE("ul");
  wrapRes.className = "wrapResEl";

  list.forEach((el) => {
    const resText = cE("li");
    resText.className = "resTextEl";
    resText.textContent = el.title;
    wrapRes.appendChild(resText);
    resText.addEventListener("click", () => {
      resText.style.textDecoration = "line-through";
    });
    resText.addEventListener("dblclick", () => {
      wrapRes.removeChild(resText);
    });
  });

  return wrapRes;
};

const renderingReservation = () => {
  GET(`/todos`)
    .then((data) => {
      data.forEach((el) => allReservations.push(el));
    })
    .then(() => {
      const pendingList = allReservations.filter((reservation) => reservation.completed === false);
      wrapperPendingResEl.appendChild(createRes(pendingList));
      const completedList = allReservations.filter((reservation) => reservation.completed === true);
      wrapperCompletedResEl.appendChild(createRes(completedList));
    });
};
renderingReservation();
