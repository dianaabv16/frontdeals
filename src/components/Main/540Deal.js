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
      payday: '',
      duedate: '',
      deal540: {
        employer: '',
        employee: '',
        itemdata: '',
        keepcondition: '',
        usecondition: '',
        additional: ''
      }
    }
    this.deal540=this.deal540.bind(this)
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
deal540(event){
    const field = event.target.name;
    const deal540 = this.state.deal540;
    deal540[field] = event.target.value;
    //console.log(this.state.deal540, this.state.deadline, this.state.payday, this.state.duedate)
}


  render() {
    return (

    <div className="col-md-6">
     <div className="form-group">
      <h3>Договор имущественного найма (аренды)</h3>
      </div>
   
      <div className="form-group">
        <label className="form-control-label" htmlFor="citySelectorAddShopForm">Наймодатель</label>  
        {
                                                    this.state.kontragents.length!=0 ?
                                                    (      <select id="citySelectorAddShopForm" className="form-control" name="employer" onChange={this.deal540}>
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
        <label className="form-control-label" htmlFor="citySelectorAddShopForm">Наниматель</label>  
         {
                                                    this.state.kontragents.length!=0 ?
                                                    (      <select id="citySelectorAddShopForm" className="form-control" name="employee" onChange={this.deal540}>
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
        <label className="form-control-label" htmlFor="inputNameAddShop">Данные, позволяющие установить имущество, подлежащее передаче в аренду</label>
        <input onChange={this.deal540} type="text" className="form-control" id="inputNameAddShop" name="itemdata"   autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-control-label" htmlFor="inputNameAddShop">Cроки и порядок передачи/возврата имущества</label>
         <DatePickerInput
                                className='my-react-datepicker'
                                value={this.state.value}
                                onChange={(jsDate) => this.setState({deadline: jsDate})}
                                locale='ru'/>
      </div>
      <div className="form-group">
        <label className="form-control-label" htmlFor="inputNameAddShop">Сроки и порядок оплаты</label>
            <DatePickerInput
                                className='my-react-datepicker'
                                value={this.state.value}
                                onChange={(jsDate) => this.setState({payday: jsDate})}
                                locale='ru'/>
      </div>
      <div className="form-group">
        <label className="form-control-label" htmlFor="inputNameAddShop">Условия о содержании/улучшении имущества</label>
        <input onChange={this.deal540}  type="text" className="form-control" id="inputNameAddShop" name="keepcondition"   autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-control-label" htmlFor="inputNameAddShop">Условия об использовании имущества (в т.ч. пределах распоряжения)</label>
        <input onChange={this.deal540} type="text" className="form-control" id="inputNameAddShop" name="usecondition"   autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-control-label" htmlFor="inputNameAddShop">Срок действия договора</label>
            <DatePickerInput
                                className='my-react-datepicker'
                                value={this.state.value}
                                onChange={(jsDate) => this.setState({duedate: jsDate})}
                                locale='ru'/>
      </div>
       <div className="form-group">
        <label className="form-control-label" htmlFor="inputNameAddShop">Дополнительные условия (не обязательное ус-ие)                            </label>
        <input onChange={this.deal540} type="text" className="form-control" id="inputNameAddShop" name="additional"  autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-control-label"><br/></label>
        <button   type="button" onClick={this.updateDeal} className="btn btn-primary btn-block btn-round">Продолжить</button>
      </div>
    </div>
 
                   );
  }
}export default Deals;