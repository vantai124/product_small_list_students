function emailvalidate(email) {
  return /@gmail\.com$/.test(email);
}
function save() {
  let fullName = document.getElementById("Fullname").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let gender = "";
  if (document.getElementById("male").checked) {
    gender = document.getElementById("male").value;
  } else if (document.getElementById("famale").checked) {
    gender = document.getElementById("famale").value;
  }

  //////name
  if (fullName === "") {
    fullName = "";
    document.getElementById("fullname-error").innerHTML = "ten cua m dau";
  } else if (fullName.trim().length <= 2) {
    fullName = "";
    document.getElementById("fullname-error").innerHTML = "ten m co 2 chu a";
  } else {
    document.getElementById("fullname-error").innerHTML = "";
  }
  ///////email
  if (email === "") {
    email = "";
    document.getElementById("email-error").innerHTML = "email m dau";
  } else if (!emailvalidate(email)) {
    email = "";
    document.getElementById("email-error").innerHTML = "@.com  cua m dau";
  } else {
    document.getElementById("email-error").innerHTML = "";
  }
  //////phone
  if (phone === "") {
    phone = "";
    document.getElementById("phone-error").innerHTML = "nhap vo";
  } else if (phone.trim().length > 10) {
    phone = "";
    document.getElementById("phone-error").innerHTML = "sai r em ";
  } else {
    document.getElementById("phone-error").innerHTML = "";
  }
  /// address
  if (address === "") {
    address = "";
    document.getElementById("address-error").innerHTML =
      "vui long nhap dia chi";
  } else {
    document.getElementById("address-error").innerHTML = "";
  }
  //// gender
  if (gender === "") {
    gender = "";
    document.getElementById("gender-error").innerHTML = "vui long chon";
  } else {
    document.getElementById("gender-error").innerHTML = "";
  }

  if (fullName && email && phone && address && gender) {
    let students = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];
    students.push({
      fullName: fullName,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
    });
    localStorage.setItem("students", JSON.stringify(students));
    this.renderListStudents();
  }
}

function renderListStudents() {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];

  if (students.length === 0) {
    document.getElementById("list-student").style.display = "none";
    return false;
  }
  document.getElementById("list-student").style.display = "block";

  let tableContent = ` <tr>
    <td>#</td>
    <td>ho va ten</td>
    <td>email</td>
    <td>so dien thoai</td>
    <td>dia chi</td>
    <td>gioi tinh</td>
    <td>hanh dong</td>
  </tr>`;

  students.forEach((student, index) => {
    let studentID = index;
    let Gender = parseInt(student.gender) === 1 ? "nam" : "nu";
    index++;
    tableContent += `<tr>
  <td>${index}</td>
  <td>${student.fullName}</td>
  <td>${student.email}</td>
  <td>${student.phone}</td>
  <td>${student.address}</td>
  <td>${Gender}</td>
  <td>
<a href="#">edit</a> | <a href="#" onclick="deleStudent(${studentID})">delete</a> 
  </td>
  </tr>`;
  });
  document.getElementById("gird-view-students").innerHTML = tableContent;
}
function deleStudent(id) {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];

  students.splice(id, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderListStudents();
}
