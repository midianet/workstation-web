import Layout from "@/components/template/Layout";
import { useState } from "react"

export default function Wizard(){
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(step + 1);
  }

  const handleBack = () => {
    setStep(step - 1);
  }

  const Step1 = () => (
    <div>
      <h3 className="text-lg font-medium mb-4">Passo 1</h3>
      <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full border border-gray-400 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full border border-gray-400 p-2"
        />
      </div>
    </div>
  )

  const Step2 = () => (
    <div>
      <h3 className="text-lg font-medium mb-4">Passo 2</h3>
      <div className="mb-4">
        <label
          className="block font-medium mb-2 text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full border border-gray-400 p-2"
        />
      </div>
    </div>
  )

  return (
    <Layout background >
      <h2 className="text-lg font-medium mb-4">Step {step} of 2</h2>
      <div className="flex mb-4">
        <div
          className={`w-1/2 border-r border-gray-400 
            ${step === 1 ? "bg-blue-500 text-white" : "bg-gray-200"} 
            p-2 text-center cursor-pointer rounded-xl
          `}
          onClick={() => setStep(1)}
        >
          Passo 1
        </div>
        <div
          className={`w-1/2 
            ${step === 2 ? "bg-blue-500 text-white" : "bg-gray-200"}
            p-2 text-center cursor-pointer`}
          onClick={() => setStep(2)}
        >
          Step 2
        </div>
      </div>
      {step === 1 ? <Step1 /> : <Step2 />}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            className="bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400"
            onClick={handleBack}
          >
            Voltar
          </button>
        )}
        {step < 2 && (
          <button
            className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
            onClick={handleNext}
          >
            Próximo
          </button>
        )}
      </div>
    </Layout>        
  )
}