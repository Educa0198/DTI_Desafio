package com.DTI_DESAFIO.backend.service;

import com.DTI_DESAFIO.backend.model.Aluno;
import com.DTI_DESAFIO.backend.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlunoService {

    @Autowired 
    private AlunoRepository repository;

    // 1. Salvar ou Atualizar um Aluno no banco de dados
    public Aluno salvarAluno(Aluno aluno) {
        return repository.save(aluno);
    }

    // 2. Buscar todos os alunos
    public List<Aluno> listarTodos() {
        return repository.findAll();
    }

    // 3. Calcular a média da turma para CADA uma das 5 disciplinas
    public float[] calcularMediasTurma() {
        List<Aluno> alunos = repository.findAll();
        float[] medias = new float[5];
        if (alunos.isEmpty()) return medias;

        for (Aluno a : alunos) {
            medias[0] += a.getNota1();
            medias[1] += a.getNota2();
            medias[2] += a.getNota3();
            medias[3] += a.getNota4();
            medias[4] += a.getNota5();
        }

        for (int i = 0; i < 5; i++) {
            medias[i] = medias[i] / alunos.size();
        }
        return medias;
    }

    // 4. Calcular a Média Geral da turma (para usar de base)
    public float calcularMediaGeralTurma() {
        List<Aluno> alunos = repository.findAll();
        if (alunos.isEmpty()) return 0;

        float somaGeral = 0;
        for (Aluno a : alunos) {
            somaGeral += a.calcularMedia(); // Usa o método que criamos no Model!
        }
        return somaGeral / alunos.size();
    }

    // 5. Filtrar alunos com média ACIMA da média da turma
    public List<Aluno> buscarAlunosAcimaDaMedia() {
        List<Aluno> alunos = repository.findAll();
        float mediaTurma = calcularMediaGeralTurma();
        List<Aluno> destaques = new ArrayList<>();

        for (Aluno a : alunos) {
            if (a.calcularMedia() > mediaTurma) {
                destaques.add(a);
            }
        }
        return destaques;
    }

    // 6. Filtrar alunos com presença ABAIXO de 75%
    public List<Aluno> buscarAlunosRiscoFrequencia() {
        List<Aluno> alunos = repository.findAll();
        List<Aluno> risco = new ArrayList<>();

        for (Aluno a : alunos) {
            if (a.getPresenca() < 75) {
                risco.add(a);
            }
        }
        return risco;
    }
}