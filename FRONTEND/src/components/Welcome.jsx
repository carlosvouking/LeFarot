import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum, SiDior, SiTruenas, SiWoo, SiZoho } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { Loader } from './';


const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'
const commonStylesOurValues = 'min-h-[40px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 font-semibold font-light text-white'
const Input = ({placeholder, name, type, value, handleChange}) => (
  <input 
     className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm gold-glassmorphism"
     placeholder={placeholder}
      type={type} 
      step="0.0001"    
      value = {value}
      onchange = {(e) => handleChange(e, name)}      
  />
)

const handleSubmit  = () => {

}


const Welcome = () => {
    const connectWallet = () => {

    }  

    return(
        <div className="flex w-full justify-center items-center">
           <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
              <div className="flex flex-1 justify-start flex-col mf:mr-10">
                <h1 className="text-3xl sm:text-5xl text-yellow-100 text-gradient py-1">
                    Envoyer du fryc <br /> à travers le monde
                </h1>
                <p className="text-left mt-5 text-yellow-100 font-light md:w-9/12 w-11/12 text-base">
                    Découvrir la cryptomonnaie simplifiée. Transférez aisément et en un clic du fryck en cryptomonnaie.
                </p> 
                <button type="button" className="flex flex-row justify-center items-center my-5 bg-[#d69e2e] p-3 rounded-full 
                                                 cursor-pointer hover:bg-[#b7791f] hover:text-yellow-200" onClick={connectWallet}>
                    <p className="text-yellow-200 text-base font-semibold">Envoyer du fryck</p> 
                </button>
                <div className="grid sm:grid-cols-1 grid-cols-1 w-full mt-10">
                    <div className={`rounded-xl ${commonStylesOurValues}`}>
                        Fiabilité -- Sécurité -- Coûts presque nuls
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-5 ">
                    <div className={`rounded-tl-2xl ${commonStyles}`}>Fryc / ($)USD: ? </div>
                    <div className={commonStyles}>Fryc / (€)Euro: ?</div>
                    <div className={`rounded-tr-2xl ${commonStyles}`}>Eth / ($)USD: ? </div>
                    <div className={`rounded-bl-2xl ${commonStyles}`}>(€)Euro / Fcfa: ? </div>
                    <div className={commonStyles}>($)USD / Fcfa: ?</div>
                    <div className={`rounded-br-2xl ${commonStyles}`}>Eth / (€)Euro: ? </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 ">
                 <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                    <div className="flex justify-between flex-col w-full h-full">
                       <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-xl border-2 border-white flex justify-center items-center">
                              <SiTruenas fontSize={22} color="" className={`text-yellow-100`} />
                          </div>
                          <div fontSize={18} color="" className={`text-yellow-100`}>
                            <BsInfoCircle />
                          </div>
                       </div>
                       <div className="">
                          <p className="text-white font-light text-sm ">Address:  </p>
                          <p className="text-white font-semibold text-lg mt-1">FRYCK</p>
                       </div>
                    </div>
                 </div> 
              
                 <div className="p-5 sm:w-96 w-full flex flex-col justify start items-center gold-glassmorphism">
                    <Input placeholder="Addresse destinataire" name="addressTo" type="text"  handleChange = {() => {}} /> 
                    <Input placeholder="Montant (FRYCK)" name="amount" type="number"  handleChange = {() => {}} /> 
                    <Input placeholder="Mot-clé  (Gif)" name="keyword" type="text"  handleChange = {() => {}} /> 
                    <Input placeholder="Ajouter un message" name="message" type="text"  handleChange = {() => {}} />                   
                    
                    <div className="h-[1px] w-full bg-yellow-100" />

                    {false ? (<Loader />) 
                      : (
                          <button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[gray] rounded-full cursor-pointer">
                            Transférer
                          </button>
                        )
                    }
                 </div> 
              </div>                              
           </div>
        </div>
    );
}

export default Welcome;