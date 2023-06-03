const maxCertificates = 98;
const certificatesPerPage = 20;

let certificates = document.getElementById('certificates');
let tags = document.getElementById('tags');
let topButton = document.getElementById("myBtn");
let selectTag = document.getElementById("select-tag");

let lastScrollPosition;
let scrollSet = false;

let nextItem = 0;
let searchString = '';
let searchTagString = '';

let certificateObjects = JSON.parse(localStorage.getItem('certificates'));
let tagObjects = JSON.parse(localStorage.getItem('tags'));

let filteredCerts = certificateObjects;

createObjects();
createTagElements(tagObjects);

function stopLoad() {
    return nextItem > Math.min(filteredCerts.length - 1, maxCertificates);
}

let loadMore = function () {
    if (stopLoad()) {
        return;
    }

    for (let i = 0; i < Math.min(certificatesPerPage, filteredCerts.length); i++) {
        let cert = filteredCerts[nextItem];
        createCertificateElement(cert);

        nextItem++;
        if (stopLoad()) {
            break;
        }
    }
}

certificates.addEventListener('scroll', function () {
    scrollFunction();
    if (certificates.scrollTop + certificates.clientHeight >= certificates.scrollHeight - 1) {
        loadMore();
    }
});

loadMore();


function debounce(callback, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            callback.apply(this, args);
        }, wait);
    };
}

function searchData(value) {
    if (!value) {
        clearCertificateElements();
        resetSearchCertificatesParameters();
        filterByTags()
        topFunction();
        loadMore();
    }
}

function filterByTagClick(id) {
    resetSearchTagsParameters();
    topFunction();

    selectTag.value = id;
    searchTagString = id;

    clearCertificateElements();

    if (searchString || !id) {
        filterByCertificateFields();
    }

    if (searchTagString) {
        filterByTags();
    }

    loadMore();
}

function resetSearchCertificatesParameters() {
    searchString = '';
    nextItem = 0;
}

function resetSearchTagsParameters() {
    searchTagString = '';
    nextItem = 0;
}

function clearCertificateElements() {
    while (certificates.lastElementChild) {
        certificates.removeChild(certificates.lastElementChild);
    }
}

function filterByCertificateFields() {
    filteredCerts = certificateObjects.filter(cert => cert.name.includes(searchString) || cert.description.includes(searchString));
}

function filterByTags() {
    if (!searchString) {
        filteredCerts = certificateObjects;
    }
    filteredCerts = filteredCerts.filter(cert => cert.tags.some(tag => tag.id == searchTagString));
}


window.addEventListener('keyup', debounce(() => {
    resetSearchCertificatesParameters()

    searchString = document.getElementById("search-input").value;

    if (searchString) {
        filterByCertificateFields();
    }

    if (searchTagString) {
        filterByTags();
    }

    clearCertificateElements();
    topFunction();
    loadMore();
}, 1000))

function randomIntFromInterval(min, max, round = false) { // min and max included
    let rnd = Math.random() * (max - min + 1) + min;
    if (round) {
        return Math.round(rnd)
    } else {
        return rnd.toFixed(2);
    }
}

