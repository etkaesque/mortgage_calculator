import React, { useEffect, useState } from "react";



type propsType = {
    interest: number,
    loan: number,
    term: number,
    monthlyMortgagePayment: number
}

type ScheduleType = {
    year:number,
    month:number,
    period: number;
    interestPayment: number;
    principalPayment: number;
    remainingBalance: number;
    totalInterestPaid: number;
    monthlyMortgagePayment: number;
  };



export default function Schedule({interest, loan, term, monthlyMortgagePayment} : propsType) {
    const [activeYear, setActiveYear] = useState<number>(new Date().getFullYear());
    const [schedule, setSchedule] = useState<ScheduleType[]>([])


    useEffect(()=>{
        calculateSchedule()
    },[term,loan,interest,monthlyMortgagePayment])

    const toggleYear = (year: number) => {
        console.log("year, activeYear", year, activeYear)
        if(year == activeYear) {
          setActiveYear(-1);
         
       
        } else {
          setActiveYear(year);
    
        }
       
      };


    const calculateSchedule = () => {
        
        const uniqueYears = new Set<number>();

        const scheduleHolder = []

        const monthlyInterest = interest / 12
        const totalMonthlyPayments = term *12

        let remainingBalance = loan
        let totalInterestPaid = 0

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        for (let i = 0; i <totalMonthlyPayments; i++) {
            let interestPayment = remainingBalance * monthlyInterest
            let principalPayment = monthlyMortgagePayment - interestPayment
            remainingBalance -= principalPayment;
            totalInterestPaid += interestPayment

            const year = currentYear + Math.floor((currentMonth + i) / 12);
            const month = (currentMonth + i) % 12 + 1;

            interestPayment = Number(interestPayment.toFixed(2))
            principalPayment = Number(principalPayment.toFixed(2))
            remainingBalance = Number(remainingBalance.toFixed(2))
            totalInterestPaid = Number(totalInterestPaid.toFixed(2))

            scheduleHolder.push(
                {
                year: year,
                month: month,
                period: i+1,
                interestPayment: interestPayment,
                principalPayment: principalPayment,
                remainingBalance: remainingBalance,
                totalInterestPaid: totalInterestPaid,
                monthlyMortgagePayment:monthlyMortgagePayment}
            )
            uniqueYears.add(year);
        }

        setSchedule(scheduleHolder)

    }




    console.log("schedule",schedule)

    return (
        <>




          {Array.from(schedule.reduce((years, entry) => years.add(entry.year), new Set<number>())).map((year) => (
            <div key={year} className=" text-sm flex flex-col">
              <button className="text-left p-1 yearButton flex justify-between" onClick={() => toggleYear(year)}>
                
                <span className="text"> {year}</span>
                <span className="yearButtonAnimation"> {year === activeYear ? "-" : "+"}</span>

              
              
              
                </button>
    
              {year === activeYear && (
                <ul >
                  {schedule
                    .filter((entry) => entry.year === year)
                    .map((entry) => (

                        <>
                       

                      <li className="border px-2 py-3 flex flex-col">
                        <span className="text-xs font-medium">{entry.month} mėn. </span>
                        <div className="grid sm:grid-cols-4 grid-cols-2 gap-y-3 text-center ">
                          <span  >Įmoka <br /> {entry.monthlyMortgagePayment} €</span>
                          <span>Palūkanos <br /> {entry.interestPayment} €</span>
                          <span>Kreditas <br />  {entry.principalPayment} €</span>
                          <span>Likutis <br /> {entry.remainingBalance} €</span>
                        </div>
                     
                      </li>

                

                      </>

                    ))}
                </ul>
              )}
            </div>
          ))}
        </>
      );

  
 


}