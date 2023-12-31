import React from "react";
import { Chart, ArcElement,Tooltip,Legend, plugins } from "chart.js";
import {Doughnut} from "react-chartjs-2"
import { type } from "os";

Chart.register(
    ArcElement,Tooltip,Legend

)

type propsType = {
    interest: number,
    loan: number
}


export default function LoanPriceChart({interest, loan} : propsType) {
    
  
    const data = {
        labels: ["Viso palūkanų", "Paskola"],
        datasets: [{
            label: " €",
            data: [interest,loan],
            backgroundColor:["#005BBB","#FFD500"],
            borderColor:["#005BBB","#FFD500"],

        }]
    }

    const options = {
        responsive: true,
        animation: {
            duration: 100
        },
        


    }

    return (
        <>
        <Doughnut className="max-w-sm"
         data = {data}
         options = {options}
        
        >
           
        </Doughnut>
        </>
    )



}