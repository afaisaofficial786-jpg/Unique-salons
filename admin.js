// =========================
// UNIQUE SALONS ADMIN PANEL
// =========================
// =========================
// ADMIN LOGIN PROTECTION
// =========================

if (sessionStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}
const appointmentsList =
    document.getElementById("appointmentsList");


// Load all appointments
function loadAppointments() {

    let bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

    appointmentsList.innerHTML = "";


    // No appointments
    if (bookings.length === 0) {

        appointmentsList.innerHTML = `
            <div class="no-bookings">
                <h3>No Appointments Yet</h3>
                <p>Customer bookings will appear here.</p>
            </div>
        `;

        return;
    }


    // Show appointments
    bookings.forEach(function(booking, index) {

        const appointment =
            document.createElement("div");

        appointment.className = "appointment-card";


        appointment.innerHTML = `

            <div class="appointment-info">

                <h3>
                    ${booking.customerName}
                </h3>

                <p>
                    📱 Mobile: ${booking.mobile}
                </p>

                <p>
                    ✂️ Service: ${booking.service}
                </p>
<p>
    💰 Service Price:
    <strong>₹${booking.servicePrice || 0}</strong>
</p>
<p>
    📍 Visit Type:
    <strong>${booking.visitType || "Salon Visit"}</strong>
</p>

<p>
    🚗 Visit Price:
    <strong>₹${booking.visitPrice || 0}</strong>
</p>

<p>
    💵 Final Price:
    <strong>₹${booking.finalPrice || 0}</strong>
</p>
                <p>
                    📅 Date: ${booking.date}
                </p>

                <p>
                    ⏰ Time: ${booking.time}
                </p>

                <p>
                    📌 Status:
                    <strong>${booking.status}</strong>
                </p>
<p>💳 Payment: <strong>${booking.paymentMethod || "Not Selected"}</strong></p>
                <p>
                    💈 Assigned Barber:
                    <strong>${booking.barber}</strong>
                </p>

            </div>


            <div class="appointment-actions">

                <label>Choose Barber</label>

                <select
                    onchange="assignBarber(${index}, this.value)">

                    <option value="">
                        Select Barber
                    </option>

                    <option value="Barber 1">
                        Barber 1
                    </option>

                    <option value="Barber 2">
                        Barber 2
                    </option>

                    <option value="Barber 3">
                        Barber 3
                    </option>

                    <option value="Barber 4">
                        Barber 4
                    </option>

                    <option value="Barber 5">
                        Barber 5
                    </option>

                    <option value="Barber 6">
                        Barber 6
                    </option>

                </select>


                <button
                    class="confirm-appointment"
                    onclick="confirmBooking(${index})">

                    Confirm Appointment

                </button>


                <button
                    class="delete-appointment"
                    onclick="deleteBooking(${index})">

                    Delete

                </button>

            </div>

        `;


        appointmentsList.appendChild(appointment);

    });

}



// =========================
// ASSIGN BARBER
// =========================

function assignBarber(index, barber) {

    if (!barber) {
        return;
    }


    let bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];


    bookings[index].barber = barber;


    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );


    loadAppointments();

}



// =========================
// CONFIRM APPOINTMENT
// =========================

function confirmBooking(index) {

    let bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];


    bookings[index].status = "Confirmed";


    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );


    loadAppointments();

}



// =========================
// DELETE APPOINTMENT
// =========================

function deleteBooking(index) {

    let bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];


    if (confirm("Delete this appointment?")) {

        bookings.splice(index, 1);


        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );


        loadAppointments();

    }

}



// =========================
// LOAD APPOINTMENTS
// =========================

loadAppointments();
// =========================
// ADMIN LOGOUT
// =========================

function logoutAdmin() {

    sessionStorage.removeItem("adminLoggedIn");

    window.location.href = "admin-login.html";
}