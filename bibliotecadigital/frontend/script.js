const apiUrl = 'http://localhost:8080/livros';

// Carregar livros ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarLivros);

// Função para carregar todos os livros
function carregarLivros() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(livros => {
      const lista = document.getElementById('listaLivros');
      lista.innerHTML = '';

      livros.forEach(livro => {
        const item = document.createElement('li');
        item.innerHTML = `
          <strong>${livro.titulo}</strong> - ${livro.autor} (${livro.ano})<br>
          Editora: ${livro.editora} - Disponível: ${livro.disponivel ? 'Sim' : 'Não'}
          <br>
          <button onclick="deletarLivro('${livro.livroId}')">Excluir</button>
          <button onclick='editarLivro(${JSON.stringify(livro)})'>Editar</button>
        `;
        lista.appendChild(item);
      });
    })
    .catch(err => console.error('Erro ao carregar livros:', err));
}

// Função para cadastrar um novo livro
function cadastrarLivro(e) {
  e.preventDefault();

  const livro = {
    titulo: document.getElementById('titulo').value,
    autor: document.getElementById('autor').value,
    ano: parseInt(document.getElementById('ano').value),
    editora: document.getElementById('editora').value,
    disponivel: document.getElementById('disponivel').checked
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(livro)
  })
  .then(res => {
    if (!res.ok) throw new Error('Erro ao cadastrar livro');
    return res.json();
  })
  .then(data => {
    document.getElementById('mensagem').textContent = 'Livro cadastrado com sucesso!';
    document.getElementById('livro-form').reset();
    carregarLivros();
  })
  .catch(err => {
    console.error(err);
    document.getElementById('mensagem').textContent = 'Erro ao cadastrar livro.';
  });
}

// Função para excluir um livro
function deletarLivro(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
  .then(() => carregarLivros())
  .catch(err => console.error('Erro ao excluir livro:', err));
}

// Função para editar um livro
function editarLivro(livro) {
  document.getElementById('titulo').value = livro.titulo;
  document.getElementById('autor').value = livro.autor;
  document.getElementById('ano').value = livro.ano;
  document.getElementById('editora').value = livro.editora;
  document.getElementById('disponivel').checked = livro.disponivel;

  const form = document.getElementById('livro-form');
  form.removeEventListener('submit', cadastrarLivro);

  form.onsubmit = function(e) {
    e.preventDefault();

    const livroAtualizado = {
      titulo: document.getElementById('titulo').value,
      autor: document.getElementById('autor').value,
      ano: parseInt(document.getElementById('ano').value),
      editora: document.getElementById('editora').value,
      disponivel: document.getElementById('disponivel').checked
    };

    fetch(`${apiUrl}/${livro.livroId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livroAtualizado)
    })
    .then(res => res.json())
    .then(() => {
      document.getElementById('mensagem').textContent = 'Livro atualizado com sucesso!';
      form.reset();
      form.onsubmit = cadastrarLivro;
      carregarLivros();
    })
    .catch(() => {
      document.getElementById('mensagem').textContent = 'Erro ao atualizar livro.';
    });
  };
}

// Vincular função de cadastro ao formulário
document.getElementById('livro-form').addEventListener('submit', cadastrarLivro);
