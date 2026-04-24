import java.util.Scanner;

public class Main {
 // 1
    public static void main ( String[] args){
        Scanner input = new Scanner(System.in);
        int unite = 0;

        System.out.print("Entrez votre consomation  : ");
        if(input.hasNextInt()){
            unite = input.nextInt();
        }else{
            System.out.print("Error ");
            input.close();
            return;
        }
        double output;
        double r;
        double rest;

       if( unite <= 100){
           output = unite * 0.8;
       }else if(unite <= 300){
           r = unite - 100;
           if(r <= 100){
               rest  = r * 0.8;
           }else {
               rest = r * 1.2;
           }

           output =  100 * 1.2 + rest ;

       }else {
           r = unite - 300;
           if(r <= 100) {
               rest  = r * 0.8;
           }else if(r < 300) {
               rest = r * 1.2;
           } else {
               rest = r * 1.5;
           }

           output = 100 * 0.8 + 200 * 1.2 + rest;
       }

       double taxe = output * 0.10;
       double afterTax = output + taxe;

       System.out.println("Total : "+output + " MAD");
        System.out.println("Taxe (10%) : " + taxe + " MAD");
        System.out.println("Facture totale : " + afterTax + " MAD");

       input.close();
    }
    }
