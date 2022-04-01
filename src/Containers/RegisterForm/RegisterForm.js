import React, { Component } from 'react'

 class RegisterForm extends Component {
      state = {
        formData:{
          name:{
            value: "",
            validator: {
            minLength: 3,
            maxLength: 6,
            required: true
            },
            error: {status: true,message: ""}
          },
          phoneNumber: {
            value: "",
            validator: {
            minLength: 10,
            maxLength: 10
            },
            error: {status: true,message: ""}
          },
          email:{
            value: "",
            validator: {
            required: true
            },
            error: {status: true,message: ""}
          },
          password:{
            value:"",
            validator: {
            minLength: 6,
            maxLength: 24,
            required: true
              },
              error: {status: true,message: ""}
        },
        },
        isFormValid: false,
      }

      checkValue = (value,rules) => {
        let Isvalid = true;
        let message = "";
        let trimmedValue = value.trim();
        
        if(rules.required && trimmedValue.length === 0)
          {
              Isvalid = false;
              message = 'คุณต้องกรอกช่องนี้';
          }
        if(rules.maxlength && trimmedValue.length > rules.maxLength)
        {
              Isvalid = false;
              message = 'ช่องนี้ความยาวต้องไม่เกิน $(rules.maxLength) ตัว';
        }
        if(rules.minlength && trimmedValue.length < rules.minLength)
        {
              Isvalid = false;
              message = 'ช่องนี้ความยาวอย่างน้อย $(rules.minLength) ตัว';
        }
        return (Isvalid,message);
      }
      onChangeInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const updatedFormupdate = {...this.state.formData};
        updatedFormupdate[fieldName].value = fieldValue
        
        let ( IsValid,message ) = this.checkValue(e.target.value, updatedFormupdate[fieldName].validator);
        updatedFormupdate(fieldName).error.status = !Isvalid;
        updatedFormupdate(fieldName).error.message = message;
        this.setState({
          [fieldName]: updatedFormupdate
        })
      }

      onSubmitForm = (e) => {
        e.preventDefault();
        console.log(this.state)
      }

      
  render() {
    const {name, phoneNumber, email, password} = this.state.formData
    const { isFormValid } = this.state
    return (
      <div className="RegisterForm">
        <form onSubmit={this.onSubmitform}>
          <input onChange={this.onChangeInput} value={name.value} Classname ="Input Element" name= "name" 
          placeholder="ชื่อ"/>
          <input onChange={this.onChangeInput} value={phoneNumber.value} Classname ="Input Element" name= "phoneNumber" 
          placeholder="เบอร์โทรศัพท์"/>
          <input onChange={this.onChangeInput} value={email.value}Classname ="Input Element" name= "email" 
          placeholder="อีเมล์"/>
          <input onChange={this.onChangeInput} value={password.value}Classname ="Input Element" name= "password" 
          placeholder="รหัสผ่าน" type="password"/>
          <button disabled={!isFormValid} Classname="Button" >Register</button>
        </form>
      </div>
        
    )
  }
}

export default RegisterForm

