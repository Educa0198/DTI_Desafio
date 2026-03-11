package com.DTI_DESAFIO.backend.controller;

import com.DTI_DESAFIO.backend.model.Aluno;
import com.DTI_DESAFIO.backend.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Tells Spring this class handles web requests and returns JSON
@RequestMapping("/api/alunos") // The base URL for everything in this file
@CrossOrigin(origins = "*") 
public class AlunoController {

    @Autowired
    private AlunoService service;

    // 1. POST: Receive a new student from React and save it
    // URL: http://localhost:8080/api/alunos
    @PostMapping
    public Aluno cadastrar(@RequestBody Aluno aluno) {
        return service.salvarAluno(aluno);
    }

    // 2. GET: Return a list of all students
    // URL: http://localhost:8080/api/alunos
    @GetMapping
    public List<Aluno> listarTodos() {
        return service.listarTodos();
    }

    // 3. GET: Return the class averages for the 5 subjects
    // URL: http://localhost:8080/api/alunos/medias-turma
    @GetMapping("/medias-turma")
    public float[] getMediasTurma() {
        return service.calcularMediasTurma();
    }

    // 4. GET: Return students who are above the general class average
    // URL: http://localhost:8080/api/alunos/acima-media
    @GetMapping("/acima-media")
    public List<Aluno> getDestaquesMedia() {
        return service.buscarAlunosAcimaDaMedia();
    }

    // 5. GET: Return students with less than 75% presence
    // URL: http://localhost:8080/api/alunos/risco-frequencia
    @GetMapping("/risco-frequencia")
    public List<Aluno> getRiscoFrequencia() {
        return service.buscarAlunosRiscoFrequencia();
    }
}