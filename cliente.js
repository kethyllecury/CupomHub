document.addEventListener('DOMContentLoaded', function () {
    const companySelect = document.getElementById('company');
    const couponSelect = document.getElementById('coupon');
    
    const companies = JSON.parse(localStorage.getItem('companies')) || [];

    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company.name;
        option.textContent = company.name;
        companySelect.appendChild(option);
    });

    companySelect.addEventListener('change', function () {
        const selectedCompany = companySelect.value;
        couponSelect.innerHTML = '<option value="">Selecione um cupom...</option>';

        if (selectedCompany) {
            const company = companies.find(c => c.name === selectedCompany);
            company.coupons.forEach(coupon => {
                const option = document.createElement('option');
                option.value = coupon;
                option.textContent = coupon;
                couponSelect.appendChild(option);
            });
        }
    });
});

function validateForm() {
    const form = document.getElementById('clientForm');
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            valid = false;
            alert(`Por favor, preencha o campo: ${field.previousElementSibling.innerText}`);
        }
    });

    if (valid) {
        alert("Os cupons serão enviados para o seu e-mail assim que estiverem disponíveis.");
    }

    return valid;
}
