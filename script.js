document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let applicant = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        dob: document.getElementById("dob").value,
        phone: document.getElementById("phone").value,
        gender: document.getElementById("gender").value,
        faculty: document.getElementById("faculty").value,
        facebook: document.getElementById("facebook").value,
        nickname: document.getElementById("nickname").value,
        department: document.getElementById("department").value,
        specificQuestion: document.getElementById("specificQuestion").value
    };
    
    let applicants = JSON.parse(localStorage.getItem("applicants")) || [];
    applicants.push(applicant);
    localStorage.setItem("applicants", JSON.stringify(applicants));
    alert("Đăng ký thành công!");
    window.location.href = "interview.html";
});

// Hiển thị danh sách ứng viên trên interview.html
if (document.getElementById("applicantList")) {
    let applicants = JSON.parse(localStorage.getItem("applicants")) || [];
    let listContainer = document.getElementById("applicantList");
    applicants.forEach(applicant => {
        let row = `<tr>
            <td>${applicant.name}</td>
            <td>${applicant.email}</td>
            <td>${applicant.dob}</td>
            <td>${applicant.phone}</td>
            <td>${applicant.gender}</td>
            <td>${applicant.faculty}</td>
            <td><a href="${applicant.facebook}" target="_blank">Facebook</a></td>
            <td>${applicant.nickname}</td>
            <td>${applicant.department}</td>
            <td>${applicant.specificQuestion}</td>
        </tr>`;
        listContainer.innerHTML += row;
    });
}
