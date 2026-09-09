const SALON_UPI_ID = "iamfaisal642@okicici";

// =========================
// UNIQUE SALONS BOOKING SYSTEM
// =========================


// =========================
// SERVICE & VISIT PRICE
// =========================

const serviceSelect =
    document.getElementById("service");

const servicePrice =
    document.getElementById("servicePrice");

const visitTypeSelect =
    document.getElementById("visitType");

const visitPriceElement =
    document.getElementById("visitPrice");

const finalPriceElement =
    document.getElementById("finalPrice");

const paymentMethodSelect =
    document.getElementById("paymentMethod");

const onlinePaymentBox =
    document.getElementById("onlinePaymentBox");

const upiQR =
    document.getElementById("upiQR");

const gpayButton =
    document.getElementById("gpayButton");


// =========================
// HOME VISIT CHARGE
// =========================

const HOME_VISIT_PRICE = 150;


// =========================
// GET CURRENT PRICES
// =========================

function getCurrentPrices() {

    let servicePriceValue = 0;
    let visitPriceValue = 0;

    // Service price
    if (serviceSelect) {

        const selectedOption =
            serviceSelect.options[
                serviceSelect.selectedIndex
            ];

        if (selectedOption) {

            servicePriceValue =
                Number(
                    selectedOption.getAttribute(
                        "data-price"
                    )
                ) || 0;
        }
    }

    // Visit price
    if (
        visitTypeSelect &&
        visitTypeSelect.value === "Home Visit"
    ) {

        visitPriceValue =
            HOME_VISIT_PRICE;
    }

    return {
        servicePriceValue,
        visitPriceValue,
        totalAmount:
            servicePriceValue +
            visitPriceValue
    };
}


// =========================
// UPDATE DISPLAYED PRICES
// =========================

function updatePrices() {

    const prices =
        getCurrentPrices();

    // Service Price
    if (servicePrice) {

        servicePrice.innerHTML =
            "Service Price: ₹" +
            prices.servicePriceValue;
    }

    // Visit Price
    if (visitPriceElement) {

        visitPriceElement.innerHTML =
            "Visit Price: ₹" +
            prices.visitPriceValue;
    }

    // Final Price
    if (finalPriceElement) {

        finalPriceElement.innerHTML =
            "Final Price: ₹" +
            prices.totalAmount;
    }
}


// =========================
// UPDATE UPI QR + GPAY
// =========================

function updateUPIPayment() {

    // Only show payment when UPI selected
    if (
        !paymentMethodSelect ||
        paymentMethodSelect.value !== "Pay Online (UPI)"
    ) {

        return;
    }

    const prices =
        getCurrentPrices();

    const totalAmount =
        prices.totalAmount;


    // Create UPI payment link
    const upiLink =
        "upi://pay?pa=" +
        encodeURIComponent(SALON_UPI_ID) +
        "&pn=" +
        encodeURIComponent("UNIQUE SALONS") +
        "&am=" +
        encodeURIComponent(totalAmount) +
        "&cu=INR";


    // Show online payment box
    if (onlinePaymentBox) {

        onlinePaymentBox.style.display =
            "block";
    }


    // Create QR Code
    if (upiQR) {

        upiQR.src =
            "https://quickchart.io/qr?text=" +
            encodeURIComponent(upiLink) +
            "&size=250";
    }


    // Google Pay / UPI button
    if (gpayButton) {

        gpayButton.href =
            upiLink;
    }
}


// =========================
// PAYMENT METHOD CHANGE
// =========================

if (paymentMethodSelect) {

    paymentMethodSelect.addEventListener(
        "change",
        function () {

            if (
                this.value === "Pay Online (UPI)"
            ) {

                updateUPIPayment();

            } else {

                if (onlinePaymentBox) {

                    onlinePaymentBox.style.display =
                        "none";
                }

                if (upiQR) {

                    upiQR.src = "";
                }

                if (gpayButton) {

                    gpayButton.href = "#";
                }
            }
        }
    );
}


// =========================
// SERVICE CHANGE
// =========================

if (serviceSelect) {

    serviceSelect.addEventListener(
        "change",
        function () {

            updatePrices();

            updateUPIPayment();
        }
    );
}


// =========================
// VISIT TYPE CHANGE
// =========================

if (visitTypeSelect) {

    visitTypeSelect.addEventListener(
        "change",
        function () {

            updatePrices();

            updateUPIPayment();
        }
    );
}


// =========================
// BOOKING SYSTEM
// =========================

