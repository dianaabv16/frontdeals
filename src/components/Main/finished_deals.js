import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import jwtDecode from 'jwt-decode';
import {Timeline, TimelineEvent} from 'react-event-timeline';






class MyDealsParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: [],
            time: [],
            deal: {},
            userId:'',
            lawid: '',

        },
        this.dealRedirects=this.dealRedirects.bind(this)
        this.dateFormat=this.dateFormat.bind(this); 

    }
    componentDidMount() {
        axios.get('https://sdelkibackend.herokuapp.com/api/getfinisheddeals',{
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': `bearer ${Auth.getToken()}`
      }
      }).then(res => {
          this.setState({
           deals: res.data.deals
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
    dealRedirects(event){
      const formData = `lawid=${event.target.name}&dealid=${event.target.value}`;
      //console.log(formData, 'formData')
      // axios.post('https://sdelkibackend.herokuapp.com/api/gethistorydeal',formData,{
      //   responseType: 'json',
      //   headers: {
      //     'Content-type': 'application/x-www-form-urlencoded',
      //     'Authorization': `bearer ${Auth.getToken()}`
      // }
      // }).then(res => {
      //     this.setState({
      //      time: res.data.time
      //     });
      // })
      // .catch(err => {
      //   if (err.response) {
      //     const errors = err.response ? err.response : {};
      //     errors.summary = err.response.data.message;
      //     this.setState({
      //       errors
      //     });
      //   }
      // });

    }
    dateFormat(date){
      var fDate = new Date(date);
      var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
      var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
      return d + "/" + m + "/" + fDate.getFullYear()
    }
    render() {
      
  //    console.log(this.state.deal)
//console.log(this.state.olddeal, 'this.state.deal[0].lawid')
        return (

                <div className="page">
                    <div className="page-content container-fluid">
                        <div className="panel title_border">
                            <div className="panel-heading">
                                <h3 className="panel-title"><i className="panel-title-icon icon fa-handshake-o" aria-hidden="true" />Ваши Сделки {this.state.userId}</h3>
                            </div>
                        </div>
                      
                        <div className="row">
                           <div className="col-md-12">
                            <div className="panel ">
                              <div className="panel-heading">
                                    <h3 className="panel-title"><i className="panel-title-icon icon fa-list-ul" aria-hidden="true" />Узнать подробнее</h3>
                                </div>
                              
                                      {(this.state.deals.length!=0)?(
                                        <div className="row">
                                            {this.state.deals.map((deal, s) =>
                                                <div  key={s} className="col-md-4">
                                                    
                                                        <div className="">
                                                            <div className="panel panel-bordered">
                                                                <div className="panel-heading margin-left">
                                                                    <h3>{deal.lawname}</h3>
                                                                    <h5>{this.dateFormat(deal.duedate)}</h5>
                                                                </div>
                                                                <div className="panel-body">
                                                                    <p>Стороны договора</p>
                                                                    <div className="rating-lg"  />
                                                                        <div style={{fontSize: '16px'}}>
                                                                            <div><i id={s} aria-hidden="true" />{deal.side1.firstname} {deal.side1.lastname}</div>
                                                                            <div><i id={s} aria-hidden="true" />{deal.side2.firstname} {deal.side2.lastname}</div>
                                                                            <div><i id={s} aria-hidden="true" />{deal.status}</div>
                                                                            {/*<div><Link to={`/dealredirect/${deal._id}/${deal.lawid}`} className="waves-effect" >Просмотреть условия</Link></div>*/}
                                                                            <div className="col-md-6 pull-right"><a href='#timelime'><button value={deal._id} name={deal.lawid} className="btn btn-primary d1"  onClick={(event) => this.dealRedirects(event)}>Запросить справку</button></a></div> 
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                )}
                                        </div>):(<div className="panel-heading">
                                                                <h3 className="panel-title">У вас пока нет завершенных сделок</h3>
                                                  </div>
                                        )}
                            </div>
                            </div>
                        
                        </div>
                    </div>
                </div>

        );
    }
}

export default MyDealsParent;
