import React, { Component } from 'react'
import Input from '../Input/Input'
class RegisterForm extends Component {
  state = {
    formData: {
      name: {
        value: "",
        validator: {
          minLength: 3,
          maxLength: 6,
          required: true
        },
        error: { status: true, message: "", isTouched: false }
      },
      phoneNumber: {
        value: "",
        validator: {
          minLength: 10,
          maxLength: 10
        },
        error: { status: true, message: "", isTouched: false }
      },
      email: {
        value: "",
        validator: {
          required: true
        },
        error: { status: true, message: "", isTouched: false }
      },
      password: {
        value: "",
        validator: {
          minLength: 6,
          maxLength: 24,
          required: true
        },
        error: { status: true, message: "", isTouched: false }
      },
    },
    isFormValid: false,
  }

  checkValue = (value, rules) => {
    let Isvalid = true;
    let message = "";
    let trimmedValue = value.trim();

    if (rules.required && trimmedValue.length === 0) {
      Isvalid = false;
      message = 'คุณต้องกรอกช่องนี้';
    }
    if (rules.maxlength && trimmedValue.length > rules.maxLength) {
      Isvalid = false;
      message = 'ช่องนี้ความยาวต้องไม่เกิน $(rules.maxLength) ตัว';
    }
    if (rules.minlength && trimmedValue.length < rules.minLength) {
      Isvalid = false;
      message = 'ช่องนี้ความยาวอย่างน้อย $(rules.minLength) ตัว';
    }
    return { Isvalid, message };
  }
  onChangeInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const updatedForm = { ...this.state.formData };
    updatedForm[fieldName].value = fieldValue

    let { Isvalid, message } = this.checkValue(e.target.value, updatedForm[fieldName].validator);
    updatedForm[fieldName].error.status = !Isvalid;
    updatedForm[fieldName].error.message = message;
    updatedForm[fieldName].error.isTouched = true;
    let newIsFormValid = true;
    for (let fm in updatedForm) {
      if (updatedForm[fm].validator.required === true) {
        newIsFormValid = !updatedForm[fm].error.status && newIsFormValid;
      }
    }
    this.setState({
      [fieldName]: updatedForm,
      isFormValid: newIsFormValid,
    })
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.state)
  }


  render() {
    const { name, phoneNumber, email, password } = this.state.formData
    const { isFormValid } = this.state
    return (
      <div className="RegisterForm">
        <form onSubmit={this.onSubmitform}>
          <Input
            onChange={this.onChangeInput}
            value={name.value}
            name="name"
            placeholder="ชื่อ"
            error={name.error} />
          <Input
            onChange={this.onChangeInput}
            value={phoneNumber.value}
            name="phoneNumber"
            placeholder="เบอร์โทรศัพท์"
            error={phoneNumber.error} />
          <Input
            onChange={this.onChangeInput}
            value={email.value}
            name="email"
            placeholder="อีเมล์"
            error={email.error} />
          <Input
            onChange={this.onChangeInput}
            value={password.value}
            name="password"
            placeholder="รหัสผ่าน"
            error={password.error} />
          <button disabled={!isFormValid} className="Button" >Register</button>
        </form>
      </div>

    )
  }
}

export default RegisterForm

