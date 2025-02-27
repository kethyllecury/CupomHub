window.onload = function() {
    
    const companies = JSON.parse(localStorage.getItem('companies')) || [];
    const company = companies[0]; 

    if (company) {
        
        document.getElementById('companyName').textContent = company.name || 'Não informado';
        document.getElementById('companyCNPJ').textContent = company.cnpj || 'Não informado';
        document.getElementById('companyAddress').textContent = company.address || 'Não informado';
        document.getElementById('companyPhone').textContent = company.contact || 'Não informado';

      
        const couponList = document.getElementById('couponList');
        
        if (company.coupons && company.coupons.length > 0) {
            company.coupons.forEach((coupon, index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('coupon-item');

                const couponContent = `
                    <div>
                        <h3>${coupon.name}</h3>
                        <p><strong>Descrição:</strong> ${coupon.description || 'Desconto válido para qualquer produto da loja. Não acumulativo.'}</p>
                        <p><strong>Validade:</strong> ${coupon.expirationDate || 'Até 30/06/2025'}</p>
                    </div>
                    <button class="remove-button" data-index="${index}">Remover</button>
                `;
                listItem.innerHTML = couponContent;

                couponList.appendChild(listItem);
            });
        } else {
        
            const noCouponsMessage = document.createElement('p');
            noCouponsMessage.textContent = 'Nenhum cupom cadastrado.';
            couponList.appendChild(noCouponsMessage);
        }

        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', function(event) {
                const index = event.target.getAttribute('data-index');
                removeCoupon(index);
            });
        });
    } else {
        alert("Nenhuma empresa cadastrada.");
    }
}

function removeCoupon(index) {
    const companies = JSON.parse(localStorage.getItem('companies')) || [];
    const company = companies[0];

    if (company) {

        company.coupons.splice(index, 1);

        localStorage.setItem('companies', JSON.stringify(companies));

        location.reload();
    }
}
