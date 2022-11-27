
// CURRENT DATE | YYYY-MM-DD
let date = new Date();
let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();
let today = {year: y, month: m+1, day: d};
// CURRENT DATE | YYYY-MM-DD

export const GLOBAL = {
    // API | BACKEND
    url: 'http://localhost:4200/api/',
    TODAY: today
}