// document.addEventListener("DOMContentLoaded", function () {

//     // ==========================================
//     // PAGE NAVIGATION
//     // ==========================================

//     const sidebarLinks = document.querySelectorAll(".sidebar-link");
//     const appPages = document.querySelectorAll(".app-page");

//     function showPage(pageName) {

//         appPages.forEach(function (page) {
//             page.classList.remove("active-page");
//         });

//         const selectedPage = document.getElementById(pageName + "-page");

//         if (selectedPage) {
//             selectedPage.classList.add("active-page");
//         }

//         sidebarLinks.forEach(function (link) {

//             link.classList.remove("active");

//             if (link.dataset.page === pageName) {
//                 link.classList.add("active");
//             }

//         });

//         closeMobileSidebar();
//     }


//     sidebarLinks.forEach(function (link) {

//         link.addEventListener("click", function (event) {

//             event.preventDefault();

//             const pageName = link.dataset.page;

//             if (pageName) {
//                 showPage(pageName);
//             }

//         });

//     });


//     // ==========================================
//     // MOBILE SIDEBAR
//     // ==========================================

//     const dashboardMenu =
//         document.getElementById("dashboardMenu");

//     const sidebar =
//         document.querySelector(".sidebar");

//     const sidebarOverlay =
//         document.querySelector(".sidebar-overlay");


//     function openMobileSidebar() {

//         if (sidebar) {
//             sidebar.classList.add("open");
//         }

//         if (sidebarOverlay) {
//             sidebarOverlay.classList.add("show");
//         }

//     }


//     function closeMobileSidebar() {

//         if (sidebar) {
//             sidebar.classList.remove("open");
//         }

//         if (sidebarOverlay) {
//             sidebarOverlay.classList.remove("show");
//         }

//     }


//     if (dashboardMenu) {

//         dashboardMenu.addEventListener("click", function () {

//             if (
//                 sidebar &&
//                 sidebar.classList.contains("open")
//             ) {

//                 closeMobileSidebar();

//             } else {

//                 openMobileSidebar();

//             }

//         });

//     }


//     if (sidebarOverlay) {

//         sidebarOverlay.addEventListener(
//             "click",
//             closeMobileSidebar
//         );

//     }


//     // ==========================================
//     // SALES DATA
//     // ==========================================

//     let sales =
//         JSON.parse(
//             localStorage.getItem("padeSales")
//         ) || [];


//     // ==========================================
//     // PAYMENT PAGE
//     // ==========================================

//     const paymentPage =
//         document.getElementById("payments-page");


//     // ==========================================
//     // CREATE SALE MODAL
//     // ==========================================

//     function openSaleModal() {

//         const oldModal =
//             document.getElementById("saleModal");

//         if (oldModal) {
//             oldModal.remove();
//         }


//         const modal =
//             document.createElement("div");

//         modal.id = "saleModal";


//         modal.innerHTML = `

//             <div class="modal-overlay">

//                 <div class="modal-box">

//                     <div class="modal-header">

//                         <h2>Record New Sale</h2>

//                         <button
//                             type="button"
//                             class="modal-close"
//                             id="closeSaleModal">
//                             ×
//                         </button>

//                     </div>


//                     <form id="saleForm">

//                         <div class="form-group">

//                             <label>
//                                 Customer
//                             </label>

//                             <input
//                                 type="text"
//                                 id="saleCustomer"
//                                 placeholder="Customer name"
//                                 required>

//                         </div>


//                         <div class="form-group">

//                             <label>
//                                 Product / Service
//                             </label>

//                             <input
//                                 type="text"
//                                 id="saleProduct"
//                                 placeholder="What was sold?"
//                                 required>

//                         </div>


//                         <div class="form-group">

//                             <label>
//                                 Amount (₦)
//                             </label>

//                             <input
//                                 type="number"
//                                 id="saleAmount"
//                                 min="1"
//                                 placeholder="Enter sale amount"
//                                 required>

//                         </div>


//                         <div class="form-group">

//                             <label>
//                                 Payment Method
//                             </label>

//                             <select id="paymentMethod">

//                                 <option value="Cash">
//                                     Cash
//                                 </option>

//                                 <option value="Bank Transfer">
//                                     Bank Transfer
//                                 </option>

//                                 <option value="POS">
//                                     POS
//                                 </option>

//                                 <option value="Card">
//                                     Card
//                                 </option>

//                                 <option value="Online">
//                                     Online Payment
//                                 </option>

//                             </select>

//                         </div>


//                         <div class="form-group">

//                             <label>
//                                 Payment Status
//                             </label>

//                             <select id="paymentStatus">

//                                 <option value="Paid">
//                                     Paid
//                                 </option>

//                                 <option value="Pending">
//                                     Pending
//                                 </option>