const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    const dateInput =
        document.getElementById(
            "bookingDate"
        );

    const timeInput =
        document.getElementById(
            "bookingTime"
        );


    // =========================
    // PREVENT PAST DATES
    // =========================

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    if (dateInput) {

        dateInput.min =
            today;
    }


    // =========================
    // FORM SUBMIT
    // =========================

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // =========================
            // SERVICE
            // =========================

            const service =
                document.getElementById(
                    "service"
                ).value;


            const selectedOption =
                serviceSelect.options[
                    serviceSelect.selectedIndex
                ];


            const servicePriceValue =
                Number(
                    selectedOption.getAttribute(
                        "data-price"
                    )
                ) || 0;


            // =========================
            // VISIT TYPE
            // =========================

            const visitType =
                document.getElementById(
                    "visitType"
                ).value;


            // =========================
            // PAYMENT METHOD
            // =========================

            const paymentMethod =
                document.getElementById(
                    "paymentMethod"
                ).value;


            // =========================
            // VISIT PRICE
            // =========================

            let visitPriceValue = 0;


            if (
                visitType === "Home Visit"
            ) {

                visitPriceValue =
                    HOME_VISIT_PRICE;
            }


            // =========================
            // FINAL PRICE
            // =========================

            const finalPrice =
                servicePriceValue +
                visitPriceValue;


            // =========================
            // DATE
            // =========================

            const date =
                document.getElementById(
                    "bookingDate"
                ).value;


            // =========================
            // TIME
            // =========================

            const time =
                document.getElementById(
                    "bookingTime"
                ).value;


            // =========================
            // CUSTOMER NAME
            // =========================

            const customerName =
                document.getElementById(
                    "customerName"
                ).value.trim();


            // =========================
            // MOBILE
            // =========================

            const mobile =
                document.getElementById(
                    "mobile"
                ).value.trim();


            // =========================
            // BOOKING MESSAGE
            // =========================

            const bookingMessage =
                document.getElementById(
                    "bookingMessage"
                );


            // =========================
            // VALIDATION
            // =========================

            if (
                !service ||
                !visitType ||
                !paymentMethod ||
                !date ||
                !time ||
                !customerName ||
                !mobile
            ) {

                bookingMessage.innerHTML =
                    "⚠️ Please fill all details.";

                return;
            }


            // =========================
            // GET BOOKINGS
            // =========================

            let bookings =
                JSON.parse(
                    localStorage.getItem(
                        "bookings"
                    )
                ) || [];


            // =========================
            // DOUBLE BOOKING CHECK
            // =========================

            const alreadyBooked =
                bookings.some(
                    function (booking) {

                        return (
                            booking.date === date &&
                            booking.time === time
                        );
                    }
                );


            if (alreadyBooked) {

                bookingMessage.innerHTML =
                    "❌ This time slot is already booked. Please choose another time.";

                return;
            }


            // =========================
            // CREATE BOOKING
            // =========================

            const booking = {

                id:
                    Date.now(),

                service:
                    service,

                servicePrice:
                    servicePriceValue,

                visitType:
                    visitType,

                visitPrice:
                    visitPriceValue,

                paymentMethod:
                    paymentMethod,

                finalPrice:
                    finalPrice,

                date:
                    date,

                time:
                    time,

                customerName:
                    customerName,

                mobile:
                    mobile,

                status:
                    "Pending",

                barber:
                    "Not Assigned"
            };


            // =========================
            // SAVE BOOKING
            // =========================

            bookings.push(
                booking
            );


            localStorage.setItem(
                "bookings",
                JSON.stringify(
                    bookings
                )
            );


            // =========================
            // SUCCESS MESSAGE
            // =========================

            bookingMessage.innerHTML =
                "✅ Appointment booked successfully! Total Price: ₹" +
                finalPrice;


            // =========================
            // WHATSAPP MESSAGE
            // =========================

            const whatsappMessage =

                "Hello Unique Salons!%0A%0A" +

                "New Appointment Booking%0A" +

                "Customer: " +
                encodeURIComponent(
                    customerName
                ) +
                "%0A" +

                "Service: " +
                encodeURIComponent(
                    service
                ) +
                "%0A" +

                "Service Price: ₹" +
                servicePriceValue +
                "%0A" +

                "Visit Type: " +
                encodeURIComponent(
                    visitType
                ) +
                "%0A" +

                "Visit Price: ₹" +
                visitPriceValue +
                "%0A" +

                "Final Price: ₹" +
                finalPrice +
                "%0A" +

                "Payment Method: " +
                encodeURIComponent(
                    paymentMethod
                ) +
                "%0A" +

                "Date: " +
                date +
                "%0A" +

                "Time: " +
                time +
                "%0A" +

                "Mobile: " +
                encodeURIComponent(
                    mobile
                );


            const whatsappURL =
                "https://wa.me/919137704917?text=" +
                whatsappMessage;


            // Open WhatsApp
            window.open(
                whatsappURL,
                "_blank"
            );


            // =========================
            // RESET FORM
            // =========================

            bookingForm.reset();


            // Reset displayed prices
            if (servicePrice) {

                servicePrice.innerHTML =
                    "Service Price: ₹0";
            }


            if (visitPriceElement) {

                visitPriceElement.innerHTML =
                    "Visit Price: ₹0";
            }


            if (finalPriceElement) {

                finalPriceElement.innerHTML =
                    "Final Price: ₹0";
            }


            // Hide QR after booking
            if (onlinePaymentBox) {

                onlinePaymentBox.style.display =
                    "none";
            }


            if (upiQR) {

                upiQR.src = "";
            }


            if (gpayButton) {

                gpayButton.href = "#";
            }

        }
    );
}