import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editform: FormGroup;
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
  totaldata: any;
  para: string;
  userlist: Array<any>;
  checkbox1: boolean = true;
  checkbox2: boolean = true;
  checkbox3: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { 

    this.route.paramMap.subscribe(params => {
      console.log('paarams', params.get('name'));
      this.para =  params.get('name');     
    });

    this.editform = formbuilder.group({
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

    this.name = this.editform.controls['name'];
    this.dob = this.editform.controls['dob'];
    this.email = this.editform.controls['email'];
    this.mobiles = this.editform.controls['mobiles'];
    this.addresses = this.editform.controls['addresses'];
    this.gender = this.editform.controls['gender'];
    this.hobbiesa = this.editform.controls['hobbiesa'];
    this.hobbiesb = this.editform.controls['hobbiesb'];
    this.hobbiesc = this.editform.controls['hobbiesc'];
   
   }
  

  ngOnInit() {
    this.getdata();
  }

  getdata(){
    this.service.currentMessage.subscribe(data => {
      this.totaldata = JSON.parse(data);
      console.log('totaldata........',this.totaldata);
      let currentItem = this.totaldata.filter(item => {
        if(item.email == this.para){
          return item;
        }
      });

      if(currentItem && currentItem.length > 0){
        this.editform.patchValue({
          name: currentItem[0].name,
          gender: currentItem[0].gender,
          email: currentItem[0].email,
          mobiles: currentItem[0].mobiles,
          addresses: currentItem[0].addresses
        });
      }      
    });
  }

  hobby(value){
    if(value == undefined){
      return false;
    }
    else{
      return true;
    }
  }
  






  onEditSubmit(){
    // console.log('hhhhhhhh',this.registerform.value.gender);
     if(
        this.editform.value.name   && this.editform.value.dob  && this.editform.value.email           
        && this.editform.value.mobiles  && this.editform.value.addresses  && this.editform.value.gender  
        ){
       let sendData = {
         name: this.editform.value.name, 
         dob: this.editform.value.dob,
         email: this.editform.value.email,
         mobiles: this.editform.value.mobiles,
         addresses: this.editform.value.addresses,
         gender: this.editform.value.gender,
         hobbiesa: this.hobbya(this.editform.value.hobbiesa),
         hobbiesb: this.hobbyb(this.editform.value.hobbiesb),
         hobbiesc: this.hobbyc(this.editform.value.hobbiesc)
       }

      //  this.userlist.push(sendData);
      //  console.log('data.........', this.userlist);
      //  this.service.m
      


      if(this.totaldata && this.totaldata.length > 0){
        console.log('in if  ', this.totaldata);

        let currentItem = this.totaldata.filter(item => {
          if(item.email != this.para){
            return item;
          }
        });

        currentItem.push(sendData);
        
          // this.totaldata.push(sendData);
          this.service.changeMessage(JSON.stringify(currentItem));
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
