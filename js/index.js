var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteURL");

var allSites = [];

var tBody = document.getElementById("tbody");
var deletedIndex = document.getElementById("deletedIndex")

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var updatedIndex = 0;

var searchProduct = document.getElementById("siteSearch");



if (localStorage.getItem("allSites") != null) {
    allSites = JSON.parse(localStorage.getItem("allSites"));
    displayAllSites();
}

function addSites() {
    var sites = {
        name:   siteNameInput.value,
        url:    siteUrlInput.value
    }
    allSites.push(sites);
    clearForm();
    displayAllSites();
    localStorage.setItem("allSites", JSON.stringify(allSites));
    if (siteNameInput.classList.contains("is-invalid")) {
        siteNameInput.classList.remove("is-invalid");
    }
    if (siteNameInput.classList.contains("is-valid")) {
        siteNameInput.classList.remove("is-valid");
    }

    if (siteUrlInput.classList.contains("is-invalid")) {
        siteUrlInput.classList.remove("is-invalid");
    }
    if (siteUrlInput.classList.contains("is-valid")) {
        siteUrlInput.classList.remove("is-valid");
    }
    console.log(allSites);
}
addBtn.addEventListener("click", function() {
    addSites();
});

function clearForm () {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function displayAllSites() {
    var cartona = ``; 
    for (var i = 0; i < allSites.length; i++) {
        cartona += 
        `
            <tr>
                <td>${i + 1}</td>
                <td>${allSites[i].name}</td>
                <td>
                    <a href="${allSites[i].url}" target="_blank" class="btn btn-success btn-sm"><i class="fas fa-eye"></i> Visit</a>
                </td>
                <td>
                    <div onclick="setFormForUpdate(${i})" class=" btn btn-warning btn-sm"><i class="fas fa-edit"></i> Update</div>
                    <div onclick="deleteSites(${i})" id="deletedIndex" class=" btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Delete</div>
                </td>
            </tr>
        `;
    }

    tBody.innerHTML = cartona;
}

function deleteSites(idx) {
    allSites.splice(idx, 1);
    displayAllSites();
    localStorage.setItem("allSites", JSON.stringify(allSites));
}

function setFormForUpdate(idx) {
    siteNameInput.value     = allSites[idx].name;
    siteUrlInput.value      = allSites[idx].url;

    addBtn.classList.replace("d-inline-block", "d-none");
    updateBtn.classList.replace("d-none", "d-inline-block");
    updatedIndex = idx;
}

function updateSite() {
    allSites[updatedIndex].name = siteNameInput.value;
    allSites[updatedIndex].url  = siteUrlInput.value;
    
    localStorage.setItem("allSites", JSON.stringify(allSites));
    addBtn.classList.replace("d-none", "d-inline-block");
    updateBtn.classList.replace("d-inline-block", "d-none");

    if (siteNameInput.classList.contains("is-invalid")) {
        siteNameInput.classList.remove("is-invalid");
    }
    if (siteNameInput.classList.contains("is-valid")) {
        siteNameInput.classList.remove("is-valid");
    }

    if (siteUrlInput.classList.contains("is-invalid")) {
        siteUrlInput.classList.remove("is-invalid");
    }
    if (siteUrlInput.classList.contains("is-valid")) {
        siteUrlInput.classList.remove("is-valid");
    }

    clearForm();
    displayAllSites();
}

function productSearch(term) {
    var cartona = "";

    for (i = 0; i < allSites.length; i++) {
        if (allSites[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartona += 
                `
                <tr>
                    <td>${i + 1}</td>
                    <td>${allSites[i].name}</td>
                    <td>
                        <a href="${allSites[i].url}" target="_blank" class="btn btn-success btn-sm"><i class="fas fa-eye"></i> Visit</a>
                    </td>
                    <td>
                        <div onclick="setFormForUpdate(${i})" class=" btn btn-warning btn-sm"><i class="fas fa-edit"></i> Update</div>
                        <div onclick="deleteSites(${i})" id="deletedIndex" class=" btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Delete</div>
                    </td>
                </tr>
                `;
        }
    }
    tBody.innerHTML = cartona;
}

function validateInpute(element) {
    var regex = {
        siteName:   /[A-z0-9]{4,}$/,
        siteURL:    /^((ftp|http|https):\/\/)?(www\.([A-z0-9]+)\.([A-z]{2,})|([A-z0-9]+)\.([A-z]{2,}))/
    }

    if (regex[element.id].test(element.value) == true) {
        if (element.nextElementSibling.classList.contains("d-block")) {
            element.nextElementSibling.classList.replace("d-block", "d-none");
        }
        if (element.classList.contains("is-invalid")) {
            element.classList.remove("is-invalid");
        }
        element.classList.add("is-valid");
    } else {
        element.nextElementSibling.classList.replace("d-none", "d-block");
        if (element.classList.contains("is-valid")) {
             element.classList.remove("is-valid");
        }
        element.classList.add("is-invalid");

    }

}



// ==> 14-23  //  24-14  //  15-27 //  28-7  //  8-18