// src/components/About/index.js
import React  from 'react';
import axios from 'axios';
import InputElement from 'react-input-mask';
import './style.css';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import 'moment/locale/ru.js' 
import Auth from '../modules/Auth';

 class Deals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kontragents: [],
      deadline: '',
      // paydeadline: '',
      duedate: '',
      deal683: {
        executor: '',
        contractor: '',
        description: '',
        price: '',
        quality: '',
        paydeadline: '',
        additional: ''
      }
    }
    this.deal683=this.deal683.bind(this)
  }
  componentDidMount() {
      axios.get('http://185.100.67.106:4040/api/getmykontragents',{
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
      }).then(res => {
          this.setState({
           kontragents: res.data.kontragents
          });
      })
      .catch(err => {
        if (err.response) {
          const errors = err.response ? err.response : {};
          errors.summary = err.response.data.message;
          this.setState({
            errors
          });
        }
      });
  }
  deal683(event){
    const field = event.target.name;
    const deal683 = this.state.deal683;
    deal683[field] = event.target.value;
    console.log(this.state.deal683, this.state.deadline, this.state.paydeadline, this.state.duedate)
  }

  render() {
    return (

    <div className="col-md-6">
     <div className="form-group">
      <h3>Договор возмездного оказания услуг</h3>
      <h4> <b className="cust_weigh">Предмет договора: </b> Исполнитель обязуется оказать услуги (совершить определенные действия или осуществить определенную деятельность), а Заказчик обязуется оплатить эти услуги на условиях, указанных в настоящем договоре.</h4>
      </div>
      <div className="form-group">
        <label className="form-control-label" htmlFor="citySelectorAddShopForm">Исполнитель</label>  
                   {
                                                    this.state.kontragents.length!=0 ?
                                                    (      <select id="citySelectorAddShopForm" className="form-control" name="executor" onChange={this.deal683}>
                                                    <option value=''>Выберите контрагента</option>
                                                    {this.state.kontragents.map((user, s) =>
                                                      <option key={s} value={user.myfriend._id}>{user.myfriend.firstname} {user.myfriend.lastname}</option>
                                                    )}
                                                    </select>) : 
                                                    ( <select id="citySelectorAddShopForm" className="form-control">
                                                    <option value=''>У вас пока нет контрагентов</option>
                                                    </select>
                                                    )
                                                  }
      </div>
      <div className="form-group">
        <label className="form-control-label" htmlFor="citySelectorAddShopForm">Подрядчик</label>  
                 {
                                                    this.state.kontragents.length!=0 ?
                                                    (      <select id="citySelectorAddShopForm" className="form-control" name="contractor" onChange={this.deal683}>
                                                    <option value=''>Выберите контрагента</option>
                                                    {this.state.kontragents.map((user, s) =>
                                                      <option key={s} value={user.myfriend._id}>{user.myfriend.firstname} {user.myfriend.lastname}</option>
                                                    )}
                                                    </select>) : 
                                                    ( <select id="citySelectorAddShopForm" className="form-control">
                                                    <option value=''>У вас пока нет контрагентов</option>
                                                    </select>
                                                    )
                                                  }
      </div>
      <div className="form-group">
        <label className="form-control-label"  >Описание услуг</label>
        <input onChange={this.deal683}  type="text" className="form-control" id="inputNameAddShop" name="description"   autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-control-label"  >Срок оказания услуг</label>
          <DatePickerInput
                                className='my-react-datepicker'
                                value={this.state.value}
                                onChange={(jsDate) => this.setState({deadline: jsDate})}
                                locale='ru'/>
      </div>
      <div className="form-group">
        <label className="form-control-label"  >Цена услуг, тенге</label>
        <input onChange={this.deal683}  type="number" className="form-control" id="inputNameAddShop" name="price"   autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-control-label"  >Сроки и порядок оплаты</label>
            <input onChange={this.deal683}  type="text" className="form-control" id="inputNameAddShop" name="paydeadline"   autoComplete="off" />


      </div>
      <div className="form-group">
        <label className="form-control-label"  >Качество услуг</label>
           <input onChange={this.deal683}  type="text" className="form-control" id="inputNameAddShop" name="quality"   autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-control-label"  >Срок действия договора</label>
            <DatePickerInput
                                className='my-react-datepicker'
                                value={this.state.value}
                                onChange={(jsDate) => this.setState({duedate: jsDate})}
                                locale='ru'/>
      </div>
       <div className="form-group">
        <label className="form-control-label"  >Дополнительные условия (не обязательное ус-ие)                            </label>
        <input onChange={this.deal683} type="text" className="form-control" id="inputNameAddShop" name="additional"  autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-control-label"><br/></label>
        <button   type="button" onClick={this.updateDeal} className="btn btn-primary btn-block btn-round">Продолжить</button>
      </div>
    </div>
 
                   );
  }
}export default Deals;