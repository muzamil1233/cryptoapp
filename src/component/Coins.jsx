import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
    Button,
  Container,
 
  HStack,
  Radio,
  RadioGroup,
  


} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page,setPage] = useState(1);
  const [currency,setCurrency] = useState("usd")

  const currencySymbol = currency ==="inr"?"₹":currency ==="eur"?"€":"$";
  const changePage =(page)=>{
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(132).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_current=${currency} &page=${page}`);
        setCoins(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency,page]);

  if (error)
    return <ErrorComponent message={"Error While Fetching coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value = {currency} onChange={setCurrency} p ={"8"}>
       
            <HStack spacing={"4"}>
                <Radio value={"inr"}>₹</Radio>
                <Radio value={"euro"}>€</Radio>
                <Radio value={"usd"}>$</Radio>
            </HStack>
        </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
              id={i.id}
                key={i.id}
                name={i.name}
                img={i.image}
                price= {i.current_price}
                symbol={i.symbol}
            
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflow={"auto"} p={"8"}>
            {btns.map((item,index)=>(
                <Button
                key={index}
                 bgColor = {"blackAlpha.900 "} color ={"white"} onClick={()=> changePage(2)}>2</Button>
            ))}
            
          </HStack>
        </>
      )}
    </Container>
  );
};





  
  

export default Coins
