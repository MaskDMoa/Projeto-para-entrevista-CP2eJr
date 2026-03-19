
let isEntrada = null

function abrirModal() {
    document.getElementById('Modal').showModal()
}

function fecharModal() {
    document.getElementById('Modal').close()
}

function btnentry() {
    isEntrada = true
    document.getElementById('btn-entrada').classList.add('ativo-entrada')
    document.getElementById('btn-saida').classList.remove('ativo-saida')
}

function btnout() {
    isEntrada = false
    document.getElementById('btn-saida').classList.add('ativo-saida')
    document.getElementById('btn-entrada').classList.remove('ativo-entrada')
}

function btncadastrar() {

    if (isEntrada === null) {
        alert('Selecione uma opção de entrada ou saída')
        return
    }

    if (isEntrada) {
        alert('Entrada selecionada')
        document.getElementById('btn-entrada').classList.remove('ativo-entrada')
    }else {
        alert('Saída selecionada')
        document.getElementById('btn-saida').classList.remove('ativo-saida')
    }

    isEntrada = null
    fecharModal()
}