package com.DTI_DESAFIO.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Tells Spring: "Create a database table out of this class"
@Table(name = "alunos") // Names the table in PostgreSQL
@Data // LOMBOK MAGIC: Auto-generates all Getters and Setters behind the scenes!
@NoArgsConstructor // LOMBOK MAGIC: Creates the empty constructor required by the database
public class Aluno {

    @Id // This is the Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increments (1, 2, 3...)
    private Long id;

    private String nome;

    private float nota1;
    private float nota2;
    private float nota3;
    private float nota4;
    private float nota5;

    private int presenca; 

    public float calcularMedia() {
        return (nota1 + nota2 + nota3 + nota4 + nota5) / 5.0f;
    }
}