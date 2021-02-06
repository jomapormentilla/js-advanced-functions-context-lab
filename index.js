/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function( arr ) {
    let data = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return data
}

let createEmployeeRecords = function( arr ) {
    return arr.map((record) => { return createEmployeeRecord(record) })
}

let createTimeInEvent = function( datestamp ) {
    let data = {
        type: "TimeIn",
        hour: parseInt(datestamp.split(" ")[1], 10),
        date: datestamp.split(" ")[0]
    }
    this.timeInEvents.push(data)
    return this
}

let createTimeOutEvent = function( datestamp ) {
    let data = {
        type: "TimeOut",
        hour: parseInt(datestamp.split(" ")[1], 10),
        date: datestamp.split(" ")[0]
    }
    this.timeOutEvents.push(data)
    return this
}

let hoursWorkedOnDate = function( date ) {
    let timeOutHours = this.timeOutEvents.find(e => e.date === date).hour
    let timeInHours = this.timeInEvents.find(e => e.date === date).hour
    
    return (timeOutHours - timeInHours)/100
}

let wagesEarnedOnDate = function( date ) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let findEmployeeByFirstName = function( srcArray, firstName ) {
    return srcArray.find(d => d.firstName === firstName)
}

let calculatePayroll = function( arr ) {
    let total = 0
    for( const record of arr ) {
        record.timeInEvents.map((d) => {
            total += wagesEarnedOnDate.call(record, d.date)
        })
    }
    return total
}