//                             </select>

//                         </div>


//                         <button
//                             type="submit"
//                             class="primary-button modal-submit">

//                             Record Sale

//                         </button>

//                     </form>

//                 </div>

//             </div>

//         `;


//         document.body.appendChild(modal);


//         // ==========================================
//         // CLOSE BUTTON
//         // ==========================================

//         const closeButton =
//             document.getElementById("closeSaleModal");


//         if (closeButton) {

//             closeButton.addEventListener(
//                 "click",
//                 function () {

//                     closeSaleModal();

//                 }
//             );

//         }


//         // ==========================================
//         // CLICK OUTSIDE MODAL
//         // ==========================================

//         const overlay =
//             modal.querySelector(".modal-overlay");


//         if (overlay) {

//             overlay.addEventListener(
//                 "click",
//                 function (event) {

//                     if (event.target === overlay) {

//                         closeSaleModal();

//                     }

//                 }
//             );

//         }


//         // ==========================================
//         // SALE FORM
//         // ==========================================

//         const saleForm =
//             document.getElementById("saleForm");


//         if (saleForm) {

//             saleForm.addEventListener(
//                 "submit",
//                 function (event) {

//                     event.preventDefault();

//                     recordSale();

//                 }
//             );

//         }

//     }


//     // ==========================================
//     // RECORD SALE
//     // ==========================================

//     function recordSale() {

//         const customerInput =
//             document.getElementById("saleCustomer");

//         const productInput =
//             document.getElementById("saleProduct");

//         const amountInput =
//             document.getElementById("saleAmount");

//         const methodInput =
//             document.getElementById("paymentMethod");

//         const statusInput =
//             document.getElementById("paymentStatus");


//         if (
//             !customerInput ||
//             !productInput ||
//             !amountInput ||
//             !methodInput ||
//             !statusInput
//         ) {

//             alert(
//                 "Sale form could not be loaded."
//             );

//             return;

//         }


//         const customer =
//             customerInput.value.trim();

//         const product =
//             productInput.value.trim();

//         const amount =
//             Number(amountInput.value);

//         const paymentMethod =
//             methodInput.value;

//         const paymentStatus =
//             statusInput.value;


//         if (
//             customer === "" ||
//             product === "" ||
//             amount <= 0
//         ) {

//             alert(
//                 "Please complete all sale information."
//             );

//             return;

//         }


//         const sale = {

//             id:
//                 "SALE-" +
//                 Math.floor(
//                     1000 +
//                     Math.random() * 9000
//                 ),

//             customer: customer,

//             product: product,

//             amount: amount,

//             paymentMethod: paymentMethod,

//             paymentStatus: paymentStatus,

//             date:
//                 new Date().toLocaleDateString(
//                     "en-NG"
//                 )

//         };


//         // Add the new sale

//         sales.unshift(sale);


//         // Save sales in browser

//         localStorage.setItem(
//             "padeSales",
//             JSON.stringify(sales)
//         );


//         // Add sale to payment table

//         addSaleToPaymentTable(sale);


//         // Update statistics

//         updatePaymentStatistics();


//         // Close modal

//         closeSaleModal();


//         alert(
//             "Sale recorded successfully!"
//         );

//     }


//     // ==========================================
//     // CLOSE SALE MODAL
//     // ==========================================

//     function closeSaleModal() {

//         const modal =
//             document.getElementById("saleModal");

//         if (modal) {
//             modal.remove();
//         }

//     }


//     // ==========================================
//     // ADD SALE TO PAYMENT TABLE
//     // ==========================================

//     function addSaleToPaymentTable(sale) {

//         if (!paymentPage) {
//             return;
//         }


//         const tableBody =
//             paymentPage.querySelector("tbody");


//         if (!tableBody) {
//             return;
//         }


//         const row =
//             document.createElement("tr");


//         row.dataset.saleId =
//             sale.id;


//         row.innerHTML = `

//             <td>
//                 ${sale.id}
//             </td>

//             <td>
//                 ${sale.customer}
//             </td>

//             <td>
//                 ${sale.product}
//             </td>

//             <td>
//                 ₦${sale.amount.toLocaleString("en-NG")}
//             </td>

//             <td>
//                 ${sale.paymentMethod}
//             </td>

//             <td>

//                 <span class="status ${
//                     sale.paymentStatus === "Paid"
//                         ? "paid"
//                         : "pending"
//                 }">

//                     ${sale.paymentStatus}

//                 </span>

//             </td>

//             <td>

//                 <button
//                     type="button"
//                     class="table-action view-sale">

//                     View

//                 </button>

//                 <button
//                     type="button"
//                     class="table-action delete-sale">

//                     Delete

//                 </button>

//             </td>

//         `;


//         tableBody.prepend(row);

//     }


