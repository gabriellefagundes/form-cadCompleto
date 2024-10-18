document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();
    if (validarCPF() && checarEmail()) {
        alert('Formulário enviado com sucesso!');
    }
});

// Validação de Email 
function checarEmail() {
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return false;
    }
    return true;
}



// Validação de CPF
function validarCPF() {
    const cpf = document.getElementById('cpf').value.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        alert('CPF inválido.');
        return false;
    }

    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) {
        alert('CPF inválido.');
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) {
        alert('CPF inválido.');
        return false;
    }

    return true;
}

// API de CEP (ViaCEP)
document.getElementById('cep').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('CEP inválido.');
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

            document.getElementById('logradouro').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('localidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
            document.getElementById('complemento').value = data.complemento;
        })
        .catch(() => {
            alert('Erro ao buscar CEP.');
        });
});
