import java.util.Scanner;

public class Challenge03{

    public static void main(String args[]){
        Scanner input = new Scanner(System.in);
        int M = 0;
        int N = 0;

        System.out.print("Entrez le nombre de Bancs : ");
        if(input.hasNextInt()){
             M = input.nextInt();
        }else {
            System.out.print("Error ");
            input.close();
            return;
        }

        System.out.print("Entrez le nombre de Étudiants : ");

        if(input.hasNextInt()){
            N = input.nextInt();
        }else {
            System.out.print("Error ");
            input.close();
            return;
        }
int etudiant = 1;

        for(int i = 1 ; i <= M; i++){
                System.out.println( "Banc : " + i + ":" + "Etudiant :" + etudiant + "Etudiant :" + (etudiant + 1) );
            etudiant = etudiant + 2;
            }

        }
    }

