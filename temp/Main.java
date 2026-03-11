package temp;
import java.util.Scanner;

import backend.src.main.java.com.DTI_DESAFIO.backend.service.AlunoService;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        AlunoService service = new AlunoService();
        Aluno a1 = service.cadastrar(sc);

        sc.close();
    }
}