import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup;
  name: AbstractControl;
  gender: AbstractControl;
  dob: AbstractControl;
  email: AbstractControl;
  //hobbies: AbstractControl;
  mobiles: AbstractControl;
  addresses: AbstractControl;
  hobbiesa: AbstractControl;
  hobbiesb: AbstractControl;
  hobbiesc: AbstractControl;

  userlist: Array<any>=[];
  existData: Array<any>=[];

  constructor(
    private formbuilder: FormBuilder,
    private service: UserService,
    private router: Router
  ) {
    this.registerform = formbuilder.group({
      name: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(40), Validators.pattern(/^[a-zA-Z ]*$/)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
      mobiles: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      addresses: ['', Validators.required],
      hobbiesa: ['', Validators.required],
      hobbiesb: ['', Validators.required],
      hobbiesc: ['', Validators.required],
      gender: ['', Validators.required],
    });

    this.name = this.registerform.controls['name'];
    this.dob = this.registerform.controls['dob'];
    this.email = this.registerform.controls['email'];
    this.mobiles = this.registerform.controls['mobiles'];
    this.addresses = this.registerform.controls['addresses'];
    this.gender = this.registerform.controls['gender'];
    this.hobbiesa = this.registerform.controls['hobbiesa'];
    this.hobbiesb = this.registerform.controls['hobbiesb'];
    this.hobbiesc = this.registerform.controls['hobbiesc'];
   
   }
  
 
  ngOnInit() {
    this.service.currentMessage.subscribe(data => {
      console.log('jgfghjfjjhb', data);        
      if(data){
        let d = JSON.parse(data);
        console.log('exist data : ', d);
        this.existData = d 
        // this.service.changeMessage(JSON.stringify(d));
        // this.router.navigate(['/list']);
      }             
    });
  }
  
  onRegistrationSubmit(){
    // console.log('hhhhhhhh',this.registerform.value.gender);
     if(
        this.registerform.value.name   && this.registerform.value.dob  && this.registerform.value.email           
        && this.registerform.value.mobiles  && this.registerform.value.addresses  && this.registerform.value.gender  
        ){
       let sendData = {
         name: this.registerform.value.name, 
         dob: this.registerform.value.dob,
         email: this.registerform.value.email,
         mobiles: this.registerform.value.mobiles,
         addresses: this.registerform.value.addresses,
         gender: this.registerform.value.gender,
         hobbiesa: this.hobbya(this.registerform.value.hobbiesa),
         hobbiesb: this.hobbyb(this.registerform.value.hobbiesb),
         hobbiesc: this.hobbyc(this.registerform.value.hobbiesc)
       }

       this.userlist.push(sendData);
       console.log('data.........', this.userlist);
      //  this.service.m
      


      if(this.existData && this.existData.length > 0){
        console.log('in if  ', this.existData);
        
        this.existData.push(sendData);
          this.service.changeMessage(JSON.stringify(this.existData));
          this.router.navigate(['/list']);
      }else{
        console.log('in else  ', this.existData);
        this.service.changeMessage(JSON.stringify(this.userlist));
        this.router.navigate(['/list']);
      }
      
      }
    }

    hobbya(value){
      if(value == true){
        return "a" ;
      }
    }
    hobbyb(value){
      if(value == true){
        return "b" ;
      }
    }
    hobbyc(value){
      if(value == true){
        return "c" ;
      }
    }
}
