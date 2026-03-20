
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

function formatarBRL(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarData(dataISO) {
    if(!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

function calcularTotais() {
    const entradas = transacoes
        .filter(t => t.tipo === 'entrada')
        .reduce((soma, t) => soma + t.preco, 0);

    const saidas = transacoes
        .filter(t => t.tipo === 'saida')
        .reduce((soma, t) => soma + t.preco, 0);

    const total = entradas - saidas;

    document.getElementById('total-entradas').textContent = formatarBRL(entradas);
    document.getElementById('total-saidas').textContent = formatarBRL(saidas);
    document.getElementById('total').textContent = formatarBRL(total);
}

function renderTransacao() {
    const busca = document.getElementById('busca').value.toLowerCase();
    const tbody = document.getElementById('corpo-tabela');
    const semResultados = document.getElementById('sem-resultados');
 
    const filtradas = transacoes.filter(t =>
        t.descricao.toLowerCase().includes(busca) ||
        t.categoria.toLowerCase().includes(busca)
    );
 
    if (filtradas.length === 0) {
        tbody.innerHTML = '';
        semResultados.style.display = 'block';
        return;
    }
 
    semResultados.style.display = 'none';

    const ordenadas = [...filtradas].reverse();
 
    tbody.innerHTML = ordenadas.map(t => {
        const isEntradaItem = t.tipo === 'entrada';
        const valorFormatado = isEntradaItem
            ? formatarBRL(t.preco)
            : `- ${formatarBRL(t.preco)}`;
        const classe = isEntradaItem ? 'valor-entrada' : 'valor-saida';
 
        return `
            <tr>
                <td class="td-descricao">${t.descricao}</td>
                <td class="${classe}">${valorFormatado}</td>
                <td class="td-categoria">${t.categoria}</td>
                <td class="td-data">${formatarData(t.data)}</td>
            </tr>
        `;
    }).join('');
}


function salvarJSON (decri, prec, cat){
    const hoje = new Date().toISOString().split('T')[0];

    const data = {
        descricao: decri.value,
        preco: parseFloat(prec.value),
        categoria: cat.value,
        tipo: isEntrada ? 'entrada' : 'saida',
        data: hoje
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

    if (!decri.value.trim() || !prec.value || !cat.value.trim()) {
        alert('Preencha todos os campos');
        return;
    }

    salvarJSON(decri, prec, cat, isEntrada);

    document.getElementById('btn-entrada').classList.remove('ativo-entrada');
    document.getElementById('btn-saida').classList.remove('ativo-saida');

    isEntrada = null;

    calcularTotais();
    renderTransacao();
    fecharModal();
}

calcularTotais();
renderTransacao();
