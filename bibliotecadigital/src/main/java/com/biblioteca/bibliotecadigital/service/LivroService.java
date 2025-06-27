package com.biblioteca.bibliotecadigital.service;

import com.biblioteca.bibliotecadigital.entity.Livro;
import com.biblioteca.bibliotecadigital.repository.LivroRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LivroService {

    private final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }


    public Livro salvar(Livro livro) {
        return livroRepository.save(livro);
    }


    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }


    public Optional<Livro> buscarPorId(UUID id) {
        return livroRepository.findById(id);
    }


    public void deletar(UUID id) {
        livroRepository.deleteById(id);
    }

    public Livro atualizar(UUID id, Livro livroAtualizado) {
        return livroRepository.findById(id).map(livro -> {
            livro.setTitulo(livroAtualizado.getTitulo());
            livro.setAutor(livroAtualizado.getAutor());
            livro.setAno(livroAtualizado.getAno());
            livro.setEditora(livroAtualizado.getEditora());
            livro.setDisponivel(livroAtualizado.isDisponivel());
            return livroRepository.save(livro);
        }).orElse(null);
    }
}