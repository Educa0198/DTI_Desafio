package com.DTI_DESAFIO.backend.repository;

import com.DTI_DESAFIO.backend.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    
}