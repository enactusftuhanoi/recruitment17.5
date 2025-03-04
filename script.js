document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("register.html")) {
        handleRegistration();
    } else if (window.location.pathname.includes("interview.html")) {
        checkAccess();
        loadApplicants();
    }
});

// Danh sách email được cấp quyền truy cập interview.html
const allowedEmails = ["admin@example.com", "hr@enactus.org", "tuhm@vief.edu.vn"];

function handleRegistration() {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();
        
        const applicant = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            department: document.getElementById("department").value
        };
        
        let applicants = JSON.parse(localStorage.getItem("applicants")) || [];
        applicants.push(applicant);
        localStorage.setItem("applicants", JSON.stringify(applicants));
        
        alert("Đăng ký thành công!");
        window.location.href = "index.html";
    });
}

function loadApplicants() {
    let applicants = JSON.parse(localStorage.getItem("applicants")) || [];
    let tableBody = document.getElementById("applicantList");
    tableBody.innerHTML = "";
    
    applicants.forEach(applicant => {
        let row = `<tr>
                    <td>${applicant.name}</td>
                    <td>${applicant.email}</td>
                    <td>${applicant.phone}</td>
                    <td>${applicant.department}</td>
                    <td><button onclick="viewDetails('${applicant.email}')">Xem</button></td>
                  </tr>`;
        tableBody.innerHTML += row;
    });
}

function checkAccess() {
    let email = prompt("Nhập email để truy cập:");
    if (!allowedEmails.includes(email)) {
        alert("Bạn không có quyền truy cập!");
        window.location.href = "index.html";
        return;
    }
    
    let verificationCode = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem("verificationCode", verificationCode);
    
    emailjs.send("service_kfg02yb", "service_kfg02yb", {
        to_email: email,
        verification_code: verificationCode
    }).then(
        function(response) {
            console.log("Email sent successfully!", response);
            let userCode = prompt("Nhập mã xác nhận:");
            if (userCode != localStorage.getItem("verificationCode")) {
                alert("Mã xác nhận không đúng!");
                window.location.href = "index.html";
            }
        },
        function(error) {
            console.log("Failed to send email", error);
            alert("Lỗi khi gửi email, vui lòng thử lại.");
        }
    );
}

function viewDetails(email) {
    alert("Chi tiết ứng viên: " + email);
}
