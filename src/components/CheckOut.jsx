import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewTransaction } from 'actions/Transaction'

const arrOfMount = []
arrOfMount['01'] = 'Januari'
arrOfMount['02'] = 'Februari'
arrOfMount['03'] = 'Maret'
arrOfMount['04'] = 'April'
arrOfMount['05'] = 'Mei'
arrOfMount['06'] = 'Juni'
arrOfMount['07'] = 'Juli'
arrOfMount['08'] = 'Agustus'
arrOfMount['09'] = 'September'
arrOfMount['10'] = 'Oktober'
arrOfMount['11'] = 'November'
arrOfMount['12'] = 'Desember'

class CheckOut extends Component {
  constructor (props) {
    super(props)

    this.checkOut = this.checkOut.bind(this)
  }

  convertDate (startDate, endDate, duration) {
    console.log(startDate, endDate, duration)
    let startDateSplit = startDate.split(' ')
    let newStartDate = startDateSplit[0].split('-')

    let endDateSplit = endDate.split(' ')
    let newEndDate = endDateSplit[0].split('-')

    if (duration === 1) {
      return `${newStartDate[2]} ${arrOfMount[newStartDate[1]]} ${newStartDate[0]}`
    } else {
      return `${newStartDate[2]} ${arrOfMount[newStartDate[1]]} ${newStartDate[0]} - ${newEndDate[2]} ${arrOfMount[newEndDate[1]]} ${newEndDate[0]}`
    }
  }

  convertTime (startTime, endTime) {
    let newStartTime = startTime.substring(0, 5)
    let newEndTime = endTime.substring(0, 5)
    return `${newStartTime} - ${newEndTime}`
  }

  checkOut (quantity, date, idActivity) {
    this.props.createNewTransaction(quantity, date, idActivity)
      .then(() => {
        window.location.href = '/transaction'
      })
  }

  render () {
    const { selected, dates, quantity } = this.props

    return (
      <div className="content">
        <div className="row">
          <div className="col-12 text-right mb-4">step 2 of 3</div>
        </div>
        <div className="checkout">
          <div className="row" style={{ 'borderBottom': '1px solid #bfbfbf' }}>
            <div className="col-2">
              <img className="img-fluid mb-4" src={selected.photo1} alt=""/>
            </div>
            <div className="col-5">
              <h2>{selected.activity_name}</h2>
              <p>oleh <span className="font-blue">{selected.host_name}</span></p>
              <p>{this.convertDate(dates.date, dates.date_to, selected.duration)}, {this.convertTime(dates.times[0].time_start, dates.times[0].time_end)}</p>
            </div>
            <div className="col-3">Guest<br/><br/>{quantity}</div>
            <div className="col-2">Price<br/><br/>IDR {selected.price}</div>
          </div>
          <div className="row mt-4" style={{ 'borderBottom': '1px solid #bfbfbf' }}>
            <div className="col-3 mb-4"><input type="text" className="form-control" placeholder="Have a Magic Coupon?"/></div>
            <div className="col-4"><button className="btn btn-primary">Apply</button></div>
            <div className="col-3 pt-2">Total</div>
            <div className="col-2 pt-2">IDR {selected.price * quantity}</div>
          </div>
          <div className="col-12 text-right mt-4">
            <button className="btn btn-primary" onClick={() => this.checkOut(quantity, dates.id_activity_date, selected.id_activity)}>Place Order</button>
          </div>
        </div>
        <div className="checkout-res">
          <div className="row">
            <div className="col-12 col-lg-2">
              <img className="img-fluid mb-4" src={selected.photo1} alt=""/>
            </div>
            <div className="col-12 col-lg-5">
              <h2>{selected.activity_name}</h2>
              <p>oleh <span className="font-blue">{selected.host_name}</span></p>
              <p>{this.convertDate(dates.date, dates.date_to, selected.duration)}, {this.convertTime(dates.times[0].time_start, dates.times[0].time_end)}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-4 col-lg-3">Guest<br/>{quantity}</div>
            <div className="col-4 col-lg-2">Price IDR {selected.price}</div>
            <div className="col-4 col-lg-2">Total<br/>IDR {selected.price * quantity}</div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-3 mb-4"><input type="text" className="form-control" placeholder="Have a Magic Coupon?"/></div>
            <div className="col-12 col-lg-4"><button className="btn btn-primary">Apply</button></div>
          </div>
          <div className="col-12 text-right mt-4">
            <button className="btn btn-primary" onClick={() => this.checkOut(quantity, dates.id_activity_date, selected.id_activity)}>Place Order</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    selected: state.activity.selected,
    dates: state.activity.dates,
    quantity: state.activity.quantity
  }
}

export default connect(mapStateToProps, { createNewTransaction })(CheckOut)
