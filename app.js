function saveCompanyData(event) {
    event.preventDefault();

    const companyName = document.getElementById('companyName').value;
    const cnpj = document.getElementById('cnpj').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const discountCoupons = Array.from(document.getElementById('discountCoupons').selectedOptions).map(option => option.value);
    const customCoupon = document.getElementById('customCoupon').value.trim();

    if (customCoupon) {
        discountCoupons.push(customCoupon);
    }

    const companies = JSON.parse(localStorage.getItem('companies')) || [];

    const newCompany = {
        name: companyName,
        cnpj,
        contact,
        email,
        coupons: discountCoupons
    };
    companies.push(newCompany);

    localStorage.setItem('companies', JSON.stringify(companies));

    alert("Empresa cadastrada com sucesso!");

    setTimeout(function() {
        document.getElementById('companyForm').reset();
        location.reload(); 
    }, 1000);
}

function addCoupon() {
    const couponInput = document.getElementById('customCoupon');
    const couponValue = couponInput.value.trim();
    const couponSelect = document.getElementById('discountCoupons');
    
    if (couponValue) {
        const newOption = document.createElement('option');
        newOption.value = couponValue;
        newOption.textContent = couponValue;
        couponSelect.appendChild(newOption);
        couponInput.value = "";
        alert("Cupom adicionado com sucesso!");
    } else {
        alert("Digite um nome válido para o cupom.");
    }

    updateCouponList();
}

function updateCouponList() {
    const couponSelect = document.getElementById('discountCoupons');
    const couponList = document.getElementById('couponList');
    const selectedOptions = Array.from(couponSelect.selectedOptions);

    couponList.innerHTML = '';

    selectedOptions.forEach(option => {
        if (!Array.from(couponSelect.options).some(o => o.value === option.value && o.hasAttribute('data-default'))) {
            const listItem = document.createElement('li');
            listItem.classList.add('coupon-item');
            listItem.textContent = option.text;
            
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            removeButton.textContent = 'Remover';
            removeButton.onclick = function() {
                option.selected = false;
                updateCouponList();
            };
            
            listItem.appendChild(removeButton);
            couponList.appendChild(listItem);
        }
    });
}

document.getElementById('discountCoupons').addEventListener('change', updateCouponList);

