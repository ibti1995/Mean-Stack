import { AbstractControl } from '@angular/forms';
/*el import hedhi nesta3mlouha ki yabda 3anna validateur optionnel 
w el validator wel form control y heritiw menha heka 3lech 3ayatnela toul 


7aja satic teba3 l cass w ma naccedilou ken ki nabda teba3 l class 
n3aytoulhom a travers el class mouch a travers l objet */
export class PasswordValidators {

    static passwordShouldMatch(control: AbstractControl) {  /*3andha acces l tout les attributs lel classe mta3na 
         */
        let password = control.get('pass');
        let repassword = control.get('repass');
                
        if (password.value !== repassword.value){
            return { passwordShouldMatch: true };
        }
        return false;
    }
}