//     // ==========================================
//     // LOAD SAVED SALES
//     // ==========================================

//     function loadSavedSales() {

//         if (!paymentPage) {
//             return;
//         }


//         sales.forEach(function (sale) {

//             addSaleToPaymentTable(sale);

//         });

//     }


//     // ==========================================
//     // PAYMENT TABLE ACTIONS
//     // ==========================================

//     if (paymentPage) {

//         const tableBody =
//             paymentPage.querySelector("tbody");


//         if (tableBody) {

//             tableBody.addEventListener(
//                 "click",
//                 function (event) {

//                     const row =
//                         event.target.closest("tr");


//                     if (!row) {
//                         return;
//                     }


//                     // ==================================
//                     // VIEW SALE
//                     // ==================================

//                     if (
//                         event.target.closest(
//                             ".view-sale"
//                         )
//                     ) {

//                         const cells =
//                             row.querySelectorAll("td");


//                         if (cells.length >= 6) {

//                             alert(

//                                 "TRANSACTION DETAILS\n\n" +

//                                 "Transaction: " +
//                                 cells[0]
//                                     .textContent
//                                     .trim() +

//                                 "\nCustomer: " +
//                                 cells[1]
//                                     .textContent
//                                     .trim() +

//                                 "\nProduct: " +
//                                 cells[2]
//                                     .textContent
//                                     .trim() +

//                                 "\nAmount: " +
//                                 cells[3]
//                                     .textContent
//                                     .trim() +

//                                 "\nPayment Method: " +
//                                 cells[4]
//                                     .textContent
//                                     .trim() +

//                                 "\nStatus: " +
//                                 cells[5]
//                                     .textContent
//                                     .trim()

//                             );

//                         }

//                     }


//                     // ==================================
//                     // DELETE SALE
//                     // ==================================

//                     if (
//                         event.target.closest(
//                             ".delete-sale"
//                         )
//                     ) {

//                         const confirmed =
//                             confirm(
//                                 "Delete this transaction?"
//                             );


//                         if (!confirmed) {
//                             return;
//                         }


//                         const saleId =
//                             row.dataset.saleId;


//                         if (saleId) {

//                             sales =
//                                 sales.filter(
//                                     function (sale) {

//                                         return (
//                                             sale.id !== saleId
//                                         );

//                                     }
//                                 );


//                             localStorage.setItem(
//                                 "padeSales",
//                                 JSON.stringify(sales)
//                             );

//                         }


//                         row.remove();


//                         updatePaymentStatistics();


//                         alert(
//                             "Transaction deleted."
//                         );

//                     }

//                 }
//             );

//         }

//     }


//     // ==========================================
//     // PAYMENT STATISTICS
//     // ==========================================

//     function updatePaymentStatistics() {

//         if (!paymentPage) {
//             return;
//         }


//         let totalReceived = 0;

//         let totalPending = 0;


//         sales.forEach(function (sale) {

//             if (
//                 sale.paymentStatus === "Paid"
//             ) {

//                 totalReceived += sale.amount;

//             }


//             if (
//                 sale.paymentStatus === "Pending"
//             ) {

//                 totalPending += sale.amount;

//             }

//         });


//         console.log(
//             "Payment statistics:",
//             {
//                 totalReceived: totalReceived,
//                 totalPending: totalPending
//             }
//         );

//     }


//     // ==========================================
//     // ADD SALE BUTTONS
//     // ==========================================
//     //
//     // IMPORTANT:
//     // Your HTML currently contains TWO
//     // elements using id="addSaleButton".
//     //
//     // We use querySelectorAll() so BOTH
//     // buttons work.
//     // ==========================================

//     const addSaleButtons =
//         document.querySelectorAll(
//             "#addSaleButton"
//         );


//     addSaleButtons.forEach(function (button) {

//         button.addEventListener(
//             "click",
//             function (event) {

//                 event.preventDefault();

//                 showPage("payments");

//                 openSaleModal();

//             }
//         );

//     });


//     // ==========================================
//     // SUPPORT BUTTON
//     // ==========================================

//     const supportButton =
//         document.getElementById(
//             "supportButton"
//         );


//     if (supportButton) {

//         supportButton.addEventListener(
//             "click",
//             function () {

//                 alert(
//                     "Support is ready to help you."
//                 );

//             }
//         );

//     }


//     // ==========================================
//     // NOTIFICATION BUTTON
//     // ==========================================

//     const notificationButton =
//         document.getElementById(
//             "notificationButton"
//         );


//     if (notificationButton) {

//         notificationButton.addEventListener(
//             "click",
//             function () {

//                 alert(
//                     "You have 3 new notifications."
//                 );

//             }
//         );

//     }


//     // ==========================================
//     // GLOBAL SEARCH
//     // ==========================================

