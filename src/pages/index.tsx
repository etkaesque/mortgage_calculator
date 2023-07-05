import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {useEffect, useState } from 'react'
import LoanPriceChart from "./components/LoanPriceChart"


export default function Home() {

  useEffect(()=>{
    calculateMortgage(null)
  })

  const calculateMortgage = (event: any) => {
    if(event) {
      event.preventDefault();
    }
  

    const interest = formData.interest / 100
    const term = formData.term
    const totalLoan = formData.price - formData.downpayment

    let payment = monthlyMortgagePayment(interest, totalLoan, term)
    let totalCost = totalMortgageCost(payment, term)
    let totalInterest = totalCost - totalLoan

    setMortgage({
      payment: payment,
      totalCost: totalCost,
      totalInterest: totalInterest,
      totalLoan:totalLoan
    })

  }

  const monthlyMortgagePayment = (interest: number, loan: number, term: number) => {

    console.log("interest", interest)
    console.log("loan", loan)
    console.log("term", term)

    let payment = (loan * (interest / 12)) / (1 - (1 + (interest / 12)) ** (-12 * term))


    console.log(payment)
    payment = Math.round(payment)

    return payment

  }

  const totalMortgageCost = (payment: number, term: number) => {
    return payment * 12 * term
  }

  const [formData, setFormData] = useState({
    price: 100000,
    downpayment: 15000,
    downpaymentpercent: 15,
    interest: 5,
    term: 30,

  })

  const [mortgage, setMortgage] = useState({
    payment: 0,
    totalCost: 0,
    totalInterest: 0,
    totalLoan:0

  })

  const handleChange = (event: any) => {
    const { name, value } = event.target
    let realValue = value

    if (name === "term" && value > 30) {
      realValue = 30
    }

    if (name === "downpaymentpercent") {

      setFormData((prevFormData) => {
        let downpayment = (realValue / 100) * prevFormData.price
        let downpaymentModified = Number(downpayment.toFixed(2))
        return {
          ...prevFormData,
          downpayment: downpaymentModified

        }
      })

    }

    if (name === "price") {

      setFormData((prevFormData) => {
        let downpayment = (prevFormData.downpaymentpercent / 100) * realValue
        let downpaymentModified = Number(downpayment.toFixed(2))
        return {
          ...prevFormData,
          downpayment: downpaymentModified

        }
      })

    }


    if (name === "downpayment") {


      setFormData((prevFormData) => {
        let downpaymentpercent = (realValue / prevFormData.price) * 100
        let downpaymentpercentModified = Number(downpaymentpercent.toFixed(2))
        return {
          ...prevFormData,
          downpaymentpercent: downpaymentpercentModified,
        }
      })




    }


    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: realValue

      }
    })

  
  }


  return (
    <>
      <Head>
        <title>Mortgage Calculator</title>
        <meta name="description" content="App that helps you plan you mortgage loan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


      <div className="max-w-screen-xl mx-auto background h-screen p-3">

        <main className='w-full flex flex-col justify-center w-full'>



          <section className='flex flex-col w-full'>

            <div className='w-full text-3xl'>

              <h1>Būsto paskolos skaičiuoklė</h1>

            </div>

            <div className='flex w-full flex-col justify-around sm:flex-row'>

              <form onSubmit={calculateMortgage} className='flex flex-col w-1/2 gap-y-2'>

                {/* price */}

                <div className='flex flex-col max-w-[15rem]'>

                  <label className='text-lg' htmlFor="price">Būsto kaina</label>

                  <div className='rainbowfocusEur rounded-md  flex bg-white border justify-center  flex-row-reverse ' >

                    <input step="5000" min="0" type="number" name='price' value={formData.price} onChange={handleChange} className=' rainbowfocus1-2 focus:outline-none p-1 pl-3 outline-none  w-full w-11/12' />

                    <label htmlFor="price" className='p-1  mx-1 text-start  h-full w-1/12'>€</label>

                  </div>

                </div>
                {/* 
                {"downpayment, downpaymentpercent"} */}

                <div className='flex flex-col max-w-[15rem]'>

                  <label htmlFor="downpayment" className='text-lg'>Pradinis įnašas</label>

                  <div className='rainbowfocusEur rounded-md  flex bg-white border justify-center  flex-row-reverse '>

                    <label htmlFor="downpaymentpercent" className='p-1 text-center mx-1 h-full w-1/12 !text-white'>%</label>
                    <input step="1" min="0" value={formData.downpaymentpercent} onChange={handleChange} type="number" name='downpaymentpercent' className=' border-l-2 p-1 pl-3  outline-none  w-4/12 rainbowfocus1-2 !text-gray-950' />


                    <input step="1000" min="0" value={formData.downpayment} onChange={handleChange} type="number" name='downpayment' className='p-1 pl-3  outline-none  w-6/12 rainbowfocus1-2 !text-gray-950' />
                    <label htmlFor="downpayment" className='p-1 mx-1  text-start  h-full  w-1/12'>€</label>
                  </div>

                </div>

                {/* interest */}

                <div className='flex flex-col max-w-[15rem] '>

                  <label htmlFor="interest" className='text-lg'>Palūkanos</label>

                  <div className='rounded-md flex bg-white border justify-center flex-row-reverse rainbowfocus1-1'>

                    <label htmlFor="interest" className='p-1 text-center mx-1 h-full w-1/12'>%</label>
                    <input step=".1" value={formData.interest} onChange={handleChange} type="number" name='interest' className='rainbowfocus1-2 p-1 pl-3  outline-none  w-full w-11/12' />
                  </div>

                </div>

                {/* term */}

                <div className='flex flex-col max-w-[15rem]'>


                  <label htmlFor="term" className='text-lg'>Laikotarpis</label>

                  <div className='rainbowfocus1-1 rounded-md flex bg-white border justify-center flex-row-reverse '>

                    <label htmlFor="term" className='p-1 text-center mx-1   h-full w-3/12 '>metai</label>
                    <input min="0" value={formData.term} onChange={handleChange} type="number" name='term' className='rainbowfocus1-2 p-1 pl-3  outline-none  w-full w-9/12' />
                  </div>


                </div>



                <button type='submit' className=" max-w-xs relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                  <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                  <span className="relative text-white">Skaičuoti</span>
                </button>

              </form>

              <div className='w-1/2 '>

                <div className='flex flex-wrap gap-x-3'>


                  <div>


                    <h3>Mėnesinė įmoka</h3>
                    <span>{mortgage.payment.toLocaleString()} €</span>

                  </div>

                  <div>


                    <h3>Iš viso palūkanų</h3>
                    <span>{mortgage.totalInterest.toLocaleString()} €</span>

                  </div>

                  <div>


                    <h3>Bendra sumokama suma</h3>
                    <span>{mortgage.totalCost.toLocaleString()} €</span>

                  </div>


                </div>

                <LoanPriceChart interest={mortgage.totalInterest} loan={mortgage.totalLoan} />

                

                

              </div>

            </div>



          </section>



        </main>

      </div>

    </>
  )
}