function createObjects() {
    let tags = [];
    for (let i = 1; i < 6; i++) {
        let tag = {
            'id': i,
            'name': 'Tag #' + i
        };
        tags.push(tag)
    }
    localStorage.setItem('tags', JSON.stringify(tags));

    const now = new Date();

    let certificates = [];
    for (let i = 1; i < 100; i++) {
        let certificate = {
            'id': i,
            'name': 'Certificate #' + i,
            'description': 'description' + i,
            'price': randomIntFromInterval(50, 300),
            'duration': randomIntFromInterval(10, 50, true),
            'tags': [
                tags[randomIntFromInterval(0, 1, true)],
                tags[randomIntFromInterval(2, 3, true)]
            ],
            'createDate': addDays(now, -randomIntFromInterval(1, 5)),
            'lastUpdateDate': addDays(now, randomIntFromInterval(1, 5))
        };
        certificates.push(certificate);
    }

    certificates.sort((a, b) => new Date(a.createDate) - new Date(b.createDate));

    localStorage.setItem('certificates', JSON.stringify(certificates));
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function createTagElements(tags) {
    for (const tag of tags) {
        createTagElement(tag);
    }
}

function createTagElement(tag) {
    const divTag = document.createElement('div');
    divTag.className = 'tag';
    divTag.onclick = function () {
        filterByTagClick(tag.id)
    }

    const divTagImage = document.createElement('div');
    divTagImage.className = 'tag-image';
    divTagImage.innerText = 'T-' + tag.id;
    divTag.appendChild(divTagImage);

    const divTagName = document.createElement('div');
    divTagName.className = 'tag-name';
    divTagName.innerText = tag.name;
    divTag.appendChild(divTagName);

    tags.appendChild(divTag);
}

function clickOnCertificate(id) {
    let filtered = filteredCerts.filter(function (cert) {
        return cert.id === id;
    });
    console.log(filtered[0])
}

function createCertificateElement(cert) {
    const divCert = document.createElement('div');
    divCert.className = 'certificate';
    divCert.onclick = function () {
        clickOnCertificate(cert.id)
    }

    const divCertImage = document.createElement('div');
    divCertImage.className = 'certificate-image';
    divCertImage.innerText = 'C-' + cert.id;
    divCert.appendChild(divCertImage);

    const divCertDescription = document.createElement('div');
    divCertDescription.className = 'certificate-description';
    divCert.appendChild(divCertDescription);


    const divCertTitle = document.createElement('div');
    divCertTitle.className = 'certificate-title';
    divCertDescription.appendChild(divCertTitle);

    const divCertTitleText = document.createElement('div');
    divCertTitleText.className = 'certificate-title-text';
    divCertTitleText.innerText = cert.name;
    divCertTitle.appendChild(divCertTitleText);

    const divCertTitleIcon = document.createElement('span');
    divCertTitleIcon.classList.add('certificate-title-icon', 'material-icons');
    divCertTitleIcon.innerText = 'favorite';
    divCertTitle.appendChild(divCertTitleIcon);


    const divCertBrief = document.createElement('div');
    divCertBrief.className = 'certificate-brief';
    divCertDescription.appendChild(divCertBrief);

    const divCertBriefText = document.createElement('div');
    divCertBriefText.className = 'certificate-brief-text';
    divCertBriefText.innerText = cert.tags.map(item => item['name']).join(', ');
    divCertBrief.appendChild(divCertBriefText);

    const diffTime = Math.abs(new Date() - new Date(cert.createDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const divCertBriefExpires = document.createElement('div');
    divCertBriefExpires.className = 'certificate-brief-expires';
    divCertBriefExpires.innerText = 'Expires in ' + (cert.duration - diffDays) + ' days';
    divCertBrief.appendChild(divCertBriefExpires);


    const divCertDetails = document.createElement('div');
    divCertDetails.className = 'certificate-details';
    divCertDescription.appendChild(divCertDetails);

    const divCertDetailsPrice = document.createElement('div');
    divCertDetailsPrice.className = 'certificate-details-price';
    divCertDetailsPrice.innerText = '$' + cert.price;
    divCertDetails.appendChild(divCertDetailsPrice);

    const divCertDetailsButton = document.createElement('button');
    divCertDetailsButton.className = 'certificate-details-button';
    divCertDetailsButton.innerText = 'Add to Cart';
    divCertDetails.appendChild(divCertDetailsButton);

    certificates.appendChild(divCert);
}

function scrollFunction() {
    if (certificates.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = 'block';
    } else {
        topButton.style.display = 'none';
    }

    saveScrollPosition()
}

function topFunction() {
    certificates.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function saveScrollPosition() {
    setTimeout(
        function () {
            if (!scrollSet) {
                lastScrollPosition = certificates.scrollTop;
                scrollSet = true;
            }
        }, 5000);
}

function returnToLastScrollPosition() {
    certificates.scrollTo(0, lastScrollPosition);
    scrollSet = false;
}
