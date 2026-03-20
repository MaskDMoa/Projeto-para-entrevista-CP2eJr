
let isEntrada = null;
const decri = document.getElementById('descricao');
const prec = document.getElementById('preco');
const cat = document.getElementById('categoria');

let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];

function abrirModal() {
    document.getElementById('Modal').showModal();
}

function fecharModal() {
    document.getElementById('Modal').close();
}

function btnentry() {
    isEntrada = true;
    document.getElementById('btn-entrada').classList.add('ativo-entrada');
    document.getElementById('btn-saida').classList.remove('ativo-saida');
}

function btnout() {
    isEntrada = false;
    document.getElementById('btn-saida').classList.add('ativo-saida');
    document.getElementById('btn-entrada').classList.remove('ativo-entrada');
}

function salvarJSON (decri, prec, cat){
    const data = {
        descricao: decri.value,
        preco: parseFloat(prec.value),
        categoria: cat.value,
        tipo: isEntrada ? 'entrada' : 'saida'
    }   

    try {
        transacoes.push(data);
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
        console.log('Salvo com sucesso!', data);
    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert('Erro ao salvar a transação');
    }

    decri.value = '';
    prec.value = '';    
    cat.value = '';
}

function btncadastrar() {

    if (isEntrada === null) {
        alert('Selecione uma opção de entrada ou saída');
        return;
    }

    if (isEntrada) {
        alert('Entrada selecionada');
    }else {
        alert('Saída selecionada');
    }

    salvarJSON(decri, prec, cat, isEntrada);

    document.getElementById('btn-entrada').classList.remove('ativo-entrada');
    document.getElementById('btn-saida').classList.remove('ativo-saida');

    isEntrada = null;
    fecharModal();
}