//     const globalSearch =
//         document.getElementById(
//             "globalSearch"
//         );


//     if (globalSearch) {

//         globalSearch.addEventListener(
//             "input",
//             function () {

//                 const searchText =
//                     globalSearch.value
//                         .toLowerCase()
//                         .trim();


//                 if (!searchText) {
//                     return;
//                 }


//                 console.log(
//                     "Searching for:",
//                     searchText
//                 );

//             }
//         );

//     }


//     // ==========================================
//     // INITIALIZE
//     // ==========================================

//     loadSavedSales();

//     updatePaymentStatistics();


//     console.log(
//         "Pade dashboard loaded successfully."
//     );

// });




document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // DATA
    // ==========================================

    let sales =
        JSON.parse(localStorage.getItem("padeSales")) || [];

    let customers =
        JSON.parse(localStorage.getItem("padeCustomers")) || [];

    let invoices =
        JSON.parse(localStorage.getItem("padeInvoices")) || [];

    let products =
        JSON.parse(localStorage.getItem("padeProducts")) || [];


    // ==========================================
    // PAGE NAVIGATION
    // ==========================================

    const sidebarLinks =
        document.querySelectorAll(".sidebar-link");

    const appPages =
        document.querySelectorAll(".app-page");


    function showPage(pageName) {

        appPages.forEach(function (page) {
            page.classList.remove("active-page");
        });


        const selectedPage =
            document.getElementById(
                pageName + "-page"
            );


        if (selectedPage) {

            selectedPage.classList.add(
                "active-page"
            );

        }


        sidebarLinks.forEach(function (link) {

            link.classList.remove("active");


            if (
                link.dataset.page === pageName
            ) {

                link.classList.add("active");

            }

        });


        closeMobileSidebar();

    }


    sidebarLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const pageName =
                    link.dataset.page;

                if (pageName) {

                    showPage(pageName);

                }

            }
        );

    });


    // ==========================================
    // MOBILE SIDEBAR
    // ==========================================

    const dashboardMenu =
        document.getElementById(
            "dashboardMenu"
        );


    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    const sidebarOverlay =
        document.querySelector(
            ".sidebar-overlay"
        );


    function openMobileSidebar() {

        if (sidebar) {

            sidebar.classList.add(
                "open"
            );

        }


        if (sidebarOverlay) {

            sidebarOverlay.classList.add(
                "show"
            );

        }

    }


    function closeMobileSidebar() {

        if (sidebar) {

            sidebar.classList.remove(
                "open"
            );

        }


        if (sidebarOverlay) {

            sidebarOverlay.classList.remove(
                "show"
            );

        }

    }


    if (dashboardMenu) {

        dashboardMenu.addEventListener(
            "click",
            function () {

                if (
                    sidebar &&
                    sidebar.classList.contains("open")
                ) {

                    closeMobileSidebar();

                } else {

                    openMobileSidebar();

                }

            }
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeMobileSidebar
        );

    }


    // ==========================================
    // SAVE DATA
    // ==========================================

    function saveAllData() {

        localStorage.setItem(
            "padeSales",
            JSON.stringify(sales)
        );


        localStorage.setItem(
            "padeCustomers",
            JSON.stringify(customers)
        );


        localStorage.setItem(
            "padeInvoices",
            JSON.stringify(invoices)
        );


        localStorage.setItem(
            "padeProducts",
            JSON.stringify(products)
        );

    }


    // ==========================================
    // GENERAL MODAL
    // ==========================================

    function removeModal() {

        const modal =
            document.getElementById(
                "padeModal"
            );


        if (modal) {

            modal.remove();

        }

    }


    function createModal(content) {

        removeModal();


        const modal =
            document.createElement("div");


        modal.id = "padeModal";


        modal.innerHTML = `

            <div class="modal-overlay">

                <div class="modal-box">

                    ${content}

                </div>

            </div>

        `;


        document.body.appendChild(modal);


        const overlay =
            modal.querySelector(
                ".modal-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === overlay
                    ) {

                        removeModal();

                    }

                }
            );

        }


        return modal;

    }


    // ==========================================
    // ADD SALE
    // ==========================================

    function openSaleModal() {

        const modal =
            createModal(`

                <div class="modal-header">

                    <h2>
                        Record New Sale
                    </h2>

                    <button
                        type="button"
                        class="modal-close"
                        id="closeSaleModal">
                        ×
                    </button>

                </div>


                <form id="saleForm">

                    <div class="form-group">

                        <label>
                            Customer
                        </label>

                        <input
                            type="text"
                            id="saleCustomer"
                            placeholder="Customer name"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Product / Service
                        </label>

                        <input
                            type="text"
                            id="saleProduct"
                            placeholder="What was sold?"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Amount (₦)
                        </label>

                        <input
                            type="number"
                            id="saleAmount"
                            min="1"
                            placeholder="Enter amount"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Payment Method
                        </label>

                        <select id="paymentMethod">

                            <option value="Cash">
                                Cash
                            </option>

                            <option value="Bank Transfer">
                                Bank Transfer
                            </option>

                            <option value="POS">
                                POS
                            </option>

                            <option value="Card">
                                Card
                            </option>

                            <option value="Online">
                                Online Payment
                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>
                            Payment Status
                        </label>

                        <select id="paymentStatus">

                            <option value="Paid">
                                Paid
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                        </select>

                    </div>


                    <button
                        type="submit"
                        class="primary-button modal-submit">

                        Record Sale

                    </button>

                </form>

            `);


        const closeButton =
            document.getElementById(
                "closeSaleModal"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                removeModal
            );

        }


        const form =
            document.getElementById(
                "saleForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    recordSale();

                }
            );

        }

    }


    function recordSale() {

        const customer =
            document
                .getElementById("saleCustomer")
                .value
                .trim();


        const product =
            document
                .getElementById("saleProduct")
                .value
                .trim();


        const amount =
            Number(
                document
                    .getElementById("saleAmount")
                    .value
            );


        const paymentMethod =
            document
                .getElementById("paymentMethod")
                .value;


        const paymentStatus =
            document
                .getElementById("paymentStatus")
                .value;


        if (
            customer === "" ||
            product === "" ||
            amount <= 0
        ) {

            alert(
                "Please complete all sale information."
            );

            return;

        }


        const sale = {

            id:
                "SALE-" +
                Date.now(),

            customer: customer,

            product: product,

            amount: amount,

            paymentMethod: paymentMethod,

            paymentStatus: paymentStatus,

            date:
                new Date().toLocaleDateString(
                    "en-NG"
                )

        };


        sales.unshift(sale);


        saveAllData();


        removeModal();


        renderPayments();


        alert(
            "Sale recorded successfully!"
        );

    }


    // ==========================================
    // SALE BUTTONS
    // ==========================================

    document
        .querySelectorAll("#addSaleButton")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showPage("payments");

                    openSaleModal();

                }
            );

        });


    // ==========================================
    // PAYMENTS
    // ==========================================

    function renderPayments() {

        const page =
            document.getElementById(
                "payments-page"
            );


        if (!page) {
            return;
        }


        const tableBody =
            page.querySelector("tbody");


        if (!tableBody) {
            return;
        }


        const savedRows =
            sales.map(function (sale) {

                return `

                    <tr data-sale-id="${sale.id}">

                        <td>
                            <strong>
                                ${sale.customer}
                            </strong>
                        </td>

                        <td>
                            ${sale.id}
                        </td>

                        <td>
                            ${sale.date}
                        </td>

                        <td>
                            ₦${sale.amount.toLocaleString("en-NG")}
                        </td>

                        <td>

                            <span class="status ${
                                sale.paymentStatus === "Paid"
                                    ? "paid"
                                    : "pending"
                            }">

                                ${
                                    sale.paymentStatus === "Paid"
                                        ? "Completed"
                                        : "Pending"
                                }

                            </span>

                        </td>

                    </tr>

                `;

            })
            .join("");


        if (savedRows) {

            tableBody.innerHTML =
                savedRows +
                tableBody.innerHTML;

        }

    }


    // ==========================================
    // ADD CUSTOMER
    // ==========================================

    const addCustomerButton =
        document.getElementById(
            "addCustomerButton"
        );


    if (addCustomerButton) {

        addCustomerButton.addEventListener(
            "click",
            function () {

                openCustomerModal();

            }
        );

    }


    function openCustomerModal() {

        const modal =
            createModal(`

                <div class="modal-header">

                    <h2>
                        Add Customer
                    </h2>

                    <button
                        type="button"
                        class="modal-close"
                        id="closeCustomerModal">
                        ×
                    </button>

                </div>


                <form id="customerForm">

                    <div class="form-group">

                        <label>
                            Customer Name
                        </label>

                        <input
                            type="text"
                            id="customerName"
                            placeholder="Customer name"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Phone Number
                        </label>

                        <input
                            type="text"
                            id="customerPhone"
                            placeholder="0800 000 0000"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            id="customerEmail"
                            placeholder="customer@email.com">

                    </div>


                    <button
                        type="submit"
                        class="primary-button modal-submit">

                        Add Customer

                    </button>

                </form>

            `);


        const close =
            document.getElementById(
                "closeCustomerModal"
            );


        if (close) {

            close.addEventListener(
                "click",
                removeModal
            );

        }


        const form =
            document.getElementById(
                "customerForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        document
                            .getElementById("customerName")
                            .value
                            .trim();


                    const phone =
                        document
                            .getElementById("customerPhone")
                            .value
                            .trim();


                    const email =
                        document
                            .getElementById("customerEmail")
                            .value
                            .trim();


                    const customer = {

                        id:
                            "CUS-" +
                            Date.now(),

                        name,

                        phone,

                        email,

                        date:
                            new Date().toLocaleDateString(
                                "en-NG"
                            ),

                        totalSpent: 0

                    };


                    customers.unshift(
                        customer
                    );


                    saveAllData();


                    renderCustomers();


                    removeModal();


                    alert(
                        "Customer added successfully!"
                    );

                }
            );

        }

    }


    // ==========================================
    // CUSTOMERS
    // ==========================================

    function renderCustomers() {

        const tableBody =
            document.getElementById(
                "customerTableBody"
            );


        if (!tableBody) {
            return;
        }


        customers.forEach(function (customer) {

            const row =
                document.createElement("tr");


            row.dataset.customerId =
                customer.id;


            row.innerHTML = `

                <td>
                    <strong>
                        ${customer.name}
                    </strong>
                </td>

                <td>
                    ${customer.phone}
                </td>

                <td>
                    ${customer.date}
                </td>

                <td>
                    ₦${customer.totalSpent.toLocaleString("en-NG")}
                </td>

                <td>

                    <span class="status paid">
                        Active
                    </span>

                </td>

            `;


            tableBody.prepend(row);

        });

    }


    // ==========================================
    // CUSTOMER SEARCH
    // ==========================================

    const customerSearch =
        document.getElementById(
            "customerSearch"
        );


    if (customerSearch) {

        customerSearch.addEventListener(
            "input",
            function () {

                const search =
                    customerSearch.value
                        .toLowerCase()
                        .trim();


                const rows =
                    document.querySelectorAll(
                        "#customerTableBody tr"
                    );


                rows.forEach(function (row) {

                    const text =
                        row.textContent
                            .toLowerCase();


                    row.style.display =
                        text.includes(search)
                            ? ""
                            : "none";

                });

            }
        );

    }


    // ==========================================
    // CREATE INVOICE
    // ==========================================

    const createInvoiceButton =
        document.getElementById(
            "createInvoiceButton"
        );


    if (createInvoiceButton) {

        createInvoiceButton.addEventListener(
            "click",
            openInvoiceModal
        );

    }


    function openInvoiceModal() {

        const modal =
            createModal(`

                <div class="modal-header">

                    <h2>
                        Create Invoice
                    </h2>

                    <button
                        type="button"
                        class="modal-close"
                        id="closeInvoiceModal">
                        ×
                    </button>

                </div>


                <form id="invoiceForm">

                    <div class="form-group">

                        <label>
                            Customer
                        </label>

                        <input
                            type="text"
                            id="invoiceCustomer"
                            placeholder="Customer name"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Description
                        </label>

                        <input
                            type="text"
                            id="invoiceDescription"
                            placeholder="Product or service"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Amount (₦)
                        </label>

                        <input
                            type="number"
                            id="invoiceAmount"
                            min="1"
                            placeholder="Invoice amount"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Due Date
                        </label>

                        <input
                            type="date"
                            id="invoiceDueDate"
                            required>

                    </div>


                    <button
                        type="submit"
                        class="primary-button modal-submit">

                        Create Invoice

                    </button>

                </form>

            `);


        const close =
            document.getElementById(
                "closeInvoiceModal"
            );


        if (close) {

            close.addEventListener(
                "click",
                removeModal
            );

        }


        const form =
            document.getElementById(
                "invoiceForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const invoice = {

                        id:
                            "INV-" +
                            Math.floor(
                                1000 +
                                Math.random() * 9000
                            ),

                        customer:
                            document
                                .getElementById(
                                    "invoiceCustomer"
                                )
                                .value
                                .trim(),

                        description:
                            document
                                .getElementById(
                                    "invoiceDescription"
                                )
                                .value
                                .trim(),

                        amount:
                            Number(
                                document
                                    .getElementById(
                                        "invoiceAmount"
                                    )
                                    .value
                            ),

                        dueDate:
                            document
                                .getElementById(
                                    "invoiceDueDate"
                                )
                                .value,

                        status:
                            "pending",

                        date:
                            new Date().toLocaleDateString(
                                "en-NG"
                            )

                    };


                    invoices.unshift(
                        invoice
                    );


                    saveAllData();


                    renderInvoices();


                    removeModal();


                    alert(
                        "Invoice created successfully!"
                    );

                }
            );

        }

    }


    // ==========================================
    // INVOICES
    // ==========================================

    function renderInvoices() {

        const tableBody =
            document.getElementById(
                "invoiceTableBody"
            );


        if (!tableBody) {
            return;
        }


        invoices.forEach(function (invoice) {

            const row =
                document.createElement("tr");


            row.dataset.status =
                invoice.status;


            row.dataset.invoiceId =
                invoice.id;


            row.innerHTML = `

                <td>
                    <strong>
                        ${invoice.id}
                    </strong>
                </td>

                <td>
                    ${invoice.customer}
                </td>

                <td>
                    ${invoice.date}
                </td>

                <td>
                    ${invoice.dueDate}
                </td>

                <td>
                    ₦${invoice.amount.toLocaleString("en-NG")}
                </td>

                <td>

                    <span class="status pending">
                        Pending
                    </span>

                </td>

                <td>

                    <button
                        type="button"
                        class="table-action view-invoice">

                        View

                    </button>

                    <button
                        type="button"
                        class="table-action delete-invoice">

                        Delete

                    </button>

                </td>

            `;


            tableBody.prepend(row);

        });

    }


    // ==========================================
    // INVOICE SEARCH
    // ==========================================

    const invoiceSearch =
        document.getElementById(
            "invoiceSearch"
        );


    const invoiceFilter =
        document.getElementById(
            "invoiceFilter"
        );


    function filterInvoices() {

        const search =
            invoiceSearch
                ? invoiceSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        const filter =
            invoiceFilter
                ? invoiceFilter.value
                : "all";


        const rows =
            document.querySelectorAll(
                "#invoiceTableBody tr"
            );


        rows.forEach(function (row) {

            const text =
                row.textContent
                    .toLowerCase();


            const status =
                row.dataset.status;


            const matchesSearch =
                text.includes(search);


            const matchesFilter =
                filter === "all" ||
                status === filter;


            row.style.display =
                matchesSearch &&
                matchesFilter
                    ? ""
                    : "none";

        });

    }


    if (invoiceSearch) {

        invoiceSearch.addEventListener(
            "input",
            filterInvoices
        );

    }


    if (invoiceFilter) {

        invoiceFilter.addEventListener(
            "change",
            filterInvoices
        );

    }


    // ==========================================
    // INVOICE TABLE ACTIONS
    // ==========================================

    const invoiceTableBody =
        document.getElementById(
            "invoiceTableBody"
        );


    if (invoiceTableBody) {

        invoiceTableBody.addEventListener(
            "click",
            function (event) {

                const row =
                    event.target.closest("tr");


                if (!row) {
                    return;
                }


                if (
                    event.target.classList.contains(
                        "view-invoice"
                    )
                ) {

                    alert(
                        "INVOICE DETAILS\n\n" +

                        "Invoice: " +
                        row.cells[0].textContent.trim() +

                        "\nCustomer: " +
                        row.cells[1].textContent.trim() +

                        "\nDate: " +
                        row.cells[2].textContent.trim() +

                        "\nDue Date: " +
                        row.cells[3].textContent.trim() +

                        "\nAmount: " +
                        row.cells[4].textContent.trim() +

                        "\nStatus: " +
                        row.cells[5].textContent.trim()
                    );

                }


                if (
                    event.target.classList.contains(
                        "delete-invoice"
                    )
                ) {

                    if (
                        confirm(
                            "Delete this invoice?"
                        )
                    ) {

                        const invoiceId =
                            row.dataset.invoiceId;


                        invoices =
                            invoices.filter(
                                function (invoice) {

                                    return (
                                        invoice.id !==
                                        invoiceId
                                    );

                                }
                            );


                        saveAllData();


                        row.remove();

                    }

                }

            }
        );

    }


    // ==========================================
    // ADD PRODUCT
    // ==========================================

    const addProductButton =
        document.getElementById(
            "addProductButton"
        );


    if (addProductButton) {

        addProductButton.addEventListener(
            "click",
            openProductModal
        );

    }


    function openProductModal() {

        createModal(`

            <div class="modal-header">

                <h2>
                    Add Product
                </h2>

                <button
                    type="button"
                    class="modal-close"
                    id="closeProductModal">
                    ×
                </button>

            </div>


            <form id="productForm">

                <div class="form-group">

                    <label>
                        Product Name
                    </label>

                    <input
                        type="text"
                        id="productName"
                        required>

                </div>


                <div class="form-group">

                    <label>
                        Category
                    </label>

                    <input
                        type="text"
                        id="productCategory"
                        required>

                </div>


                <div class="form-group">

                    <label>
                        Price (₦)
                    </label>

                    <input
                        type="number"
                        id="productPrice"
                        min="0"
                        required>

                </div>


                <div class="form-group">

                    <label>
                        Stock Quantity
                    </label>

                    <input
                        type="number"
                        id="productStock"
                        min="0"
                        required>

                </div>


                <button
                    type="submit"
                    class="primary-button modal-submit">

                    Add Product

                </button>

            </form>

        `);


        const close =
            document.getElementById(
                "closeProductModal"
            );


        if (close) {

            close.addEventListener(
                "click",
                removeModal
            );

        }


        const form =
            document.getElementById(
                "productForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const product = {

                        id:
                            "PROD-" +
                            Date.now(),

                        name:
                            document
                                .getElementById(
                                    "productName"
                                )
                                .value
                                .trim(),

                        category:
                            document
                                .getElementById(
                                    "productCategory"
                                )
                                .value
                                .trim(),

                        price:
                            Number(
                                document
                                    .getElementById(
                                        "productPrice"
                                    )
                                    .value
                            ),

                        stock:
                            Number(
                                document
                                    .getElementById(
                                        "productStock"
                                    )
                                    .value
                            )

                    };


                    products.unshift(
                        product
                    );


                    saveAllData();


                    renderProducts();


                    removeModal();


                    alert(
                        "Product added successfully!"
                    );

                }
            );

        }

    }


    // ==========================================
    // INVENTORY
    // ==========================================

    function renderProducts() {

        const page =
            document.getElementById(
                "inventory-page"
            );


        if (!page) {
            return;
        }


        const tableBody =
            page.querySelector("tbody");


        if (!tableBody) {
            return;
        }


        products.forEach(function (product) {

            const status =
                product.stock === 0
                    ? "Out of Stock"
                    : product.stock <= 10
                        ? "Low Stock"
                        : "In Stock";


            const statusClass =
                product.stock === 0
                    ? "overdue"
                    : product.stock <= 10
                        ? "pending"
                        : "paid";


            const row =
                document.createElement("tr");


            row.dataset.productId =
                product.id;


            row.innerHTML = `

                <td>
                    <strong>
                        ${product.name}
                    </strong>
                </td>

                <td>
                    ${product.category}
                </td>

                <td>
                    ₦${product.price.toLocaleString("en-NG")}
                </td>

                <td>
                    ${product.stock}
                </td>

                <td>

                    <span class="status ${statusClass}">
                        ${status}
                    </span>

                </td>

            `;


            tableBody.prepend(row);

        });

    }


    // ==========================================
    // QUICK ACTIONS
    // ==========================================

    const quickActions =
        document.querySelectorAll(
            ".quick-action"
        );


    quickActions.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const action =
                    button.dataset.action;


                if (action === "invoice") {

                    showPage("invoices");

                    openInvoiceModal();

                }


                if (action === "customer") {

                    showPage("customers");

                    openCustomerModal();

                }


                if (action === "product") {

                    showPage("inventory");

                    openProductModal();

                }

            }
        );

    });


    // ==========================================
    // SUPPORT
    // ==========================================

    const supportButton =
        document.getElementById(
            "supportButton"
        );


    if (supportButton) {

        supportButton.addEventListener(
            "click",
            function () {

                alert(
                    "Support is ready to help you."
                );

            }
        );

    }


    // ==========================================
    // NOTIFICATIONS
    // ==========================================

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                alert(
                    "You have 3 new notifications."
                );

            }
        );

    }


    // ==========================================
    // GLOBAL SEARCH
    // ==========================================

    const globalSearch =
        document.getElementById(
            "globalSearch"
        );


    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            function () {

                const searchText =
                    globalSearch.value
                        .toLowerCase()
                        .trim();


                if (!searchText) {
                    return;
                }


                const allRows =
                    document.querySelectorAll(
                        "table tbody tr"
                    );


                allRows.forEach(function (row) {

                    const text =
                        row.textContent
                            .toLowerCase();


                    row.style.display =
                        text.includes(searchText)
                            ? ""
                            : "none";

                });

            }
        );

    }


    // ==========================================
    // SETTINGS
    // ==========================================

    const settingsPage =
        document.getElementById(
            "settings-page"
        );


    if (settingsPage) {

        const saveButton =
            settingsPage.querySelector(
                ".primary-button"
            );


        if (saveButton) {

            saveButton.addEventListener(
                "click",
                function () {

                    const inputs =
                        settingsPage.querySelectorAll(
                            "input"
                        );


                    const settings = {

                        businessName:
                            inputs[0]
                                ? inputs[0].value
                                : "",

                        phone:
                            inputs[1]
                                ? inputs[1].value
                                : "",

                        email:
                            inputs[2]
                                ? inputs[2].value
                                : ""

                    };


                    localStorage.setItem(
                        "padeSettings",
                        JSON.stringify(settings)
                    );


                    alert(
                        "Settings saved successfully!"
                    );

                }
            );

        }

    }


    // ==========================================
    // INITIALIZE
    // ==========================================

    renderCustomers();

    renderInvoices();

    renderProducts();

    renderPayments();


    console.log(
        "Pade dashboard loaded successfully."
    );

});