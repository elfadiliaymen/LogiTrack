public class challenge02{
    public static void main(String[] args){
        char[] commandes = {'U', 'U', 'R', 'L', 'D', 'U'};

        int x = 0;
        int y = 0;

        for(int i = 0 ; i < commandes.length; i++){
            if(commandes[i] == 'U' ){
                y = y + 1 ;

           }else if(commandes[i] == 'L'){
               x = x - 1 ;

           }else if(commandes[i] == 'D'){
               y = y - 1;
          }else if(commandes[i] == 'R' ){
                x = x + 1 ;

           }
        }

        System.out.println(" Position finale : " + x +","+ y );

        if( x == 0 && y == 0){
            System.out.println(" Le robot est revenu au point de départ");
        }

    }

}

