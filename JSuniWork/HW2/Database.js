"use strict";
const url = "https://maeyler.github.io/JS/data/";


class Student {
  constructor(id, name, gpa) {
    this.id = id;
    this.name = name;
    this.gpa = gpa;
    this.courses = []
    this.letter = this.getLetter(this.gpa);
  }
  // One more query of your choice
  getLetter(gpa) {
    //https://stackoverflow.com/questions/6665997/switch-statement-for-greater-than-less-than
    if (gpa > 3.5) {
      return "AA"
    }
    if (gpa > 3) {
      return "BA"
    }
    if (gpa > 2.5) {
      return "BB"
    }
    if (gpa > 2) {
      return "CB"
    }
    if (gpa > 1.5) {
      return "CC"
    }

    return "FF"


  }
  addCourses(...course) {
    for (let c of course) this.courses.push(c)
    return this
  }
  toString() {
    return "Sutdnet ID: " + this.id;
  }
}

class Course {

  constructor(name, time, date) {
    this.name = name
    this.time = time
    this.date = date
    this.rooms = []
  }
  addRooms(...room) {
    for (let r of room) this.rooms.push(r)
    return this
  }

  toString() {
    return "Coruse name: " + this.name + "\n" + this.time
  }
}



function report(value) {
  console.log(value);


}

class DataBase {

  constructor() {
    this.stumap = new Map();
    this.crseMap = new Map();
  }
  // A random student
  getRandomStudent() {
    // let i = Math.trunc(this.stumap.size * Math.random());
    // console.log(this.stumap.get(i));
    // return this.stumap.get(i);
    let keys = Array.from(this.stumap.keys());
    return keys[Math.floor(Math.random() * keys.length)];
  }
  // Number of students above a given GPA
  getAboveGPA(num = 0) {
    let st = new Set()
    for (let s of this.stumap.values())
      if (s.gpa > num) st.add(s);
    return st
  }
  // Courses taken by a given student
  getStudentCourse(gid) {
    let s = this.getStudent(gid);
    return s.courses;

  }
  // Exam schedule for a given student
  examStudent(gid) {
    let s = this.getStudent(gid);
    let st = new Set()
    s.courses.forEach(course => {
      course.forEach(name => {
        for (let c of this.crseMap.values())
          if (c.name == name) st.add(c);
      });

    });

    return st

  }
  // Student list taking a given course
  getStudentByCourse(courseName) {
    let st = new Set()
    for (let s of this.stumap.values()) {
      s.courses.forEach(courses => {
        courses.forEach(name => {
          if (courseName == name) {
            st.add(s);
          }
        });
      });
    }
    return st
  }
  // Course list for a given exam room
  roomCourse(examRoom) {
    let st = new Set()
    for (let c of this.crseMap.values()) {
      c.rooms.forEach(rooms => {
        rooms.forEach(room => {
          if (examRoom == room) {
            st.add(c);
          }
        });
      });
    }
    return st
  }
  // Total number of courses in a given room --> deleted
  roomCoursesNumber(examRoom) {
    let st = this.roomCourse(examRoom)
    return st.size;
  }

  getStudent(gid) {
    for (let s of this.stumap.values())
      if (s.id == gid) return s;

    return 0;
  }


}

let db = new DataBase()



function parseCourse(line) {
  let b = line.split("\t");
  let name = b[0], time = b[1], date = b[2];
  let rooms = [];
  for (let i = 3; i < b.length; i++)
    rooms.push(b[i]);
  let c = new Course(name, time, date)
  c.addRooms(rooms);
  return c;
}

function parseStudent(line) {
  let b = line.split("\t");
  let id = b[0], name = b[1], gpa = b[2];
  let list = [];
  for (let i = 3; i < b.length; i++)
    list.push(b[i]);
  let s = new Student(id, name, gpa)
  s.addCourses(list);
  return s;
}
function addStudents(txt) {

  let msg = txt.length + " chars, ";
  let a = txt.split("\n");
  msg += a.length + " lines, ";
  for (let l of a) {
    let s = parseStudent(l)
    db.stumap.set(s.id, s);

  }

}
function addCourses(txt) {

  let msg = txt.length + " chars, ";
  let a = txt.split("\n");
  msg += a.length + " lines, ";
  for (let i = 0; a.length > i; i++) {
    db.crseMap.set(i, parseCourse(a[i]));

  }

}

function readStudent(file) {
  console.log("readData " + file);
  let a = fetch(url + file)
    .then(r => r.text())
    .then(addStudents);

}
function readCourses(file) {
  console.log("readData " + file);
  let a = fetch(url + file)
    .then(r => r.text())
    .then(addCourses);
  console.log(a)

}
function readData() {

  readStudent("Students.txt");
  readCourses("Courses.txt");


}
readData();



