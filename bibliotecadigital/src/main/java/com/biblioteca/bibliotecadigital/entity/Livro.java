package com.biblioteca.bibliotecadigital.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "tb_livros")
public class Livro {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    @org.hibernate.annotations.JdbcTypeCode(java.sql.Types.VARCHAR)
    private UUID livroId;



    private String titulo;
    private String autor;
    private int ano;
    private String editora;
    private boolean disponivel;


    public Livro() {
    }


    public Livro(String titulo, String autor, int ano, String editora, boolean disponivel) {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
        this.editora = editora;
        this.disponivel = disponivel;
    }

    // Getters e Setters
    public UUID getLivroId() {
        return livroId;
    }

    public void setLivroId(UUID livroId) {
        this.livroId = livroId;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public String getEditora() {
        return editora;
    }

    public void setEditora(String editora) {
        this.editora = editora;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }
}




