
class Student {
  constructor(id, name, gpa, courses) {
    this.id = id;
    this.name = name;
    this.gpa = gpa;
    this.courses = courses;
  }
  toString() {
    return "Sutdnet ID: "+this.id;
  }
}

class Course {
  constructor(name, time, date, rooms) {
    this.name = name;
    this.time = time
    this.date = date
    this.rooms = rooms;
  }
  toString() {
    return "Coruse name: "+this.name
  }
}



