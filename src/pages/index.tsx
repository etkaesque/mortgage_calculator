import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import LoanPriceChart from "./components/LoanPriceChart";
import Schedule from "./components/Schedule"

export default function Home() {
  const calculateMortgage = (event: any) => {
    if (event) {
      event.preventDefault();
    }

    const interest = formData.interest / 100;
    const term = formData.term;
    const totalLoan = formData.price - formData.downpayment;

    let payment = monthlyMortgagePayment(interest, totalLoan, term);
    let totalCost = totalMortgageCost(payment, term);
    let totalInterest = totalCost - totalLoan;

    setMortgage({
      term: term,
      payment: payment,
      totalCost: totalCost,
      totalInterest: totalInterest,
      totalLoan: totalLoan,
      interest: interest,
    });
  };

  const monthlyMortgagePayment = (
    interest: number,
    loan: number,
    term: number
  ) => {
    console.log("interest", interest);
    console.log("loan", loan);
    console.log("term", term);

    let payment =
      (loan * (interest / 12)) / (1 - (1 + interest / 12) ** (-12 * term));

    console.log(payment);
    payment = Math.round(payment);

    return payment;
  };

  const totalMortgageCost = (payment: number, term: number) => {
    return payment * 12 * term;
  };

  const [formData, setFormData] = useState({
    price: 100000,
    downpayment: 15000,
    downpaymentpercent: 15,
    interest: 5,
    term: 30,
  });

  useEffect(() => {
    calculateMortgage(null);
  }, [formData]);

  const [mortgage, setMortgage] = useState({
    term:0,
    payment: 0,
    totalCost: 0,
    totalInterest: 0,
    totalLoan: 0,
    interest:0,
  });

  const [isLoanBreakdown, setIsLoanBreakdown] = useState(true)

  const changeBreakdown = (value : boolean) => {

    setIsLoanBreakdown(value)

  }



  const handleChange = (event: any) => {
    const { name, value } = event.target;
    let realValue = value;

    if (name === "term" && value > 30) {
      realValue = 30;
    }

    if (name === "downpaymentpercent") {
      setFormData((prevFormData) => {
        let downpayment = (realValue / 100) * prevFormData.price;
        let downpaymentModified = Number(downpayment.toFixed(2));
        return {
          ...prevFormData,
          downpayment: downpaymentModified,
        };
      });
    }

    if (name === "price") {
      setFormData((prevFormData) => {
        let downpayment = (prevFormData.downpaymentpercent / 100) * realValue;
        let downpaymentModified = Number(downpayment.toFixed(2));
        return {
          ...prevFormData,
          downpayment: downpaymentModified,
        };
      });
    }

    if (name === "downpayment") {
      setFormData((prevFormData) => {
        let downpaymentpercent = (realValue / prevFormData.price) * 100;
        let downpaymentpercentModified = Number(downpaymentpercent.toFixed(2));
        return {
          ...prevFormData,
          downpaymentpercent: downpaymentpercentModified,
        };
      });
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: realValue,
      };
    });
  };

  return (
    <>
      <Head>
        <title>Mortgage Calculator</title>
        <meta
          name="description"
          content="App that helps you plan you mortgage loan"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.svg"></link>
      </Head>

      <div className="max-w-screen-xl mx-auto background h-full p-2 pb-6">
        <main className=" flex flex-col justify-center w-full">
          <section className="flex flex-col w-full gap-y-10 px-10">
            <div className="w-full text-3xl mt-6">
              <h1 className="opacity-70">Būsto paskolos skaičiuoklė</h1>
            </div>

            <div className=" flex w-full gap-x-5 gap-y-5 flex-col justify-around lg:flex-row">
              <form
                onSubmit={calculateMortgage}
                className="flex flex-col items-center lg:items-stretch w-full lg:w-2/6 gap-y-2"
              >
                {/* price */}

                <div className="flex flex-col w-full lg:max-w-[15rem] ">
                  <label className="text-lg" htmlFor="price">
                    Būsto kaina
                  </label>

                  <div className="rainbowfocusEur rounded-md border-solid overflow-hidden border-2 border-blue-100  flex bg-white border- justify-center  flex-row-reverse ">
                    <input
                      step="1000"
                      min="0"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className=" rainbowfocus1-2  p-1 pl-3 outline-none  w-11/12"
                    />

                    <label
                      htmlFor="price"
                      className="p-1  mx-1 text-start  h-full w-1/12"
                    >
                      €
                    </label>
                  </div>
                </div>

                <div className="flex flex-col w-full lg:max-w-[15rem]">
                  <label htmlFor="downpayment" className="text-lg">
                    Pradinis įnašas
                  </label>

                  <div className="rainbowfocusEur rounded-md  flex bg-white  justify-center  flex-row-reverse border-solid overflow-hidden border-2 border-blue-100">
                    <label
                      htmlFor="downpaymentpercent"
                      className=" p-1 text-center mx-1 h-full w-1/12"
                    >
                      %
                    </label>
                    <input
                      min="0"
                      value={formData.downpaymentpercent}
                      onChange={handleChange}
                      type="number"
                      name="downpaymentpercent"
                      className=" border-l-2 p-1 pl-3  outline-none  w-4/12 rainbowfocus1-2 !text-gray-950"
                    />

                    <input
                      min="0"
                      value={formData.downpayment}
                      onChange={handleChange}
                      type="number"
                      name="downpayment"
                      className="p-1 pl-3  outline-none  w-6/12 rainbowfocus1-2 !text-gray-950"
                    />
                    <label
                      htmlFor="downpayment"
                      className="p-1 mx-1  text-start  h-full  w-1/12"
                    >
                      €
                    </label>
                  </div>
                </div>

                {/* interest */}

                <div className="flex flex-col w-full lg:max-w-[15rem] ">

                  <div className="flex justify-between items-center">
                  <label htmlFor="interest" className="text-lg">
                    Palūkanos
                  </label>

                  <a className="text-xs aEuribor"  target="_blank" href="https://www.euribor-rates.eu/en/">Euribor Rates</a>

                  </div>
              

                  <div className="rounded-md flex bg-white border-solid overflow-hidden border-2 border-blue-100 justify-center flex-row-reverse rainbowfocus1-1">
                    <label
                      htmlFor="interest"
                      className="p-1 text-center mx-1 h-full w-1/12"
                    >
                      %
                    </label>
                    <input
                      step=".1"
                      value={formData.interest}
                      onChange={handleChange}
                      type="number"
                      name="interest"
                      className="rainbowfocus1-2 p-1 pl-3  outline-none  w-11/12"
                    />
                  </div>
                </div>

                {/* term */}

                <div className="flex flex-col w-full lg:max-w-[15rem]">
                  <label htmlFor="term" className="text-lg">
                    Laikotarpis
                  </label>

                  <div className="rainbowfocus1-1 rounded-md flex bg-white border-solid overflow-hidden border-2 border-blue-100 justify-center flex-row-reverse ">
                    <label
                      htmlFor="term"
                      className="p-1 text-center mx-1   h-full w-3/12 "
                    >
                      metai
                    </label>
                    <input
                      min="0"
                      value={formData.term}
                      onChange={handleChange}
                      type="number"
                      name="term"
                      className="rainbowfocus1-2 p-1 pl-3  outline-none   w-9/12"
                    />
                  </div>
                </div>
              </form>

              <div className="w-full lg:w-4/6">
                <div className="flex gap-x-2">
                  <button onClick={() => changeBreakdown(true)} className={isLoanBreakdown ? "changeSectionBTNFocus" : "changeSectionBTN"}>Paskola</button>
                  <button onClick={() => changeBreakdown(false)} className={isLoanBreakdown ? "changeSectionBTN" : "changeSectionBTNFocus"}>Grafikas</button>
                </div>

                <div className="border p-2 bg-white ">

                  {isLoanBreakdown ? (
                      <div className="flex flex-col gap-y-5 justify-center items-center ">
                        <div className="flex flex-wrap gap-x-3 text-center justify-around">
                            <div>
                              <h3>Mėnesinė įmoka</h3>
                              <span className="text-lg">
                                {mortgage.payment.toLocaleString()} €
                              </span>
                            </div>
      
                            <div>
                              <h3>Visa mokama suma</h3>
                              <span className="text-lg">
                                {mortgage.totalCost.toLocaleString()} €
                              </span>
                            </div>
                        </div>
  
                      <LoanPriceChart
                        interest={mortgage.totalInterest}
                        loan={mortgage.totalLoan}
                      />
                    </div>

                  ) : (    

                  <div>
                    
                    <Schedule

                    term={mortgage.term}
                    loan={mortgage.totalLoan}
                    monthlyMortgagePayment={mortgage.payment}
                    interest={mortgage.interest}
            
                    
                    
                    />






                  </div>

                  )}

                

              

                </div>
              </div>
              
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
